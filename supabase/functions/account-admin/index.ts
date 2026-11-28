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
    const { data: actor, error: actorError } = await admin.from("profiles").select("tipo_usuario")
      .eq("id", authData.user.id).maybeSingle();
    if (actorError || actor?.tipo_usuario !== "dev") return reply({ error: "Somente contas DEV podem executar ações administrativas." }, 403);

    if (body.action === "list_users") {
      // A listagem geral de perfis fica restrita à DEV principal.
      if (authData.user.id !== PRIMARY_DEV_USER_ID) {
        return reply({ error: "Somente a DEV principal pode consultar a lista geral de usuários." }, 403);
      }

      const search = String(body.search || "").trim().slice(0, 80)
        .replace(/[,%()]/g, " ").replace(/\\/g, " ").replace(/^@/, "").trim();
      const userType = String(body.user_type || "all");
      if (!["all", "aluno", "professor", "dev"].includes(userType)) {
        return reply({ error: "Filtro de tipo de conta inválido." }, 400);
      }

      let query = admin.from("profiles")
        .select("id, display_name, username, tipo_usuario, status_professor, created_at")
        .order("created_at", { ascending: false })
        .limit(30);

      if (userType !== "all") query = query.eq("tipo_usuario", userType);
      if (search) {
        const pattern = "%" + search + "%";
        query = query.or("display_name.ilike." + pattern + ",username.ilike." + pattern);
      }

      const { data: users, error: usersError } = await query;
      if (usersError) throw usersError;
      return reply({ users: users || [] });
    }

    const targetId = String(body?.target_user_id || "");
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(targetId) || targetId === authData.user.id) {
      return reply({ error: "Usuário de destino inválido." }, 400);
    }
    const { data: target, error: targetError } = await admin.from("profiles").select("id, username, tipo_usuario")
      .eq("id", targetId).maybeSingle();
    if (targetError || !target) return reply({ error: "Perfil não encontrado." }, 404);

    const actionsRestrictedForDevTargets = ["ban", "suspend", "restore", "unsuspend"];
    if (
      target.tipo_usuario === "dev" &&
      actionsRestrictedForDevTargets.includes(String(body.action)) &&
      authData.user.id !== PRIMARY_DEV_USER_ID
    ) {
      return reply({ error: "Somente a DEV principal pode banir, suspender ou reativar outra conta DEV." }, 403);
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
      const { data: result, error } = await admin.rpc("ma_admin_demote_teacher", {
        p_user_id: targetId,
        p_actor_id: authData.user.id
      });
      if (error) throw error;
      return reply(result || { success: true });
    }
    return reply({ error: "Ação administrativa desconhecida." }, 400);
  } catch (error) {
    console.error("account-admin:", error);
    return reply({ error: error instanceof Error ? error.message : "Erro interno." }, 400);
  }
});