// =====================================================
// MATEMÁTICA AVANTE
// SISTEMA DE PROFESSORES
// =====================================================


// =====================================================
// BANCO DE PROFESSORES
// =====================================================
//
// Por enquanto não existem professores cadastrados.
//
// Futuramente cada professor poderá ter:
//
// {
//     id: 1,
//     nome: "Nome do Professor",
//     foto: "caminho/da/foto.jpg",
//     especialidade: "Álgebra",
//     avaliacao: 4.9,
//     quantidadeAlunos: 128,
//     nivelEnsino: "Básico e Intermediário",
//     descricao: "Descrição do professor.",
//     perfil: "professor-nome.html"
// }
//
// =====================================================

const professores = [];


// =====================================================
// ELEMENTOS DA PÁGINA
// =====================================================

const campoPesquisaProfessor =
    document.getElementById(
        "campoPesquisaProfessor"
    );


const estadoVazioProfessores =
    document.getElementById(
        "estadoVazioProfessores"
    );


const nenhumProfessorEncontrado =
    document.getElementById(
        "nenhumProfessorEncontrado"
    );


const listaCardsProfessores =
    document.getElementById(
        "listaCardsProfessores"
    );


// =====================================================
// MOSTRAR ESTADO VAZIO
// =====================================================

function mostrarEstadoVazioProfessores() {

    if (estadoVazioProfessores) {

        estadoVazioProfessores.hidden =
            false;

    }

    if (nenhumProfessorEncontrado) {

        nenhumProfessorEncontrado.hidden =
            true;

    }

}


// =====================================================
// MOSTRAR "NENHUM PROFESSOR ENCONTRADO"
// =====================================================

function mostrarNenhumProfessorEncontrado() {

    if (estadoVazioProfessores) {

        estadoVazioProfessores.hidden =
            true;

    }

    if (nenhumProfessorEncontrado) {

        nenhumProfessorEncontrado.hidden =
            false;

    }

}


// =====================================================
// RENDERIZAR PROFESSORES
// =====================================================

function renderizarProfessores(
    lista
) {

    if (!listaCardsProfessores) {

        return;

    }


    listaCardsProfessores.innerHTML =
        "";


    if (!lista.length) {

        if (professores.length === 0) {

            mostrarEstadoVazioProfessores();

        } else {

            mostrarNenhumProfessorEncontrado();

        }

        return;

    }


    if (estadoVazioProfessores) {

        estadoVazioProfessores.hidden =
            true;

    }


    if (nenhumProfessorEncontrado) {

        nenhumProfessorEncontrado.hidden =
            true;

    }


    lista.forEach(
        function(professor) {

            const card =
                criarCardProfessor(
                    professor
                );


            listaCardsProfessores.appendChild(
                card
            );

        }
    );


    atualizarIcones();

}


// =====================================================
// CRIAR CARD DO PROFESSOR
// =====================================================

