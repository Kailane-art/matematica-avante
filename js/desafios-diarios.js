// =====================================================
// DESAFIOS DIÁRIOS — MATEMÁTICA AVANTE
// Questões, respostas e recompensas são validadas no Supabase.
// =====================================================

const listaDesafios = document.getElementById("listaDesafios");
const mensagemDesafios = document.getElementById("mensagemDesafios");
const dataDesafios = document.getElementById("dataDesafios");
const progressoDesafios = document.getElementById("progressoDesafios");
const xpDesafiosHoje = document.getElementById("xpDesafiosHoje");
const barraProgressoDesafios = document.getElementById("barraProgressoDesafios");
const barraContainerDesafios = document.querySelector(".barra-progresso-desafios");
const bonusDesafios = document.getElementById("bonusDesafios");
const statusBonusDesafios = document.getElementById("statusBonusDesafios");

let estadoDesafiosDiarios = null;
let questaoEmEnvio = null;

function criarElementoDesafio(tag, classe, texto) {
    const elemento = document.createElement(tag);

    if (classe) {
        elemento.className = classe;
    }

    if (texto !== undefined && texto !== null) {
        elemento.textContent = texto;
    }

    return elemento;
}

function formatarDataDesafios(data) {
    if (!data) {
        return "Desafios de hoje";
    }

    const dataLocal = new Date(data + "T12:00:00");
    return dataLocal.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}

function atualizarResumoDesafios() {
    if (!estadoDesafiosDiarios) {
        return;
    }

    const concluidas = Number(estadoDesafiosDiarios.correct_count) || 0;
    const bonus = estadoDesafiosDiarios.bonus_awarded === true;
    const xpHoje = (concluidas * 20) + (bonus ? 20 : 0);

    dataDesafios.textContent = formatarDataDesafios(
        estadoDesafiosDiarios.challenge_date
    );

    progressoDesafios.textContent = concluidas + "/3";
    xpDesafiosHoje.textContent = xpHoje + "/80 XP";

    barraProgressoDesafios.style.width = (concluidas / 3 * 100) + "%";
    barraContainerDesafios.setAttribute("aria-valuenow", String(concluidas));

    if (bonus) {
        bonusDesafios.classList.add("conquistado");
        statusBonusDesafios.textContent = "Bônus de 20 XP conquistado hoje!";
    } else {
        bonusDesafios.classList.remove("conquistado");
        statusBonusDesafios.textContent = concluidas === 3
            ? "Você concluiu os três desafios. O bônus foi registrado."
            : "Acerte as três questões para liberar o bônus de 20 XP.";
    }
}

