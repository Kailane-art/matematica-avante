(function () {
    "use strict";

    const form = document.getElementById("formPlanoProfessor");
    if (!form) return;

    const campoId = document.getElementById("planoProfessorId");
    const campoNome = document.getElementById("nomePlanoProfessor");
    const campoDescricao = document.getElementById("descricaoPlanoProfessor");
    const campoPreco = document.getElementById("precoPlanoProfessor");
    const campoCobranca = document.getElementById("tipoCobrancaPlanoProfessor");
    const campoModalidade = document.getElementById("modalidadePlanoProfessor");
    const campoAulas = document.getElementById("quantidadeAulasPlanoProfessor");
    const campoDuracao = document.getElementById("duracaoAulaPlanoProfessor");
    const botaoSalvar = document.getElementById("salvarPlanoProfessor");
    const botaoCancelar = document.getElementById("cancelarEdicaoPlanoProfessor");
    const botaoAtualizar = document.getElementById("atualizarPlanosProfessor");
    const botaoAbrirFormulario = document.getElementById("abrirFormularioPlanosProfessor");
    const containerFormulario = document.getElementById("formularioPlanoProfessorContainer");
    const estadoBotaoPlanos = document.getElementById("estadoBotaoPlanosProfessor");
    const lista = document.getElementById("listaPlanosProfessor");
    const mensagem = document.getElementById("mensagemPlanosProfessor");

    const LIMITE_PLANOS = 2;
    let usuarioAtual = null;
    let planos = [];
    let salvando = false;

    const tiposCobranca = {
        avulso: "Aula avulsa",
        mensal: "Mensal",
        pacote: "Pacote de aulas"
    };
    const modalidades = {
        online: "Online",
        presencial: "Presencial",
        hibrido: "Híbrido"
    };

    function mostrarMensagem(texto, erro) {
        mensagem.textContent = texto || "";
        mensagem.style.color = erro ? "#b91c1c" : "";
    }

    function formatarPreco(valor) {
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function criarElemento(tag, classe, texto) {
        const elemento = document.createElement(tag);
        if (classe) elemento.className = classe;
        if (texto !== undefined) elemento.textContent = texto;
        return elemento;
    }

    function atualizarDisponibilidadeCadastro() {
        const editando = Boolean(campoId.value);
        const limiteAtingido = planos.length >= LIMITE_PLANOS;

        botaoAbrirFormulario.disabled = limiteAtingido && !editando;

        if (editando) {
            estadoBotaoPlanos.textContent = "Editando um dos seus planos cadastrados.";
        } else if (limiteAtingido) {
            estadoBotaoPlanos.textContent = "Limite de 2 planos atingido. Edite os planos existentes.";
        } else {
            estadoBotaoPlanos.textContent =
                "Você cadastrou " + planos.length + " de " + LIMITE_PLANOS + " planos.";
        }
    }

    function limparFormulario() {
        form.reset();
        campoId.value = "";
        campoCobranca.value = "avulso";
        campoModalidade.value = "online";
        document.getElementById("tituloFormularioPlano").textContent = "Cadastrar novo plano";
        botaoSalvar.textContent = "Salvar plano";
        botaoCancelar.hidden = true;
        mostrarMensagem("");
        atualizarDisponibilidadeCadastro();
    }

    function definirFormularioAberto(aberto) {
        containerFormulario.hidden = !aberto;
        botaoAbrirFormulario.setAttribute("aria-expanded", aberto ? "true" : "false");
        estadoBotaoPlanos.textContent = aberto
            ? "Formulário aberto. Clique aqui para recolher."
            : "Clique para cadastrar ou editar seus planos.";
        if (!aberto) atualizarDisponibilidadeCadastro();
    }

    function preencherFormulario(plano) {
        campoId.value = plano.id;
        campoNome.value = plano.name;
        campoDescricao.value = plano.description || "";
        campoPreco.value = Number(plano.price).toFixed(2);
        campoCobranca.value = plano.billing_type;
        campoModalidade.value = plano.modality;
        campoAulas.value = plano.lessons_count ?? "";
        campoDuracao.value = plano.lesson_duration_minutes ?? "";
        document.getElementById("tituloFormularioPlano").textContent = "Editar plano";
        botaoSalvar.textContent = "Salvar alterações";
        botaoCancelar.hidden = false;
        mostrarMensagem("Editando: " + plano.name);
        atualizarDisponibilidadeCadastro();
        definirFormularioAberto(true);
        containerFormulario.scrollIntoView({ behavior: "smooth", block: "center" });
        campoNome.focus({ preventScroll: true });
    }

    function renderizarPlanos() {
        lista.replaceChildren();
        atualizarDisponibilidadeCadastro();

        if (!planos.length) {
            lista.appendChild(criarElemento("p", "plano-professor-estado", "Você ainda não cadastrou nenhum plano."));
            return;
        }

        planos.forEach(function (plano) {
            const card = criarElemento("article", "plano-professor-item");
            const topo = criarElemento("div", "plano-professor-item-topo");
            const titulo = criarElemento("h4", "", plano.name);
            const badge = criarElemento("span", "plano-professor-badge" + (plano.is_active ? "" : " inativo"), plano.is_active ? "Ativo" : "Inativo");
            topo.append(titulo, badge);
            card.appendChild(topo);

            if (plano.description) card.appendChild(criarElemento("p", "", plano.description));
            card.appendChild(criarElemento("div", "plano-professor-preco", formatarPreco(plano.price)));

            const detalhes = criarElemento("div", "plano-professor-detalhes");
            detalhes.appendChild(criarElemento("span", "", tiposCobranca[plano.billing_type] || plano.billing_type));
            detalhes.appendChild(criarElemento("span", "", modalidades[plano.modality] || plano.modality));
            if (plano.lessons_count) detalhes.appendChild(criarElemento("span", "", plano.lessons_count + (plano.lessons_count === 1 ? " aula" : " aulas")));
            if (plano.lesson_duration_minutes) detalhes.appendChild(criarElemento("span", "", plano.lesson_duration_minutes + " min por aula"));
            card.appendChild(detalhes);

            const acoes = criarElemento("div", "plano-professor-item-acoes");
            const editar = criarElemento("button", "plano-professor-botao-acao editar", "Editar");
            editar.type = "button";
            editar.addEventListener("click", function () { preencherFormulario(plano); });
            const alternar = criarElemento("button", "plano-professor-botao-acao status", plano.is_active ? "Desativar" : "Ativar");
            alternar.type = "button";
            alternar.addEventListener("click", function () { alterarStatusPlano(plano); });
            acoes.append(editar, alternar);
            card.appendChild(acoes);
            lista.appendChild(card);
        });
    }

    async function carregarPlanos() {
        lista.replaceChildren(criarElemento("p", "plano-professor-estado", "Carregando planos..."));
        const { data, error } = await supabaseClient
            .from("teacher_plans")
            .select("id, teacher_id, name, description, price, billing_type, modality, lessons_count, lesson_duration_minutes, is_active, created_at, updated_at")
            .eq("teacher_id", usuarioAtual.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Erro ao carregar planos do professor:", error);
            lista.replaceChildren(criarElemento("p", "plano-professor-estado", "Não foi possível carregar seus planos. Atualize a página e tente novamente."));
            return;
        }

        planos = data || [];
        renderizarPlanos();
    }

    async function alterarStatusPlano(plano) {
        const novoStatus = !plano.is_active;
        const { error } = await supabaseClient
            .from("teacher_plans")
            .update({ is_active: novoStatus, updated_at: new Date().toISOString() })
            .eq("id", plano.id)
            .eq("teacher_id", usuarioAtual.id);

        if (error) {
            console.error("Erro ao alterar status do plano:", error);
            mostrarMensagem("Não foi possível atualizar o status do plano.", true);
            return;
        }

        mostrarMensagem(novoStatus ? "Plano ativado." : "Plano desativado.");
        await carregarPlanos();
    }

    form.addEventListener("submit", async function (evento) {
        evento.preventDefault();
        if (salvando) return;

        const estavaEditando = Boolean(campoId.value);
        if (!estavaEditando && planos.length >= LIMITE_PLANOS) {
            mostrarMensagem("Você já atingiu o limite de 2 planos. Edite um plano existente para fazer alterações.", true);
            atualizarDisponibilidadeCadastro();
            return;
        }

        const nome = campoNome.value.trim();
        const preco = Number(campoPreco.value);
        const quantidade = campoAulas.value.trim() === "" ? null : Number(campoAulas.value);
        const duracao = campoDuracao.value.trim() === "" ? null : Number(campoDuracao.value);
        const tipo = campoCobranca.value;

        if (nome.length < 3 || !Number.isFinite(preco) || preco <= 0) {
            mostrarMensagem("Informe um nome válido e um preço maior que zero.", true);
            return;
        }
        if (tipo === "pacote" && (!Number.isInteger(quantidade) || quantidade < 1)) {
            mostrarMensagem("Informe a quantidade de aulas do pacote.", true);
            campoAulas.focus();
            return;
        }
        if (quantidade !== null && (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 500)) {
            mostrarMensagem("A quantidade de aulas deve ficar entre 1 e 500.", true);
            return;
        }
        if (duracao !== null && (!Number.isInteger(duracao) || duracao < 15 || duracao > 300)) {
            mostrarMensagem("A duração deve ficar entre 15 e 300 minutos.", true);
            return;
        }

        const plano = {
            teacher_id: usuarioAtual.id,
            name: nome,
            description: campoDescricao.value.trim(),
            price: preco,
            billing_type: tipo,
            modality: campoModalidade.value,
            lessons_count: quantidade,
            lesson_duration_minutes: duracao,
            updated_at: new Date().toISOString()
        };

        salvando = true;
        botaoSalvar.disabled = true;
        botaoSalvar.textContent = "Salvando...";

        try {
            let resultado;
            if (campoId.value) {
                resultado = await supabaseClient
                    .from("teacher_plans")
                    .update(plano)
                    .eq("id", campoId.value)
                    .eq("teacher_id", usuarioAtual.id);
            } else {
                resultado = await supabaseClient.from("teacher_plans").insert(plano);
            }

            if (resultado.error) throw resultado.error;
            limparFormulario();
            mostrarMensagem(estavaEditando ? "Plano atualizado." : "Plano cadastrado.");
            await carregarPlanos();
        } catch (erro) {
            console.error("Erro ao salvar plano do professor:", erro);
            if (erro && erro.code === "23514" && String(erro.message || "").includes("Limite de 2 planos")) {
                mostrarMensagem("Você já atingiu o limite de 2 planos cadastrados.", true);
                await carregarPlanos();
            } else {
                mostrarMensagem("Não foi possível salvar o plano. Verifique os dados e tente novamente.", true);
            }
        } finally {
            salvando = false;
            botaoSalvar.disabled = false;
            botaoSalvar.textContent = campoId.value ? "Salvar alterações" : "Salvar plano";
        }
    });

    botaoAbrirFormulario.addEventListener("click", function () {
        if (planos.length >= LIMITE_PLANOS && !campoId.value) {
            atualizarDisponibilidadeCadastro();
            return;
        }
        definirFormularioAberto(containerFormulario.hidden);
    });
    botaoCancelar.addEventListener("click", function () {
        limparFormulario();
        definirFormularioAberto(false);
    });
    botaoAtualizar.addEventListener("click", carregarPlanos);

    async function iniciar() {
        if (typeof supabaseClient === "undefined" || !supabaseClient) {
            window.location.replace("index.html");
            return;
        }

        const resultadoUsuario = typeof obterUsuarioAutenticado === "function"
            ? await obterUsuarioAutenticado()
            : await supabaseClient.auth.getUser();
        const user = resultadoUsuario.data?.user;

        if (resultadoUsuario.error || !user) {
            window.location.replace("index.html");
            return;
        }

        const { data: perfil, error: erroPerfil } = await supabaseClient
            .from("profiles")
            .select("display_name, username, tipo_usuario")
            .eq("id", user.id)
            .maybeSingle();

        if (erroPerfil || !perfil || perfil.tipo_usuario !== "professor") {
            window.location.replace("inicio.html");
            return;
        }

        usuarioAtual = user;
        document.getElementById("nomeProfessorPainel").textContent =
            perfil.display_name || "Professor";
        document.getElementById("usernameProfessorPainel").textContent =
            perfil.username ? "@" + perfil.username : "";

        document.documentElement.classList.remove("verificando-sessao");
        if (window.atualizarIcones) window.atualizarIcones();

        await carregarPlanos();
    }

    iniciar().catch(function (erro) {
        console.error("Falha ao iniciar gerenciamento de planos:", erro);
        lista.replaceChildren(criarElemento("p", "plano-professor-estado", "Não foi possível iniciar o gerenciamento de planos."));
    });
})();
