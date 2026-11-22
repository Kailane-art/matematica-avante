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

const fundoMenu = document.getElementById("fundoMenu");

// Torna navegável a opção Configurações nos menus laterais existentes.
document.querySelectorAll("#menuLateral .menu-item").forEach(function(item) {
    const texto = item.querySelector("span")?.textContent.trim().toLowerCase();
    if (texto !== "configurações" || item.tagName === "A") return;

    const link = document.createElement("a");
    link.className = item.className;
    link.href = "configuracoes.html";
    link.setAttribute("aria-label", "Abrir configurações");
    while (item.firstChild) link.appendChild(item.firstChild);
    item.replaceWith(link);
});




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

    Object.values(estado).forEach(function(sessoes) {
        (sessoes || []).forEach(function(sessao) {
            if (sessao && sessao.user_id) ativos.add(sessao.user_id);
        });
    });

    const agora = Date.now();
    const ultimasPresencas = lerUltimasPresencas();

    // Quando alguém sai do site, inicia a tolerância de 60 segundos.
    presencaOnlineAtivos.forEach(function(usuarioId) {
        if (!ativos.has(usuarioId)) {
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
        if (presencaOnlineHabilitada) {
            await canalPresencaOnline.track({
                user_id: usuarioPresencaOnlineId
            });
        } else {
            await canalPresencaOnline.untrack();
        }
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
        const { data: { user }, error: erroUsuario } = await supabaseClient.auth.getUser();
        if (erroUsuario || !user) return;

        usuarioPresencaOnlineId = user.id;

        const { data: preferencias, error: erroPreferencias } = await supabaseClient
            .from("user_settings")
            .select("show_online_status")
            .eq("user_id", user.id)
            .maybeSingle();

        if (erroPreferencias) throw erroPreferencias;
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
        const { data: { user }, error: erroUsuario } = await supabaseClient.auth.getUser();
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

async function carregarPreferenciasGlobais() {
    if (!supabaseClient) return;
    try {
        const { data: { user }, error: erroUsuario } = await supabaseClient.auth.getUser();
        if (erroUsuario || !user) return;
        const { data, error } = await supabaseClient
            .from("user_settings")
            .select("theme, text_size")
            .eq("user_id", user.id)
            .maybeSingle();
        if (error) throw error;
        if (!data) return;

        if (!paginaLogin) {
            localStorage.setItem("tema", data.theme);
            aplicarTemaGlobal(data.theme);
        }
        localStorage.setItem("tamanhoTexto", String(data.text_size));
        aplicarTamanhoTextoGlobal(data.text_size);
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
    "perfil.html",
    "perfil-publico.html",
    "chat.html",
    "conversa.html",
    "materias.html",
    "atividades.html",
    "professores.html",
    "geometria.html",
    "basico.html",
    "aprender-basico.html",
    "nivel1.html",
    "nivel2.html",
    "nivel3.html",
    "nivel4.html",
    "adicao.html",
    "subtracao.html",
    "multiplicacao.html",
    "divisao.html",
    "planos.html",
    "configuracoes.html"
]);

const caminhoAtual = window.location.pathname.replace(/\/+$/, "");
const nomePaginaAtual = caminhoAtual.split("/").pop() || "index.html";
const paginaAtual = nomePaginaAtual.endsWith(".html")
    ? nomePaginaAtual
    : `${nomePaginaAtual}.html`;
if (paginasProtegidas.has(paginaAtual)) {

    (async function(){

        try {

            if (!supabaseClient) {
                window.location.replace("index.html");
                return;
            }

            const { data: { user }, error } =
                await supabaseClient.auth.getUser();

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
                    "Não é possível fazer login nesta conta. Entre em contato com a equipe do Matemática Avante para obter mais informações."
                );
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
        } = await supabaseClient.auth.getUser();

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
        obterDiasEstudados();

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
            await supabaseClient.auth.getUser();

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
            await supabaseClient.auth.getUser();

        if (erroUsuario || !user) return;

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
                .select("study_date")
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

        diasEstudoSincronizados = (resultadoDias.data || [])
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

    "adicao.html": {
        chave: "adicao",
        nome: "Adição"
    },

    "subtracao.html": {
        chave: "subtracao",
        nome: "Subtração"
    },

    "multiplicacao.html": {
        chave: "multiplicacao",
        nome: "Multiplicação"
    },

    "divisao.html": {
        chave: "divisao",
        nome: "Divisão"
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
                    await supabaseClient.auth.getUser();

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
        } = await supabaseClient.auth.getUser();

        if (erroUsuario || !user) {
            throw new Error(
                "Sua sessão expirou. Faça login novamente."
            );
        }

        const { data, error } = await supabaseClient
            .from("profiles")
            .select(
                "display_name, username, bio, link, username_changed_at"
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
                } = await supabaseClient.auth.getUser();

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

                    link: link

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
        } = await supabaseClient.auth.getUser();

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