function criarCardProfessor(
    professor
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "card-professor";


    const resumo =
        document.createElement(
            "div"
        );


    resumo.className =
        "professor-resumo";


    const avatar =
        document.createElement(
            "div"
        );


    avatar.className =
        "professor-avatar";


    if (professor.foto) {

        const imagem =
            document.createElement(
                "img"
            );


        imagem.src =
            professor.foto;


        imagem.alt =
            "Foto de " +
            professor.nome;


        avatar.appendChild(
            imagem
        );

    } else {

        const icone =
            document.createElement(
                "i"
            );


        icone.setAttribute(
            "data-lucide",
            "user-round"
        );


        avatar.appendChild(
            icone
        );

    }


    const identidade =
        document.createElement(
            "div"
        );


    identidade.className =
        "professor-identidade";


    const nome =
        document.createElement(
            "h3"
        );


    nome.textContent =
        professor.nome;


    const especialidade =
        document.createElement(
            "span"
        );


    especialidade.textContent =
        professor.especialidade;


    identidade.appendChild(
        nome
    );

    identidade.appendChild(
        especialidade
    );


    const iconeExpandir =
        document.createElement(
            "i"
        );


    iconeExpandir.className =
        "professor-expandir";


    iconeExpandir.setAttribute(
        "data-lucide",
        "chevron-down"
    );


    resumo.appendChild(
        avatar
    );

    resumo.appendChild(
        identidade
    );

    resumo.appendChild(
        iconeExpandir
    );


    const detalhes =
        document.createElement(
            "div"
        );


    detalhes.className =
        "professor-detalhes";


    const informacoes =
        document.createElement(
            "div"
        );


    informacoes.className =
        "informacoes-professor";


    adicionarInformacao(
        informacoes,
        "Avaliação",
        professor.avaliacao !== undefined
            ? "⭐ " + professor.avaliacao
            : null
    );


    adicionarInformacao(
        informacoes,
        "Alunos",
        professor.quantidadeAlunos !== undefined
            ? professor.quantidadeAlunos
            : null
    );


    adicionarInformacao(
        informacoes,
        "Nível de ensino",
        professor.nivelEnsino
    );


    adicionarInformacao(
        informacoes,
        "Especialidade",
        professor.especialidade
    );


    if (professor.descricao) {

        const descricao =
            document.createElement(
                "p"
            );


        descricao.textContent =
            professor.descricao;


        descricao.style.marginBottom =
            "18px";


        detalhes.appendChild(
            descricao
        );

    }


    detalhes.appendChild(
        informacoes
    );


    if (professor.perfil) {

        const link =
            document.createElement(
                "a"
            );


        link.href =
            professor.perfil;


        link.className =
            "botao-ver-perfil";


        link.innerHTML = `
            <i data-lucide="user-round"></i>
            <span>Ver perfil</span>
        `;


        detalhes.appendChild(
            link
        );

    }


    card.appendChild(
        resumo
    );

    card.appendChild(
        detalhes
    );


    card.addEventListener(
        "click",
        function(event) {

            if (
                event.target.closest(
                    ".botao-ver-perfil"
                )
            ) {

                return;

            }


            card.classList.toggle(
                "aberto"
            );

        }
    );


    return card;

}


// =====================================================
// ADICIONAR INFORMAÇÃO AO CARD
// =====================================================

function adicionarInformacao(
    container,
    titulo,
    valor
) {

    if (
        valor === undefined ||
        valor === null ||
        valor === ""
    ) {

        return;

    }


    const bloco =
        document.createElement(
            "div"
        );


    bloco.className =
        "informacao-professor";


    const nome =
        document.createElement(
            "span"
        );


    nome.textContent =
        titulo;


    const valorElemento =
        document.createElement(
            "strong"
        );


    valorElemento.textContent =
        valor;


    bloco.appendChild(
        nome
    );

    bloco.appendChild(
        valorElemento
    );


    container.appendChild(
        bloco
    );

}


// =====================================================
// PESQUISAR PROFESSORES
// =====================================================

function pesquisarProfessores() {

    const termo =
        campoPesquisaProfessor
            ? campoPesquisaProfessor.value
                .trim()
                .toLowerCase()
            : "";


    if (!termo) {

        renderizarProfessores(
            professores
        );

        return;

    }


    const resultados =
        professores.filter(
            function(professor) {

                const nome =
                    String(
                        professor.nome || ""
                    ).toLowerCase();


                const especialidade =
                    String(
                        professor.especialidade || ""
                    ).toLowerCase();


                const materias =
                    Array.isArray(
                        professor.materias
                    )
                        ? professor.materias
                            .join(" ")
                            .toLowerCase()
                        : "";


                return (
                    nome.includes(termo) ||
                    especialidade.includes(termo) ||
                    materias.includes(termo)
                );

            }
        );


    renderizarProfessores(
        resultados
    );

}


// =====================================================
// EVENTO DA PESQUISA
// =====================================================

