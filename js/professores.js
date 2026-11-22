// =====================================================
// MATEMÁTICA AVANTE
// CATÁLOGO E PESQUISA DE PROFESSORES
// =====================================================

const professores = [];
let professoresEmDestaque = [];

const campoPesquisaProfessor = document.getElementById("campoPesquisaProfessor");
const estadoVazioProfessores = document.getElementById("estadoVazioProfessores");
const nenhumProfessorEncontrado = document.getElementById("nenhumProfessorEncontrado");
const listaCardsProfessores = document.getElementById("listaCardsProfessores");

const painelResultadosProfessores = document.getElementById("painelResultadosProfessores");
const fecharResultadosProfessores = document.getElementById("fecharResultadosProfessores");
const tituloResultadosProfessores = document.getElementById("tituloResultadosProfessores");
const listaCompletaProfessores = document.getElementById("listaCompletaProfessores");
const estadoPesquisaCompletaVazia = document.getElementById("estadoPesquisaCompletaVazia");

function normalizarTextoProfessor(valor) {
    return String(valor || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR")
        .trim();
}

function embaralharProfessores(lista) {
    const resultado = [...lista];

    for (let i = resultado.length - 1; i > 0; i--) {
        const indice = Math.floor(Math.random() * (i + 1));
        [resultado[i], resultado[indice]] = [resultado[indice], resultado[i]];
    }

    return resultado;
}

function atualizarEstadoListaProfessores(lista, termoPesquisado) {
    if (estadoVazioProfessores) {
        estadoVazioProfessores.hidden = professores.length > 0 || Boolean(termoPesquisado);
    }

    if (nenhumProfessorEncontrado) {
        nenhumProfessorEncontrado.hidden = !termoPesquisado || lista.length > 0;
    }
}

function criarCardProfessor(professor) {
    const card = document.createElement("article");
    card.className = "card-professor";

    const resumo = document.createElement("div");
    resumo.className = "professor-resumo";

    const avatar = document.createElement("div");
    avatar.className = "professor-avatar";

    if (professor.foto) {
        const imagem = document.createElement("img");
        imagem.src = professor.foto;
        imagem.alt = "Foto de " + professor.nome;
        imagem.loading = "lazy";
        avatar.appendChild(imagem);
    } else {
        const icone = document.createElement("i");
        icone.setAttribute("data-lucide", "user-round");
        avatar.appendChild(icone);
    }

    const identidade = document.createElement("div");
    identidade.className = "professor-identidade";

    const nome = document.createElement("h3");
    nome.textContent = professor.nome || "Professor";

    const username = document.createElement("span");
    username.textContent = professor.username ? "@" + professor.username : "Professor";

    identidade.append(nome, username);

    const iconeExpandir = document.createElement("i");
    iconeExpandir.className = "professor-expandir";
    iconeExpandir.setAttribute("data-lucide", "chevron-down");

    resumo.append(avatar, identidade, iconeExpandir);

    const detalhes = document.createElement("div");
    detalhes.className = "professor-detalhes";

    if (professor.formacao) {
        adicionarInformacao(detalhes, "Formação", professor.formacao);
    }

    if (professor.especialidades.length) {
        adicionarInformacao(detalhes, "Especialidades", professor.especialidades.join(", "));
    }

    if (professor.bio) {
        const descricao = document.createElement("p");
        descricao.className = "descricao-professor";
        descricao.textContent = professor.bio;
        detalhes.appendChild(descricao);
    }

    const link = document.createElement("a");
    link.href = "perfil-publico.html?usuario=" + encodeURIComponent(professor.username);
    link.className = "botao-ver-perfil";
    link.innerHTML = '<i data-lucide="user-round"></i><span>Ver perfil</span>';
    detalhes.appendChild(link);

    card.append(resumo, detalhes);

    card.addEventListener("click", function(event) {
        if (event.target.closest(".botao-ver-perfil")) return;
        card.classList.toggle("aberto");
    });

    return card;
}

function adicionarInformacao(container, titulo, valor) {
    if (!valor) return;

    const bloco = document.createElement("div");
    bloco.className = "informacao-professor";

    const nome = document.createElement("span");
    nome.textContent = titulo;

    const valorElemento = document.createElement("strong");
    valorElemento.textContent = valor;

    bloco.append(nome, valorElemento);
    container.appendChild(bloco);
}

function renderizarProfessores(lista, opcoes = {}) {
    if (!listaCardsProfessores) return;

    const limite = Number.isInteger(opcoes.limite) ? opcoes.limite : lista.length;
    const visiveis = lista.slice(0, limite);
    listaCardsProfessores.replaceChildren();

    atualizarEstadoListaProfessores(lista, opcoes.termo || "");

    visiveis.forEach(function(professor) {
        listaCardsProfessores.appendChild(criarCardProfessor(professor));
    });

    if (opcoes.mostrarMais && lista.length > visiveis.length) {
        const mais = document.createElement("p");
        mais.className = "mais-professores";
        mais.textContent = "mais...";
        listaCardsProfessores.appendChild(mais);
    }

    if (window.atualizarIcones) atualizarIcones();
}

function pesquisarProfessores() {
    const termoOriginal = campoPesquisaProfessor ? campoPesquisaProfessor.value.trim() : "";
    const termo = normalizarTextoProfessor(termoOriginal);

    if (!termo) {
        renderizarProfessores(professoresEmDestaque);
        return [];
    }

    const resultados = professores.filter(function(professor) {
        return normalizarTextoProfessor(professor.nome).startsWith(termo);
    });

    renderizarProfessores(resultados, {
        limite: 3,
        mostrarMais: true,
        termo: termoOriginal
    });

    return resultados;
}

function abrirPainelResultadosProfessores(resultados, termo) {
    if (!painelResultadosProfessores || !listaCompletaProfessores) return;

    tituloResultadosProfessores.textContent =
        'Professores encontrados para "' + termo + '" (' + resultados.length + ')';

    listaCompletaProfessores.replaceChildren();

    if (estadoPesquisaCompletaVazia) {
        estadoPesquisaCompletaVazia.hidden = resultados.length > 0;
    }

    resultados.forEach(function(professor) {
        listaCompletaProfessores.appendChild(criarCardProfessor(professor));
    });

    painelResultadosProfessores.hidden = false;
    document.body.style.overflow = "hidden";

    if (window.atualizarIcones) atualizarIcones();
}

function fecharPainelResultadosProfessores() {
    if (!painelResultadosProfessores) return;
    painelResultadosProfessores.hidden = true;
    document.body.style.overflow = "";
}

async function carregarProfessores() {
    if (!listaCardsProfessores) return;

    if (typeof supabaseClient === "undefined" || !supabaseClient) {
        console.error("Supabase indisponível ao carregar professores.");
        mostrarEstadoVazioProfessores();
        return;
    }

    try {
        const { data, error } = await supabaseClient.rpc("get_public_teacher_profiles");
        if (error) throw error;

        const registros = Array.isArray(data) ? data : [];

        professores.splice(0, professores.length, ...registros.map(function(perfil) {
            let foto = null;

            if (perfil.avatar_path) {
                const resultado = supabaseClient.storage
                    .from("avatars")
                    .getPublicUrl(perfil.avatar_path);
                foto = resultado.data?.publicUrl || null;
            }

            return {
                id: perfil.id,
                nome: perfil.display_name || perfil.username || "Professor",
                username: perfil.username || "",
                foto: foto,
                bio: perfil.bio || "",
                formacao: perfil.formation || "",
                especialidades: Array.isArray(perfil.specialties) ? perfil.specialties : []
            };
        }));

        professoresEmDestaque = embaralharProfessores(professores).slice(0, 10);
        renderizarProfessores(professoresEmDestaque);
    } catch (erro) {
        console.error("Erro ao carregar catálogo de professores:", erro);
        if (estadoVazioProfessores) {
            estadoVazioProfessores.hidden = false;
            const titulo = estadoVazioProfessores.querySelector("h3");
            const texto = estadoVazioProfessores.querySelector("p");
            if (titulo) titulo.textContent = "Não foi possível carregar os professores";
            if (texto) texto.textContent = "Verifique sua conexão e tente novamente.";
        }
        if (nenhumProfessorEncontrado) nenhumProfessorEncontrado.hidden = true;
    }
}

if (campoPesquisaProfessor) {
    campoPesquisaProfessor.addEventListener("input", pesquisarProfessores);

    campoPesquisaProfessor.addEventListener("keydown", function(event) {
        if (event.key !== "Enter") return;

        event.preventDefault();
        const termo = campoPesquisaProfessor.value.trim();
        if (!termo) return;

        const resultados = pesquisarProfessores();
        abrirPainelResultadosProfessores(resultados, termo);
    });
}

if (fecharResultadosProfessores) {
    fecharResultadosProfessores.addEventListener("click", fecharPainelResultadosProfessores);
}

if (painelResultadosProfessores) {
    painelResultadosProfessores.addEventListener("click", function(event) {
        if (event.target === painelResultadosProfessores) fecharPainelResultadosProfessores();
    });
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && painelResultadosProfessores && !painelResultadosProfessores.hidden) {
        fecharPainelResultadosProfessores();
    }
});

