import { createClient } from "npm:@supabase/supabase-js@2";
const url = Deno.env.get("SUPABASE_URL")!;
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info, x-cron-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};
const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: cors });

// Identificador imutável da conta DEV principal. Não usar username para autorização.
const PRIMARY_DEV_USER_ID = "356e82f3-2ad0-4932-bc2c-e328bc7066d2";

async function revokeUserSessions(userId: string) {
  const { data, error } = await admin.rpc("ma_revoke_account_sessions", {
    p_user_id: userId
  });
  if (error) throw error;
  return Number(data) || 0;
}

async function hasDevPermission(userId: string, permission: string) {
  const { data, error } = await admin.rpc("ma_user_has_dev_permission", {
    p_user_id: userId,
    p_permission: permission
  });
  if (error) throw error;
  return data === true;
}

async function removeAccountStorageObjects(userId: string, avatarPath: string | null) {
  const { data: ownedObjects, error } = await admin.rpc("ma_get_account_storage_objects_for_cleanup", {
    p_user_id: userId
  });
  if (error) throw error;

  const objectsByBucket = new Map<string, Set<string>>();
  for (const item of ownedObjects || []) {
    if (!item?.bucket_id || !item?.object_name) continue;
    if (!objectsByBucket.has(item.bucket_id)) objectsByBucket.set(item.bucket_id, new Set());
    objectsByBucket.get(item.bucket_id)!.add(item.object_name);
  }

  // Compatibilidade com avatares antigos que não possuem owner_id no Storage.
  if (avatarPath) {
    if (!objectsByBucket.has("avatars")) objectsByBucket.set("avatars", new Set());
    objectsByBucket.get("avatars")!.add(avatarPath);
  }

  let removed = 0;
  for (const [bucket, objectNames] of objectsByBucket.entries()) {
    const paths = Array.from(objectNames);
    for (let index = 0; index < paths.length; index += 100) {
      const batch = paths.slice(index, index + 100);
      const { error: removeError } = await admin.storage.from(bucket).remove(batch);
      if (removeError) throw removeError;
      removed += batch.length;
    }
  }
  return removed;
}

