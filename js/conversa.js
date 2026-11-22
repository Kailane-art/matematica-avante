(function () {
    const parametros = new URLSearchParams(window.location.search);
    const username = (parametros.get("usuario") || "").trim().replace(/^@/, "").toLowerCase();
    const avatarContato = document.getElementById("avatarContato");
    const nomeContato = document.getElementById("nomeContato");
    const usernameContato = document.getElementById("usernameContato");
    const estado = document.getElementById("estadoConversa");
    const lista = document.getElementById("listaMensagens");
    const formulario = document.getElementById("formMensagem");
    const campo = document.getElementById("campoMensagem");
    const botaoEnviar = document.getElementById("enviarMensagem");
    let usuarioAtual = null;
    let conversaId = null;
    let contatoId = null;
    let canalMensagens = null;
    const mensagensRenderizadas = new Set();
    const mensagensOcultasPendentes = new Set();
    let carregandoHistorico = false;
    let mensagensPendentes = [];

    function mostrarEstado(texto, erro) {
        estado.textContent = texto;
        estado.classList.toggle("erro", Boolean(erro));
        estado.hidden = false;
        lista.hidden = true;
        formulario.hidden = true;
    }

    function formatarHorario(data) {
        return new Date(data).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    }

    function ajustarBarraAoTeclado() {
        const viewport = window.visualViewport;
        if (!viewport) return;

        const alturaLayout = window.innerHeight;
        const alturaVisivel = viewport.height + viewport.offsetTop;
        const alturaTeclado = Math.max(0, alturaLayout - alturaVisivel);

        document.documentElement.style.setProperty(
            "--teclado-inset",
            alturaTeclado + "px"
        );
    }

    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", ajustarBarraAoTeclado);
        window.visualViewport.addEventListener("scroll", ajustarBarraAoTeclado);
        ajustarBarraAoTeclado();
    } else {
        window.addEventListener("resize", ajustarBarraAoTeclado);
    }

    function rolarParaFim() {
        lista.scrollTop = lista.scrollHeight;
    }

    const mensagensPorId = new Map();
    let ultimoVistoEm = null;
    let intervaloRecibo = null;

    function formatarTempoVisto(data) {
        const minutos = Math.max(0, Math.floor((Date.now() - new Date(data).getTime()) / 60000));
        if (minutos < 60) return "Visto";
        const horas = Math.floor(minutos / 60);
        const minutosRestantes = minutos % 60;
        return minutosRestantes === 0
            ? "Visto há " + horas + "h"
            : "Visto há " + horas + ":" + String(minutosRestantes).padStart(2, "0");
    }

    function atualizarIndicadorVisto() {
        lista.querySelectorAll(".conversa-recibo").forEach(elemento => elemento.remove());
        if (!ultimoVistoEm || !usuarioAtual) return;

        const instanteLeitura = new Date(ultimoVistoEm).getTime();
        const ultimaMensagemVista = Array.from(mensagensPorId.values())
            .filter(mensagem =>
                mensagem.sender_id === usuarioAtual.id &&
                new Date(mensagem.created_at).getTime() <= instanteLeitura
            )
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

        if (!ultimaMensagemVista) return;
        const item = lista.querySelector('[data-message-id="' + ultimaMensagemVista.id + '"]');
        if (!item) return;

        const recibo = document.createElement("small");
        recibo.className = "conversa-recibo";
        recibo.textContent = formatarTempoVisto(ultimoVistoEm);
        recibo.title = "Visto em " + new Date(ultimoVistoEm).toLocaleString("pt-BR");
        item.appendChild(recibo);
    }

    function atualizarEstadoVazio() {
        const existeMensagem = Boolean(lista.querySelector(".conversa-mensagem"));
        const aviso = lista.querySelector(".conversa-estado");
        if (existeMensagem && aviso) aviso.remove();
        if (!existeMensagem && !aviso) {
            const vazio = document.createElement("p");
            vazio.className = "conversa-estado";
            vazio.textContent = "Esta conversa ainda não tem mensagens. Envie a primeira!";
            lista.appendChild(vazio);
        }
    }

    function removerMensagemDaTela(id) {
        mensagensOcultasPendentes.add(id);
        const item = lista.querySelector('[data-message-id="' + id + '"]');
        if (item) item.remove();
        mensagensRenderizadas.delete(id);
        mensagensPorId.delete(id);
        atualizarEstadoVazio();
        atualizarIndicadorVisto();
    }

    async function executarAcaoMensagem(mensagem, item, acao) {
        const botoes = item.querySelectorAll("button");
        botoes.forEach(botao => botao.disabled = true);

        const nomeRpc = acao === "todos"
            ? "delete_chat_message_for_everyone"
            : "hide_chat_message";
        const { error } = await supabaseClient.rpc(nomeRpc, {
            p_message_id: mensagem.id
        });

        if (error) {
            console.error("Erro ao apagar mensagem:", error);
            botoes.forEach(botao => botao.disabled = false);
            window.alert(
                acao === "todos"
                    ? "Não foi possível apagar a mensagem para todos."
                    : "Não foi possível ocultar a mensagem."
            );
            return;
        }

        removerMensagemDaTela(mensagem.id);
    }

    function renderizarMensagem(mensagem) {
        if (!mensagem || mensagensRenderizadas.has(mensagem.id) || mensagensOcultasPendentes.has(mensagem.id)) return;
        mensagensRenderizadas.add(mensagem.id);
        mensagensPorId.set(mensagem.id, mensagem);

        const avisoVazio = lista.querySelector(".conversa-estado");
        if (avisoVazio) avisoVazio.remove();

        const item = document.createElement("article");
        item.className = "conversa-mensagem " + (mensagem.sender_id === usuarioAtual.id ? "enviada" : "recebida");
        item.dataset.messageId = mensagem.id;

        const texto = document.createElement("span");
        texto.className = "conversa-texto";
        texto.textContent = mensagem.body;

        const horario = document.createElement("time");
        horario.className = "conversa-horario";
        horario.dateTime = mensagem.created_at;
        horario.textContent = formatarHorario(mensagem.created_at);

        const botaoAcoes = document.createElement("button");
        botaoAcoes.type = "button";
        botaoAcoes.className = "conversa-acoes-botao";
        botaoAcoes.setAttribute("aria-label", "Opções da mensagem");
        botaoAcoes.textContent = "⋯";

        const menu = document.createElement("div");
        menu.className = "conversa-menu-mensagem";
        menu.hidden = true;

        botaoAcoes.addEventListener("click", function(event) {
            event.stopPropagation();
            const abrir = menu.hidden;
            lista.querySelectorAll(".conversa-menu-mensagem").forEach(outro => outro.hidden = true);
            menu.hidden = !abrir;
        });

        function adicionarAcao(rotulo, acao, perigosa) {
            const botao = document.createElement("button");
            botao.type = "button";
            botao.textContent = rotulo;
            if (perigosa) botao.classList.add("perigosa");
            botao.addEventListener("click", function(event) {
                event.stopPropagation();
                menu.hidden = true;
                if (acao === "todos" && !window.confirm("Apagar esta mensagem para você e para o outro usuário?")) return;
                executarAcaoMensagem(mensagem, item, acao);
            });
            menu.appendChild(botao);
        }

        if (mensagem.sender_id === usuarioAtual.id) {
            adicionarAcao("Apagar para todos", "todos", true);
        }
        adicionarAcao("Apagar para mim", "mim", false);

        item.append(texto, horario, botaoAcoes, menu);
        lista.appendChild(item);
        atualizarIndicadorVisto();
        rolarParaFim();
    }
    async function marcarConversaComoLida() {
        if (!contatoId) return;
        const { error } = await supabaseClient.rpc("mark_conversation_read", {
            p_contact_id: contatoId
        });
        if (error) {
            console.error("Não foi possível marcar as mensagens como lidas:", error);
        }
    }

    async function carregarUltimaLeituraContato() {
        const { data, error } = await supabaseClient
            .from("conversation_reads")
            .select("last_read_at")
            .eq("conversation_id", conversaId)
            .eq("user_id", contatoId)
            .maybeSingle();

        if (error) {
            console.error("Não foi possível carregar a confirmação de leitura:", error);
            return;
        }

        ultimoVistoEm = data ? data.last_read_at : null;
        atualizarIndicadorVisto();
    }

    async function carregarMensagens() {
        const { data, error } = await supabaseClient.rpc(
            "get_conversation_messages",
            { p_contact_id: contatoId }
        );

        if (error) throw error;
        lista.replaceChildren();
        mensagensRenderizadas.clear();
        mensagensPorId.clear();
        (data || []).forEach(renderizarMensagem);
        atualizarEstadoVazio();
        estado.hidden = true;
        lista.hidden = false;
        formulario.hidden = false;
        rolarParaFim();
    }

    async function iniciarConversa() {
        if (!/^[a-z0-9_]{3,20}$/.test(username)) {
            mostrarEstado("O endereço desta conversa é inválido.", true);
            return;
        }

        const { data: sessao, error: erroSessao } = await supabaseClient.auth.getUser();
        if (erroSessao || !sessao.user) throw new Error("Sua sessão expirou. Entre novamente.");

        usuarioAtual = sessao.user;

        const [{ data: perfilData, error: perfilErro }, { data: contatos, error: contatosErro }] = await Promise.all([
            supabaseClient.rpc("get_public_profile", { p_username: username }),
            supabaseClient.rpc("get_chat_contacts")
        ]);

        if (perfilErro) throw perfilErro;
        if (contatosErro) throw contatosErro;

        const perfil = Array.isArray(perfilData) ? perfilData[0] : perfilData;
        if (!perfil || perfil.id === usuarioAtual.id) throw new Error("Perfil não encontrado.");

        const amizade = (contatos || []).find(item => item.contact_id === perfil.id && item.friendship_status === "accepted");
        if (!amizade) throw new Error("Só é possível conversar com pessoas que são suas amigas.");

        contatoId = perfil.id;
        const { data: idConversa, error: conversaErro } = await supabaseClient.rpc(
            "get_friend_conversation_id",
            { p_contact_id: contatoId }
        );

        if (conversaErro) throw conversaErro;
        if (!idConversa) throw new Error("A conversa não está disponível. Verifique se a amizade continua ativa.");

        conversaId = idConversa;
        nomeContato.textContent = perfil.display_name || "Usuário";
        usernameContato.textContent = "@" + perfil.username;

        if (perfil.avatar_path) {
            const fotoUrl = supabaseClient.storage.from("avatars").getPublicUrl(perfil.avatar_path).data.publicUrl;
            const foto = document.createElement("img");
            foto.src = fotoUrl;
            foto.alt = "";
            avatarContato.replaceChildren(foto);
        }

        carregandoHistorico = true;
        mensagensPendentes = [];

        canalMensagens = supabaseClient
            .channel("conversa-" + conversaId)
            .on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "messages",
                filter: "conversation_id=eq." + conversaId
            }, payload => {
                if (carregandoHistorico) {
                    mensagensPendentes.push(payload.new);
                } else {
                    renderizarMensagem(payload.new);
                    if (payload.new.sender_id !== usuarioAtual.id) {
                        marcarConversaComoLida();
                    }
                }
            })
            .on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "messages",
                filter: "conversation_id=eq." + conversaId
            }, payload => {
                if (payload.new.deleted_at) {
                    removerMensagemDaTela(payload.new.id);
                }
            })
            .on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "message_hidden",
                filter: "user_id=eq." + usuarioAtual.id
            }, payload => {
                removerMensagemDaTela(payload.new.message_id);
            })
            .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "conversation_reads",
                filter: "conversation_id=eq." + conversaId
            }, payload => {
                const registro = payload.new || payload.old;
                if (registro && registro.user_id === contatoId && payload.eventType !== "DELETE") {
                    ultimoVistoEm = registro.last_read_at;
                    atualizarIndicadorVisto();
                }
            })
            .subscribe(status => {
                if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
                    console.error("Não foi possível conectar as atualizações em tempo real:", status);
                }
            });

        await carregarMensagens();
        await marcarConversaComoLida();
        await carregarUltimaLeituraContato();
        intervaloRecibo = window.setInterval(atualizarIndicadorVisto, 60000);
        carregandoHistorico = false;
        const recebeuDuranteCarregamento = mensagensPendentes.some(
            mensagem => mensagem.sender_id !== usuarioAtual.id
        );
        mensagensPendentes.forEach(renderizarMensagem);
        mensagensPendentes = [];
        if (recebeuDuranteCarregamento) {
            await marcarConversaComoLida();
        }
    }

    formulario.addEventListener("submit", async function (event) {
        event.preventDefault();
        const body = campo.value.trim();
        if (!body || !conversaId || !usuarioAtual || botaoEnviar.disabled) return;

        botaoEnviar.disabled = true;
        const { error } = await supabaseClient.rpc("send_chat_message", {
            p_contact_id: contatoId,
            p_body: body
        });

        botaoEnviar.disabled = false;
        if (error) {
            console.error("Erro ao enviar mensagem:", error);
            mostrarEstado(
                error.code === "42501"
                    ? "O envio foi bloqueado porque vocês não têm mais uma amizade ativa."
                    : "Não foi possível enviar a mensagem. Tente novamente.",
                true
            );
            return;
        }

        campo.value = "";
        campo.focus();
    });

    window.addEventListener("beforeunload", function () {
        if (canalMensagens && supabaseClient) supabaseClient.removeChannel(canalMensagens);
        if (intervaloRecibo) window.clearInterval(intervaloRecibo);
    });

    if (!supabaseClient) {
        mostrarEstado("Não foi possível conectar ao serviço de mensagens.", true);
        return;
    }

    iniciarConversa().catch(function (erro) {
        console.error("Erro ao abrir conversa:", erro);
        mostrarEstado(erro.message || "Não foi possível abrir esta conversa.", true);
    });

    if (window.lucide) atualizarIcones();
})();