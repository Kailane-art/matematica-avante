// ================================================
// REDEFINIÇÃO GLOBAL DO PROGRESSO (NOV/2026)
// Remove dados antigos locais uma única vez em cada navegador.
// Preserva tema, sessão e identificação do usuário.
// ================================================

const CHAVE_REDEFINICAO_GLOBAL = "matematicaAvanteProgressoReset20261122";

if (localStorage.getItem(CHAVE_REDEFINICAO_GLOBAL) !== "concluido") {
    [
        "xpUsuario",
        "diasEstudados",
        "ultimaAtividade",
        "progressoNiveis"
    ].forEach(function(chave) {
        localStorage.removeItem(chave);
    });

    localStorage.setItem(CHAVE_REDEFINICAO_GLOBAL, "concluido");
}

// ================================
// ÍCONES LUCIDE
// ================================

function atualizarIcones(){

    if(window.lucide){

        lucide.createIcons();

    }

}




// ================================
// MODO ESCURO COM LOCALSTORAGE
// ================================

const botaoModo = document.getElementById("modoEscuro");



const preferenciaTemaDispositivo = window.matchMedia("(prefers-color-scheme: dark)");
const paginaLogin = window.location.pathname.endsWith("/") || window.location.pathname.split("/").pop() === "index.html";

// Identifica a página antes da montagem do menu lateral.
const caminhoAtual = window.location.pathname.replace(/\/+$/, "");
const nomePaginaAtual = caminhoAtual.split("/").pop() || "index.html";
const paginaAtual = nomePaginaAtual.endsWith(".html")
    ? nomePaginaAtual
    : `${nomePaginaAtual}.html`;

function aplicarTemaGlobal(preferencia) {
    const temaEscuro = preferencia === "escuro" ||
        (preferencia === "dispositivo" && preferenciaTemaDispositivo.matches);

    document.body.classList.toggle("modo-escuro", temaEscuro);
}

const temaSalvo = paginaLogin
    ? "dispositivo"
    : (localStorage.getItem("tema") || "dispositivo");
aplicarTemaGlobal(temaSalvo);

preferenciaTemaDispositivo.addEventListener("change", function(evento) {
    if (
        paginaLogin ||
        (localStorage.getItem("tema") || "dispositivo") === "dispositivo"
    ) {
        document.body.classList.toggle("modo-escuro", evento.matches);
    }
});

if(botaoModo){
    botaoModo.addEventListener("click", function(){
        const novoTema = document.body.classList.contains("modo-escuro") ? "claro" : "escuro";
        localStorage.setItem("tema", novoTema);
        aplicarTemaGlobal(novoTema);

        if (typeof salvarPreferenciaUsuario === "function") {
            salvarPreferenciaUsuario({ theme: novoTema });
        }
    });
}





// ================================
// // BOTÃO VOLTAR
// ================================

const botaoVoltar = document.getElementById("voltarPagina");



if(botaoVoltar){


    botaoVoltar.addEventListener("click", function(){


        history.back();


    });


}       // ================================
// MENU LATERAL
// ================================


const botaoMenu = document.getElementById("botaoMenu");

const menuLateral = document.getElementById("menuLateral");

// Padroniza a ordem e os destinos do menu lateral em todas as páginas.
const fundoMenu = document.getElementById("fundoMenu");

const itensPadraoMenu = [
    { href: "inicio.html", texto: "Voltar ao início", icone: "house" },
    { href: "perfil.html", texto: "Perfil", icone: "user-round" },
    { href: "rankings.html", texto: "Rankings", icone: "trophy" },
    { href: "desafios.html", texto: "Desafios", icone: "swords" },
    { href: "chat.html", texto: "Chat", icone: "messages-square" },
    { href: "materias.html", texto: "Matérias", icone: "book-open" },
    { href: "atividades.html", texto: "Atividades", icone: "clipboard-list" },
    { href: "professores.html", texto: "Professores", icone: "graduation-cap" },
    { href: "planos.html", texto: "Planos e Assinaturas", icone: "credit-card" },
    { href: "configuracoes.html", texto: "Configurações", icone: "settings" },
    { href: "alertas.html", texto: "Alertas e Eventos", icone: "megaphone" },
    { href: "sobre.html", texto: "Sobre", icone: "info" }
];

if (menuLateral) {
    const linksExistentes = Array.from(menuLateral.querySelectorAll(".menu-item"));
    const linksUtilizados = new Set();
    const tituloMenu = menuLateral.querySelector("h2");
    let ultimoItemMenu = tituloMenu;

    itensPadraoMenu.forEach(function(item) {
        let link = linksExistentes.find(function(elemento) {
            if (linksUtilizados.has(elemento)) return false;
            const destino = elemento.getAttribute("href");
            if (destino) {
                try {
                    return new URL(destino, window.location.href).pathname.endsWith("/" + item.href);
                } catch (erro) {
                    return false;
                }
            }
            return elemento.querySelector("span")?.textContent.trim().toLowerCase() === item.texto.toLowerCase();
        });

        if (!link) {
            link = document.createElement("a");
            link.className = "menu-item";
        } else if (link.tagName !== "A") {
            const linkAntigo = link;
            link = document.createElement("a");
            link.className = linkAntigo.className || "menu-item";
            linkAntigo.replaceWith(link);
        }

        linksUtilizados.add(link);
        link.href = item.href;
        link.classList.add("menu-item");
        link.setAttribute("aria-label", item.texto);
        link.innerHTML = '<i data-lucide="' + item.icone + '"></i><span>' + item.texto + '</span>';

        if (ultimoItemMenu) {
            ultimoItemMenu.insertAdjacentElement("afterend", link);
            ultimoItemMenu = link;
        } else {
            menuLateral.appendChild(link);
        }
    });

    // Remove links duplicados dos itens padronizados.
    linksExistentes.forEach(function(link) {
        if (linksUtilizados.has(link)) return;
        const destino = link.getAttribute("href");
        const texto = link.querySelector("span")?.textContent.trim().toLowerCase();
        const itemConhecido = itensPadraoMenu.some(function(item) {
            return destino === item.href || texto === item.texto.toLowerCase();
        });
        if (itemConhecido) link.remove();
    });

    // Retira somente o link que aponta para a página atualmente aberta.
    let caminhoAtualMenu = window.location.pathname;
    while (caminhoAtualMenu.length > 1 && caminhoAtualMenu.endsWith("/")) {
        caminhoAtualMenu = caminhoAtualMenu.slice(0, -1);
    }

    menuLateral.querySelectorAll("a.menu-item[href]").forEach(function(link) {
        try {
            let caminhoDestino = new URL(link.getAttribute("href"), window.location.href).pathname;
            while (caminhoDestino.length > 1 && caminhoDestino.endsWith("/")) {
                caminhoDestino = caminhoDestino.slice(0, -1);
            }
            if (caminhoDestino === caminhoAtualMenu) link.remove();
        } catch (erro) {
            console.warn("Não foi possível verificar um link do menu lateral:", erro);
        }
    });

    // Na página inicial, o acesso ao perfil permanece pelo avatar do cabeçalho.
    if (paginaAtual === "inicio.html") {
        menuLateral.querySelectorAll('a.menu-item[href="perfil.html"]').forEach(function(link) {
            link.remove();
        });
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}




function abrirMenu(){


    if(menuLateral && fundoMenu){


        menuLateral.classList.add("aberto");

        fundoMenu.classList.add("ativo");


    }


}



function fecharMenu(){


    if(menuLateral && fundoMenu){


        menuLateral.classList.remove("aberto");

        fundoMenu.classList.remove("ativo");


    }


}





if(botaoMenu){


    botaoMenu.addEventListener("click", function(){



        if(menuLateral.classList.contains("aberto")){


            fecharMenu();



        }else{


            abrirMenu();



        }



    });


}





if(fundoMenu){


    fundoMenu.addEventListener("click", function(){


        fecharMenu();


    });


}




// ================================
// AUTENTICAÇÃO - SUPABASE
// ================================

const SUPABASE_URL = "https://yeinyqmpofdlpskvqqlz.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_0aF8pNMEGN6wgAKrPVy3hw_zS0EQ9hp";

let supabaseClient = null;

if (window.supabase && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
}

// Compartilha apenas verificações de sessão simultâneas.
// A promessa é descartada ao terminar, evitando manter dados de usuário em cache.
let verificacaoUsuarioEmAndamento = null;

function obterUsuarioAutenticado() {
    if (!supabaseClient) {
        return Promise.resolve({
            data: { user: null },
            error: new Error("A conexão com o Supabase não está disponível.")
        });
    }

    if (!verificacaoUsuarioEmAndamento) {
        verificacaoUsuarioEmAndamento = supabaseClient.auth.getUser()
            .finally(function() {
                verificacaoUsuarioEmAndamento = null;
            });
    }

    return verificacaoUsuarioEmAndamento;
}

/* ================================================
   PRESENÇA ONLINE GLOBAL
   Supabase Realtime Presence, sem persistir status no banco.
================================================ */

let canalPresencaOnline = null;
let usuarioPresencaOnlineId = null;
let presencaOnlineHabilitada = true;
let presencaOnlineConectada = false;

window.maPresencaOnline = new Set();

const TEMPO_TOLERANCIA_PRESENCA = 60 * 1000;
const CHAVE_ULTIMA_PRESENCA = "ma:presenca-ultima-atividade";
let presencaOnlineAtivos = new Set();

function lerUltimasPresencas() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_ULTIMA_PRESENCA) || "{}");
        return dados && typeof dados === "object" && !Array.isArray(dados) ? dados : {};
    } catch (erro) {
        console.warn("Não foi possível ler o histórico temporário de presença:", erro);
        return {};
    }
}

