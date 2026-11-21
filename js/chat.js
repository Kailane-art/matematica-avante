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

    if (window.lucide) {
        atualizarIcones();
    }

})();
