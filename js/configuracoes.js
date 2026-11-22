(function() {
    const status = document.getElementById("configStatus");
    const campos = {
        notifications: document.getElementById("configNotificacoes"),
        push: document.getElementById("configPushNotifications"),
        student: document.getElementById("configAmizadeAluno"),
        teacher: document.getElementById("configAmizadeProfessor"),
        dev: document.getElementById("configAmizadeDev"),
        online: document.getElementById("configStatusOnline"),
        language: document.getElementById("configIdioma")
    };

    const padrao = {
        theme: ["claro", "escuro", "dispositivo"].includes(localStorage.getItem("tema"))
            ? localStorage.getItem("tema")
            : "dispositivo",
        text_size: Math.min(5, Math.max(1, Number(localStorage.getItem("tamanhoTexto") || 3))),
        site_notifications_enabled: true,
        push_notifications_enabled: false,
        push_prompt_seen: false,
        allow_friend_requests_from_student: true,
        allow_friend_requests_from_teacher: true,
        allow_friend_requests_from_dev: true,
        show_online_status: true,
        language: "pt-BR"
    };

    let configuracoes = { ...padrao };
    let salvando = false;

    function mostrarStatus(mensagem, erro) {
        if (!status) return;
        status.textContent = mensagem;
        status.classList.toggle("erro", Boolean(erro));
    }

    const preferenciaDispositivo = window.matchMedia("(prefers-color-scheme: dark)");

    function aplicarTema(tema) {
        const temaEscuro = tema === "escuro" ||
            (tema === "dispositivo" && preferenciaDispositivo.matches);

        document.body.classList.toggle("modo-escuro", temaEscuro);
        localStorage.setItem("tema", tema);

        document.querySelectorAll("[data-theme-choice]").forEach(botao => {
            botao.classList.toggle("ativo", botao.dataset.themeChoice === tema);
            botao.setAttribute("aria-pressed", String(botao.dataset.themeChoice === tema));
        });
    }

    preferenciaDispositivo.addEventListener("change", function(evento) {
        if (configuracoes.theme === "dispositivo") {
            document.body.classList.toggle("modo-escuro", evento.matches);
        }
    });

    function aplicarTamanho(tamanho) {
        const valor = Math.min(5, Math.max(1, Number(tamanho) || 3));
        const escalas = { 1: "0.88", 2: "0.94", 3: "1", 4: "1.08", 5: "1.16" };
        document.documentElement.style.setProperty("--escala-texto", escalas[valor]);
        document.documentElement.dataset.tamanhoTexto = String(valor);
        localStorage.setItem("tamanhoTexto", String(valor));
        document.querySelectorAll("[data-text-size]").forEach(botao => {
            botao.classList.toggle("ativo", Number(botao.dataset.textSize) === valor);
            botao.setAttribute("aria-pressed", String(Number(botao.dataset.textSize) === valor));
        });
    }

    function preencherInterface() {
        aplicarTema(configuracoes.theme);
        aplicarTamanho(configuracoes.text_size);
        campos.notifications.checked = configuracoes.site_notifications_enabled;
        campos.push.checked = Boolean(configuracoes.push_notifications_enabled);
        campos.student.checked = configuracoes.allow_friend_requests_from_student;
        campos.teacher.checked = configuracoes.allow_friend_requests_from_teacher;
        campos.dev.checked = configuracoes.allow_friend_requests_from_dev;
        campos.online.checked = configuracoes.show_online_status;
        campos.language.value = configuracoes.language;
    }

    async function salvarAlteracoes(alteracoes) {
        if (salvando) return;
        salvando = true;
        const anterior = { ...configuracoes };
        configuracoes = { ...configuracoes, ...alteracoes };
        preencherInterface();

        try {
            const { data: { user }, error: erroUsuario } = await supabaseClient.auth.getUser();
            if (erroUsuario || !user) throw erroUsuario || new Error("Sessão não encontrada.");

            const { error } = await supabaseClient
                .from("user_settings")
                .upsert({ user_id: user.id, ...configuracoes, updated_at: new Date().toISOString() }, { onConflict: "user_id" });

            if (error) throw error;
            if (Object.prototype.hasOwnProperty.call(alteracoes, "show_online_status")) {
                localStorage.setItem(
                    "ma:showOnlineStatus:" + user.id,
                    String(configuracoes.show_online_status)
                );
                window.dispatchEvent(new CustomEvent("ma:status-online-configurado", {
                    detail: { enabled: configuracoes.show_online_status }
                }));
            }
            mostrarStatus("Configurações salvas.");
        } catch (erro) {
            console.error("Erro ao salvar configurações:", erro);
            configuracoes = anterior;
            preencherInterface();
            mostrarStatus("Não foi possível salvar. Suas alterações foram revertidas.", true);
        } finally {
            salvando = false;
        }
    }

    async function atualizarControlePush() {
        if (!campos.push) return;
        if (!window.maPushNotifications || !window.maPushNotifications.suportado()) {
            campos.push.checked = false;
            campos.push.disabled = true;
            return;
        }
        try {
            const inscrito = await window.maPushNotifications.estaRegistradoParaUsuario();
            campos.push.checked = Boolean(configuracoes.push_notifications_enabled && inscrito);
            campos.push.disabled = false;
        } catch (erro) {
            console.error("Erro ao verificar inscrição push:", erro);
            campos.push.checked = false;
        }
    }

    async function carregarConfiguracoes() {
        try {
            const { data: { user }, error: erroUsuario } = await supabaseClient.auth.getUser();
            if (erroUsuario || !user) throw erroUsuario || new Error("Sessão não encontrada.");

            const { data, error } = await supabaseClient
                .from("user_settings")
                .select("*")
                .eq("user_id", user.id)
                .maybeSingle();

            if (error) throw error;
            if (data) configuracoes = { ...padrao, ...data };
            preencherInterface();
            await atualizarControlePush();
            mostrarStatus("Suas preferências estão atualizadas.");
        } catch (erro) {
            console.error("Erro ao carregar configurações:", erro);
            preencherInterface();
            mostrarStatus("Não foi possível carregar as preferências da conta. As opções locais continuam disponíveis.", true);
        }
    }

    document.querySelectorAll("[data-theme-choice]").forEach(botao => {
        botao.addEventListener("click", () => salvarAlteracoes({ theme: botao.dataset.themeChoice }));
    });

    document.querySelectorAll("[data-text-size]").forEach(botao => {
        botao.addEventListener("click", () => salvarAlteracoes({ text_size: Number(botao.dataset.textSize) }));
    });

    campos.notifications.addEventListener("change", () => salvarAlteracoes({ site_notifications_enabled: campos.notifications.checked }));
    campos.push.addEventListener("change", async function () {
        const desejaAtivar = campos.push.checked;
        campos.push.disabled = true;
        try {
            if (desejaAtivar) {
                await window.maPushNotifications.ativar();
                mostrarStatus("Notificações no dispositivo ativadas.");
            } else {
                await window.maPushNotifications.desativar();
                mostrarStatus("Notificações no dispositivo desativadas.");
            }
            await carregarConfiguracoes();
        } catch (erro) {
            console.error("Erro ao alterar notificações push:", erro);
            await atualizarControlePush();
            mostrarStatus(erro.message || "Não foi possível alterar as notificações do dispositivo.", true);
        } finally {
            campos.push.disabled = false;
        }
    });
    campos.student.addEventListener("change", () => salvarAlteracoes({ allow_friend_requests_from_student: campos.student.checked }));
    campos.teacher.addEventListener("change", () => salvarAlteracoes({ allow_friend_requests_from_teacher: campos.teacher.checked }));
    campos.dev.addEventListener("change", () => salvarAlteracoes({ allow_friend_requests_from_dev: campos.dev.checked }));
    campos.online.addEventListener("change", () => salvarAlteracoes({ show_online_status: campos.online.checked }));
    campos.language.addEventListener("change", () => salvarAlteracoes({ language: campos.language.value }));

    document.getElementById("botaoLimparCache").addEventListener("click", async function() {
        const botao = this;
        botao.disabled = true;
        try {
            if ("caches" in window) {
                const nomes = await caches.keys();
                await Promise.all(nomes.map(nome => caches.delete(nome)));
            }
            sessionStorage.clear();
            mostrarStatus("Cache temporário limpo. Sua conta e seu progresso foram preservados.");
        } catch (erro) {
            console.error("Erro ao limpar cache:", erro);
            mostrarStatus("Não foi possível limpar todo o cache deste navegador.", true);
        } finally {
            botao.disabled = false;
        }
    });

    carregarConfiguracoes();
    if (window.lucide) lucide.createIcons();
})();