async function cleanupExpiredAccounts() {
  const now = new Date().toISOString();
  const { data: expired, error } = await admin.from("account_restrictions")
    .select("user_id, target_username").eq("restriction_type", "pending_deletion")
    .lte("expires_at", now).order("expires_at", { ascending: true }).limit(50);
  if (error) throw error;
  let deleted = 0;
  const failures: string[] = [];
  for (const account of expired || []) {
    try {
      const { data: existingUser, error: lookupError } = await admin.auth.admin.getUserById(account.user_id);
      if (lookupError) {
        if (/not found|user not found/i.test(lookupError.message || "")) {
          const { data: profile, error: profileError } = await admin.from("profiles")
            .select("avatar_path").eq("id", account.user_id).maybeSingle();
          if (profileError) throw profileError;
          await removeAccountStorageObjects(account.user_id, profile?.avatar_path || null);
          const { error: cleanupError } = await admin.from("account_restrictions").delete().eq("user_id", account.user_id);
          if (cleanupError) throw cleanupError;
          continue;
        }
        throw lookupError;
      }
      if (!existingUser.user) throw new Error("Conta não encontrada no Auth.");
      const { data: profile, error: profileError } = await admin.from("profiles")
        .select("avatar_path").eq("id", account.user_id).maybeSingle();
      if (profileError) throw profileError;
      await removeAccountStorageObjects(account.user_id, profile?.avatar_path || null);
      const { error: deleteError } = await admin.auth.admin.deleteUser(account.user_id);
      if (deleteError) throw deleteError;
      const { error: restrictionError } = await admin.from("account_restrictions").delete().eq("user_id", account.user_id);
      if (restrictionError) throw restrictionError;
      deleted++;
    } catch (error) {
      failures.push(account.target_username + ": " + (error instanceof Error ? error.message : String(error)));
    }
  }
  await admin.from("account_restrictions").delete().eq("restriction_type", "temporary_suspension").lte("expires_at", now);
  return { processed: (expired || []).length, deleted, failures };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return reply({ error: "Método não permitido." }, 405);
  try {
    const body = await req.json();
    if (body?.action === "cleanup") {
      const secret = req.headers.get("x-cron-secret") || "";
      const { data: allowed, error } = await admin.rpc("verify_account_cleanup_secret", { p_secret: secret });
      if (error || allowed !== true) return reply({ error: "Não autorizado." }, 401);
      return reply(await cleanupExpiredAccounts());
    }

    const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    if (!token) return reply({ error: "Sessão não encontrada." }, 401);
    const { data: authData, error: authError } = await admin.auth.getUser(token);
    if (authError || !authData.user) return reply({ error: "Sessão inválida." }, 401);
    const { data: actorRestriction, error: actorRestrictionError } = await admin
      .from("account_restrictions")
      .select("restriction_type, expires_at")
      .eq("user_id", authData.user.id)
      .maybeSingle();
    if (actorRestrictionError) throw actorRestrictionError;
    const actorRestricted = actorRestriction?.restriction_type === "pending_deletion" ||
      (actorRestriction?.restriction_type === "temporary_suspension" &&
        new Date(actorRestriction.expires_at).getTime() > Date.now());
    if (actorRestricted) {
      return reply({ error: "Sua conta possui uma restrição ativa e não pode executar ações administrativas." }, 403);
    }
    const requestedAction = String(body?.action || "");

    if (requestedAction === "submit_message_report") {
      const messageId = String(body.message_id || "");
      const reason = String(body.reason || "");
      const details = body.details == null ? null : String(body.details);
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(messageId)) {
        return reply({ error: "Mensagem inválida para denúncia." }, 400);
      }
      if (details && details.length > 1000) {
        return reply({ error: "O relato adicional deve ter no máximo 1000 caracteres." }, 400);
      }
      const { data: reportId, error: reportError } = await admin.rpc("ma_submit_message_report", {
        p_reporter_id: authData.user.id,
        p_message_id: messageId,
        p_reason: reason,
        p_details: details
      });
      if (reportError) {
        const status = /já registrou uma denúncia/i.test(reportError.message || "") ? 409 : 400;
        return reply({ error: reportError.message || "Não foi possível registrar a denúncia." }, status);
      }
      return reply({ success: true, report_id: reportId });
    }

    const { data: actor, error: actorError } = await admin.from("profiles").select("tipo_usuario")
      .eq("id", authData.user.id).maybeSingle();
    if (actorError || actor?.tipo_usuario !== "dev") return reply({ error: "Somente contas DEV podem executar ações administrativas." }, 403);

    if (requestedAction === "get_access") {
      const permissionNames = [
        "users.manage", "users.restrict", "users.delete",
        "teachers.manage", "xp.manage", "chats.moderate",
        "premium.manage", "stats.view", "announcements.manage",
        "audit.view", "tasks.manage", "moderation.access",
        "tasks.view", "dev.manage"
      ];
      const permissions: Record<string, boolean> = {};
      for (const permission of permissionNames) {
        permissions[permission] = await hasDevPermission(authData.user.id, permission);
      }

      let role = "moderator";
      if (authData.user.id === PRIMARY_DEV_USER_ID) {
        role = "primary";
      } else {
        const { data: roleData, error: roleError } = await admin
          .from("dev_access_roles")
          .select("role")
          .eq("user_id", authData.user.id)
          .maybeSingle();
        if (roleError) throw roleError;
        role = roleData?.role || "moderator";
      }
      return reply({ role, permissions });
    }

    if (requestedAction === "list_users") {
      if (!(await hasDevPermission(authData.user.id, "users.manage"))) {
        return reply({ error: "Sua conta DEV não pode consultar a lista de usuários." }, 403);
      }
      const search = String(body.search || "").trim().replace(/^@/, "").slice(0, 80);
      const type = String(body.type || "all");
      if (!["all", "aluno", "professor", "dev"].includes(type)) {
        return reply({ error: "Filtro de tipo de conta inválido." }, 400);
      }

      const buildQuery = () => {
        let query = admin.from("profiles")
          .select("id, display_name, username, tipo_usuario, status_professor, created_at")
          .order("created_at", { ascending: false })
          .limit(30);
        if (type !== "all") query = query.eq("tipo_usuario", type);
        return query;
      };

      let users: any[] = [];
      if (search) {
        const [byUsername, byName] = await Promise.all([
          buildQuery().ilike("username", "%" + search + "%"),
          buildQuery().ilike("display_name", "%" + search + "%")
        ]);
        if (byUsername.error) throw byUsername.error;
        if (byName.error) throw byName.error;
        const unique = new Map<string, any>();
        for (const user of [...(byUsername.data || []), ...(byName.data || [])]) unique.set(user.id, user);
        users = [...unique.values()]
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 30);
      } else {
        const { data, error } = await buildQuery();
        if (error) throw error;
        users = data || [];
      }

      const userIds = users.map((user) => user.id);
      const restrictionsResult = userIds.length
        ? await admin.from("account_restrictions")
            .select("user_id, restriction_type, expires_at")
            .in("user_id", userIds)
        : { data: [], error: null };
      if (restrictionsResult.error) throw restrictionsResult.error;
      const restrictions = new Map((restrictionsResult.data || []).map((item) => [item.user_id, item]));
      return reply({
        users: users.map((user) => ({
          ...user,
          restriction: restrictions.get(user.id) || null
        })),
        limit: 30
      });
    }

    if (requestedAction === "list_teachers") {
      if (!(await hasDevPermission(authData.user.id, "teachers.manage"))) {
        return reply({ error: "Sua conta DEV não pode consultar os professores." }, 403);
      }
      const { data, error } = await admin.from("profiles")
        .select("id, display_name, username, status_professor, created_at")
        .eq("tipo_usuario", "professor")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return reply({ teachers: data || [], limit: 100 });
    }

    if (requestedAction === "list_teacher_requests") {
      if (!(await hasDevPermission(authData.user.id, "teachers.manage"))) {
        return reply({ error: "Sua conta DEV não pode consultar solicitações de professores." }, 403);
      }

      const { data: assignments, error: assignmentsError } = await admin
        .from("teacher_request_messages")
        .select("request_id, message_id")
        .eq("recipient_id", authData.user.id);
      if (assignmentsError) throw assignmentsError;

      const requestIds = [...new Set((assignments || []).map((item) => item.request_id))];
      if (!requestIds.length) return reply({ requests: [] });

      const { data, error } = await admin.from("teacher_requests")
        .select("id, user_id, full_name, username, formation, institution, specialties, other_specialty, experience, status, created_at")
        .in("id", requestIds)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;

      const messageByRequest = new Map((assignments || []).map((item) => [item.request_id, item.message_id]));
      return reply({
        requests: (data || []).map((request) => ({
          ...request,
          message_id: messageByRequest.get(request.id) || null
        }))
      });
    }

    if (requestedAction === "list_moderation_reports") {
      if (!(await hasDevPermission(authData.user.id, "moderation.access"))) {
        return reply({ error: "Sua conta DEV não pode acessar a fila de denúncias." }, 403);
      }
      const { data, error } = await admin.rpc("ma_list_moderation_reports", {
        p_actor_id: authData.user.id
      });
      if (error) throw error;
      return reply({ reports: data || [] });
    }

    if (requestedAction === "get_moderation_report") {
      if (!(await hasDevPermission(authData.user.id, "chats.moderate"))) {
        return reply({ error: "Sua conta DEV não pode consultar o conteúdo das denúncias." }, 403);
      }
      const reportId = String(body.report_id || "");
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(reportId)) {
        return reply({ error: "Denúncia inválida." }, 400);
      }
      const { data, error } = await admin.rpc("ma_get_moderation_report", {
        p_actor_id: authData.user.id,
        p_report_id: reportId
      });
      if (error) throw error;
      return reply({ report: data });
    }

    if (requestedAction === "update_moderation_report") {
      if (!(await hasDevPermission(authData.user.id, "chats.moderate"))) {
        return reply({ error: "Sua conta DEV não pode atualizar denúncias." }, 403);
      }
      const reportId = String(body.report_id || "");
      const status = String(body.status || "");
      const note = body.note == null ? null : String(body.note);
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(reportId)) {
        return reply({ error: "Denúncia inválida." }, 400);
      }
      if (note && note.length > 1000) return reply({ error: "A observação deve ter no máximo 1000 caracteres." }, 400);
      const { data, error } = await admin.rpc("ma_update_moderation_report", {
        p_actor_id: authData.user.id,
        p_report_id: reportId,
        p_status: status,
        p_note: note
      });
      if (error) throw error;
      return reply(data);
    }

    const targetId = String(body?.target_user_id || "");
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(targetId) || targetId === authData.user.id) {
      return reply({ error: "Usuário de destino inválido." }, 400);
    }
    const { data: target, error: targetError } = await admin.from("profiles").select("id, username, tipo_usuario")
      .eq("id", targetId).maybeSingle();
    if (targetError || !target) return reply({ error: "Perfil não encontrado." }, 404);

    const actionPermissions: Record<string, string> = {
      status: "users.manage",
      suspend: "users.restrict",
      ban: "users.restrict",
      restore: "users.restrict",
      unsuspend: "users.restrict",
      demote: "teachers.manage",
      delete: "users.delete",
      set_dev_role: "dev.manage"
    };
    const requiredPermission = actionPermissions[String(body.action)];
    if (requiredPermission && !(await hasDevPermission(authData.user.id, requiredPermission))) {
      return reply({ error: "Sua conta DEV não possui permissão para esta ação." }, 403);
    }

    const actionsRestrictedForDevTargets = ["ban", "suspend", "restore", "unsuspend"];
    if (
      target.tipo_usuario === "dev" &&
      actionsRestrictedForDevTargets.includes(String(body.action)) &&
      authData.user.id !== PRIMARY_DEV_USER_ID
    ) {
      return reply({ error: "Somente a DEV principal pode banir, suspender ou reativar outra conta DEV." }, 403);
    }

    if (body.action === "set_dev_role") {
      if (target.tipo_usuario !== "dev") {
        return reply({ error: "O cargo só pode ser atribuído a outra conta DEV." }, 409);
      }
      const role = String(body.role || "");
      if (!["administrator", "moderator"].includes(role)) {
        return reply({ error: "Cargo DEV inválido." }, 400);
      }
      const { data, error } = await admin.rpc("ma_set_dev_role", {
        p_actor_id: authData.user.id,
        p_target_user_id: targetId,
        p_role: role
      });
      if (error) throw error;
      return reply(data);
    }

    if (body.action === "delete") {
      const typedUsername = String(body.confirm_username || "").trim().replace(/^@/, "");
      if (!typedUsername || typedUsername.toLowerCase() !== String(target.username).toLowerCase()) {
        return reply({ error: "O nome de usuário informado não corresponde à conta selecionada." }, 409);
      }

      const { data: targetAuth, error: authLookupError } = await admin.auth.admin.getUserById(targetId);
      if (authLookupError || !targetAuth.user) return reply({ error: "Não foi possível localizar a conta de autenticação." }, 404);

      const { data: profileData, error: profileError } = await admin.from("profiles")
        .select("avatar_path").eq("id", targetId).maybeSingle();
      if (profileError) throw profileError;

      const { data: restriction, error: restrictionLookupError } = await admin.from("account_restrictions")
        .select("*").eq("user_id", targetId).maybeSingle();
      if (restrictionLookupError) throw restrictionLookupError;

      // Remove arquivos antes do Auth; se houver falha no Storage, a conta permanece ativa.
      const storageObjectsDeleted = await removeAccountStorageObjects(targetId, profileData?.avatar_path || null);

      // Evita que o gatilho de banimento expirado bloqueie o e-mail nesta exclusão administrativa imediata.
      if (restriction) {
        const { error: restrictionDeleteError } = await admin.from("account_restrictions")
          .delete().eq("user_id", targetId);
        if (restrictionDeleteError) throw restrictionDeleteError;
      }

      const { error: deleteError } = await admin.auth.admin.deleteUser(targetId);
      if (deleteError) {
        if (restriction) {
          const { error: restoreRestrictionError } = await admin.from("account_restrictions").upsert(restriction);
          if (restoreRestrictionError) {
            throw new Error("A exclusão falhou e não foi possível restaurar a restrição administrativa. Verifique a conta antes de novas ações.");
          }
        }
        throw deleteError;
      }

      return reply({
        success: true,
        deleted_username: target.username,
        storage_objects_deleted: storageObjectsDeleted
      });
    }

    if (body.action === "status") {
      const { data, error } = await admin.from("account_restrictions").select("restriction_type, expires_at, created_at")
        .eq("user_id", targetId).maybeSingle();
      if (error) throw error;
      if (data && new Date(data.expires_at) > new Date()) {
        const durationDays = Math.max(1, Math.ceil((new Date(data.expires_at).getTime() - new Date(data.created_at).getTime()) / 86400000));
        return reply({ restriction: { ...data, duration_days: durationDays } });
      }
      return reply({ restriction: null });
    }

    if (body.action === "suspend") {
      const days = Number(body.days);
      if (!Number.isSafeInteger(days) || days < 1 || days > 3650) return reply({ error: "Informe de 1 a 3650 dias." }, 400);
      const { data: current, error: currentError } = await admin.from("account_restrictions").select("*")
        .eq("user_id", targetId).maybeSingle();
      if (currentError) throw currentError;
      if (current?.restriction_type === "pending_deletion") return reply({ error: "A conta está aguardando exclusão." }, 409);
      const expires = new Date(Date.now() + days * 86400000).toISOString();
      const { error: saveError } = await admin.from("account_restrictions").upsert({
        user_id: targetId, target_username: target.username, target_email: "",
        restriction_type: "temporary_suspension", created_by: authData.user.id, expires_at: expires
      });
      if (saveError) throw saveError;
      const { error: banError } = await admin.auth.admin.updateUserById(targetId, { ban_duration: String(days * 24) + "h" });
      if (banError) {
        if (current) {
          const { error: restoreRestrictionError } = await admin.from("account_restrictions").upsert(current);
          if (restoreRestrictionError) {
            throw new Error("A operação falhou e não foi possível restaurar a restrição anterior. A nova restrição foi mantida por segurança.");
          }
        } else {
          const { error: cleanupRestrictionError } = await admin.from("account_restrictions").delete().eq("user_id", targetId);
          if (cleanupRestrictionError) throw cleanupRestrictionError;
        }
        throw banError;
      }
      const sessionsRevoked = await revokeUserSessions(targetId);
      return reply({ success: true, expires_at: expires, sessions_revoked: sessionsRevoked });
    }

    if (body.action === "ban") {
      const { data: current, error: currentError } = await admin.from("account_restrictions").select("*")
        .eq("user_id", targetId).maybeSingle();
      if (currentError) throw currentError;
      if (current?.restriction_type === "pending_deletion") return reply({ error: "Esta conta já está banida e aguardando o prazo de exclusão." }, 409);
      const { data: targetAuth, error: lookupError } = await admin.auth.admin.getUserById(targetId);
      if (lookupError || !targetAuth.user?.email) return reply({ error: "Não foi possível localizar o e-mail da conta." }, 400);
      const expires = new Date(Date.now() + 30 * 86400000).toISOString();
      const { error: saveError } = await admin.from("account_restrictions").upsert({
        user_id: targetId, target_username: target.username, target_email: targetAuth.user.email,
        restriction_type: "pending_deletion", created_by: authData.user.id, expires_at: expires
      });
      if (saveError) throw saveError;
      const { error: banError } = await admin.auth.admin.updateUserById(targetId, { ban_duration: "876000h" });
      if (banError) {
        if (current) {
          const { error: restoreRestrictionError } = await admin.from("account_restrictions").upsert(current);
          if (restoreRestrictionError) {
            throw new Error("A operação falhou e não foi possível restaurar a restrição anterior. A nova restrição foi mantida por segurança.");
          }
        } else {
          const { error: cleanupRestrictionError } = await admin.from("account_restrictions").delete().eq("user_id", targetId);
          if (cleanupRestrictionError) throw cleanupRestrictionError;
        }
        throw banError;
      }
      const sessionsRevoked = await revokeUserSessions(targetId);
      return reply({ success: true, expires_at: expires, sessions_revoked: sessionsRevoked });
    }

    if (body.action === "restore") {
      const { data: restriction, error } = await admin.from("account_restrictions").select("restriction_type, expires_at")
        .eq("user_id", targetId).maybeSingle();
      if (error) throw error;
      if (restriction?.restriction_type !== "pending_deletion") return reply({ error: "Conta não está aguardando recuperação." }, 404);
      if (new Date(restriction.expires_at) <= new Date()) return reply({ error: "O prazo de 30 dias terminou." }, 410);
      const { error: unbanError } = await admin.auth.admin.updateUserById(targetId, { ban_duration: "none" });
      if (unbanError) throw unbanError;
      const { error: removeError } = await admin.from("account_restrictions").delete().eq("user_id", targetId);
      if (removeError) throw removeError;
      return reply({ success: true });
    }

    if (body.action === "unsuspend") {
      const { data: restriction, error } = await admin.from("account_restrictions").select("restriction_type")
        .eq("user_id", targetId).maybeSingle();
      if (error) throw error;
      if (restriction?.restriction_type !== "temporary_suspension") {
        return reply({ error: "Esta conta não possui uma suspensão temporária ativa." }, 404);
      }
      const { error: unbanError } = await admin.auth.admin.updateUserById(targetId, { ban_duration: "none" });
      if (unbanError) throw unbanError;
      const { error: removeError } = await admin.from("account_restrictions").delete()
        .eq("user_id", targetId).eq("restriction_type", "temporary_suspension");
      if (removeError) throw removeError;
      return reply({ success: true });
    }

    if (body.action === "demote") {
      if (target.tipo_usuario !== "professor") return reply({ error: "Esta conta não é de professor." }, 409);
      const { error } = await admin.from("profiles").update({ tipo_usuario: "aluno" }).eq("id", targetId);
      if (error) throw error;
      return reply({ success: true });
    }
    return reply({ error: "Ação administrativa desconhecida." }, 400);
  } catch (error) {
    console.error("account-admin:", error);
    return reply({ error: error instanceof Error ? error.message : "Erro interno." }, 400);
  }
});