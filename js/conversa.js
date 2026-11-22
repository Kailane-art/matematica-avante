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

    function rolarParaFim() {
        lista.scrollTop = lista.scrollHeight;
    }

    function renderizarMensagem(mensagem) {
        if (!mensagem || mensagensRenderizadas.has(mensagem.id)) return;
        mensagensRenderizadas.add(mensagem.id);

        const avisoVazio = lista.querySelector(".conversa-estado");
        if (avisoVazio) avisoVazio.remove();

        const item = document.createElement("article");
        item.className = "conversa-mensagem " + (mensagem.sender_id === usuarioAtual.id ? "enviada" : "recebida");
        const texto = document.createElement("span");
        texto.textContent = mensagem.body;
        const horario = document.createElement("time");
        horario.className = "conversa-horario";
        horario.dateTime = mensagem.created_at;
        horario.textContent = formatarHorario(mensagem.created_at);
        item.append(texto, horario);
        lista.appendChild(item);
        rolarParaFim();
    }

    async function carregarMensagens() {
        const { data, error } = await supabaseClient.rpc(
            "get_conversation_messages",
            { p_contact_id: contatoId }
        );

        if (error) throw error;
        lista.replaceChildren();
        mensagensRenderizadas.clear();
        (data || []).forEach(renderizarMensagem);
        if (!data || !data.length) {
            const vazio = document.createElement("p");
            vazio.className = "conversa-estado";
            vazio.textContent = "Esta conversa ainda não tem mensagens. Envie a primeira!";
            lista.appendChild(vazio);
        }
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
                }
            })
            .subscribe(status => {
                if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
                    console.error("Não foi possível conectar as atualizações em tempo real:", status);
                }
            });

        await carregarMensagens();
        carregandoHistorico = false;
        mensagensPendentes.forEach(renderizarMensagem);
        mensagensPendentes = [];
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