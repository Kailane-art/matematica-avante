(function () {
    "use strict";

    const listaRanking = document.getElementById("listaRankingIndividual");
    const statusRanking = document.getElementById("statusRanking");
    const periodoIndividual = document.getElementById("periodoSemanaIndividual");
    const periodoDesafios = document.getElementById("periodoSemanaDesafios");
    const campoPesquisa = document.getElementById("pesquisaEstudante");
    const resultadosPesquisa = document.getElementById("resultadosPesquisa");
    const ajudaPesquisa = document.querySelector(".ranking-ajuda-pesquisa");
    const listaRankingDesafios = document.getElementById("listaRankingDesafios");
    const statusRankingDesafios = document.getElementById("statusRankingDesafios");
    const campoPesquisaDesafios = document.getElementById("pesquisaRankingDesafios");
    const resultadosPesquisaDesafios = document.getElementById("resultadosRankingDesafios");
    const ajudaPesquisaDesafios = document.getElementById("ajudaPesquisaRankingDesafios");

    let temporizadorPesquisa = null;
    let temporizadorPesquisaDesafios = null;

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

    function criarLinhaRankingDesafios(item) {
        const linha = criarElemento("li", "ranking-item");
        const posicao = criarElemento("span", "ranking-posicao", String(item.position) + "º");
        const identidade = criarElemento("div", "ranking-identidade");
        identidade.append(
            criarElemento("span", "ranking-nome", item.display_name || "Estudante"),
            criarElemento("span", "ranking-username", "@" + (item.username || ""))
        );
        const vitorias = criarElemento("span", "ranking-pontuacao",
            Number(item.weekly_wins || 0) + (Number(item.weekly_wins || 0) === 1 ? " vitória" : " vitórias")
        );
        linha.append(posicao, identidade, vitorias);
        return linha;
    }

    async function consultarRankingDesafios(pesquisa) {
        if (typeof supabaseClient === "undefined" || !supabaseClient) {
            throw new Error("Não foi possível conectar ao ranking de desafios.");
        }
        const { data, error } = await supabaseClient.rpc(
            "get_weekly_friend_challenge_ranking",
            { p_search: pesquisa || null }
        );
        if (error) throw error;
        return data;
    }

    async function carregarRankingDesafios() {
        try {
            const dados = await consultarRankingDesafios(null);
            atualizarPeriodo(dados);
            listaRankingDesafios.replaceChildren();

            if (!Array.isArray(dados.top3) || dados.top3.length === 0) {
                statusRankingDesafios.textContent = "Ainda não há vitórias registradas nesta semana.";
            } else {
                statusRankingDesafios.textContent = dados.my_position
                    ? "Sua posição nesta semana: " + dados.my_position + "º lugar."
                    : "Confira os três estudantes com mais vitórias nesta semana.";
                dados.top3.forEach(item => listaRankingDesafios.appendChild(criarLinhaRankingDesafios(item)));
            }

            if (!dados.my_position && (!dados.top3 || dados.top3.length === 0)) {
                statusRankingDesafios.textContent = "As disputas ainda não tiveram resultados concluídos nesta semana.";
            }
        } catch (erro) {
            console.error("Erro ao carregar o ranking de desafios:", erro);
            statusRankingDesafios.textContent = "Não foi possível carregar o ranking de desafios.";
        }
    }

    async function pesquisarRankingDesafios(termo) {
        if (termo.length < 2) {
            resultadosPesquisaDesafios.replaceChildren();
            ajudaPesquisaDesafios.textContent = "Digite pelo menos 2 caracteres para pesquisar.";
            return;
        }
        ajudaPesquisaDesafios.textContent = "Pesquisando...";
        try {
            const dados = await consultarRankingDesafios(termo);
            resultadosPesquisaDesafios.replaceChildren();
            const itens = dados.search_results || [];
            if (!itens.length) {
                resultadosPesquisaDesafios.appendChild(
                    criarElemento("p", "ranking-status", "Nenhum estudante encontrado.")
                );
            } else {
                itens.forEach(item => {
                    const linha = criarElemento("div", "ranking-resultado-item");
                    const identidade = criarElemento("div", "ranking-identidade");
                    identidade.append(
                        criarElemento("span", "ranking-nome", item.display_name || "Estudante"),
                        criarElemento("span", "ranking-username", "@" + (item.username || ""))
                    );
                    const posicao = item.position
                        ? criarElemento("span", "ranking-resultado-posicao", item.position + "º lugar · " + item.weekly_wins + " vitórias")
                        : criarElemento("span", "ranking-resultado-sem-pontos", "Sem vitórias nesta semana");
                    linha.append(identidade, posicao);
                    resultadosPesquisaDesafios.appendChild(linha);
                });
            }
            ajudaPesquisaDesafios.textContent = "Resultados da semana atual.";
        } catch (erro) {
            console.error("Erro ao pesquisar no ranking de desafios:", erro);
            resultadosPesquisaDesafios.replaceChildren(
                criarElemento("p", "ranking-status", "Não foi possível realizar a pesquisa.")
            );
            ajudaPesquisaDesafios.textContent = "Falha na pesquisa.";
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

    if (campoPesquisaDesafios) {
        campoPesquisaDesafios.addEventListener("input", function () {
            window.clearTimeout(temporizadorPesquisaDesafios);
            const termo = campoPesquisaDesafios.value.trim();
            temporizadorPesquisaDesafios = window.setTimeout(function () {
                pesquisarRankingDesafios(termo);
            }, 350);
        });
    }

    carregarRankingInicial();
    carregarRankingDesafios();
})();