if (
    campoPesquisaProfessor
) {

    campoPesquisaProfessor.addEventListener(
        "input",
        pesquisarProfessores
    );


    campoPesquisaProfessor.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                pesquisarProfessores();

            }

        }
    );

}  
// =====================================================
// INICIALIZAÇÃO
// =====================================================

renderizarProfessores(
    professores
);   


// =====================================================
// MODAL DE CADASTRO COMO PROFESSOR
// =====================================================

const botaoAbrirCadastroProfessor =
    document.getElementById("abrirCadastroProfessor");

const modalCadastroProfessor =
    document.getElementById("modalCadastroProfessor");

const botaoFecharCadastroProfessor =
    document.getElementById("fecharCadastroProfessor");

const botaoCancelarCadastroProfessor =
    document.getElementById("cancelarCadastroProfessor");

const campoEmailContaProfessor =
    document.getElementById("emailContaProfessor");

const usernameContaProfessor =
    document.getElementById("usernameContaProfessor");


async function carregarIdentificacaoContaProfessor() {

    if (typeof supabaseClient === "undefined" || !supabaseClient || !campoEmailContaProfessor || !usernameContaProfessor) {
        campoEmailContaProfessor.value = "";
        usernameContaProfessor.textContent = "Indisponível";
        return;
    }

    try {

        const { data: { user }, error } =
            await supabaseClient.auth.getUser();

        if (error || !user) {
            throw new Error("Não foi possível identificar a conta.");
        }

        campoEmailContaProfessor.value = user.email || "";

        const { data: perfil, error: erroPerfil } =
            await supabaseClient
                .from("profiles")
                .select("username")
                .eq("id", user.id)
                .single();

        if (erroPerfil || !perfil) {
            throw new Error("Não foi possível carregar o username da conta.");
        }

        usernameContaProfessor.textContent =
            perfil.username ? "@" + perfil.username : "Não definido";

    } catch (erro) {

        console.error("Erro ao carregar dados da conta para o cadastro de professor:", erro);

        campoEmailContaProfessor.value = "";
        usernameContaProfessor.textContent = "Não foi possível carregar";

    }

}


function abrirModalCadastroProfessor() {

    if (!modalCadastroProfessor) return;

    modalCadastroProfessor.hidden = false;
    document.body.style.overflow = "hidden";

    carregarIdentificacaoContaProfessor();

    if (window.atualizarIcones) {
        atualizarIcones();
    }

    const campoNome = document.getElementById("nomeCompletoProfessor");

    if (campoNome) {
        campoNome.focus();
    }

}


function fecharModalCadastroProfessor() {

    if (!modalCadastroProfessor) return;

    modalCadastroProfessor.hidden = true;
    document.body.style.overflow = "";

}


if (botaoAbrirCadastroProfessor) {
    botaoAbrirCadastroProfessor.addEventListener(
        "click",
        abrirModalCadastroProfessor
    );
}

if (botaoFecharCadastroProfessor) {
    botaoFecharCadastroProfessor.addEventListener(
        "click",
        fecharModalCadastroProfessor
    );
}

if (botaoCancelarCadastroProfessor) {
    botaoCancelarCadastroProfessor.addEventListener(
        "click",
        fecharModalCadastroProfessor
    );
}

const formCadastroProfessor =
    document.getElementById("formCadastroProfessor");

if (formCadastroProfessor) {
    formCadastroProfessor.addEventListener("submit", function(event) {
        event.preventDefault();
    });
}

if (modalCadastroProfessor) {

    modalCadastroProfessor.addEventListener("click", function(event) {

        if (event.target === modalCadastroProfessor) {
            fecharModalCadastroProfessor();
        }

    });

}

document.addEventListener("keydown", function(event) {

    if (
        event.key === "Escape" &&
        modalCadastroProfessor &&
        !modalCadastroProfessor.hidden
    ) {
        fecharModalCadastroProfessor();
    }

});

// O botão "Enviar solicitação" permanece sem ação nesta etapa.
