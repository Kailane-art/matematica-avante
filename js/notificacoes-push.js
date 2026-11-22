(function () {
    "use strict";
    const VAPID_PUBLIC_KEY = "BFimn95Bfdnzq6-E_qe6myR6U7LW3WINEHwFd7Cm0OEzpD__MxaWfB84K9CLeb1h6mTN81J2UeT6VA_NozQGOro";
    const suportado = Boolean(window.isSecureContext && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window);
    const cliente = () => typeof supabaseClient !== "undefined" && Boolean(supabaseClient);

    async function usuarioAtual() {
        if (!cliente()) throw new Error("O serviço de autenticação não está disponível.");
        const { data: { user }, error } = await supabaseClient.auth.getUser();
        if (error || !user) throw error || new Error("Entre na sua conta para configurar notificações.");
        return user;
    }

    function converterChave(chave) {
        const base64 = (chave + "=".repeat((4 - chave.length % 4) % 4)).replace(/-/g, "+").replace(/_/g, "/");
        const binario = atob(base64);
        return Uint8Array.from(binario, caractere => caractere.charCodeAt(0));
    }

    async function salvarPreferencia(userId, ativo, visto = true) {
        const { error } = await supabaseClient.from("user_settings").upsert({
            user_id: userId,
            push_notifications_enabled: Boolean(ativo),
            push_prompt_seen: Boolean(visto),
            updated_at: new Date().toISOString()
        }, { onConflict: "user_id" });
        if (error) throw error;
    }

    async function ativar() {
        if (!suportado) throw new Error("Este navegador não oferece suporte a notificações push.");
        let permissao = Notification.permission;
        if (permissao === "default") permissao = await Notification.requestPermission();
        if (permissao !== "granted") {
            throw new Error(permissao === "denied"
                ? "As notificações foram bloqueadas pelo navegador. Libere a permissão nas configurações do navegador e tente novamente."
                : "A permissão para notificações não foi concedida.");
        }

        const user = await usuarioAtual();
        const registro = await navigator.serviceWorker.register("service-worker.js");
        let inscricao = await registro.pushManager.getSubscription();
        if (!inscricao) {
            inscricao = await registro.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: converterChave(VAPID_PUBLIC_KEY)
            });
        }

        const dados = inscricao.toJSON();
        if (!dados.endpoint || !dados.keys?.p256dh || !dados.keys?.auth) {
            throw new Error("O navegador não forneceu os dados necessários para registrar este dispositivo.");
        }

        const { error } = await supabaseClient.rpc("register_push_subscription", {
            p_endpoint: dados.endpoint,
            p_p256dh: dados.keys.p256dh,
            p_auth: dados.keys.auth
        });
        if (error) throw error;
        return true;
    }

    async function desativar() {
        const user = await usuarioAtual();
        if (suportado) {
            const registro = await navigator.serviceWorker.getRegistration("service-worker.js");
            const inscricao = registro ? await registro.pushManager.getSubscription() : null;
            if (inscricao) {
                const { error } = await supabaseClient.rpc("unregister_push_subscription", {
                    p_endpoint: inscricao.endpoint
                });
                if (error) throw error;
                await inscricao.unsubscribe();
            }
        }
        await salvarPreferencia(user.id, false, true);
        return true;
    }

    async function desvincularDispositivo() {
        if (!suportado || !cliente()) return true;
        const user = await usuarioAtual();
        const registro = await navigator.serviceWorker.getRegistration("service-worker.js");
        const inscricao = registro ? await registro.pushManager.getSubscription() : null;
        if (!inscricao) return true;
        const { error } = await supabaseClient.rpc("unregister_push_subscription", {
            p_endpoint: inscricao.endpoint
        });
        await inscricao.unsubscribe();
        if (error) console.warn("Não foi possível remover a inscrição do banco ao sair:", error);
        return true;
    }

    async function estaRegistradoParaUsuario() {
        if (!suportado || !cliente()) return false;
        const user = await usuarioAtual();
        const registro = await navigator.serviceWorker.getRegistration("service-worker.js");
        const inscricao = registro ? await registro.pushManager.getSubscription() : null;
        if (!inscricao) return false;

        const { data, error } = await supabaseClient.from("push_subscriptions")
            .select("id")
            .eq("user_id", user.id)
            .eq("endpoint", inscricao.endpoint)
            .maybeSingle();
        if (error) throw error;
        return Boolean(data);
    }

    async function marcarAviso(userId, ativo) {
        await salvarPreferencia(userId, ativo, true);
    }

    async function mostrarAvisoInicial() {
        if (!suportado || !cliente() || !location.pathname.endsWith("/inicio.html")) return;
        try {
            const user = await usuarioAtual();
            const { data, error } = await supabaseClient.from("user_settings")
                .select("push_prompt_seen")
                .eq("user_id", user.id)
                .maybeSingle();
            if (error) throw error;
            if (data?.push_prompt_seen) return;
            if (Notification.permission === "denied") {
                await marcarAviso(user.id, false);
                return;
            }

            const overlay = document.createElement("div");
            overlay.className = "ma-push-overlay";
            const dialog = document.createElement("section");
            dialog.className = "ma-push-dialog";
            dialog.setAttribute("role", "dialog");
            dialog.setAttribute("aria-modal", "true");
            dialog.setAttribute("aria-labelledby", "maPushTitulo");

            const icon = document.createElement("div");
            icon.className = "ma-push-icone";
            icon.textContent = "🔔";
            const title = document.createElement("h2");
            title.id = "maPushTitulo";
            title.textContent = "Ativar notificações";
            const description = document.createElement("p");
            description.textContent = "O Matemática Avante deseja enviar mensagens, solicitações e comunicados diretamente para a barra de notificações do seu dispositivo, mesmo quando o site estiver fechado.";
            const status = document.createElement("p");
            status.className = "ma-push-status";
            status.setAttribute("role", "status");
            status.setAttribute("aria-live", "polite");
            const actions = document.createElement("div");
            actions.className = "ma-push-acoes";

            const deny = document.createElement("button");
            deny.type = "button";
            deny.className = "ma-push-negar";
            deny.textContent = "Negar";
            const allow = document.createElement("button");
            allow.type = "button";
            allow.className = "ma-push-permitir";
            allow.textContent = "Permitir";

            deny.addEventListener("click", async () => {
                deny.disabled = allow.disabled = true;
                try {
                    await marcarAviso(user.id, false);
                    overlay.remove();
                } catch (e) {
                    status.textContent = e.message || "Não foi possível salvar sua escolha.";
                    deny.disabled = allow.disabled = false;
                }
            });

            allow.addEventListener("click", async () => {
                deny.disabled = allow.disabled = true;
                status.textContent = "Aguardando a permissão do navegador...";
                try {
                    await ativar();
                    await marcarAviso(user.id, true);
                    overlay.remove();
                } catch (e) {
                    try { await marcarAviso(user.id, false); } catch (saveError) { console.error(saveError); }
                    status.textContent = e.message || "Não foi possível ativar as notificações.";
                    const close = document.createElement("button");
                    close.type = "button";
                    close.className = "ma-push-permitir";
                    close.textContent = "Fechar";
                    close.addEventListener("click", () => overlay.remove());
                    allow.replaceWith(close);
                    deny.remove();
                }
            });

            actions.append(deny, allow);
            dialog.append(icon, title, description, status, actions);
            overlay.append(dialog);
            document.body.append(overlay);
            allow.focus();
        } catch (e) {
            console.error("Não foi possível verificar a preferência de notificações:", e);
        }
    }

    async function enviarEvento(eventType, dados) {
        if (!cliente()) return false;
        try {
            const { error } = await supabaseClient.functions.invoke("send-push-notification", {
                body: { event_type: eventType, ...dados }
            });
            if (error) throw error;
            return true;
        } catch (e) {
            console.warn("A notificação interna foi criada, mas o push não foi enviado:", e);
            return false;
        }
    }

    window.maPushNotifications = {
        suportado: () => suportado,
        ativar,
        desativar,
        desvincularDispositivo,
        estaRegistradoParaUsuario,
        enviarEvento
    };

    if (suportado) {
        navigator.serviceWorker.register("service-worker.js")
            .catch(e => console.warn("Falha ao registrar Service Worker:", e));
    }
    if (location.pathname.endsWith("/inicio.html")) setTimeout(mostrarAvisoInicial, 700);
})();