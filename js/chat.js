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

            if (secao === "solicitacoes" || secao === "amigos") {
                carregarContatosChat();
            }

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

        const elementosCard = [avatar, dados, link];
        if (tipoUsuarioAtual === "dev" || perfil.tipo_usuario === "dev") {
            const conversar = document.createElement("button");
            conversar.type = "button";
            conversar.className = "chat-botao-aviao";
            conversar.setAttribute("aria-label", "Enviar mensagem para " + (perfil.display_name || perfil.username));
            conversar.title = "Enviar mensagem";
            conversar.innerHTML = '<i data-lucide="send"></i>';
            conversar.addEventListener("click", () => abrirConversa(perfil));
            elementosCard.push(conversar);
        }

        card.append(...elementosCard);
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

                await carregarFavoritosUsuario();
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
    const listaConversas = document.getElementById("listaConversas");
    const estadoVazioConversas = document.getElementById("estadoVazioConversas");
    let canalListaMensagens = null;
    let amigosDaLista = [];
    let usuarioAtualId = null;
    let tipoUsuarioAtual = null;
    let recarregandoConversas = false;
    let recargaPendente = false;
    const itensPorConversa = new Map();
    let perfisFavoritos = new Set();

    async function carregarFavoritosUsuario() {
        try {
            const { data: sessao, error: erroSessao } = await supabaseClient.auth.getUser();
            if (erroSessao) throw erroSessao;

            usuarioAtualId = sessao?.user?.id || null;
            if (!usuarioAtualId) {
                perfisFavoritos = new Set();
                return;
            }

            const { data: perfilAtual, error: erroPerfilAtual } = await supabaseClient
                .from("profiles")
                .select("tipo_usuario")
                .eq("id", usuarioAtualId)
                .maybeSingle();
            if (erroPerfilAtual) throw erroPerfilAtual;
            tipoUsuarioAtual = perfilAtual?.tipo_usuario || null;

            const { data, error } = await supabaseClient
                .from("profile_favorites")
                .select("profile_id")
                .eq("user_id", usuarioAtualId);

            if (error) throw error;
            perfisFavoritos = new Set((data || []).map(item => item.profile_id));
        } catch (erro) {
            console.error("Erro ao carregar perfis favoritos:", erro);
            perfisFavoritos = new Set();
        }
    }

    function adicionarEstrelaFavorito(nome, perfilId) {
        if (!perfisFavoritos.has(perfilId)) return;

        const estrela = document.createElement("span");
        estrela.className = "chat-favorito-estrela";
        estrela.textContent = "★";
        estrela.setAttribute("aria-label", "Perfil favorito");
        estrela.title = "Perfil favorito";
        nome.appendChild(estrela);
    }

    function abrirConversa(contato) {
        window.location.href = "conversa.html?usuario=" + encodeURIComponent(contato.username);
    }

    function criarItemConversa(contato, previa, naoLida, conversaId) {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "chat-conversa-item";
        item.dataset.conversationId = conversaId;
        item.addEventListener("click", () => abrirConversa(contato));

        const avatar = document.createElement("div");
        avatar.className = "chat-avatar";
        const icone = document.createElement("i");
        icone.setAttribute("data-lucide", "user-round");
        avatar.appendChild(icone);

        if (contato.avatar_path && supabaseClient) {
            const url = supabaseClient.storage.from("avatars").getPublicUrl(contato.avatar_path).data.publicUrl;
            const foto = document.createElement("img");
            foto.src = url;
            foto.alt = "";
            avatar.replaceChildren(foto);
        }

        const dados = document.createElement("span");
        dados.className = "chat-conversa-dados";
        const nome = document.createElement("strong");
        nome.textContent = contato.display_name || "Usuário";
        adicionarEstrelaFavorito(nome, contato.contact_id);
        const username = document.createElement("small");
        username.textContent = "@" + contato.username;
        const ultimaMensagem = document.createElement("small");
        ultimaMensagem.className = "chat-conversa-previa";
        ultimaMensagem.textContent = previa || "Conversa iniciada";
        dados.append(nome, username, ultimaMensagem);

        const indicador = criarIndicadorConversa(naoLida);
        item.append(avatar, dados, indicador);
        return item;
    }

    function criarIndicadorConversa(naoLida) {
        if (naoLida) {
            const bolinha = document.createElement("span");
            bolinha.className = "chat-conversa-nao-lida";
            bolinha.setAttribute("aria-label", "Mensagem não lida");
            bolinha.title = "Nova mensagem";
            return bolinha;
        }

        const aviao = document.createElement("i");
        aviao.setAttribute("data-lucide", "send");
        aviao.className = "chat-conversa-aviao";
        return aviao;
    }

    async function iniciarAtualizacoesEmTempoReal(usuarioId) {
        if (canalListaMensagens || !usuarioId) return;

        await supabaseClient.realtime.setAuth();
        canalListaMensagens = supabaseClient
            .channel("user:" + usuarioId + ":chat", { config: { private: true } })
            .on("broadcast", {
                event: "message_deleted"
            }, () => {
                atualizarListaConversas(amigosDaLista);
            })
            .on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "messages"
            }, payload => {
                const mensagem = payload.new;
                const conversa = itensPorConversa.get(mensagem.conversation_id);

                if (!conversa) {
                    // Se o amigo iniciou uma conversa, já temos o contato pelo remetente.
                    const contatoRemetente = amigosDaLista.find(
                        item => item.contact_id === mensagem.sender_id
                    );

                    if (contatoRemetente && mensagem.sender_id !== usuarioAtualId) {
                        const elemento = criarItemConversa(
                            contatoRemetente,
                            mensagem.body,
                            true,
                            mensagem.conversation_id
                        );

                        itensPorConversa.set(mensagem.conversation_id, {
                            contato: contatoRemetente,
                            element: elemento,
                            previa: mensagem.body,
                            naoLida: true
                        });

                        listaConversas.prepend(elemento);
                        listaConversas.hidden = false;
                        estadoVazioConversas.hidden = true;
                        atualizarIcones();
                    } else {
                        // Para uma mensagem enviada pelo próprio usuário em uma conversa nova,
                        // consulta o banco para descobrir qual contato deve ser exibido.
                        atualizarListaConversas(amigosDaLista);
                    }
                    return;
                }

                conversa.previa = mensagem.body;
                if (mensagem.sender_id !== usuarioAtualId) {
                    conversa.naoLida = true;
                }

                const previa = conversa.element.querySelector(".chat-conversa-previa");
                if (previa) previa.textContent = mensagem.body;

                const indicadorAtual = conversa.element.lastElementChild;
                const novoIndicador = criarIndicadorConversa(conversa.naoLida);
                if (indicadorAtual) {
                    indicadorAtual.replaceWith(novoIndicador);
                } else {
                    conversa.element.appendChild(novoIndicador);
                }

                // Atualiza e move a conversa para o topo sem esperar outra consulta ao banco.
                listaConversas.prepend(conversa.element);
                if (!conversa.naoLida) atualizarIcones();
            })
            .on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "messages"
            }, payload => {
                if (payload.new.deleted_at) {
                    atualizarListaConversas(amigosDaLista);
                }
            })
            .on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "message_hidden",
                filter: "user_id=eq." + usuarioId
            }, () => {
                atualizarListaConversas(amigosDaLista);
            })
            .subscribe(status => {
                if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
                    console.error("Não foi possível atualizar a lista de conversas em tempo real:", status);
                }
            });
    }

    async function atualizarListaConversas(amigos) {
        if (!listaConversas || !estadoVazioConversas) return;
        amigosDaLista = amigos;

        if (recarregandoConversas) {
            recargaPendente = true;
            return;
        }

        recarregandoConversas = true;
        try {
            if (!usuarioAtualId) {
                const { data: sessao, error: erroSessao } = await supabaseClient.auth.getUser();
                if (erroSessao) throw erroSessao;
                usuarioAtualId = sessao?.user?.id;
            }
            if (!usuarioAtualId) throw new Error("Sessão não encontrada.");

            await iniciarAtualizacoesEmTempoReal(usuarioAtualId);

            const { data: conversas, error: erroConversas } = await supabaseClient.rpc("get_chat_conversations");
            if (erroConversas) throw erroConversas;

            const contatosComMensagem = (conversas || [])
                .map(conversa => {
                    const contato = amigos.find(item => item.contact_id === conversa.contact_id) || {
                        contact_id: conversa.contact_id,
                        display_name: conversa.display_name,
                        username: conversa.username,
                        avatar_path: conversa.avatar_path,
                        tipo_usuario: conversa.tipo_usuario
                    };
                    return contato.username ? {
                        conversaId: conversa.conversation_id,
                        contato,
                        previa: conversa.last_message,
                        naoLida: Boolean(conversa.has_unread)
                    } : null;
                })
                .filter(Boolean);

            itensPorConversa.clear();

            if (!contatosComMensagem.length) {
                listaConversas.replaceChildren();
                listaConversas.hidden = true;
                estadoVazioConversas.hidden = false;
                return;
            }

            const elementos = contatosComMensagem.map(item => {
                const elemento = criarItemConversa(
                    item.contato,
                    item.previa,
                    item.naoLida,
                    item.conversaId
                );
                itensPorConversa.set(item.conversaId, {
                    contato: item.contato,
                    element: elemento,
                    previa: item.previa,
                    naoLida: item.naoLida
                });
                return elemento;
            });

            listaConversas.replaceChildren(...elementos);
            listaConversas.hidden = false;
            estadoVazioConversas.hidden = true;
            atualizarIcones();
        } catch (erro) {
            console.error("Erro ao carregar lista de conversas:", erro);
            listaConversas.hidden = true;
            estadoVazioConversas.hidden = false;
        } finally {
            recarregandoConversas = false;
            if (recargaPendente) {
                recargaPendente = false;
                atualizarListaConversas(amigosDaLista);
            }
        }
    }

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
        if (tipo === "friend") adicionarEstrelaFavorito(nome, contato.contact_id);
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
            aceitar.setAttribute("aria-label", "Aceitar solicitação de amizade");
            aceitar.title = "Aceitar";
            aceitar.innerHTML = '<i data-lucide="check"></i>';
            aceitar.addEventListener("click", () => responderSolicitacaoChat(contato.request_id, true));

            const recusar = document.createElement("button");
            recusar.type = "button";
            recusar.className = "chat-recusar-solicitacao";
            recusar.setAttribute("aria-label", "Recusar solicitação de amizade");
            recusar.title = "Recusar";
            recusar.innerHTML = '<i data-lucide="x"></i>';
            recusar.addEventListener("click", () => responderSolicitacaoChat(contato.request_id, false));

            acoes.append(aceitar, recusar);
            item.append(perfil, acoes);
        } else if (tipo === "sent") {
            const status = document.createElement("span");
            status.className = "chat-status-solicitacao";
            status.textContent = "Pendente";
            item.append(status, perfil);
        } else {
            const conversar = document.createElement("button");
            conversar.type = "button";
            conversar.className = "chat-botao-aviao";
            conversar.setAttribute("aria-label", "Conversar com " + (contato.display_name || contato.username));
            conversar.title = "Enviar mensagem";
            conversar.innerHTML = '<i data-lucide="send"></i>';
            conversar.addEventListener("click", () => abrirConversa(contato));
            item.append(perfil, conversar);
        }

        return item;
    }

    async function carregarContatosChat() {
        if (!supabaseClient) return;

        if (listaAmigos) estadoPainel(listaAmigos, "loader-circle", "Carregando amizades...");
        if (listaSolicitacoes) estadoPainel(listaSolicitacoes, "loader-circle", "Carregando solicitações...");

        try {
            await carregarFavoritosUsuario();

            const { data, error } = await supabaseClient.rpc("get_chat_contacts");
            if (error) throw error;

            const contatos = data || [];
            const amigos = contatos.filter(item => item.friendship_status === "accepted" || item.friendship_status === "dev_contact");
            await atualizarListaConversas(amigos);
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

            if (recebidas.length) {
                abasPainel.forEach(function(aba) {
                    const ativa = aba.dataset.secaoChat === "solicitacoes";
                    aba.classList.toggle("ativa", ativa);
                    aba.setAttribute("aria-pressed", String(ativa));
                });
                conteudosPainel.forEach(function(conteudo) {
                    conteudo.hidden = conteudo.dataset.conteudoChat !== "solicitacoes";
                });
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

    carregarContatosChat();

})();