function publicarPresencaOnline() {
    const estado = canalPresencaOnline ? canalPresencaOnline.presenceState() : {};
    const ativos = new Set();
    const ocultos = new Set();

    Object.values(estado).forEach(function(sessoes) {
        (sessoes || []).forEach(function(sessao) {
            if (!sessao || !sessao.user_id) return;

            if (sessao.show_online_status === false) {
                ocultos.add(sessao.user_id);
            } else {
                ativos.add(sessao.user_id);
            }
        });
    });

    const agora = Date.now();
    const ultimasPresencas = lerUltimasPresencas();

    // A preferência de privacidade deve ocultar o usuário imediatamente.
    ocultos.forEach(function(usuarioId) {
        delete ultimasPresencas[usuarioId];
    });

    // Quando alguém sai do site, inicia a tolerância de 60 segundos.
    presencaOnlineAtivos.forEach(function(usuarioId) {
        if (!ativos.has(usuarioId) && !ocultos.has(usuarioId)) {
            ultimasPresencas[usuarioId] = agora;
        }
    });

    // Enquanto a pessoa continua conectada, renova sua última atividade.
    ativos.forEach(function(usuarioId) {
        ultimasPresencas[usuarioId] = agora;
    });

    const visiveis = new Set(ativos);
    Object.entries(ultimasPresencas).forEach(function([usuarioId, ultimaAtividade]) {
        const timestamp = Number(ultimaAtividade);

        if (!Number.isFinite(timestamp) || agora - timestamp >= TEMPO_TOLERANCIA_PRESENCA) {
            delete ultimasPresencas[usuarioId];
            return;
        }

        visiveis.add(usuarioId);
    });

    presencaOnlineAtivos = ativos;
    window.maPresencaOnline = visiveis;

    try {
        localStorage.setItem(CHAVE_ULTIMA_PRESENCA, JSON.stringify(ultimasPresencas));
    } catch (erro) {
        console.warn("Não foi possível salvar o histórico temporário de presença:", erro);
    }

    window.dispatchEvent(new CustomEvent("ma:presenca-atualizada", {
        detail: { userIds: Array.from(visiveis) }
    }));
}

// Renova a presença observada e remove os estados que ultrapassaram 60 segundos.
setInterval(publicarPresencaOnline, 15000);

function aplicarPresencaNoAvatar(elemento) {
    if (!elemento || !elemento.dataset.presenceUserId) return;

    const online = window.maPresencaOnline.has(elemento.dataset.presenceUserId);
    let indicador = elemento.querySelector(".chat-status-online");

    if (online && !indicador) {
        indicador = document.createElement("span");
        indicador.className = "chat-status-online";
        indicador.setAttribute("role", "img");
        indicador.setAttribute("aria-label", "Usuário online");
        indicador.title = "Online";
        elemento.appendChild(indicador);
    } else if (!online && indicador) {
        indicador.remove();
    }
}

window.atualizarIndicadorPresenca = function(elemento, usuarioId) {
    if (!elemento || !usuarioId) return;
    elemento.dataset.presenceUserId = usuarioId;
    aplicarPresencaNoAvatar(elemento);
};

window.addEventListener("ma:presenca-atualizada", function() {
    document.querySelectorAll(".chat-avatar[data-presence-user-id]").forEach(aplicarPresencaNoAvatar);
});

async function alterarPreferenciaPresencaOnline(ativa) {
    presencaOnlineHabilitada = ativa !== false;

    if (!canalPresencaOnline || !presencaOnlineConectada) return;

    try {
        await canalPresencaOnline.track({
            user_id: usuarioPresencaOnlineId,
            show_online_status: presencaOnlineHabilitada
        });
        publicarPresencaOnline();
    } catch (erro) {
        console.error("Não foi possível atualizar a presença online:", erro);
    }
}

window.addEventListener("ma:status-online-configurado", function(evento) {
    alterarPreferenciaPresencaOnline(evento.detail?.enabled);
});

window.addEventListener("storage", function(evento) {
    const chaveEsperada = usuarioPresencaOnlineId
        ? "ma:showOnlineStatus:" + usuarioPresencaOnlineId
        : null;

    if (chaveEsperada && evento.key === chaveEsperada) {
        alterarPreferenciaPresencaOnline(evento.newValue !== "false");
    }
});

async function iniciarPresencaOnlineGlobal() {
    if (!supabaseClient || paginaLogin || canalPresencaOnline) return;

    try {
        const { data: { user }, error: erroUsuario } = await obterUsuarioAutenticado();
        if (erroUsuario || !user) return;

        usuarioPresencaOnlineId = user.id;

        const preferencias = await obterPreferenciasBanco(user.id);
        presencaOnlineHabilitada = preferencias?.show_online_status !== false;

        await supabaseClient.realtime.setAuth();

        canalPresencaOnline = supabaseClient.channel("matematica-avante-online", {
            config: {
                private: true,
                presence: { key: user.id }
            }
        });

        canalPresencaOnline
            .on("presence", { event: "sync" }, publicarPresencaOnline)
            .on("presence", { event: "join" }, publicarPresencaOnline)
            .on("presence", { event: "leave" }, publicarPresencaOnline)
            .subscribe(async function(status) {
                if (status === "SUBSCRIBED") {
                    presencaOnlineConectada = true;
                    await alterarPreferenciaPresencaOnline(presencaOnlineHabilitada);
                    publicarPresencaOnline();
                } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
                    presencaOnlineConectada = false;
                    console.error("Não foi possível conectar a presença online:", status);
                }
            });
    } catch (erro) {
        console.error("Não foi possível iniciar a presença online:", erro);
    }
}

iniciarPresencaOnlineGlobal();

function aplicarTamanhoTextoGlobal(tamanho) {
    const escalas = { 1: "0.88", 2: "0.94", 3: "1", 4: "1.08", 5: "1.16" };
    const valor = Math.min(5, Math.max(1, Number(tamanho) || 3));
    document.documentElement.style.setProperty("--escala-texto", escalas[valor]);
    document.documentElement.dataset.tamanhoTexto = String(valor);
}

aplicarTamanhoTextoGlobal(localStorage.getItem("tamanhoTexto") || 3);

async function salvarPreferenciaUsuario(alteracoes) {
    if (!supabaseClient) return;
    try {
        const { data: { user }, error: erroUsuario } = await obterUsuarioAutenticado();
        if (erroUsuario || !user) return;
        const { error } = await supabaseClient
            .from("user_settings")
            .upsert({
                user_id: user.id,
                ...alteracoes,
                updated_at: new Date().toISOString()
            }, { onConflict: "user_id" });
        if (error) throw error;
    } catch (erro) {
        console.error("Não foi possível sincronizar a preferência:", erro);
    }
}

// Compartilha a leitura das preferências quando presença e interface inicializam juntas.
let leituraPreferenciasEmAndamento = null;
let usuarioLeituraPreferenciasId = null;

function obterPreferenciasBanco(usuarioId) {
    if (!supabaseClient || !usuarioId) return Promise.resolve(null);

    if (
        !leituraPreferenciasEmAndamento ||
        usuarioLeituraPreferenciasId !== usuarioId
    ) {
        usuarioLeituraPreferenciasId = usuarioId;
        leituraPreferenciasEmAndamento = supabaseClient
            .from("user_settings")
            .select("theme, text_size, show_online_status")
            .eq("user_id", usuarioId)
            .maybeSingle()
            .then(function(resultado) {
                if (resultado.error) throw resultado.error;
                return resultado.data;
            })
            .finally(function() {
                leituraPreferenciasEmAndamento = null;
                usuarioLeituraPreferenciasId = null;
            });
    }

    return leituraPreferenciasEmAndamento;
}

async function carregarPreferenciasGlobais() {
    if (!supabaseClient) return;
    try {
        const { data: { user }, error: erroUsuario } = await obterUsuarioAutenticado();
        if (erroUsuario || !user) return;
        const data = await obterPreferenciasBanco(user.id);
        if (!data) return;

        if (!paginaLogin && data.theme) {
            localStorage.setItem("tema", data.theme);
            aplicarTemaGlobal(data.theme);
        }
        if (data.text_size != null) {
            localStorage.setItem("tamanhoTexto", String(data.text_size));
            aplicarTamanhoTextoGlobal(data.text_size);
        }
        presencaOnlineHabilitada = data.show_online_status !== false;
    } catch (erro) {
        console.error("Não foi possível carregar as preferências globais:", erro);
    }
}

carregarPreferenciasGlobais();

// ================================
// PROTEÇÃO DE PÁGINAS COM LOGIN
// ================================

const paginasProtegidas = new Set([
    "inicio.html",
    "rankings.html",
    "desafios.html",
    "perfil.html",
    "perfil-publico.html",
    "chat.html",
    "conversa.html",
    "materias.html",
    "atividades.html",
    "desafios-diarios.html",
    "professores.html",
    "geometria.html",
    "basico.html",
    "algebra.html",
    "funcoes.html",
    "aprender-basico.html",
    "aprender-geometria.html",
    "aprender-algebra.html",
    "aprender-funcoes.html",
    "fracoes.html",
    "aprender-fracoes.html",
    "potenciacao.html",
    "aprender-potenciacao.html",
    "porcentagem.html",
    "aprender-porcentagem.html",
    "estatistica.html",
    "aprender-estatistica.html",
    "probabilidade.html",
    "aprender-probabilidade.html",
    "trigonometria.html",
    "aprender-trigonometria.html",
    "nivel1.html",
    "nivel2.html",
    "nivel3.html",
    "nivel4.html",
    "nivel5.html",
    
    
    
    
    "planos.html",
    "configuracoes.html",
    "alertas.html"
]);

if (paginasProtegidas.has(paginaAtual)) {

    (async function(){

        try {

            if (!supabaseClient) {
                window.location.replace("index.html");
                return;
            }

            const { data: { user }, error } =
                await obterUsuarioAutenticado();

      if (error || !user) {
    window.location.replace("index.html");
} else {
    document.documentElement.classList.remove("verificando-sessao");
}
        } catch (erro) {

            console.error("Erro ao verificar sessão:", erro);
            window.location.replace("index.html");

        }

    })();

                } 
// ================================
// ABAS DE LOGIN E CADASTRO
// ================================

const abaLogin = document.getElementById("abaLogin");
const abaCadastro = document.getElementById("abaCadastro");

const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");


if (abaLogin && abaCadastro && formLogin && formCadastro) {

    abaLogin.addEventListener("click", function(){

        formLogin.hidden = false;
        formCadastro.hidden = true;

        abaLogin.classList.add("ativa");
        abaCadastro.classList.remove("ativa");

    });


    abaCadastro.addEventListener("click", function(){

        formLogin.hidden = true;
        formCadastro.hidden = false;

        abaCadastro.classList.add("ativa");
        abaLogin.classList.remove("ativa");

    });

}

// ================================
// CADASTRO E LOGIN - SUPABASE
// ================================

const mensagemAutenticacao = document.getElementById("mensagemAutenticacao");

const botaoCadastrar = document.getElementById("botaoCadastrar");
const botaoEntrar = document.getElementById("botaoEntrar");


