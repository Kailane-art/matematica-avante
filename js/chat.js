// =========================================
// CHAT - PESQUISA DE PERFIS E PAINEL
// =========================================

(function() {

    const botaoPainel = document.getElementById("botaoPainelChat");
    const painel = document.getElementById("painelChat");
    const fundoPainel = document.getElementById("fundoPainelChat");
    const botaoFecharPainel = document.getElementById("fecharPainelChat");

    const formularioPesquisa = document.getElementById("formPesquisaChat");
    const campoPesquisa = document.getElementById("campoPesquisaChat");
    const areaResultado = document.getElementById("areaResultadoPesquisa");
    const resultadoPesquisa = document.getElementById("resultadoPesquisaChat");
    const botaoLimparPesquisa = document.getElementById("limparPesquisaChat");

    function abrirPainel() {
        if (!painel || !fundoPainel || !botaoPainel) return;

        carregarContatosChat();
        painel.classList.add("aberto");
        fundoPainel.classList.add("aberto");
        painel.removeAttribute("inert");
        painel.setAttribute("aria-hidden", "false");
        botaoPainel.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";

        if (botaoFecharPainel) botaoFecharPainel.focus();
    }

    function fecharPainel() {
        if (!painel || !fundoPainel || !botaoPainel) return;

        painel.classList.remove("aberto");
        fundoPainel.classList.remove("aberto");
        painel.setAttribute("inert", "");
        painel.setAttribute("aria-hidden", "true");
        botaoPainel.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";

        botaoPainel.focus();
    }

    if (botaoPainel) {
        botaoPainel.addEventListener("click", function() {
            if (painel && painel.classList.contains("aberto")) {
                fecharPainel();
            } else {
                abrirPainel();
            }
        });
    }

    if (botaoFecharPainel) {
        botaoFecharPainel.addEventListener("click", fecharPainel);
    }

    if (fundoPainel) {
        fundoPainel.addEventListener("click", fecharPainel);
    }

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && painel && painel.classList.contains("aberto")) {
            fecharPainel();
        }
    });

    // Alterna entre Amigos, Solicitações e Notificações.
    const abasPainel = document.querySelectorAll("[data-secao-chat]");
    const conteudosPainel = document.querySelectorAll("[data-conteudo-chat]");

    abasPainel.forEach(function(aba) {
        aba.addEventListener("click", function() {
            const secao = aba.dataset.secaoChat;

            abasPainel.forEach(function(item) {
                const ativa = item === aba;
                item.classList.toggle("ativa", ativa);
                item.setAttribute("aria-pressed", String(ativa));
            });

            conteudosPainel.forEach(function(conteudo) {
                conteudo.hidden = conteudo.dataset.conteudoChat !== secao;
            });
        });
    });

    function mostrarStatusPesquisa(mensagem) {
        resultadoPesquisa.replaceChildren();

        const status = document.createElement("div");
        status.className = "chat-mensagem-status";
        status.textContent = mensagem;

        resultadoPesquisa.appendChild(status);
        areaResultado.hidden = false;
    }

    function limparPesquisa() {
        if (campoPesquisa) campoPesquisa.value = "";
        if (resultadoPesquisa) resultadoPesquisa.replaceChildren();
        if (areaResultado) areaResultado.hidden = true;
        if (campoPesquisa) campoPesquisa.focus();
    }

    if (botaoLimparPesquisa) {
        botaoLimparPesquisa.addEventListener("click", limparPesquisa);
    }

    function criarResultadoPerfil(perfil) {
        const card = document.createElement("article");
        card.className = "chat-resultado-card";

        const avatar = document.createElement("div");
        avatar.className = "chat-avatar";

        const icone = document.createElement("i");
        icone.setAttribute("data-lucide", "user-round");
        avatar.appendChild(icone);

        if (perfil.avatar_path && supabaseClient) {
            const imagem = supabaseClient
                .storage
                .from("avatars")
                .getPublicUrl(perfil.avatar_path);

            const foto = document.createElement("img");
            foto.src = imagem.data.publicUrl;
            foto.alt = "";
            foto.onerror = function() {
                foto.remove();
                atualizarIcones();
            };
            avatar.replaceChildren(foto);
        }

        const dados = document.createElement("div");
        dados.className = "chat-resultado-dados";

        const nome = document.createElement("strong");
        nome.textContent = perfil.display_name || "Usuário";

        const username = document.createElement("span");
        username.textContent = "@" + perfil.username;

        dados.append(nome, username);

        const link = document.createElement("a");
        link.className = "chat-link-perfil";
        link.href = "perfil-publico.html?usuario=" + encodeURIComponent(perfil.username);
        link.textContent = "Ver perfil";

        card.append(avatar, dados, link);
        resultadoPesquisa.replaceChildren(card);
        areaResultado.hidden = false;

        atualizarIcones();
    }

    if (formularioPesquisa) {
        formularioPesquisa.addEventListener("submit", async function(event) {
            event.preventDefault();

            const username = (campoPesquisa.value || "")
                .trim()
                .replace(/^@/, "")
                .toLowerCase();

            if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
                mostrarStatusPesquisa("Digite um @username válido, com 3 a 20 caracteres.");
                return;
            }

            if (!supabaseClient) {
                mostrarStatusPesquisa("Não foi possível conectar ao serviço de perfis.");
                return;
            }

            mostrarStatusPesquisa("Pesquisando perfil...");

            try {
                const { data, error } = await supabaseClient.rpc(
                    "get_public_profile",
                    { p_username: username }
                );

                if (error) throw error;

                const perfil = Array.isArray(data) ? data[0] : data;

                if (!perfil) {
                    mostrarStatusPesquisa("Nenhum perfil encontrado com esse username.");
                    return;
                }

                const { data: sessao } = await supabaseClient.auth.getUser();

                if (sessao && sessao.user && perfil.id === sessao.user.id) {
                    mostrarStatusPesquisa("Esse é o seu próprio perfil.");
                    return;
                }

                criarResultadoPerfil(perfil);

            } catch (erro) {
                console.error("Erro ao pesquisar perfil no Chat:", erro);
                mostrarStatusPesquisa("Não foi possível pesquisar agora. Tente novamente.");
            }
        });
    }


    // =========================================
    // AMIZADES E SOLICITAÇÕES
    // =========================================

    const listaAmigos = document.getElementById("listaAmigosChat");
    const listaSolicitacoes = document.getElementById("listaSolicitacoesChat");
    const badgeNotificacoes = document.getElementById("notificacoesChatBadge");

    function estadoPainel(container, icone, titulo, descricao) {
        if (!container) return;
        const estado = document.createElement("div");
        estado.className = "chat-estado-painel";
        const icon = document.createElement("i");
        icon.setAttribute("data-lucide", icone);
        const h3 = document.createElement("h3");
        h3.textContent = titulo;
        estado.append(icon, h3);
        if (descricao) {
            const p = document.createElement("p");
            p.textContent = descricao;
            estado.appendChild(p);
        }
        container.replaceChildren(estado);
    }

    function criarItemContato(contato, tipo) {
        const item = document.createElement("article");
        item.className = "chat-contato-item";

        const avatar = document.createElement("div");
        avatar.className = "chat-avatar";
        const icone = document.createElement("i");
        icone.setAttribute("data-lucide", "user-round");
        avatar.appendChild(icone);

        if (contato.avatar_path && supabaseClient) {
            const publicUrl = supabaseClient.storage.from("avatars").getPublicUrl(contato.avatar_path).data.publicUrl;
            const foto = document.createElement("img");
            foto.src = publicUrl;
            foto.alt = "";
            foto.onerror = () => {
                foto.remove();
                atualizarIcones();
            };
            avatar.replaceChildren(foto);
        }

        const dados = document.createElement("div");
        dados.className = "chat-contato-dados";
        const nome = document.createElement("strong");
        nome.textContent = contato.display_name || "Usuário";
        const username = document.createElement("span");
        username.textContent = "@" + contato.username;
        dados.append(nome, username);

        const perfil = document.createElement("a");
        perfil.className = "chat-contato-perfil";
        perfil.href = "perfil-publico.html?usuario=" + encodeURIComponent(contato.username);
        perfil.textContent = "Perfil";

        item.append(avatar, dados);

        if (tipo === "received") {
            const acoes = document.createElement("div");
            acoes.className = "chat-acoes-solicitacao";

            const aceitar = document.createElement("button");
            aceitar.type = "button";
            aceitar.className = "chat-aceitar-solicitacao";
            aceitar.textContent = "Aceitar";
            aceitar.addEventListener("click", () => responderSolicitacaoChat(contato.request_id, true));

            const recusar = document.createElement("button");
            recusar.type = "button";
            recusar.className = "chat-recusar-solicitacao";
            recusar.textContent = "Recusar";
            recusar.addEventListener("click", () => responderSolicitacaoChat(contato.request_id, false));

            acoes.append(aceitar, recusar);
            item.append(acoes, perfil);
        } else if (tipo === "sent") {
            const status = document.createElement("span");
            status.className = "chat-status-solicitacao";
            status.textContent = "Pendente";
            item.append(status, perfil);
        } else {
            item.append(perfil);
        }

        return item;
    }

    async function carregarContatosChat() {
        if (!supabaseClient) return;

        if (listaAmigos) estadoPainel(listaAmigos, "loader-circle", "Carregando amizades...");
        if (listaSolicitacoes) estadoPainel(listaSolicitacoes, "loader-circle", "Carregando solicitações...");

        try {
            const { data, error } = await supabaseClient.rpc("get_chat_contacts");
            if (error) throw error;

            const contatos = data || [];
            const amigos = contatos.filter(item => item.friendship_status === "accepted");
            const recebidas = contatos.filter(item => item.friendship_status === "pending" && item.request_direction === "received");
            const enviadas = contatos.filter(item => item.friendship_status === "pending" && item.request_direction === "sent");

            if (listaAmigos) {
                if (!amigos.length) {
                    estadoPainel(listaAmigos, "users", "Você ainda não tem amigos", "Quando alguém aceitar sua solicitação, aparecerá aqui.");
                } else {
                    listaAmigos.replaceChildren(...amigos.map(item => criarItemContato(item, "friend")));
                }
            }

            if (listaSolicitacoes) {
                if (!recebidas.length && !enviadas.length) {
                    estadoPainel(listaSolicitacoes, "user-round-plus", "Nenhuma solicitação por enquanto", "Os pedidos de amizade recebidos e enviados aparecerão aqui.");
                } else {
                    const fragmento = document.createDocumentFragment();
                    if (recebidas.length) {
                        const tituloRecebidas = document.createElement("h3");
                        tituloRecebidas.className = "chat-subtitulo-lista";
                        tituloRecebidas.textContent = "Recebidas";
                        fragmento.appendChild(tituloRecebidas);
                        recebidas.forEach(item => fragmento.appendChild(criarItemContato(item, "received")));
                    }
                    if (enviadas.length) {
                        const tituloEnviadas = document.createElement("h3");
                        tituloEnviadas.className = "chat-subtitulo-lista";
                        tituloEnviadas.textContent = "Enviadas";
                        fragmento.appendChild(tituloEnviadas);
                        enviadas.forEach(item => fragmento.appendChild(criarItemContato(item, "sent")));
                    }
                    listaSolicitacoes.replaceChildren(fragmento);
                }
            }

            if (badgeNotificacoes) {
                badgeNotificacoes.hidden = recebidas.length === 0;
                badgeNotificacoes.textContent = recebidas.length ? String(recebidas.length) : "";
            }

            atualizarIcones();
        } catch (erro) {
            console.error("Erro ao carregar amizades:", erro);
            estadoPainel(listaAmigos, "alert-circle", "Não foi possível carregar os amigos", "Tente fechar e abrir o painel novamente.");
            estadoPainel(listaSolicitacoes, "alert-circle", "Não foi possível carregar as solicitações", "Tente novamente em instantes.");
        }
    }

    async function responderSolicitacaoChat(id, aceitar) {
        try {
            const { error } = await supabaseClient.rpc("respond_friend_request", {
                p_request_id: id,
                p_accept: aceitar
            });
            if (error) throw error;
            await carregarContatosChat();
        } catch (erro) {
            console.error("Erro ao responder solicitação:", erro);
            alert(erro.message || "Não foi possível responder à solicitação.");
        }
    }


    if (window.lucide) {
        atualizarIcones();
    }

})();
