import { createClient } from "npm:@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer@10.6.1";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = "https://kailane-art.github.io/matematica-avante/index.html";
const SENDER = Deno.env.get("SMTP_USER") || "";

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info, x-cron-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function reply(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char] || char);
}

function createToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function hashToken(token: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function createMailer() {
  const host = Deno.env.get("SMTP_HOST");
  const port = Number(Deno.env.get("SMTP_PORT") || "587");
  const user = Deno.env.get("SMTP_USER");
  const pass = Deno.env.get("SMTP_PASS");

  if (!host || !user || !pass || !Number.isInteger(port)) {
    throw new Error("As configurações SMTP da função estão incompletas.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}

async function sendEmail(to: string, subject: string, html: string, text: string) {
  if (!SENDER) throw new Error("Remetente SMTP não configurado.");
  const transporter = createMailer();
  try {
    await transporter.sendMail({
      from: { name: "Matemática Avante", address: SENDER },
      to,
      subject,
      html,
      text,
    });
  } finally {
    transporter.close();
  }
}

async function verifySmtpConnection() {
  const transporter = createMailer();
  try {
    await transporter.verify();
    return true;
  } finally {
    transporter.close();
  }
}

function emailTemplate(title: string, intro: string, buttonText: string, url: string, footer: string) {
  const safeTitle = escapeHtml(title);
  const safeIntro = escapeHtml(intro);
  const safeButton = escapeHtml(buttonText);
  const safeFooter = escapeHtml(footer);

  return `<!doctype html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:28px 12px;background:#f1f5f9;font-family:Arial,sans-serif;color:#172033">
  <main style="max-width:560px;margin:0 auto;padding:32px 26px;background:#ffffff;border:1px solid #dbe3ee;border-radius:16px">
    <p style="margin:0 0 10px;color:#1e40af;font-size:13px;font-weight:700;letter-spacing:1px">MATEMÁTICA AVANTE</p>
    <h1 style="margin:0 0 18px;font-size:24px;line-height:1.3">${safeTitle}</h1>
    <p style="font-size:16px;line-height:1.6">${safeIntro}</p>
    <p style="margin:28px 0;text-align:center">
      <a href="${url}" style="display:inline-block;padding:14px 22px;background:#1e40af;color:#ffffff;text-decoration:none;border-radius:9px;font-weight:700">${safeButton}</a>
    </p>
    <p style="font-size:13px;line-height:1.6;color:#64748b">${safeFooter}</p>
    <p style="margin:24px 0 0;font-size:12px;color:#94a3b8">Se você não solicitou esta ação, ignore este e-mail.</p>
  </main>
</body>
</html>`;
}

async function requestDeletion(req: Request, body: Record<string, unknown>) {
  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return reply({ error: "Sessão não encontrada." }, 401);

  const { data: authData, error: authError } = await admin.auth.getUser(token);
  if (authError || !authData.user?.id || !authData.user.email) {
    return reply({ error: "Sessão inválida. Entre novamente." }, 401);
  }

  const user = authData.user;
  if (!user.email_confirmed_at) {
    return reply({ error: "Confirme o e-mail da conta antes de solicitar a exclusão." }, 403);
  }

  const { data: restriction, error: restrictionError } = await admin
    .from("account_restrictions")
    .select("restriction_type, expires_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (restrictionError) throw restrictionError;
  const restrictionIsActive = restriction?.restriction_type === "pending_deletion" ||
    (restriction?.restriction_type === "temporary_suspension" &&
      new Date(restriction.expires_at).getTime() > Date.now());
  if (restrictionIsActive) {
    return reply({ error: "Esta conta possui uma restrição administrativa ativa e não pode iniciar a autoexclusão agora." }, 409);
  }

  const { data: profile, error: profileError } = await admin
    .from("profiles")
    .select("username, display_name")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return reply({ error: "Não foi possível localizar o perfil da conta." }, 404);
  }

  const rawToken = createToken();
  const tokenHash = await hashToken(rawToken);
  const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const { data: result, error: saveError } = await admin.rpc("ma_start_account_self_deletion", {
    p_user_id: user.id,
    p_target_email: user.email,
    p_target_username: profile.username || profile.display_name || "usuário",
    p_token_hash: tokenHash,
    p_token_expires_at: tokenExpiresAt,
  });

  if (saveError) throw saveError;
  if (result?.status === "already_active") {
    return reply({ error: "Já existe uma solicitação de exclusão ativa para esta conta. Verifique seu e-mail." }, 409);
  }

  const link = SITE_URL + "?acao=confirmar-exclusao&token=" + rawToken;
  const name = profile.display_name || profile.username || "usuário";
  const subject = "Confirme a solicitação de exclusão da sua conta";
  const html = emailTemplate(
    "Confirme a exclusão da sua conta",
    "Olá, " + name + ". Recebemos uma solicitação para excluir sua conta do Matemática Avante. A conta continuará ativa até você confirmar esta solicitação pelo botão abaixo.",
    "Confirmar exclusão da conta",
    link,
    "Este link é válido por 24 horas. Depois da confirmação, começará o prazo de 30 dias para recuperar a conta."
  );
  const text = "Olá, " + name + ". Para confirmar a solicitação de exclusão da sua conta, acesse: " + link + ". O link expira em 24 horas. O prazo de 30 dias só começa após a confirmação.";

  try {
    await sendEmail(user.email, subject, html, text);
  } catch (error) {
    await admin.rpc("ma_delete_unconfirmed_account_self_deletion", { p_user_id: user.id });
    throw error;
  }

  return reply({ success: true, message: "Enviamos um e-mail para confirmar a solicitação. A conta continua ativa até a confirmação." });
}

async function confirmDeletion(body: Record<string, unknown>) {
  const rawToken = String(body.token || "");
  if (!/^[a-f0-9]{64}$/i.test(rawToken)) return reply({ error: "Link de confirmação inválido." }, 400);

  const { data: result, error } = await admin.rpc("ma_confirm_account_self_deletion", {
    p_token_hash: await hashToken(rawToken),
  });
  if (error) throw error;

  if (result?.status === "already_confirmed") {
    return reply({ success: true, status: "already_confirmed", message: "Esta solicitação já foi confirmada." });
  }
  if (result?.status !== "confirmed" || !result.user_id) {
    return reply({ error: result?.status === "expired" ? "O link de confirmação expirou." : "Este link é inválido ou já foi utilizado." }, 410);
  }

  const userId = result.user_id;
  const { error: banError } = await admin.auth.admin.updateUserById(userId, {
    ban_duration: "876000h",
  });

  if (banError) {
    await admin.rpc("ma_rollback_account_self_confirmation", { p_user_id: userId });
    throw banError;
  }

  const { error: sessionsError } = await admin.rpc("ma_revoke_account_sessions", { p_user_id: userId });
  if (sessionsError) {
    await admin.auth.admin.updateUserById(userId, { ban_duration: "none" });
    await admin.rpc("ma_rollback_account_self_confirmation", { p_user_id: userId });
    throw sessionsError;
  }

  return reply({
    success: true,
    status: "confirmed",
    deletion_expires_at: result.deletion_expires_at,
    message: "Exclusão confirmada. A conta foi desativada e o prazo de 30 dias começou.",
  });
}

async function requestRecovery(body: Record<string, unknown>) {
  const email = String(body.email || "").trim();
  if (!email || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return reply({ success: true, message: "Se a conta estiver em período de exclusão, enviaremos um link de recuperação para o e-mail cadastrado." });
  }

  const rawToken = createToken();
  const tokenHash = await hashToken(rawToken);
  const tokenExpiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

  const { data: result, error } = await admin.rpc("ma_prepare_account_self_recovery", {
    p_email: email,
    p_token_hash: tokenHash,
    p_token_expires_at: tokenExpiresAt,
  });
  if (error) throw error;

  if (result?.status === "prepared") {
    const link = SITE_URL + "?acao=recuperar-exclusao&token=" + rawToken;
    const subject = "Recupere sua conta do Matemática Avante";
    const html = emailTemplate(
      "Recuperação da sua conta",
      "Recebemos uma tentativa de entrar em uma conta que está aguardando exclusão. Se você deseja cancelar a exclusão e reativar a conta, confirme pelo botão abaixo.",
      "Cancelar exclusão e reativar conta",
      link,
      "Este link é válido por 30 minutos e só pode ser utilizado uma vez. Se você não solicitou a recuperação, ignore este e-mail."
    );
    const text = "Para cancelar a exclusão e reativar sua conta do Matemática Avante, acesse: " + link + ". Este link expira em 30 minutos e só pode ser utilizado uma vez.";

    try {
      await sendEmail(email, subject, html, text);
    } catch (sendError) {
      await admin.rpc("ma_clear_account_self_recovery", { p_token_hash: tokenHash });
      throw sendError;
    }
  }

  return reply({
    success: true,
    message: "Se a conta estiver em período de exclusão, enviaremos um link de recuperação para o e-mail cadastrado. Confira também o spam.",
  });
}

async function recoverAccount(body: Record<string, unknown>) {
  const rawToken = String(body.token || "");
  if (!/^[a-f0-9]{64}$/i.test(rawToken)) return reply({ error: "Link de recuperação inválido." }, 400);

  const { data: result, error } = await admin.rpc("ma_consume_account_self_recovery", {
    p_token_hash: await hashToken(rawToken),
  });
  if (error) throw error;
  if (result?.status !== "cancelled" || !result.user_id) {
    return reply({ error: "Este link de recuperação expirou ou já foi utilizado." }, 410);
  }

  const userId = result.user_id;
  const { data: restriction, error: restrictionError } = await admin
    .from("account_restrictions")
    .select("restriction_type, expires_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (restrictionError) {
    await admin.rpc("ma_rollback_account_self_recovery", { p_user_id: userId });
    throw restrictionError;
  }

  if (restriction && new Date(restriction.expires_at).getTime() > Date.now()) {
    await admin.rpc("ma_rollback_account_self_recovery", { p_user_id: userId });
    return reply({ error: "A conta também possui uma restrição administrativa ativa. A recuperação da autoexclusão não remove essa restrição." }, 409);
  }

  const { error: unbanError } = await admin.auth.admin.updateUserById(userId, { ban_duration: "none" });
  if (unbanError) {
    await admin.rpc("ma_rollback_account_self_recovery", { p_user_id: userId });
    throw unbanError;
  }

  return reply({ success: true, message: "A exclusão foi cancelada e sua conta foi reativada. Entre novamente com seu e-mail e senha." });
}

async function cleanupExpiredAccounts() {
  const { data: expired, error } = await admin.rpc("ma_list_expired_account_self_deletions");
  if (error) {
    console.error("cleanup list RPC error:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    throw new Error("Falha ao consultar contas expiradas: " + error.message);
  }
  console.log("cleanup list RPC ok; expired records:", (expired || []).length);

  let deleted = 0;
  const failures: string[] = [];

  for (const account of expired || []) {
    try {
      const { data: objects, error: objectsError } = await admin.rpc("ma_get_account_storage_objects_for_cleanup", {
        p_user_id: account.user_id,
      });
      if (objectsError) throw objectsError;

      const byBucket = new Map<string, string[]>();
      for (const object of objects || []) {
        if (!object.bucket_id || !object.object_name) continue;
        const names = byBucket.get(object.bucket_id) || [];
        names.push(object.object_name);
        byBucket.set(object.bucket_id, names);
      }

      // Inclui o avatar do perfil como fallback para arquivos legados sem owner_id.
      const { data: profile, error: profileError } = await admin
        .from("profiles")
        .select("avatar_path")
        .eq("id", account.user_id)
        .maybeSingle();
      if (profileError) throw profileError;
      if (profile?.avatar_path) {
        const avatarNames = byBucket.get("avatars") || [];
        if (!avatarNames.includes(profile.avatar_path)) avatarNames.push(profile.avatar_path);
        byBucket.set("avatars", avatarNames);
      }

      for (const [bucket, names] of byBucket) {
        const { error: storageError } = await admin.storage.from(bucket).remove(names);
        if (storageError) throw storageError;
      }

      const { error: deleteError } = await admin.auth.admin.deleteUser(account.user_id);
      if (deleteError) throw deleteError;
      deleted++;
    } catch (error) {
      failures.push(String(account.target_username || account.user_id) + ": " +
        (error instanceof Error ? error.message : String(error)));
    }
  }

  return { processed: (expired || []).length, deleted, failures };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return reply({ error: "Método não permitido." }, 405);

  try {
    const body = await req.json() as Record<string, unknown>;
    const action = String(body.action || "");

    if (action === "cleanup") {
      const secret = req.headers.get("x-cron-secret") || "";
      const { data: allowed, error } = await admin.rpc("verify_account_cleanup_secret", { p_secret: secret });
      if (error) {
        console.error("cleanup secret RPC error:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
        throw new Error("Falha ao validar a autorização da rotina.");
      }
      if (allowed !== true) return reply({ error: "Não autorizado." }, 401);
      console.log("cleanup cron authorization accepted");
      return reply(await cleanupExpiredAccounts());
    }

    if (action === "smtp_check") {
      const secret = req.headers.get("x-cron-secret") || "";
      const { data: allowed, error } = await admin.rpc("verify_account_cleanup_secret", { p_secret: secret });
      if (error || allowed !== true) return reply({ error: "Não autorizado." }, 401);
      await verifySmtpConnection();
      return reply({ smtp_verified: true });
    }

    if (action === "request_deletion") return await requestDeletion(req, body);
    if (action === "confirm_deletion") return await confirmDeletion(body);
    if (action === "request_recovery") return await requestRecovery(body);
    if (action === "recover") return await recoverAccount(body);

    return reply({ error: "Ação desconhecida." }, 400);
  } catch (error) {
    const details = error && typeof error === "object"
      ? JSON.stringify(error, Object.getOwnPropertyNames(error))
      : String(error);
    console.error("account-self-service:", details);
    return reply({ error: "Não foi possível concluir a operação agora. Tente novamente mais tarde." }, 500);
  }
});