// Exibir mensagens de autenticação

function mostrarMensagemAutenticacao(texto) {

    if (mensagemAutenticacao) {

        mensagemAutenticacao.textContent = texto;

    }

}

// Comunicação com o fluxo seguro de autoexclusão.
async function chamarServicoAutoexclusao(payload) {
    const { data, error } = await supabaseClient.functions.invoke(
        "account-self-service",
        { body: payload }
    );

    if (error) {
        let mensagem = error.message || "Falha ao comunicar com o serviço de conta.";
        if (error.context && typeof error.context.json === "function") {
            try {
                const detalhe = await error.context.json();
                if (detalhe && detalhe.error) mensagem = detalhe.error;
            } catch (erroLeitura) {
                console.warn("Não foi possível ler o detalhe do erro da função:", erroLeitura);
            }
        }
        throw new Error(mensagem);
    }
    if (data && data.error) throw new Error(data.error);
    return data;
}

// Link de confirmação/recuperação só é consumido após um clique explícito.
// Isso evita que verificadores automáticos de links consumam o token ao abrir a página.
function prepararAcaoDeAutoexclusao() {
    const parametros = new URLSearchParams(window.location.search);
    const acao = parametros.get("acao");
    const token = parametros.get("token");

    if (!["confirmar-exclusao", "recuperar-exclusao"].includes(acao)) return;

    const painel = document.getElementById("painelAcaoConta");
    const abas = document.querySelector(".auth-abas");
    const login = document.getElementById("formLogin");
    const cadastro = document.getElementById("formCadastro");
    const titulo = document.getElementById("tituloAcaoConta");
    const descricao = document.getElementById("descricaoAcaoConta");
    const botao = document.getElementById("botaoExecutarAcaoConta");
    const resultado = document.getElementById("resultadoAcaoConta");

    if (!painel || !titulo || !descricao || !botao || !resultado) return;

    if (abas) abas.hidden = true;
    if (login) login.hidden = true;
    if (cadastro) cadastro.hidden = true;
    if (mensagemAutenticacao) mensagemAutenticacao.hidden = true;
    painel.hidden = false;

    const confirmarExclusao = acao === "confirmar-exclusao";
    titulo.textContent = confirmarExclusao
        ? "Confirmar exclusão da conta"
        : "Recuperar conta";
    descricao.textContent = confirmarExclusao
        ? "Ao confirmar, sua conta será desativada e começará o prazo de 30 dias para recuperação. Até este clique, nada será alterado."
        : "Ao confirmar, a solicitação de exclusão será cancelada e sua conta será reativada. Depois disso, você poderá entrar novamente com seu e-mail e senha.";
    botao.textContent = confirmarExclusao
        ? "Confirmar exclusão da conta"
        : "Cancelar exclusão e reativar conta";

    if (!token || !/^[a-f0-9]{64}$/i.test(token)) {
        botao.disabled = true;
        resultado.textContent = "Este link está incompleto ou é inválido.";
        return;
    }

    botao.addEventListener("click", async function() {
        botao.disabled = true;
        resultado.textContent = confirmarExclusao
            ? "Confirmando a exclusão..."
            : "Reativando sua conta...";

        try {
            const resposta = await chamarServicoAutoexclusao({
                action: confirmarExclusao ? "confirm_deletion" : "recover",
                token: token
            });

            if (confirmarExclusao) {
                try {
                    await supabaseClient.auth.signOut({ scope: "local" });
                } catch (erroSessao) {
                    console.warn("A sessão local já pode estar inválida:", erroSessao);
                }

                localStorage.removeItem("nomeUsuario");
                localStorage.removeItem("tipoUsuario");
                localStorage.removeItem("fotoPerfil");
            }

            resultado.textContent = resposta.message ||
                (confirmarExclusao
                    ? "Exclusão confirmada. O prazo de 30 dias começou."
                    : "Exclusão cancelada. Sua conta foi reativada.");
            botao.textContent = "Concluído";
            window.history.replaceState({}, document.title, window.location.pathname);
        } catch (erro) {
            console.error("Erro na ação de autoexclusão:", erro);
            resultado.textContent = erro.message || "Não foi possível concluir esta ação. Solicite um novo link ou tente novamente.";
            botao.disabled = false;
        }
    });
}


// Carregar perfil e entrar no sistema

async function carregarPerfilEEntrar(usuario) {

    const { data, error } = await supabaseClient
        .from("profiles")
        .select("display_name, tipo_usuario")
        .eq("id", usuario.id)
        .single();

    if (error || !data) {

        mostrarMensagemAutenticacao(
            "Sua conta foi autenticada, mas não foi possível carregar seu perfil. Tente novamente."
        );

        return false;

    }

    localStorage.setItem("nomeUsuario", data.display_name);
    localStorage.setItem("tipoUsuario", data.tipo_usuario);

    window.location.href = "inicio.html";

    return true;

}


// CADASTRAR CONTA

if (formCadastro) {

    formCadastro.addEventListener("submit", async function(event) {

        event.preventDefault();

        if (!supabaseClient) {

            mostrarMensagemAutenticacao(
                "Não foi possível conectar ao sistema de autenticação."
            );

            return;

        }

        const nome = document
            .getElementById("nomeExibicao")
            .value.trim();

        const username = document
            .getElementById("usernameCadastro")
            .value.trim()
            .toLowerCase();

        const email = document
            .getElementById("emailCadastro")
            .value.trim();

        const senha = document
            .getElementById("senhaCadastro")
            .value;

        const confirmarSenha = document
            .getElementById("confirmarSenha")
            .value;


        if (nome.length === 0 || nome.length > 50) {

            mostrarMensagemAutenticacao(
                "Informe um nome de exibição com até 50 caracteres."
            );

            return;

        }

        if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {

            mostrarMensagemAutenticacao(
                "O nome de usuário deve ter de 3 a 20 caracteres, usando letras, números ou sublinhado."
            );

            return;

        }

        if (senha.length < 6) {

            mostrarMensagemAutenticacao(
                "A senha precisa ter pelo menos 6 caracteres."
            );

            return;

        }

        if (senha !== confirmarSenha) {

            mostrarMensagemAutenticacao(
                "As senhas não são iguais."
            );

            return;

        }


        botaoCadastrar.disabled = true;

        mostrarMensagemAutenticacao(
            "Criando sua conta..."
        );


        try {

            const { data, error } = await supabaseClient.auth.signUp({

                email: email,

                password: senha,

                options: {

                    data: {
                        display_name: nome,
                        username: username
                    },

                    emailRedirectTo:
                        "https://kailane-art.github.io/matematica-avante/index.html"

                }

            });


            if (error) {

                const detalhesErro = (
                    error.message + " " +
                    (error.details || "") + " " +
                    (error.hint || "")
                ).toLowerCase();

                if (
                    detalhesErro.includes("duplicate key") ||
                    detalhesErro.includes("profiles_username")
                ) {

                    throw new Error(
                        "Esse nome de usuário já está em uso. Escolha outro."
                    );

                }

                if (detalhesErro.includes("already registered")) {

                    throw new Error(
                        "Esse email já possui uma conta cadastrada."
                    );

                }

                throw error;

            }


            if (data.session && data.user) {

                mostrarMensagemAutenticacao(
                    "Conta criada! Entrando no sistema..."
                );

                await carregarPerfilEEntrar(data.user);

            } else {

                mostrarMensagemAutenticacao(
                    "Conta criada! Verifique seu email para confirmar o cadastro antes de entrar."
                );

                formCadastro.reset();

            }

        } catch (erro) {

            console.error("Erro no cadastro:", erro);

            mostrarMensagemAutenticacao(
                erro.message || "Não foi possível criar sua conta."
            );

        } finally {

            botaoCadastrar.disabled = false;

        }

    });

}


// ENTRAR NA CONTA

if (formLogin) {

    formLogin.addEventListener("submit", async function(event) {

        event.preventDefault();

        if (!supabaseClient) {

            mostrarMensagemAutenticacao(
                "Não foi possível conectar ao sistema de autenticação."
            );

            return;

        }

        const email = document
            .getElementById("emailLogin")
            .value.trim();

        const senha = document
            .getElementById("senhaLogin")
            .value;


        botaoEntrar.disabled = true;

        mostrarMensagemAutenticacao(
            "Verificando seus dados..."
        );


        try {

            const { data, error } =
                await supabaseClient.auth.signInWithPassword({

                    email: email,
                    password: senha

                });


            if (error) {

                throw error;

            }


            if (!data.user) {

                throw new Error(
                    "Não foi possível identificar sua conta."
                );

            }


            mostrarMensagemAutenticacao(
                "Login realizado! Carregando seu perfil..."
            );

            await carregarPerfilEEntrar(data.user);


        } catch (erro) {

            console.error("Erro no login:", erro);

            const codigoErro = String(erro?.code || "").toLowerCase();
            const mensagemErro = String(erro?.message || "").toLowerCase();
            const contaBanida =
                codigoErro === "user_banned" ||
                mensagemErro.includes("banned") ||
                mensagemErro.includes("banido");

            if (contaBanida) {
                mostrarMensagemAutenticacao(
                    "Esta conta está temporariamente impedida de entrar. Se você iniciou uma exclusão, poderá solicitar a recuperação por e-mail."
                );

                const painelRecuperacao = document.getElementById("painelRecuperacaoExclusao");
                if (painelRecuperacao) painelRecuperacao.hidden = false;
            } else {
                mostrarMensagemAutenticacao(
                    "Email ou senha incorretos, ou sua conta ainda não foi confirmada."
                );
            }

        } finally {

            botaoEntrar.disabled = false;

        }

    });

}

// Recuperação da autoexclusão durante a tentativa de login.
const botaoConfirmarRecuperacaoConta = document.getElementById("botaoConfirmarRecuperacaoConta");
const botaoCancelarRecuperacaoConta = document.getElementById("botaoCancelarRecuperacaoConta");
const painelRecuperacaoExclusao = document.getElementById("painelRecuperacaoExclusao");