function renderizarDesafiosDiarios() {
    if (!estadoDesafiosDiarios || !Array.isArray(estadoDesafiosDiarios.questions)) {
        return;
    }

    listaDesafios.replaceChildren();
    atualizarResumoDesafios();

    estadoDesafiosDiarios.questions.forEach(function(questao, indice) {
        const card = criarElementoDesafio("article", "card-desafio-diario");
        const topo = criarElementoDesafio("div", "topo-card-desafio");
        const identificacao = criarElementoDesafio(
            "span",
            "identificacao-desafio",
            "Desafio " + (indice + 1) + " · 20 XP"
        );

        const dificuldade = String(questao.difficulty || "").toLowerCase();
        const classeDificuldade = dificuldade === "fácil"
            ? "facil"
            : dificuldade === "médio"
                ? "medio"
                : "dificil";

        const selo = criarElementoDesafio(
            "span",
            "dificuldade-desafio " + classeDificuldade,
            questao.difficulty || "Dificuldade"
        );

        topo.append(identificacao, selo);
        card.appendChild(topo);

        const pergunta = criarElementoDesafio(
            "p",
            "pergunta-desafio",
            questao.prompt
        );
        card.appendChild(pergunta);

        const alternativas = criarElementoDesafio("div", "alternativas-desafio");

        (questao.options || []).forEach(function(alternativa) {
            const botao = criarElementoDesafio(
                "button",
                "alternativa-desafio",
                alternativa.text
            );

            botao.type = "button";
            botao.disabled = questao.completed === true ||
                questaoEmEnvio === questao.id;

            if (questao.last_option_id === alternativa.id) {
                botao.classList.add(
                    questao.last_answer_correct === true
                        ? "resposta-correta"
                        : "resposta-incorreta"
                );
            }

            botao.addEventListener("click", function() {
                responderDesafioDiario(questao, alternativa, botao);
            });

            alternativas.appendChild(botao);
        });

        card.appendChild(alternativas);

        if (questao.completed === true) {
            const feedback = criarElementoDesafio("div", "feedback-desafio correto");
            feedback.appendChild(criarElementoDesafio("strong", "", "Resposta correta! +20 XP"));
            feedback.appendChild(criarElementoDesafio(
                "span",
                "",
                questao.feedback || "Desafio concluído."
            ));
            card.appendChild(feedback);
        } else if (Number(questao.attempt_count) > 0) {
            const feedback = criarElementoDesafio("div", "feedback-desafio incorreto");
            feedback.appendChild(criarElementoDesafio(
                "strong",
                "",
                "Resposta incorreta. Tente novamente."
            ));
            feedback.appendChild(criarElementoDesafio(
                "span",
                "",
                "Tentativas realizadas: " + questao.attempt_count
            ));
            card.appendChild(feedback);
        }

        listaDesafios.appendChild(card);
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

async function carregarDesafiosDiarios() {
    if (!supabaseClient) {
        throw new Error("A conexão com o servidor não está disponível.");
    }

    const resultado = await supabaseClient.rpc("get_daily_challenges");

    if (resultado.error) {
        throw resultado.error;
    }

    if (!resultado.data || !Array.isArray(resultado.data.questions)) {
        throw new Error("O servidor retornou os desafios em um formato inválido.");
    }

    estadoDesafiosDiarios = resultado.data;
    renderizarDesafiosDiarios();
}

async function responderDesafioDiario(questao, alternativa, botao) {
    if (questaoEmEnvio || questao.completed === true) {
        return;
    }

    questaoEmEnvio = questao.id;
    mensagemDesafios.classList.remove("erro");
    mensagemDesafios.textContent = "Verificando sua resposta...";

    const botoes = botao.closest(".card-desafio-diario")
        .querySelectorAll(".alternativa-desafio");

    botoes.forEach(function(item) {
        item.disabled = true;
    });

    try {
        const resultado = await supabaseClient.rpc(
            "submit_daily_challenge_answer",
            {
                p_question_id: questao.id,
                p_option_id: alternativa.id
            }
        );

        if (resultado.error) {
            throw resultado.error;
        }

        await carregarDesafiosDiarios();

        const questaoAtualizada = estadoDesafiosDiarios.questions.find(
            function(item) {
                return item.id === questao.id;
            }
        );

        if (questaoAtualizada) {
            questaoAtualizada.last_option_id = alternativa.id;
            questaoAtualizada.last_answer_correct = resultado.data?.correct === true;
        }

        mensagemDesafios.classList.remove("erro");

        if (resultado.data?.already_completed === true) {
            mensagemDesafios.textContent = "Este desafio já estava concluído. Nenhum XP foi duplicado.";
        } else if (resultado.data?.correct === true) {
            if (resultado.data.bonus_awarded === true) {
                mensagemDesafios.textContent = "Resposta correta! Você recebeu 20 XP e mais 20 XP de bônus. Total deste acerto: 40 XP.";
            } else {
                mensagemDesafios.textContent = "Resposta correta! Você recebeu 20 XP.";
            }
        } else {
            mensagemDesafios.textContent = "Resposta incorreta. Tente outra alternativa.";
        }
    } catch (erro) {
        console.error("Erro ao responder desafio diário:", erro);
        mensagemDesafios.classList.add("erro");
        mensagemDesafios.textContent = erro.message ||
            "Não foi possível registrar sua resposta. Tente novamente.";
    } finally {
        questaoEmEnvio = null;

        if (estadoDesafiosDiarios) {
            renderizarDesafiosDiarios();
        }
    }
}

async function iniciarDesafiosDiarios() {
    try {
        await carregarDesafiosDiarios();

        if (Number(estadoDesafiosDiarios.correct_count) === 3) {
            mensagemDesafios.textContent = "Você concluiu os três desafios de hoje!";
        } else {
            mensagemDesafios.textContent = "Acerte cada questão para conquistar 20 XP. As três corretas liberam mais 20 XP.";
        }
    } catch (erro) {
        console.error("Não foi possível carregar os desafios diários:", erro);
        mensagemDesafios.classList.add("erro");
        mensagemDesafios.textContent = erro.message ||
            "Não foi possível carregar os desafios de hoje.";
    }
}

if (window.lucide) {
    window.lucide.createIcons();
}

iniciarDesafiosDiarios();