function mostrarEstadoVazioProfessores() {
    if (estadoVazioProfessores) estadoVazioProfessores.hidden = false;
    if (nenhumProfessorEncontrado) nenhumProfessorEncontrado.hidden = true;
}

carregarProfessores();


// =====================================================
// 
// =====================================================

const botaoAbrirCadastroProfessor =
    document.getElementById("abrirCadastroProfessor");

async function configurarVisibilidadeCadastroProfessor() {
    if (!botaoAbrirCadastroProfessor) return;

    // O botão começa oculto e só é liberado após confirmar o tipo da conta.
    botaoAbrirCadastroProfessor.hidden = true;

    if (typeof supabaseClient === "undefined" || !supabaseClient) return;

    try {
        const { data: { user }, error: erroUsuario } =
            await supabaseClient.auth.getUser();

        if (erroUsuario || !user) return;

        const { data: perfil, error: erroPerfil } = await supabaseClient
            .from("profiles")
            .select("tipo_usuario")
            .eq("id", user.id)
            .single();

        if (erroPerfil || !perfil) throw erroPerfil || new Error("Perfil não encontrado.");

        botaoAbrirCadastroProfessor.hidden = perfil.tipo_usuario !== "aluno";
    } catch (erro) {
        console.error("Não foi possível verificar a permissão para cadastro como professor:", erro);
        botaoAbrirCadastroProfessor.hidden = true;
    }
}