if (botaoConfirmarRecuperacaoConta) {
    botaoConfirmarRecuperacaoConta.addEventListener("click", async function() {
        const email = document.getElementById("emailLogin")?.value.trim();
        if (!email) {
            mostrarMensagemAutenticacao("Informe o e-mail da conta para solicitar a recuperação.");
            return;
        }

        botaoConfirmarRecuperacaoConta.disabled = true;
        mostrarMensagemAutenticacao("Solicitando o link seguro de recuperação...");

        try {
            const resposta = await chamarServicoAutoexclusao({
                action: "request_recovery",
                email: email
            });
            mostrarMensagemAutenticacao(resposta.message || "Se a conta estiver em período de exclusão, enviaremos um link de recuperação.");
        } catch (erro) {
            console.error("Erro ao solicitar recuperação da conta:", erro);
            mostrarMensagemAutenticacao(erro.message || "Não foi possível solicitar a recuperação agora.");
        } finally {
            botaoConfirmarRecuperacaoConta.disabled = false;
        }
    });
}

if (botaoCancelarRecuperacaoConta) {
    botaoCancelarRecuperacaoConta.addEventListener("click", function() {
        if (painelRecuperacaoExclusao) painelRecuperacaoExclusao.hidden = true;
        mostrarMensagemAutenticacao("Você continuará desconectado. Se houver uma exclusão em andamento, o prazo continuará normalmente.");
    });
}

prepararAcaoDeAutoexclusao();

// ================================
// RECUPERAÇÃO DE SENHA
// ================================

const botaoRecuperarSenha = document.getElementById("botaoRecuperarSenha");

if (botaoRecuperarSenha) {

    botaoRecuperarSenha.addEventListener("click", async function() {

        if (!supabaseClient) {

            mostrarMensagemAutenticacao(
                "Não foi possível conectar ao sistema."
            );

            return;

        }

        const email = document
            .getElementById("emailLogin")
            .value
            .trim();

        if (!email) {

            mostrarMensagemAutenticacao(
                "Digite seu email no campo acima para receber o link de recuperação."
            );

            document.getElementById("emailLogin").focus();

            return;

        }

        botaoRecuperarSenha.disabled = true;

        mostrarMensagemAutenticacao(
            "Enviando email de recuperação..."
        );

        try {

            const { error } = await supabaseClient.auth
                .resetPasswordForEmail(email, {

                    redirectTo:
                        "https://kailane-art.github.io/matematica-avante/redefinir-senha.html"

                });

            if (error) {

                throw error;

            }

            mostrarMensagemAutenticacao(
                "Se esse email estiver cadastrado, você receberá um link para redefinir sua senha. Confira também o spam."
            );

        } catch (erro) {

            console.error(
                "Erro na recuperação de senha:",
                erro
            );

            mostrarMensagemAutenticacao(
                "Não foi possível enviar o email. Tente novamente mais tarde."
            );

        } finally {

            botaoRecuperarSenha.disabled = false;

        }

    });

    }


let pontos = 0;


let questoesRespondidas = [];





function responderQuestao(numero, correta, botao){



    if(questoesRespondidas.includes(numero)){


        return;


    }





    questoesRespondidas.push(numero);





    const botoes = document.querySelectorAll(
        'button[onclick*="responderQuestao(' + numero + '"]'
    );





    botoes.forEach(function(item){


        item.disabled = true;


        item.classList.add("resposta-bloqueada");



    });





    if(correta){


        pontos++;


        botao.classList.add("resposta-correta");


        mostrarResultado("✅ Correto!");



    }else{


        botao.classList.add("resposta-errada");


        mostrarResultado("❌ Resposta errada.");



    }





    atualizarPontuacao();



}






function atualizarPontuacao(){



    const pontuacao = document.getElementById("pontuacao");



    if(pontuacao){



        if(pontos > 4){


            pontos = 4;


        }




        pontuacao.innerHTML =
        "Pontuação: " + pontos + "/4";



    }



}




function mostrarResultado(texto){



    const resultado =
    document.getElementById("resultado");



    if(resultado){


        resultado.innerHTML = texto;


    }



}      // ================================
// PRÓXIMA AULA
// ================================


function proximaAula(){


    window.location.href="aprender-basico.html";


}




// ================================
// ATUALIZAR ÍCONES AO CARREGAR
// ================================


atualizarIcones();
// ================================
// NOTIFICAÇÃO PREMIUM
// ================================

// Verifica o acesso Premium usando metadados protegidos do Supabase.
async function usuarioTemAcessoPremium(){

    if(!supabaseClient){

        return false;

    }

    try{

        const {
            data: { user },
            error
        } = await obterUsuarioAutenticado();

        if(error || !user){

            return false;

        }

        // O acesso especial é concedido à conta Dev autorizada.
        return user.app_metadata?.role === "admin_dev";

    }catch(erro){

        console.error("Erro ao verificar acesso Premium:", erro);

        return false;

    }

}


const niveisPremium =
document.querySelectorAll(".nivel-premium");

const notificacaoPremium =
document.getElementById("notificacaoPremium");

const fecharNotificacaoPremium =
document.getElementById("fecharNotificacaoPremium");


function abrirNotificacaoPremium(){

    if(!notificacaoPremium){

        return;

    }


    notificacaoPremium.hidden = false;


    atualizarIcones();

}


function fecharNotificacao(){

    if(!notificacaoPremium){

        return;

    }


    notificacaoPremium.hidden = true;

}


niveisPremium.forEach(function(nivel){

    nivel.addEventListener("click", async function(event){

        event.preventDefault();

        const acessoPremium = await usuarioTemAcessoPremium();

        if(acessoPremium){

            const destino = nivel.getAttribute("href");

            if(destino && destino !== "#"){

                window.location.href = destino;

            }

            return;

        }

        abrirNotificacaoPremium();

    });

});


if(fecharNotificacaoPremium){

    fecharNotificacaoPremium.addEventListener(
        "click",
        function(){

            fecharNotificacao();

        }
    );

} 
// ================================
// SEQUÊNCIA DE ESTUDOS (STREAK)
// ================================

const CHAVE_STREAK = "diasEstudados";

const CHAVE_ULTIMA_ATIVIDADE = "ultimaAtividade";

let diasEstudoSincronizados = null;
let diasEstudoVerificadosSincronizados = null;
// =====================================================
// OBTER DATA LOCAL NO FORMATO YYYY-MM-DD
// =====================================================

function obterDataHoje() {

    const data = new Date();

    const ano = data.getFullYear();

    const mes = String(
        data.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        data.getDate()
    ).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;

}


// =====================================================
// CONVERTER DATA YYYY-MM-DD EM OBJETO DATE
// =====================================================

function converterData(dataString) {

    const partes =
        dataString.split("-");

    return new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
    );

}


// =====================================================
// OBTER DIAS DE ESTUDO
// =====================================================

function obterDiasEstudados() {

    if (Array.isArray(diasEstudoSincronizados)) {

        return [...new Set(diasEstudoSincronizados)].sort();

    }

    const salvo =
        localStorage.getItem(
            CHAVE_STREAK
        );

    if (!salvo) {

        return [];

    }

    try {

        const dados =
            JSON.parse(salvo);

        if (!Array.isArray(dados)) {

            return [];

        }

        return [
            ...new Set(dados)
        ].sort();

    } catch (erro) {

        console.error(
            "Não foi possível carregar a sequência:",
            erro
        );

        return [];

    }

}

// A sequência oficial considera somente dias confirmados pelo servidor.
// O histórico completo continua disponível em obterDiasEstudados().
function obterDiasEstudadosVerificados() {

    if (Array.isArray(diasEstudoVerificadosSincronizados)) {

        return [...new Set(diasEstudoVerificadosSincronizados)].sort();

    }

    return obterDiasEstudados();

}


// =====================================================
// SALVAR DIAS DE ESTUDO
// =====================================================

function salvarDiasEstudados(
    dias
) {

    localStorage.setItem(
        CHAVE_STREAK,
        JSON.stringify(dias)
    );

}


// =====================================================
// REGISTRAR ESTUDO DO DIA
// =====================================================
//
// Responder uma ou várias questões no mesmo dia
// continua representando apenas um dia estudado.
// =====================================================

function registrarEstudoHoje() {

    const hoje =
        obterDataHoje();


    // Registra a data e hora da última questão respondida.

    localStorage.setItem(
        CHAVE_ULTIMA_ATIVIDADE,
        new Date().toISOString()
    );


    const dias =
        obterDiasEstudados();


    // Se o dia já foi registrado,
    // não adiciona novamente à sequência.

    if (
        dias.includes(hoje)
    ) {

        atualizarSequenciaInicio();

        return;

    }


    dias.push(hoje);

    dias.sort();

    salvarDiasEstudados(
        dias
    );


    atualizarSequenciaInicio();

}  
// =====================================================
// CALCULAR SEQUÊNCIA ATUAL
// =====================================================

function calcularSequenciaAtual() {

    const dias =
        obterDiasEstudadosVerificados();

    if (!dias.length) {

        return 0;

    }


    const hoje =
        converterData(
            obterDataHoje()
        );


    const ontem =
        new Date(hoje);

    ontem.setDate(
        ontem.getDate() - 1
    );


    const ultimoDia =
        converterData(
            dias[dias.length - 1]
        );


    // Se o último estudo não foi hoje nem ontem,
    // a sequência atual já foi quebrada.

    if (
        ultimoDia.getTime() <
        ontem.getTime()
    ) {

        return 0;

    }


    let sequencia = 1;

    let dataAtual =
        ultimoDia;


    for (
        let i = dias.length - 2;
        i >= 0;
        i--
    ) {

        const dataAnterior =
            converterData(
                dias[i]
            );


        const esperado =
            new Date(
                dataAtual
            );

        esperado.setDate(
            esperado.getDate() - 1
        );


        if (
            dataAnterior.getTime() !==
            esperado.getTime()
        ) {

            break;

        }


        sequencia++;

        dataAtual =
            dataAnterior;

    }


    // Caso o último dia estudado tenha sido ontem,
    // a sequência continua válida.
    //
    // Caso tenha sido hoje, também continua válida.

    return sequencia;

}


// =====================================================
// ATUALIZAR VISUAL DA SEQUÊNCIA
// =====================================================

