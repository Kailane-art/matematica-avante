(function () {
    "use strict";

    const $ = id => document.getElementById(id);
    const form = $("formCriarDesafio");
    const selectAmigo = $("amigoDesafio");
    const selectConteudo = $("conteudoDesafio");
    const estadoCriacao = $("estadoCriarDesafio");
    const recebidos = $("listaConvitesRecebidos");
    const enviados = $("listaConvitesEnviados");
    const ativas = $("listaPartidasAtivas");
    const painelPartida = $("painelPartida");
    const areaQuestao = $("areaQuestao");
    const estadoPartida = $("estadoPartida");
    const resultadoPartida = $("resultadoPartida");

    const NOMES_CONTEUDO = {
        operacoes: "Operações básicas",
        fracoes: "Frações",
        porcentagem: "Porcentagem",
        equacoes: "Equações",
        geometria: "Geometria plana"
    };

    let usuarioAtual = null;
    let desafioAtualId = null;
    let estadoAtual = null;
    let intervaloAtualizacao = null;
    let intervaloRelogio = null;
    let enviandoResposta = false;
    let segundosDecorridos = 0;

    function elemento(tag, classe, texto) {
        const el = document.createElement(tag);
        if (classe) el.className = classe;
        if (texto !== undefined) el.textContent = texto;
        return el;
    }

    function formatarTempo(ms) {
        const total = Math.max(0, Math.floor(Number(ms || 0) / 1000));
        return String(Math.floor(total / 60)).padStart(2, "0") + ":" +
            String(total % 60).padStart(2, "0");
    }

    function mostrarMensagem(alvo, texto, erro) {
        alvo.textContent = texto || "";
        alvo.classList.toggle("erro", Boolean(erro));
    }

    function rpc(nome, parametros) {
        if (!window.supabaseClient && typeof supabaseClient === "undefined") {
            throw new Error("O serviço de conexão não está disponível.");
        }
        return supabaseClient.rpc(nome, parametros || {});
    }

    async function carregarAmigos() {
        const { data, error } = await rpc("get_chat_contacts");
        if (error) throw error;

        const amigos = (data || []).filter(item =>
            item.friendship_status === "accepted" &&
            item.tipo_usuario === "aluno" &&
            item.contact_id !== usuarioAtual.id
        );

        selectAmigo.replaceChildren();
        const inicial = elemento("option", "", amigos.length ? "Selecione um amigo" : "Você ainda não tem amigos disponíveis");
        inicial.value = "";
        selectAmigo.appendChild(inicial);

        amigos.forEach(amigo => {
            const option = elemento("option", "", (amigo.display_name || "Estudante") + " · @" + amigo.username);
            option.value = amigo.contact_id;
            selectAmigo.appendChild(option);
        });
        selectAmigo.disabled = amigos.length === 0;
        $("botaoEnviarConvite").disabled = amigos.length === 0;
    }

    function criarAcao(rotulo, classe, callback) {
        const botao = elemento("button", "desafio-acao " + (classe || ""), rotulo);
        botao.type = "button";
        botao.addEventListener("click", callback);
        return botao;
    }

    function criarConviteCard(item, tipo) {
        const card = elemento("article", "desafio-convite");
        const info = elemento("div", "desafio-convite-info");
        const nome = tipo === "recebido" ? item.challenger_name : item.opponent_name;
        const detalhe = NOMES_CONTEUDO[item.topic] || item.topic;
        info.append(
            elemento("span", "desafio-convite-nome",
                tipo === "recebido" ? (nome || "Um amigo") + " desafiou você" :
                    tipo === "enviado" ? "Convite enviado para " + (nome || "amigo") :
                    "Partida contra " + (nome || "amigo")),
            elemento("span", "desafio-convite-detalhe",
                detalhe + " · " + (tipo === "ativa" ? "Partida em andamento" : "Convite válido por 10 minutos"))
        );
        const acoes = elemento("div", "desafio-convite-acoes");

        if (tipo === "recebido") {
            acoes.append(
                criarAcao("Aceitar", "", () => responderConvite(item.id, true)),
                criarAcao("Recusar", "desafio-acao-secundaria", () => responderConvite(item.id, false))
            );
        } else if (tipo === "ativa") {
            acoes.append(criarAcao("Abrir partida", "", () => abrirPartida(item.id)));
        } else {
            acoes.append(elemento("span", "desafio-convite-detalhe", "Aguardando resposta"));
        }
        card.append(info, acoes);
        return card;
    }

    async function carregarConvites() {
        const { data, error } = await rpc("get_friend_challenge_invitations");
        if (error) throw error;

        const lista = data || [];
        const recebidosAtuais = lista.filter(item => item.status === "pending" && item.opponent_id === usuarioAtual.id);
        const enviadosAtuais = lista.filter(item => item.status === "pending" && item.challenger_id === usuarioAtual.id);
        const partidasAtuais = lista.filter(item => item.status === "in_progress");

        recebidos.replaceChildren();
        enviados.replaceChildren();
        ativas.replaceChildren();

        if (!recebidosAtuais.length) recebidos.appendChild(elemento("p", "desafio-estado-vazio", "Nenhum convite recebido no momento."));
        recebidosAtuais.forEach(item => recebidos.appendChild(criarConviteCard(item, "recebido")));
        enviadosAtuais.forEach(item => enviados.appendChild(criarConviteCard(item, "enviado")));
        partidasAtuais.forEach(item => ativas.appendChild(criarConviteCard(item, "ativa")));
    }

    async function atualizarPainel() {
        try {
            await carregarConvites();
        } catch (error) {
            console.error("Erro ao atualizar convites:", error);
            if (!recebidos.children.length) {
                recebidos.appendChild(elemento("p", "desafio-estado-vazio", "Não foi possível carregar os convites."));
            }
        }
    }

    async function responderConvite(id, aceitar) {
        const botoes = recebidos.querySelectorAll("button");
        botoes.forEach(botao => botao.disabled = true);
        try {
            const { data, error } = await rpc("respond_friend_challenge", {
                p_challenge_id: id,
                p_accept: aceitar
            });
            if (error) throw error;
            await atualizarPainel();
            if (aceitar) await abrirPartida(id);
            else mostrarMensagem(estadoCriacao, "Convite recusado.", false);
        } catch (error) {
            console.error("Erro ao responder convite:", error);
            mostrarMensagem(estadoCriacao, error.message || "Não foi possível responder ao convite.", true);
            await atualizarPainel();
        }
    }

    async function criarDesafio(event) {
        event.preventDefault();
        const amigoId = selectAmigo.value;
        const conteudo = selectConteudo.value;
        if (!amigoId || !NOMES_CONTEUDO[conteudo]) return;

        const botao = $("botaoEnviarConvite");
        botao.disabled = true;
        mostrarMensagem(estadoCriacao, "Enviando convite...", false);
        try {
            const { data, error } = await rpc("create_friend_challenge", {
                p_opponent_id: amigoId,
                p_topic: conteudo
            });
            if (error) throw error;
            mostrarMensagem(estadoCriacao, "Convite enviado. Seu amigo terá 10 minutos para responder.", false);
            form.reset();
            await atualizarPainel();
        } catch (error) {
            console.error("Erro ao criar desafio:", error);
            mostrarMensagem(estadoCriacao, error.message || "Não foi possível enviar o convite.", true);
        } finally {
            botao.disabled = selectAmigo.disabled;
        }
    }

    function iniciarRelogio(startedAt) {
        if (intervaloRelogio) window.clearInterval(intervaloRelogio);
        const inicio = new Date(startedAt).getTime();
        const atualizar = () => {
            const ms = Math.max(0, Date.now() - inicio);
            $("tempoPartida").textContent = formatarTempo(ms);
        };
        atualizar();
        intervaloRelogio = window.setInterval(atualizar, 1000);
    }

    function renderizarQuestao(dados) {
        areaQuestao.replaceChildren();
        const questoes = dados.questions || [];
        const respostas = dados.my_answers || [];
        const respondidas = Number(dados.my_answered_count || 0);

        $("progressoTexto").textContent = respondidas >= 10 ? "10 de 10 questões respondidas" : "Questão " + (respondidas + 1) + " de 10";
        $("placarPartida").textContent = Number(dados.my_correct_count || 0) + " × " + Number(dados.opponent_correct_count || 0);
        $("progressoBarra").style.width = Math.min(100, respondidas * 10) + "%";

        if (respondidas >= 10) {
            areaQuestao.appendChild(elemento("div", "desafio-estado-vazio",
                dados.opponent_finished
                    ? "Os dois participantes concluíram. Resultado atualizado abaixo."
                    : "Você concluiu suas questões. Aguardando seu adversário terminar."));
            return;
        }

        const questao = questoes[respondidas];
        if (!questao) {
            areaQuestao.appendChild(elemento("div", "desafio-estado-vazio", "Carregando a próxima questão..."));
            return;
        }

        const card = elemento("div", "desafio-questao");
        const topo = elemento("div", "desafio-questao-topo");
        topo.append(
            elemento("span", "", "QUESTÃO " + (respondidas + 1) + " / 10"),
            elemento("span", "", questao.difficulty === "easy" ? "FÁCIL" : "MÉDIA")
        );
        card.append(topo, elemento("h3", "", questao.prompt));
        const opcoes = elemento("div", "desafio-opcoes");

        (questao.options || []).forEach((opcao, indice) => {
            const botao = elemento("button", "desafio-opcao", String.fromCharCode(65 + indice) + ") " + opcao);
            botao.type = "button";
            botao.disabled = enviandoResposta;
            botao.addEventListener("click", () => enviarResposta(questao.id, indice, botao));
            opcoes.appendChild(botao);
        });
        card.appendChild(opcoes);
        areaQuestao.appendChild(card);
    }

    async function enviarResposta(questionId, indice, botaoEscolhido) {
        if (enviandoResposta || !desafioAtualId) return;
        enviandoResposta = true;
        areaQuestao.querySelectorAll("button").forEach(botao => botao.disabled = true);
        try {
            const { data, error } = await rpc("submit_friend_challenge_answer", {
                p_challenge_id: desafioAtualId,
                p_question_id: questionId,
                p_selected_option: indice
            });
            if (error) throw error;

            const botoes = areaQuestao.querySelectorAll(".desafio-opcao");
            if (botoes[data.correct_option] ) botoes[data.correct_option].classList.add("desafio-opcao-correta");
            if (!data.is_correct && botaoEscolhido) botaoEscolhido.classList.add("desafio-opcao-incorreta");

            const feedback = elemento("p", "desafio-feedback",
                data.is_correct ? "Resposta correta." : "Resposta incorreta.");
            const card = areaQuestao.querySelector(".desafio-questao");
            if (card) card.appendChild(feedback);

            window.setTimeout(async () => {
                enviandoResposta = false;
                await atualizarEstadoPartida();
            }, 850);
        } catch (error) {
            enviandoResposta = false;
            console.error("Erro ao enviar resposta:", error);
            mostrarMensagem(estadoPartida, error.message || "Não foi possível registrar sua resposta.", true);
            await atualizarEstadoPartida();
        }
    }

    function renderizarResultado(dados) {
        if (dados.status !== "completed") {
            resultadoPartida.hidden = true;
            return;
        }
        resultadoPartida.hidden = false;
        const euVenci = dados.winner_id === usuarioAtual.id;
        const empate = !dados.winner_id;
        const titulo = empate ? "Empate!" : euVenci ? "Você venceu!" : "Seu amigo venceu.";
        const resumo = "Acertos: você " + dados.my_correct_count + " × " + dados.opponent_correct_count +
            " adversário. Tempo: " + formatarTempo(dados.my_time_ms) + " × " +
            formatarTempo(dados.opponent_time_ms) + ".";
        resultadoPartida.replaceChildren(
            elemento("h3", "", titulo),
            elemento("p", "", resumo),
            elemento("p", "", "A classificação semanal de desafios considera as vitórias concluídas.")
        );
        if (intervaloRelogio) window.clearInterval(intervaloRelogio);
    }

    async function atualizarEstadoPartida() {
        if (!desafioAtualId) return;
        const { data, error } = await rpc("get_friend_challenge_state", {
            p_challenge_id: desafioAtualId
        });
        if (error) throw error;
        estadoAtual = data;
        $("tituloPartida").textContent = "Desafio: " + (NOMES_CONTEUDO[data.topic] || data.topic);
        iniciarRelogio(data.started_at);
        $("placarPartida").textContent = Number(data.my_correct_count || 0) + " × " + Number(data.opponent_correct_count || 0);
        renderizarQuestao(data);
        renderizarResultado(data);
        if (data.status === "completed") {
            mostrarMensagem(estadoPartida, "Partida concluída.", false);
        } else if (Number(data.my_answered_count || 0) >= 10) {
            mostrarMensagem(estadoPartida, "Você terminou. Aguardando o outro participante.", false);
        } else {
            mostrarMensagem(estadoPartida, "", false);
        }
    }

    async function abrirPartida(id) {
        desafioAtualId = id;
        painelPartida.hidden = false;
        resultadoPartida.hidden = true;
        areaQuestao.replaceChildren(elemento("p", "desafio-estado-vazio", "Carregando partida..."));
        painelPartida.scrollIntoView({ behavior: "smooth", block: "start" });
        try {
            await atualizarEstadoPartida();
            if (intervaloAtualizacao) window.clearInterval(intervaloAtualizacao);
            intervaloAtualizacao = window.setInterval(async () => {
                try {
                    await atualizarEstadoPartida();
                    await atualizarPainel();
                } catch (error) {
                    console.error("Erro ao sincronizar partida:", error);
                }
            }, 3000);
        } catch (error) {
            console.error("Erro ao abrir partida:", error);
            mostrarMensagem(estadoPartida, error.message || "Não foi possível abrir esta partida.", true);
        }
    }

    async function iniciarPagina() {
        if (typeof supabaseClient === "undefined" || !supabaseClient) {
            mostrarMensagem(estadoCriacao, "Não foi possível conectar ao sistema.", true);
            return;
        }
        const { data: { user }, error } = await supabaseClient.auth.getUser();
        if (error || !user) {
            window.location.replace("index.html");
            return;
        }
        usuarioAtual = user;

        const { data: perfil, error: erroPerfil } = await supabaseClient
            .from("profiles").select("tipo_usuario").eq("id", user.id).single();
        if (erroPerfil || !perfil || perfil.tipo_usuario !== "aluno") {
            mostrarMensagem(estadoCriacao, "Os desafios entre amigos estão disponíveis apenas para contas de alunos.", true);
            form.hidden = true;
            return;
        }

        await carregarAmigos();
        await atualizarPainel();
        if (intervaloAtualizacao) window.clearInterval(intervaloAtualizacao);
        intervaloAtualizacao = window.setInterval(atualizarPainel, 5000);
    }

    form.addEventListener("submit", criarDesafio);
    $("botaoAtualizarDesafios").addEventListener("click", atualizarPainel);
    window.addEventListener("beforeunload", () => {
        if (intervaloAtualizacao) window.clearInterval(intervaloAtualizacao);
        if (intervaloRelogio) window.clearInterval(intervaloRelogio);
    });

    iniciarPagina().catch(error => {
        console.error("Erro ao iniciar a página de desafios:", error);
        mostrarMensagem(estadoCriacao, error.message || "Não foi possível carregar a página.", true);
    });
})();