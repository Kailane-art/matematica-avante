import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY") || "";
const VAPID_PUBLIC_KEY = "BFimn95Bfdnzq6-E_qe6myR6U7LW3WINEHwFd7Cm0OEzpD__MxaWfB84K9CLeb1h6mTN81J2UeT6VA_NozQGOro";
const VAPID_SUBJECT = "mailto:equipe.matematicaavante@gmail.com";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function obterDestinatarios(tipo: string, payload: Record<string, unknown>, userId: string) {
  if (tipo === "message") {
    const messageId = String(payload.message_id || "");
    const { data: message, error } = await supabase
      .from("messages")
      .select("id, conversation_id, sender_id, body, deleted_at")
      .eq("id", messageId)
      .maybeSingle();

    if (error) throw error;
    if (!message || message.sender_id !== userId || message.deleted_at) {
      throw new Error("Mensagem não autorizada para notificação.");
    }

    const { data: conversation, error: conversationError } = await supabase
      .from("conversations")
      .select("user_low, user_high")
      .eq("id", message.conversation_id)
      .single();

    if (conversationError) throw conversationError;

    const recipientId = conversation.user_low === userId
      ? conversation.user_high
      : conversation.user_high === userId
        ? conversation.user_low
        : null;

    if (!recipientId) throw new Error("O usuário não participa desta conversa.");

    const { data: sender } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .maybeSingle();

    const username = sender?.username || "usuário";
    return [{
      user_id: recipientId,
      title: "Nova mensagem",
      body: "@" + username + ": " + String(message.body || "").slice(0, 170),
      url: "conversa.html?usuario=" + encodeURIComponent(username),
    }];
  }

  if (tipo === "alert") {
    const alertId = String(payload.alert_id || "");
    const { data: alert, error } = await supabase
      .from("global_alerts")
      .select("id, author_id, message")
      .eq("id", alertId)
      .maybeSingle();

    if (error) throw error;
    if (!alert || alert.author_id !== userId) {
      throw new Error("Somente o autor pode disparar a notificação deste alerta.");
    }

    const { data: notifications, error: notificationsError } = await supabase
      .from("global_alert_notifications")
      .select("recipient_id")
      .eq("alert_id", alertId);

    if (notificationsError) throw notificationsError;

    return (notifications || []).map((item) => ({
      user_id: item.recipient_id,
      title: "Novo alerta",
      body: String(alert.message || "").slice(0, 200),
      url: "alertas.html",
    }));
  }

  if (tipo === "friend_request") {
    const recipientId = String(payload.recipient_id || "");
    const { data: requests, error } = await supabase
      .from("friendships")
      .select("user_low, user_high, requested_by, status")
      .eq("requested_by", userId)
      .eq("status", "pending");

    if (error) throw error;

    const request = (requests || []).find((item) =>
      (item.user_low === recipientId || item.user_high === recipientId)
    );

    if (!request) throw new Error("Solicitação de amizade não encontrada.");

    const { data: sender } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .maybeSingle();

    return [{
      user_id: recipientId,
      title: "Nova solicitação de amizade",
      body: "@" + (sender?.username || "usuário") + " quer adicionar você.",
      url: "chat.html",
    }];
  }

  if (tipo === "teacher_request") {
    const requestId = String(payload.request_id || "");
    const { data: request, error } = await supabase
      .from("teacher_requests")
      .select("id, user_id, username")
      .eq("id", requestId)
      .maybeSingle();

    if (error) throw error;
    if (!request || request.user_id !== userId) {
      throw new Error("Solicitação de professor não autorizada.");
    }

    const { data: notifications, error: notificationsError } = await supabase
      .from("teacher_request_notifications")
      .select("recipient_id")
      .eq("request_id", requestId);

    if (notificationsError) throw notificationsError;

    return (notifications || []).map((item) => ({
      user_id: item.recipient_id,
      title: "Solicitação para professor",
      body: "@" + (request.username || "usuário") + " enviou uma solicitação.",
      url: "chat.html",
    }));
  }


  if (tipo === "friend_response") {
    const requestId = String(payload.request_id || "");
    const { data: request, error } = await supabase
      .from("friendships")
      .select("id, user_low, user_high, requested_by, status")
      .eq("id", requestId)
      .maybeSingle();

    if (error) throw error;
    if (!request || !["accepted", "rejected"].includes(request.status) || request.requested_by === userId) {
      throw new Error("Resposta da solicitação de amizade não autorizada.");
    }

    const responderId = request.user_low === request.requested_by
      ? request.user_high
      : request.user_low;

    if (responderId !== userId) throw new Error("O usuário não respondeu esta solicitação.");

    const { data: responder } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .maybeSingle();

    const username = responder?.username || "usuário";
    const aceitou = request.status === "accepted";
    return [{
      user_id: request.requested_by,
      title: aceitou ? "Solicitação de amizade aceita" : "Solicitação de amizade recusada",
      body: aceitou ? "@" + username + " aceitou sua solicitação." : "@" + username + " recusou sua solicitação.",
      url: "chat.html",
    }];
  }

  if (tipo === "teacher_decision") {
    const requestId = String(payload.request_id || "");
    const { data: request, error } = await supabase
      .from("teacher_requests")
      .select("id, user_id, status, decided_by, reviewed_by")
      .eq("id", requestId)
      .maybeSingle();

    if (error) throw error;
    if (!request || (request.decided_by !== userId && request.reviewed_by !== userId)) {
      throw new Error("Decisão da solicitação de professor não autorizada.");
    }

    const mensagens: Record<string, string> = {
      em_analise: "Sua solicitação para professor está em análise.",
      aprovada: "Sua solicitação foi aprovada. Sua conta agora é de professor.",
      rejeitada: "Sua solicitação para professor foi recusada.",
    };

    return [{
      user_id: request.user_id,
      title: "Atualização da solicitação",
      body: mensagens[request.status] || "Sua solicitação para professor foi atualizada.",
      url: "chat.html",
    }];
  }

  throw new Error("Tipo de notificação inválido.");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return response({ error: "Método não permitido." }, 405);

  try {
    const authorization = req.headers.get("Authorization") || "";
    const token = authorization.replace(/^Bearer\s+/i, "");
    if (!token) return response({ error: "Autenticação necessária." }, 401);

    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData.user) return response({ error: "Sessão inválida." }, 401);

    const { data: restriction, error: restrictionError } = await supabase
      .from("account_restrictions")
      .select("restriction_type, expires_at")
      .eq("user_id", authData.user.id)
      .maybeSingle();
    if (restrictionError) throw restrictionError;
    const accountRestricted = restriction?.restriction_type === "pending_deletion" ||
      (restriction?.restriction_type === "temporary_suspension" &&
        new Date(restriction.expires_at).getTime() > Date.now());
    if (accountRestricted) {
      return response({ error: "Sua conta possui uma restrição ativa e não pode enviar notificações." }, 403);
    }

    if (!VAPID_PRIVATE_KEY) {
      return response({ error: "A chave privada VAPID ainda não foi configurada no Supabase." }, 503);
    }

    const payload = await req.json();
    const destinatarios = await obterDestinatarios(
      String(payload.event_type || ""),
      payload,
      authData.user.id,
    );

    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

    const unicos = [...new Map(destinatarios.map((item) => [item.user_id, item])).values()];
    const ids = unicos.map((item) => item.user_id);
    if (!ids.length) return response({ sent: 0, message: "Nenhum destinatário." });

    const [{ data: settings, error: settingsError }, { data: subscriptions, error: subscriptionsError }] =
      await Promise.all([
        supabase.from("user_settings")
          .select("user_id")
          .in("user_id", ids)
          .eq("push_notifications_enabled", true),
        supabase.from("push_subscriptions")
          .select("id, user_id, endpoint, p256dh, auth")
          .in("user_id", ids),
      ]);

    if (settingsError) throw settingsError;
    if (subscriptionsError) throw subscriptionsError;

    const enabledUsers = new Set((settings || []).map((item) => item.user_id));
    const subscriptionsByUser = new Map<string, typeof subscriptions>();
    for (const subscription of subscriptions || []) {
      if (!enabledUsers.has(subscription.user_id)) continue;
      const list = subscriptionsByUser.get(subscription.user_id) || [];
      list.push(subscription);
      subscriptionsByUser.set(subscription.user_id, list);
    }

    let sent = 0;
    let removed = 0;
    for (const recipient of unicos) {
      const userSubscriptions = subscriptionsByUser.get(recipient.user_id) || [];
      for (const subscription of userSubscriptions) {
        try {
          await webpush.sendNotification(
            {
              endpoint: subscription.endpoint,
              keys: { p256dh: subscription.p256dh, auth: subscription.auth },
            },
            JSON.stringify({
              title: recipient.title,
              body: recipient.body,
              url: recipient.url,
            }),
            { TTL: 120 },
          );
          sent++;
        } catch (sendError) {
          const statusCode = Number((sendError as { statusCode?: number })?.statusCode || 0);
          if (statusCode === 404 || statusCode === 410) {
            await supabase.from("push_subscriptions").delete().eq("id", subscription.id);
            removed++;
          } else {
            console.error("Falha ao enviar push:", sendError);
          }
        }
      }
    }

    return response({ sent, removed, recipients: unicos.length });
  } catch (error) {
    console.error("Erro no envio de push:", error);
    return response({ error: error instanceof Error ? error.message : "Falha ao enviar notificações." }, 400);
  }
});
