(function () {
    "use strict";

    const listaRanking = document.getElementById("listaRankingIndividual");
    const statusRanking = document.getElementById("statusRanking");
    const periodoIndividual = document.getElementById("periodoSemanaIndividual");
    const periodoDesafios = document.getElementById("periodoSemanaDesafios");
    const campoPesquisa = document.getElementById("pesquisaEstudante");
    const resultadosPesquisa = document.getElementById("resultadosPesquisa");
    const ajudaPesquisa = document.querySelector(".ranking-ajuda-pesquisa");

    let temporizadorPesquisa = null;

    function criarElemento(tag, classe, texto) {
        const elemento = document.createElement(tag);
        if (classe) elemento.className = classe;
        if (texto !== undefined) elemento.textContent = texto;
        return elemento;
    }

    function formatarXP(valor) {
        const xp = Number(valor) || 0;
        return xp.toLocaleString("pt-BR") + (xp === 1 ? " XP" : " XP");
    }

    function formatarDataISO(dataISO) {
        if (!dataISO) return "";
        const partes = dataISO.split("-").map(Number);
        const data = new Date(partes[0], partes[1] - 1, partes[2]);
        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit"
        });
    }

    function atualizarPeriodo(dados) {
        const inicio = formatarDataISO(dados.week_start);
        const fim = formatarDataISO(dados.week_end);
        const texto = inicio && fim ? inicio + " a " + fim : "Semana atual";

        periodoIndividual.textContent = texto;
        periodoDesafios.textContent = texto;
    }

    function criarLinhaRanking(item) {
        const linha = criarElemento("li", "ranking-item");
        const posicao = criarElemento("span", "ranking-posicao", String(item.position) + "º");
        const identidade = criarElemento("div", "ranking-identidade");
        const nome = criarElemento("span", "ranking-nome", item.display_name || "Estudante");
        const username = criarElemento("span", "ranking-username", "@" + (item.username || ""));
        const pontuacao = criarElemento("span", "ranking-pontuacao", formatarXP(item.weekly_xp));

        identidade.append(nome, username);
        linha.append(posicao, identidade, pontuacao);
        return linha;
    }

    function renderizarTop5(itens) {
        listaRanking.replaceChildren();

        if (!Array.isArray(itens) || itens.length === 0) {
            statusRanking.textContent =
                "O ranking desta semana ainda está vazio. Seja o primeiro estudante a conquistar XP!";
            return;
        }

        statusRanking.textContent = "Estes são os cinco estudantes com mais XP nesta semana.";

        itens.forEach(function (item) {
            listaRanking.appendChild(criarLinhaRanking(item));
        });
    }

    function renderizarPesquisa(itens) {
        resultadosPesquisa.replaceChildren();

        if (!Array.isArray(itens) || itens.length === 0) {
            resultadosPesquisa.appendChild(
                criarElemento("p", "ranking-status", "Nenhum estudante encontrado com esse nome ou usuário.")
            );
            return;
        }

        itens.forEach(function (item) {
            const linha = criarElemento("div", "ranking-resultado-item");
            const identidade = criarElemento("div", "ranking-identidade");
            identidade.append(
                criarElemento("span", "ranking-nome", item.display_name || "Estudante"),
                criarElemento("span", "ranking-username", "@" + (item.username || ""))
            );

            const posicao = item.position
                ? criarElemento("span", "ranking-resultado-posicao", item.position + "º lugar")
                : criarElemento("span", "ranking-resultado-sem-pontos", "Sem XP nesta semana");

            linha.append(identidade, posicao);
            resultadosPesquisa.appendChild(linha);
        });
    }

    async function consultarRanking(pesquisa) {
        if (typeof supabaseClient === "undefined" || !supabaseClient) {
            throw new Error("Não foi possível conectar ao serviço de rankings.");
        }

        const { data, error } = await supabaseClient.rpc(
            "get_weekly_student_ranking",
            { p_search: pesquisa || null }
        );

        if (error) throw error;
        return data;
    }

    async function carregarRankingInicial() {
        try {
            const dados = await consultarRanking(null);
            atualizarPeriodo(dados);
            renderizarTop5(dados.top5 || []);
        } catch (erro) {
            console.error("Erro ao carregar o ranking individual:", erro);
            statusRanking.textContent =
                "Não foi possível carregar o ranking. Verifique sua conexão e tente novamente.";
        }
    }

    async function pesquisarEstudantes(termo) {
        if (termo.length < 2) {
            resultadosPesquisa.replaceChildren();
            if (ajudaPesquisa) {
                ajudaPesquisa.textContent = "Digite pelo menos 2 caracteres para pesquisar.";
            }
            return;
        }

        if (ajudaPesquisa) ajudaPesquisa.textContent = "Pesquisando...";
        try {
            const dados = await consultarRanking(termo);
            renderizarPesquisa(dados.search_results || []);
            if (ajudaPesquisa) {
                ajudaPesquisa.textContent = "Resultados da semana atual.";
            }
        } catch (erro) {
            console.error("Erro ao pesquisar estudante no ranking:", erro);
            resultadosPesquisa.replaceChildren(
                criarElemento("p", "ranking-status", "Não foi possível realizar a pesquisa. Tente novamente.")
            );
            if (ajudaPesquisa) ajudaPesquisa.textContent = "Falha na pesquisa.";
        }
    }

    if (campoPesquisa) {
        campoPesquisa.addEventListener("input", function () {
            window.clearTimeout(temporizadorPesquisa);
            const termo = campoPesquisa.value.trim();

            temporizadorPesquisa = window.setTimeout(function () {
                pesquisarEstudantes(termo);
            }, 350);
        });
    }

    carregarRankingInicial();
})();