function atualizarSequenciaInicio() {

    const diasSequencia =
        document.getElementById(
            "diasSequencia"
        );

    const numeroSequencia =
        document.getElementById(
            "numeroSequencia"
        );

    const textoSequencia =
        document.getElementById(
            "textoSequencia"
        );

    const areaSequencia =
        document.querySelector(
            ".sequencia"
        );

    if (
        !diasSequencia ||
        !areaSequencia
    ) {

        return;

    }


    const dias =
        calcularSequenciaAtual();


    const pontos =
        diasSequencia.querySelectorAll(
            ".dia-sequencia"
        );


    // =================================================
    // LIMPAR ESTADOS VISUAIS
    // =================================================

    areaSequencia.classList.remove(
        "streak-ativo",
        "streak-ciano"
    );


    pontos.forEach(
        function(ponto) {

            ponto.classList.remove(
                "ativo"
            );

        }
    );


    // =================================================
    // SE NÃO HOUVER SEQUÊNCIA
    // =================================================

    if (dias === 0) {

        diasSequencia.style.setProperty(
            "--progresso-sequencia",
            "0px"
        );


        if (numeroSequencia) {

            numeroSequencia.hidden =
                true;

            numeroSequencia.textContent =
                "";

        }


        if (textoSequencia) {

            textoSequencia.textContent =
                "0 dias seguidos";

        }


        return;

    }


    // =================================================
    // DEFINIR QUANTOS PONTOS FICAM ATIVOS
    // =================================================

    const quantidadeAtiva =
        Math.min(
            dias,
            7
        );


    for (
        let i = 0;
        i < quantidadeAtiva;
        i++
    ) {

        if (pontos[i]) {

            pontos[i].classList.add(
                "ativo"
            );

        }

    }


    // =================================================
    // COR DA SEQUÊNCIA
    // =================================================

    if (dias >= 8) {

        areaSequencia.classList.add(
            "streak-ciano"
        );

    } else {

        areaSequencia.classList.add(
            "streak-ativo"
        );

    }


    // =================================================
    // CALCULAR COMPRIMENTO DA BARRA
    // =================================================

    if (
        pontos.length >= 2 &&
        quantidadeAtiva >= 2
    ) {

        const primeiro =
            pontos[0]
                .getBoundingClientRect();

        const ultimo =
            pontos[
                quantidadeAtiva - 1
            ]
                .getBoundingClientRect();


        const distancia =
            ultimo.left +
            (
                ultimo.width / 2
            ) -
            (
                primeiro.left +
                (
                    primeiro.width / 2
                )
            );


        diasSequencia.style.setProperty(
            "--progresso-sequencia",
            Math.max(
                0,
                distancia
            ) + "px"
        );

    } else {

        diasSequencia.style.setProperty(
            "--progresso-sequencia",
            "0px"
        );

    }


    // =================================================
    // TEXTO
    // =================================================

    if (textoSequencia) {

        textoSequencia.textContent =
            dias === 1
                ? "1 dia seguido"
                : `${dias} dias seguidos`;

    }


    // =================================================
    // NÚMERO A PARTIR DO 8º DIA
    // =================================================

    if (numeroSequencia) {

        if (dias >= 8) {

            numeroSequencia.hidden =
                false;

            numeroSequencia.textContent =
                dias;

        } else {

            numeroSequencia.hidden =
                true;

            numeroSequencia.textContent =
                "";

        }

    }

}


// =====================================================
// ATUALIZAR SEQUÊNCIA AO REDIMENSIONAR
// =====================================================

window.addEventListener(
    "resize",
    function() {

        atualizarSequenciaInicio();

    }
);


// =====================================================
// ATUALIZAR SEQUÊNCIA AO CARREGAR A PÁGINA
// =====================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        atualizarSequenciaInicio
    );

} else {

    atualizarSequenciaInicio();

}  


// =====================================================
// INDICADORES E ÚLTIMA ATIVIDADE SINCRONIZADOS
// =====================================================

async function registrarUltimaAtividade(chave, nome, url) {

    if (!supabaseClient) return false;

    try {

        const { data: { user }, error: erroUsuario } =
            await obterUsuarioAutenticado();

        if (erroUsuario || !user) return false;

        const { error } = await supabaseClient.rpc(
            "record_user_last_activity",
            {
                p_activity_key: chave,
                p_activity_name: nome,
                p_activity_url: url
            }
        );

        if (error) throw error;

        return true;

    } catch (erro) {

        console.error("Não foi possível registrar a última atividade:", erro);
        return false;

    }

}