configurarVisibilidadeCadastroProfessor();

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

// =====================================================
// ENVIO DA SOLICITAÇÃO DE CADASTRO COMO PROFESSOR
// =====================================================

const botaoEnviarSolicitacaoProfessor =
    document.getElementById("enviarSolicitacaoProfessor");

async function enviarSolicitacaoCadastroProfessor() {

    if (!formCadastroProfessor || !botaoEnviarSolicitacaoProfessor) return;

    if (!formCadastroProfessor.checkValidity()) {
        formCadastroProfessor.reportValidity();
        return;
    }

    const especialidadesSelecionadas = Array.from(
        formCadastroProfessor.querySelectorAll('input[name="especialidades"]:checked')
    ).map(function(campo) {
        return campo.value;
    });

    if (!especialidadesSelecionadas.length) {
        alert("Selecione pelo menos uma especialidade.");
        return;
    }

    if (typeof supabaseClient === "undefined" || !supabaseClient) {
        alert("Não foi possível conectar ao serviço. Tente novamente.");
        return;
    }

    const valorOriginal = botaoEnviarSolicitacaoProfessor.textContent;
    botaoEnviarSolicitacaoProfessor.disabled = true;
    botaoEnviarSolicitacaoProfessor.textContent = "Enviando...";

    try {

        const { data, error } = await supabaseClient.rpc("submit_teacher_request", {
            p_full_name: document.getElementById("nomeCompletoProfessor").value.trim(),
            p_formation: document.getElementById("formacaoProfessor").value.trim(),
            p_institution: document.getElementById("instituicaoProfessor").value.trim(),
            p_specialties: especialidadesSelecionadas,
            p_phone: document.getElementById("telefoneProfessor").value.trim(),
            p_other_specialty: document.getElementById("outraEspecialidadeProfessor").value.trim() || null,
            p_experience: document.getElementById("experienciaProfessor").value.trim() || null,
            p_other_contact: document.getElementById("outroContatoProfessor").value.trim() || null
        });

        if (error) throw error;

        formCadastroProfessor.reset();
        fecharModalCadastroProfessor();

        alert("Sua solicitação foi enviada com sucesso. Você receberá uma atualização quando houver uma decisão.");

        if (data) {
            console.info("Solicitação de professor registrada:", data);
            if (window.maPushNotifications) {
                await window.maPushNotifications.enviarEvento("teacher_request", { request_id: data });
            }
        }

    } catch (erro) {

        console.error("Erro ao enviar solicitação de professor:", erro);
        alert(erro.message || "Não foi possível enviar sua solicitação. Tente novamente.");

    } finally {

        botaoEnviarSolicitacaoProfessor.disabled = false;
        botaoEnviarSolicitacaoProfessor.textContent = valorOriginal;

    }
}

if (botaoEnviarSolicitacaoProfessor) {
    botaoEnviarSolicitacaoProfessor.addEventListener(
        "click",
        enviarSolicitacaoCadastroProfessor
    );
}