async function carregarIndicadoresUsuario() {

    if (!supabaseClient) return;

    try {

        const { data: { user }, error: erroUsuario } =
            await obterUsuarioAutenticado();

        if (erroUsuario || !user) return;

        // Evita exibir temporariamente datas legadas como sequência verificada.
        diasEstudoVerificadosSincronizados = [];
        atualizarSequenciaInicio();

        // Importa datas antigas do navegador sem duplicar registros.
        // O banco ignora dias que já existem para essa conta.
        const diasLegados = obterDiasEstudados().filter(function(data) {
            return typeof data === "string" &&
                /^\d{4}-\d{2}-\d{2}$/.test(data);
        });

        if (diasLegados.length > 0) {

            const { error: erroImportacao } = await supabaseClient.rpc(
                "import_legacy_study_days",
                {
                    p_study_dates: diasLegados
                }
            );

            if (erroImportacao) {
                console.warn(
                    "Não foi possível importar os dias antigos de estudo:",
                    erroImportacao
                );
            }

        }

        const [
            resultadoQuestoes,
            resultadoTaxaAcertos,
            resultadoDias,
            resultadoUltimaAtividade
        ] = await Promise.all([

            supabaseClient
                .from("user_question_attempts")
                .select("id", { count: "exact", head: true })
                .eq("user_id", user.id),

            supabaseClient
                .from("user_question_attempts")
                .select("is_correct")
                .eq("user_id", user.id),

            supabaseClient
                .from("user_study_days")
                .select("study_date, is_verified")
                .eq("user_id", user.id)
                .order("study_date", { ascending: true }),

            supabaseClient
                .from("user_last_activity")
                .select("activity_name, activity_url, last_accessed_at")
                .eq("user_id", user.id)
                .maybeSingle()

        ]);

        if (resultadoQuestoes.error) throw resultadoQuestoes.error;
        if (resultadoTaxaAcertos.error) throw resultadoTaxaAcertos.error;
        if (resultadoDias.error) throw resultadoDias.error;
        if (resultadoUltimaAtividade.error) {
            throw resultadoUltimaAtividade.error;
        }

        const elementoQuestoes = document.getElementById(
            "questoesRespondidasPerfil"
        );

        if (elementoQuestoes) {
            elementoQuestoes.textContent =
                resultadoQuestoes.count || 0;
        }

        const elementoTaxaAcertos = document.getElementById(
            "taxaAcertosResumo"
        );

        if (elementoTaxaAcertos) {
            const tentativas = resultadoTaxaAcertos.data || [];
            const totalRespostas = tentativas.length;
            const totalAcertos = tentativas.filter(function(tentativa) {
                return tentativa.is_correct === true;
            }).length;

            const taxaAcertos = totalRespostas > 0
                ? Math.round((totalAcertos / totalRespostas) * 100)
                : 0;

            elementoTaxaAcertos.textContent = taxaAcertos + "%";
        }

        const registrosDias = resultadoDias.data || [];

        // Mantém todo o histórico, inclusive datas legadas não verificadas.
        diasEstudoSincronizados = registrosDias
            .map(function(registro) {
                return registro.study_date;
            });

        // A sequência exibida usa apenas dias confirmados por atividades no servidor.
        diasEstudoVerificadosSincronizados = registrosDias
            .filter(function(registro) {
                return registro.is_verified === true;
            })
            .map(function(registro) {
                return registro.study_date;
            });

        atualizarSequenciaInicio();

        const sequenciaPerfil = document.getElementById(
            "sequenciaEstudosPerfil"
        );

        if (sequenciaPerfil) {

            const sequencia = calcularSequenciaAtual();

            sequenciaPerfil.textContent =
                sequencia === 1
                    ? "1 dia"
                    : sequencia + " dias";

        }

        const elementoUltimaAtividade = document.getElementById(
            "ultimaAtividade"
        );

        if (elementoUltimaAtividade) {

            const atividade = resultadoUltimaAtividade.data;
            const dataSalva = atividade?.last_accessed_at ||
                localStorage.getItem(CHAVE_ULTIMA_ATIVIDADE);

            if (dataSalva) {

                const data = new Date(dataSalva);

                if (!isNaN(data.getTime())) {

                    const dataFormatada = data.toLocaleDateString("pt-BR");
                    const horaFormatada = data.toLocaleTimeString(
                        "pt-BR",
                        {
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    );

                    elementoUltimaAtividade.textContent =
                        atividade?.activity_name
                            ? atividade.activity_name + " • " +
                              dataFormatada + " às " + horaFormatada
                            : dataFormatada + " às " + horaFormatada;

                }

            } else {

                elementoUltimaAtividade.textContent = "Nenhuma ainda";

            }

        }

    } catch (erro) {

        console.error("Não foi possível carregar os indicadores do usuário:", erro);

    }

}


// =====================================================
// REGISTRAR ACESSO A CONTEÚDOS EDUCACIONAIS
// =====================================================

const conteudosRastreaveis = {

    "basico.html": {
        chave: "basico",
        nome: "Básico da Matemática"
    },

    "geometria.html": {
        chave: "geometria",
        nome: "Geometria"
    },

    "algebra.html": {
        chave: "algebra",
        nome: "Álgebra"
    },

    "funcoes.html": {
        chave: "funcoes",
        nome: "Funções"
    },

    "nivel2.html": {
        chave: "nivel2",
        nome: "Nível 2"
    },

    "nivel3.html": {
        chave: "nivel3",
        nome: "Nível 3"
    },

    "nivel4.html": {
        chave: "nivel4",
        nome: "Nível 4"
    }

};

// =====================================================
// BOTÃO CONTINUAR ESTUDANDO
// =====================================================

const botaoContinuarEstudando = document.getElementById(
    "continuarEstudando"
);

if (botaoContinuarEstudando) {

    botaoContinuarEstudando.addEventListener("click", async function() {

        let destino = "atividades.html";

        try {

            if (supabaseClient) {

                const { data: { user }, error: erroUsuario } =
                    await obterUsuarioAutenticado();

                if (!erroUsuario && user) {

                    const { data, error } = await supabaseClient
                        .from("user_last_activity")
                        .select("activity_url")
                        .eq("user_id", user.id)
                        .maybeSingle();

                    if (error) throw error;

                    const ultimaUrl = data?.activity_url;

                    // Só aceita páginas educacionais que o sistema rastreia.
                    if (
                        typeof ultimaUrl === "string" &&
                        Object.prototype.hasOwnProperty.call(
                            conteudosRastreaveis,
                            ultimaUrl
                        )
                    ) {
                        destino = ultimaUrl;
                    }

                }

            }

        } catch (erro) {

            console.error(
                "Não foi possível recuperar a última atividade:",
                erro
            );

        }

        window.location.href = destino;

    });

}


const conteudoAtual = conteudosRastreaveis[paginaAtual];

if (conteudoAtual) {

    registrarUltimaAtividade(
        conteudoAtual.chave,
        conteudoAtual.nome,
        paginaAtual
    );

}


// Atualiza os painéis que exibem os indicadores do usuário.

if (
    document.getElementById("questoesRespondidasPerfil") ||
    document.getElementById("taxaAcertosResumo") ||
    document.getElementById("sequenciaEstudosPerfil") ||
    document.getElementById("diasSequencia") ||
    document.getElementById("ultimaAtividade")
) {

    carregarIndicadoresUsuario();

}


// =====================================================
// SISTEMA DE XP
// =====================================================

const CHAVE_XP = "xpUsuario";
const XP_POR_ACERTO = 10;
const XP_BONUS_FASE = 50;
const XP_POR_NIVEL = 500;
const MULTIPLICADOR_XP = localStorage.getItem("tipoUsuario") === "dev" ? 10 : 1;
const NIVEL_MAXIMO = MULTIPLICADOR_XP === 10 ? 100 : 10;


// =====================================================
// OBTER XP ATUAL
// =====================================================

function obterXP() {

    const salvo =
        localStorage.getItem(
            CHAVE_XP
        );

    const xp =
        Number(salvo);

    if (
        !Number.isFinite(xp) ||
        xp < 0
    ) {

        return 0;

    }

    return xp;

}


// =====================================================
// SALVAR XP
// =====================================================

function salvarXP(
    xp
) {

    localStorage.setItem(
        CHAVE_XP,
        String(xp)
    );

}


// =====================================================
// ADICIONAR XP
// =====================================================

function adicionarXP(
    quantidade
) {

    const xpAtual =
        obterXP();

    const novoXP =
        xpAtual + (quantidade * MULTIPLICADOR_XP);

    salvarXP(
        novoXP
    );

    return novoXP;

}


// =====================================================
// REGISTRAR XP DE RESPOSTA
// =====================================================

function registrarXPResposta(
    correta
) {

    if (!correta) {

        return obterXP();

    }

    return adicionarXP(
        XP_POR_ACERTO
    );

}


// =====================================================
// REGISTRAR BÔNUS DE CONCLUSÃO DE FASE
// =====================================================

function registrarXPConclusaoFase(
    dadosFase
) {

    if (!dadosFase) {

        return obterXP();

    }


    // Impede receber o mesmo bônus
    // de conclusão mais de uma vez.

    if (
        dadosFase.bonusXPRecebido === true
    ) {

        return obterXP();

    }


    dadosFase.bonusXPRecebido =
        true;


    return adicionarXP(
        XP_BONUS_FASE
    );

}


// =====================================================
// CALCULAR NÍVEL PELO XP
// =====================================================

function calcularNivelPorXP(
    xp
) {

    if (xp < XP_POR_NIVEL) {

        return 1;

    }


    const nivel =
        Math.floor(
            xp / XP_POR_NIVEL
        ) + 1;


    return Math.min(
        nivel,
        NIVEL_MAXIMO
    );

}


// =====================================================
// OBTER INFORMAÇÕES DO NÍVEL PELO XP
// =====================================================

function obterInformacoesNivel(
    xp
) {

    const nivel =
        calcularNivelPorXP(
            xp
        );


    if (
        nivel >= NIVEL_MAXIMO
    ) {

        return {

            nivel: NIVEL_MAXIMO,

            xpNoNivel: xp - ((NIVEL_MAXIMO - 1) * XP_POR_NIVEL),

            xpNecessario:
                0,

            nivelMaximo: true

        };

    }


    const inicioNivel =
        (nivel - 1) *
        XP_POR_NIVEL;


    const xpNoNivel =
        xp -
        inicioNivel;


    return {

        nivel: nivel,

        xpNoNivel:
            xpNoNivel,

        xpNecessario:
            XP_POR_NIVEL,

        nivelMaximo:
            false

    };

}

// =====================================================
// EDIÇÃO DO PERFIL - SUPABASE
// =====================================================

const botaoEditarPerfil =
    document.getElementById("botaoEditarPerfil");

const modalEditarPerfil =
    document.getElementById("modalEditarPerfil");

const fecharModalEditarPerfil =
    document.getElementById("fecharModalEditarPerfil");

const formEditarPerfil =
    document.getElementById("formEditarPerfil");

const mensagemEditarPerfil =
    document.getElementById("mensagemEditarPerfil");

const campoEditarNome =
    document.getElementById("editarNome");

const campoEditarUsername =
    document.getElementById("editarUsername");

const campoEditarBio =
    document.getElementById("editarBio");

const campoEditarLink =
    document.getElementById("editarLink");

const campoEditarTituloDestaque =
    document.getElementById("editarTituloDestaque");

const TITULOS_CONQUISTAS = {
    genio_calculos: { nome: "Gênio dos Cálculos", raridade: "mitico", classificacao: "Mítico" },
    lenda_constancia: { nome: "Lenda da Constância", raridade: "mitico", classificacao: "Mítico" },
    elite_matematica: { nome: "Elite Matemática", raridade: "lendario", classificacao: "Lendário" },
    perfeccionista: { nome: "Perfeccionista", raridade: "epico", classificacao: "Épico" },
    mestre_basico: { nome: "Mestre da Matemática Básica", raridade: "comum", classificacao: "Comum" },
    mestre_geometria: { nome: "Mestre da Geometria", raridade: "raro", classificacao: "Raro" },
    mestre_algebra: { nome: "Mestre da Álgebra", raridade: "epico", classificacao: "Épico" },
    mestre_funcoes: { nome: "Mestre das Funções", raridade: "epico", classificacao: "Épico" },
    mestre_fracoes: { nome: "Mestre das Frações", raridade: "raro", classificacao: "Raro" },
    mestre_potenciacao: { nome: "Mestre da Potenciação", raridade: "raro", classificacao: "Raro" },
    mestre_porcentagem: { nome: "Mestre da Porcentagem", raridade: "raro", classificacao: "Raro" },
    mestre_estatistica: { nome: "Mestre da Estatística", raridade: "raro", classificacao: "Raro" },
    mestre_probabilidade: { nome: "Mestre da Probabilidade", raridade: "raro", classificacao: "Raro" },
    mestre_trigonometria: { nome: "Mestre da Trigonometria", raridade: "epico", classificacao: "Épico" },
    estudante_dedicado: { nome: "Estudante Dedicado", raridade: "comum", classificacao: "Comum" },
    estrategista_matematico: { nome: "Estrategista Matemático", raridade: "raro", classificacao: "Raro" },
    guardiao_constancia: { nome: "Guardião da Constância", raridade: "epico", classificacao: "Épico" },
    mestre_matematica: { nome: "Mestre da Matemática", raridade: "lendario", classificacao: "Lendário" }
};

window.MA_TITULOS_CONQUISTAS = TITULOS_CONQUISTAS;

/* ================================================
   NOTIFICAÇÕES DE NOVOS TÍTULOS
   Detecta novas conquistas do usuário sem repetir
   títulos que já foram notificados neste navegador.
================================================ */

const DESCRICOES_TITULOS_CONQUISTAS = {
    genio_calculos: "Acertar 50 questões consecutivas.",
    lenda_constancia: "Estudar durante 100 dias consecutivos.",
    elite_matematica: "Acumular 10.000 XP.",
    perfeccionista: "Concluir uma fase com 100% de acertos.",
    mestre_basico: "Concluir todas as questões de Matemática Básica.",
    mestre_geometria: "Concluir todas as questões de Geometria.",
    mestre_algebra: "Concluir todas as questões de Álgebra.",
    mestre_funcoes: "Concluir todas as questões de Funções.",
    mestre_fracoes: "Concluir todas as questões de Frações e Decimais.",
    mestre_potenciacao: "Concluir todas as questões de Potenciação e Radiciação.",
    mestre_porcentagem: "Concluir todas as questões de Porcentagem e Matemática Financeira.",
    mestre_estatistica: "Concluir todas as questões de Estatística.",
    mestre_probabilidade: "Concluir todas as questões de Probabilidade.",
    mestre_trigonometria: "Concluir todas as questões de Trigonometria.",
    estudante_dedicado: "Manter uma sequência de 8 dias consecutivos de estudo.",
    estrategista_matematico: "Concluir as 10 fases do nível 3.",
    guardiao_constancia: "Manter uma sequência de 30 dias consecutivos de estudo.",
    mestre_matematica: "Concluir as 10 fases do nível 5."
};

let maTitulosNotificadosUsuario = null;
let maVerificacaoTitulosEmAndamento = false;
let maFilaNotificacoesTitulos = [];
let maNotificacaoTituloVisivel = false;

function maPrepararNotificacaoTitulo() {
    if (document.getElementById("maNotificacaoNovoTitulo")) return;

    const estilo = document.createElement("style");
    estilo.id = "maEstiloNotificacaoNovoTitulo";
    estilo.textContent = `
        #maNotificacaoNovoTitulo {
            position: fixed; inset: 0; z-index: 10050;
            display: flex; align-items: center; justify-content: center;
            padding: 22px; background: rgba(5, 13, 28, .72);
            opacity: 0; visibility: hidden;
            transition: opacity .25s ease, visibility .25s ease;
        }
        #maNotificacaoNovoTitulo.ma-visivel { opacity: 1; visibility: visible; }
        #maNotificacaoNovoTitulo .ma-cartao-notificacao-titulo {
            position: relative; width: min(420px, 100%); padding: 30px 24px 25px;
            border: 1px solid rgba(255, 213, 79, .65); border-top: 5px solid #f4c542;
            border-radius: 20px; background: #17345f; color: #fff; text-align: center;
            box-shadow: 0 24px 70px rgba(0, 0, 0, .42);
            transform: translateY(14px) scale(.97); transition: transform .25s ease;
        }
        #maNotificacaoNovoTitulo.ma-visivel .ma-cartao-notificacao-titulo { transform: translateY(0) scale(1); }
        #maNotificacaoNovoTitulo .ma-icone-conquista { display: block; margin: 0 auto 13px; font-size: 38px; }
        #maNotificacaoNovoTitulo .ma-notificacao-titulo-chamada { margin: 0 0 9px; font-size: 18px; line-height: 1.45; font-weight: 750; }
        #maNotificacaoNovoTitulo .ma-notificacao-titulo-nome { display: block; margin-top: 7px; color: #ffdc72; font-size: 23px; line-height: 1.3; font-weight: 800; }
        #maNotificacaoNovoTitulo .ma-notificacao-titulo-descricao { margin: 12px 0 20px; color: rgba(255,255,255,.76); font-size: 11px; line-height: 1.5; }
        #maNotificacaoNovoTitulo .ma-fechar-notificacao-titulo { min-width: 120px; border: 0; border-radius: 9px; padding: 10px 20px; background: #f4c542; color: #172b4d; font-size: 14px; font-weight: 750; cursor: pointer; }
        @media (max-width: 480px) {
            #maNotificacaoNovoTitulo .ma-cartao-notificacao-titulo { padding: 27px 19px 22px; }
            #maNotificacaoNovoTitulo .ma-notificacao-titulo-chamada { font-size: 16px; }
            #maNotificacaoNovoTitulo .ma-notificacao-titulo-nome { font-size: 21px; }
        }
    `;
    document.head.appendChild(estilo);

    const notificacao = document.createElement("section");
    notificacao.id = "maNotificacaoNovoTitulo";
    notificacao.setAttribute("role", "dialog");
    notificacao.setAttribute("aria-modal", "true");
    notificacao.setAttribute("aria-live", "polite");

    const cartao = document.createElement("div");
    cartao.className = "ma-cartao-notificacao-titulo";
    const icone = document.createElement("span");
    icone.className = "ma-icone-conquista";
    icone.textContent = "🏆";

    const chamada = document.createElement("p");
    chamada.className = "ma-notificacao-titulo-chamada";
    const nome = document.createElement("strong");
    nome.className = "ma-notificacao-titulo-nome";
    const descricao = document.createElement("p");
    descricao.className = "ma-notificacao-titulo-descricao";

    const fechar = document.createElement("button");
    fechar.type = "button";
    fechar.className = "ma-fechar-notificacao-titulo";
    fechar.textContent = "Fechar";
    fechar.addEventListener("click", maFecharNotificacaoTitulo);

    chamada.textContent = "Parabéns! Você acabou de receber o título";
    chamada.appendChild(nome);
    cartao.append(icone, chamada, descricao, fechar);
    notificacao.appendChild(cartao);
    notificacao.addEventListener("click", function(evento) {
        if (evento.target === notificacao) maFecharNotificacaoTitulo();
    });
    document.body.appendChild(notificacao);
}

let maTemporizadorNotificacaoTitulo = null;

function maFecharNotificacaoTitulo() {
    const notificacao = document.getElementById("maNotificacaoNovoTitulo");
    if (notificacao) notificacao.classList.remove("ma-visivel");
    clearTimeout(maTemporizadorNotificacaoTitulo);
    maNotificacaoTituloVisivel = false;
    setTimeout(maExibirProximaNotificacaoTitulo, 280);
}

function maExibirProximaNotificacaoTitulo() {
    if (maNotificacaoTituloVisivel || !maFilaNotificacoesTitulos.length) return;

    const item = maFilaNotificacoesTitulos.shift();
    maPrepararNotificacaoTitulo();

    const notificacao = document.getElementById("maNotificacaoNovoTitulo");
    const nome = notificacao.querySelector(".ma-notificacao-titulo-nome");
    const descricao = notificacao.querySelector(".ma-notificacao-titulo-descricao");

    nome.textContent = item.nome;
    descricao.textContent = item.descricao;
    notificacao.classList.add("ma-visivel");
    maNotificacaoTituloVisivel = true;

    // A janela permanece aberta até o usuário pressionar Fechar.
}

function maMostrarNotificacaoNovoTitulo(chave) {
    const titulo = TITULOS_CONQUISTAS[chave];
    if (!titulo) return;

    maFilaNotificacoesTitulos.push({
        nome: titulo.nome,
        descricao: DESCRICOES_TITULOS_CONQUISTAS[chave] || "Você desbloqueou uma nova conquista."
    });
    maExibirProximaNotificacaoTitulo();
}

async function maVerificarNovosTitulos() {
    if (!supabaseClient || maVerificacaoTitulosEmAndamento) return;
    maVerificacaoTitulosEmAndamento = true;

    try {
        const { data: { user }, error: erroUsuario } = await obterUsuarioAutenticado();
        if (erroUsuario || !user) return;

        if (maTitulosNotificadosUsuario !== user.id) {
            maTitulosNotificadosUsuario = user.id;
        }

        const chaveArmazenamento = "ma:titulos-notificados:" + user.id;
        const { data, error } = await supabaseClient
            .from("user_achievements")
            .select("achievement_key")
            .eq("user_id", user.id);

        if (error) throw error;

        const chavesAtuais = (data || [])
            .map(function(item) { return item.achievement_key; })
            .filter(function(chave) { return Boolean(TITULOS_CONQUISTAS[chave]); });

        const registroAnterior = localStorage.getItem(chaveArmazenamento);

        if (registroAnterior === null) {
            localStorage.setItem(chaveArmazenamento, JSON.stringify(chavesAtuais));
            return;
        }

        let chavesNotificadas;
        try {
            chavesNotificadas = new Set(JSON.parse(registroAnterior));
        } catch (erroFormato) {
            chavesNotificadas = new Set(chavesAtuais);
        }

        chavesAtuais.forEach(function(chave) {
            if (!chavesNotificadas.has(chave)) {
                maMostrarNotificacaoNovoTitulo(chave);
                chavesNotificadas.add(chave);
            }
        });

        localStorage.setItem(chaveArmazenamento, JSON.stringify(Array.from(chavesNotificadas)));
    } catch (erro) {
        console.error("Não foi possível verificar novos títulos:", erro);
    } finally {
        maVerificacaoTitulosEmAndamento = false;
    }
}

maVerificarNovosTitulos();
setInterval(maVerificarNovosTitulos, 12000);


const botaoSalvarPerfil =
    document.getElementById("salvarPerfil");


// Mostrar mensagens no modal

function mostrarMensagemEditarPerfil(
    mensagem,
    erro = false
) {

    mensagemEditarPerfil.textContent =
        mensagem;

    mensagemEditarPerfil.style.color =
        erro ? "#dc2626" : "#16a34a";

}


// Abrir modal e carregar dados do banco

async function abrirModalEditarPerfil() {

    modalEditarPerfil.hidden = false;

    formEditarPerfil.reset();

    mostrarMensagemEditarPerfil(
        "Carregando seus dados..."
    );

    botaoSalvarPerfil.disabled = true;

    try {

        if (!supabaseClient) {
            throw new Error(
                "A conexão com o banco não está disponível."
            );
        }

        const {
            data: { user },
            error: erroUsuario
        } = await obterUsuarioAutenticado();

        if (erroUsuario || !user) {
            throw new Error(
                "Sua sessão expirou. Faça login novamente."
            );
        }

        const { data, error } = await supabaseClient
            .from("profiles")
            .select(
                "display_name, username, bio, link, username_changed_at, featured_title"
            )
            .eq("id", user.id)
            .single();

        if (error || !data) {
            throw new Error(
                "Não foi possível carregar seu perfil."
            );
        }

        campoEditarNome.value =
            data.display_name || "";

        campoEditarUsername.value =
            data.username || "";

        campoEditarBio.value =
            data.bio || "";

        campoEditarLink.value =
            data.link || "";

        if (campoEditarTituloDestaque) {
            const { data: conquistas, error: erroConquistas } = await supabaseClient
                .from("user_achievements")
                .select("achievement_key")
                .eq("user_id", user.id);

            if (erroConquistas) {
                throw new Error("Não foi possível carregar suas conquistas.");
            }

            campoEditarTituloDestaque.replaceChildren();

            const opcaoVazia = document.createElement("option");
            opcaoVazia.value = "";
            opcaoVazia.textContent = "Não exibir título";
            campoEditarTituloDestaque.appendChild(opcaoVazia);

            const ordemTitulos = Object.keys(TITULOS_CONQUISTAS);

            ordemTitulos.forEach(function(chave) {
                const possuiConquista = (conquistas || []).some(function(item) {
                    return item.achievement_key === chave;
                });

                if (!possuiConquista) return;

                const opcao = document.createElement("option");
                opcao.value = chave;
                opcao.textContent = TITULOS_CONQUISTAS[chave].nome + " (" + TITULOS_CONQUISTAS[chave].classificacao + ")";
                campoEditarTituloDestaque.appendChild(opcao);
            });

            campoEditarTituloDestaque.value = data.featured_title || "";
        }

        mostrarMensagemEditarPerfil("");

    } catch (erro) {

        console.error(
            "Erro ao carregar perfil:",
            erro
        );

        mostrarMensagemEditarPerfil(
            erro.message,
            true
        );

    } finally {

        botaoSalvarPerfil.disabled = false;

    }

}


// Fechar modal

function fecharModalPerfil() {

    modalEditarPerfil.hidden = true;

    formEditarPerfil.reset();

    mostrarMensagemEditarPerfil("");

}


if (botaoEditarPerfil && modalEditarPerfil) {

    botaoEditarPerfil.addEventListener(
        "click",
        abrirModalEditarPerfil
    );

}


if (fecharModalEditarPerfil) {

    fecharModalEditarPerfil.addEventListener(
        "click",
        fecharModalPerfil
    );

}


// Fechar clicando fora da janela

if (modalEditarPerfil) {

    modalEditarPerfil.addEventListener(
        "click",
        function(evento) {

            if (evento.target === modalEditarPerfil) {
                fecharModalPerfil();
            }

        }
    );

}


// Fechar usando a tecla ESC

document.addEventListener(
    "keydown",
    function(evento) {

        if (
            evento.key === "Escape" &&
            modalEditarPerfil &&
            !modalEditarPerfil.hidden
        ) {

            fecharModalPerfil();

        }

    }
);


// Salvar alterações no Supabase

if (formEditarPerfil) {

    formEditarPerfil.addEventListener(
        "submit",
        async function(evento) {

            evento.preventDefault();

            const nome =
                campoEditarNome.value.trim();

            const username =
                campoEditarUsername.value
                    .trim()
                    .toLowerCase();

            const bio =
                campoEditarBio.value.trim();

            const link =
                campoEditarLink.value.trim();


            if (!nome || nome.length > 50) {

                mostrarMensagemEditarPerfil(
                    "O nome deve ter entre 1 e 50 caracteres.",
                    true
                );

                return;

            }


            if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {

                mostrarMensagemEditarPerfil(
                    "O nome de usuário deve ter de 3 a 20 caracteres, usando apenas letras, números ou _.",
                    true
                );

                return;

            }


            if (bio.length > 150) {

                mostrarMensagemEditarPerfil(
                    "A bio pode ter no máximo 150 caracteres.",
                    true
                );

                return;

            }


            if (
                link &&
                !/^https?:\/\/.+/i.test(link)
            ) {

                mostrarMensagemEditarPerfil(
                    "Informe um link válido começando com https:// ou http://.",
                    true
                );

                return;

            }


            botaoSalvarPerfil.disabled = true;

            mostrarMensagemEditarPerfil(
                "Salvando alterações..."
            );


            try {

                const {
                    data: { user },
                    error: erroUsuario
                } = await obterUsuarioAutenticado();

                if (erroUsuario || !user) {
                    throw new Error(
                        "Sua sessão expirou. Faça login novamente."
                    );
                }


                const { data: perfilAtual, error: erroPerfil } =
                    await supabaseClient
                        .from("profiles")
                        .select("username")
                        .eq("id", user.id)
                        .single();


                if (erroPerfil || !perfilAtual) {
                    throw new Error(
                        "Não foi possível verificar seu perfil atual."
                    );
                }


                const alteracoes = {

                    display_name: nome,

                    bio: bio,

                    link: link,

                    featured_title: campoEditarTituloDestaque
                        ? (campoEditarTituloDestaque.value || null)
                        : null

                };


                if (username !== perfilAtual.username) {

                    alteracoes.username = username;

                }


                const { error } = await supabaseClient
                    .from("profiles")
                    .update(alteracoes)
                    .eq("id", user.id);


                if (error) {

                    if (
                        error.code === "23505"
                    ) {

                        throw new Error(
                            "Esse nome de usuário já está sendo utilizado."
                        );

                    }

                    if (
                        error.message &&
                        error.message.toLowerCase().includes("7 dias")
                    ) {

                        throw new Error(
                            "Você só pode alterar o nome de usuário uma vez a cada 7 dias."
                        );

                    }

                    throw error;

                }


                // Atualizar dados locais de exibição

                localStorage.setItem(
                    "nomeUsuario",
                    nome
                );


                const elementoNome =
                    document.getElementById("nomeUsuarioTexto");

                if (elementoNome) {

                    elementoNome.textContent =
                        nome;

                }

                const elementoUsernamePerfil =
                    document.getElementById("usernamePerfil");

                if (elementoUsernamePerfil) {
                    elementoUsernamePerfil.textContent = "@" + username;
                    elementoUsernamePerfil.hidden = !username;
                }

                const elementoBioPerfil =
                    document.getElementById("bioPerfil");

                if (elementoBioPerfil) {
                    elementoBioPerfil.textContent = bio;
                    elementoBioPerfil.hidden = !bio;
                }

                const tituloEscolhido = campoEditarTituloDestaque
                    ? campoEditarTituloDestaque.value
                    : "";

                const dadosTitulo = {
                    estudante_dedicado: {
                        nome: "Estudante Dedicado",
                        icone: "🔥",
                        classe: "titulo-estudante-dedicado"
                    },
                    estrategista_matematico: {
                        nome: "Estrategista Matemático",
                        icone: "🧠",
                        classe: "titulo-estrategista-matematico"
                    },
                    guardiao_constancia: {
                        nome: "Guardião da Constância",
                        icone: "🛡️",
                        classe: "titulo-guardiao-constancia"
                    },
                    mestre_matematica: {
                        nome: "Mestre da Matemática",
                        icone: "🏆",
                        classe: "titulo-nivel5"
                    }
                };

                const seloNome = document.getElementById("seloContaNome");
                const seloIcone = document.getElementById("seloContaIcone");
                const seloRotulo = document.getElementById("seloContaRotulo");

                if (seloNome) {
                    seloNome.classList.remove(
                        "selo-dev-nome",
                        "titulo-nivel5",
                        "titulo-estudante-dedicado",
                        "titulo-estrategista-matematico",
                        "titulo-guardiao-constancia"
                    );
                }

                if (dadosTitulo[tituloEscolhido]) {
                    const titulo = dadosTitulo[tituloEscolhido];
                    if (seloNome) {
                        seloNome.textContent = titulo.nome;
                        seloNome.classList.add(titulo.classe);
                    }
                    if (seloIcone) seloIcone.textContent = titulo.icone;
                    if (seloRotulo) seloRotulo.textContent = "Título:";
                } else if (localStorage.getItem("tipoUsuario") === "dev") {
                    if (seloNome) {
                        seloNome.textContent = "Coração da Matrix";
                        seloNome.classList.add("selo-dev-nome");
                    }
                    if (seloIcone) seloIcone.textContent = "⚡";
                    if (seloRotulo) seloRotulo.textContent = "Selo:";
                } else {
                    if (seloNome) seloNome.textContent = "Não possui";
                    if (seloIcone) seloIcone.textContent = "💎";
                    if (seloRotulo) seloRotulo.textContent = " Selo Premium:";
                }

                mostrarMensagemEditarPerfil(
                    "Perfil atualizado com sucesso!"
                );


                setTimeout(
                    fecharModalPerfil,
                    1200
                );


            } catch (erro) {

                console.error(
                    "Erro ao salvar perfil:",
                    erro
                );

                mostrarMensagemEditarPerfil(
                    erro.message ||
                    "Não foi possível salvar as alterações.",
                    true
                );

            } finally {

                botaoSalvarPerfil.disabled = false;

            }

        }
    );

                    }
                


// =====================================================
// DESBLOQUEIO PROGRESSIVO DOS NÍVEIS
// =====================================================

async function verificarAcessoNivelProgressivo(numeroNivel) {

    if (numeroNivel <= 1) {
        return { permitido: true };
    }

    try {

        if (!supabaseClient) {
            throw new Error("A conexão com o servidor não está disponível.");
        }

        const {
            data: { user },
            error: erroUsuario
        } = await obterUsuarioAutenticado();

        if (erroUsuario || !user) {
            throw erroUsuario || new Error("Usuário não autenticado.");
        }

        const nivelAnterior = numeroNivel - 1;

        const [resultadoXP, resultadoFases] = await Promise.all([

            supabaseClient
                .from("user_progress")
                .select("total_xp")
                .maybeSingle(),

            supabaseClient
                .from("user_level_progress")
                .select("phase_number, completed")
                .eq("level_number", nivelAnterior)
                .eq("completed", true)

        ]);

        if (resultadoXP.error) throw resultadoXP.error;
        if (resultadoFases.error) throw resultadoFases.error;

        const xpAtual = Number(resultadoXP.data?.total_xp) || 0;
        const nivelDoPerfil = calcularNivelPorXP(xpAtual);

        const fasesConcluidas = new Set(
            (resultadoFases.data || [])
                .filter(function(fase) {
                    return fase.completed === true;
                })
                .map(function(fase) {
                    return Number(fase.phase_number);
                })
        );

        const permitido =
            nivelDoPerfil >= numeroNivel ||
            fasesConcluidas.size >= 10;

        return {
            permitido: permitido,
            motivo: permitido
                ? ""
                : "Para acessar o Nível " + numeroNivel +
                  ", alcance o Nível " + numeroNivel +
                  " no seu perfil ou conclua todas as 10 fases do Nível " +
                  nivelAnterior + "."
        };

    } catch (erro) {

        console.error("Não foi possível verificar o desbloqueio do nível:", erro);

        return {
            permitido: false,
            motivo: "Não foi possível verificar seu progresso. Confira sua conexão e tente novamente."
        };

    }

}


// Bloqueia a entrada pelos cartões da página Atividades.
function configurarDesbloqueioDosCartoesDeNivel() {

    const linksDeNivel = document.querySelectorAll(
        '.pagina-atividades a[href="nivel2.html"], ' +
        '.pagina-atividades a[href="nivel3.html"]'
    );

    linksDeNivel.forEach(function(link) {

        if (link.dataset.verificacaoNivelConfigurada === "true") {
            return;
        }

        link.dataset.verificacaoNivelConfigurada = "true";

        link.addEventListener("click", async function(event) {

            event.preventDefault();

            if (link.dataset.verificandoNivel === "true") {
                return;
            }

            link.dataset.verificandoNivel = "true";

            const numeroNivel = link.getAttribute("href") === "nivel2.html"
                ? 2
                : 3;

            const acesso = await verificarAcessoNivelProgressivo(numeroNivel);

            link.dataset.verificandoNivel = "false";

            if (!acesso.permitido) {
                mostrarNotificacaoNivelBloqueado(numeroNivel, acesso.motivo);
                return;
            }

            window.location.href = link.getAttribute("href");

        });

    });

}

configurarDesbloqueioDosCartoesDeNivel();


// =====================================================
// NOTIFICAÇÃO DE NÍVEL BLOQUEADO
// =====================================================

function mostrarNotificacaoNivelBloqueado(numeroNivel, mensagem) {

    const notificacao = document.getElementById("notificacaoNivelBloqueado");
    const titulo = document.getElementById("tituloNotificacaoNivel");
    const texto = document.getElementById("mensagemNotificacaoNivel");

    if (!notificacao || !titulo || !texto) {
        alert(mensagem || "Você ainda não pode realizar as atividades deste nível.");
        return;
    }

    titulo.textContent = mensagem && mensagem.startsWith("Não foi possível")
        ? "Não foi possível verificar"
        : "Nível " + numeroNivel + " bloqueado";

    texto.textContent = mensagem ||
        "Você ainda não cumpriu os requisitos para realizar as atividades deste nível.";

    notificacao.hidden = false;

    if (typeof atualizarIcones === "function") {
        atualizarIcones();
    }
}


const botaoFecharNotificacaoNivel = document.getElementById("fecharNotificacaoNivel");

if (botaoFecharNotificacaoNivel) {
    botaoFecharNotificacaoNivel.addEventListener("click", function() {
        const notificacao = document.getElementById("notificacaoNivelBloqueado");
        if (notificacao) notificacao.hidden = true;

        if (paginaAtual === "nivel2.html" || paginaAtual === "nivel3.html" || paginaAtual === "nivel4.html") {
            window.location.replace("atividades.html");
        }
    });
}

