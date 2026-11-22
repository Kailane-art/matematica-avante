// Alertas e Eventos: leitura pública para usuários autenticados e publicação exclusiva DEV.

document.addEventListener("DOMContentLoaded", async function() {
    const areaPublicar = document.getElementById("areaPublicarAlerta");
    const formulario = document.getElementById("formNovoAlerta");
    const campoMensagem = document.getElementById("mensagemNovoAlerta");
    const botaoPublicar = formulario?.querySelector('button[type="submit"]');
    const avisoPublicacao = document.querySelector(".alertas-aviso-etapa");
    const listaAlertas = document.getElementById("listaAlertas");

    function mostrarEstadoLista(icone, titulo, descricao) {
        if (!listaAlertas) return;
        const estado = document.createElement("div");
        estado.className = "alertas-vazio";
        const simbolo = document.createElement("span");
        simbolo.className = "alertas-vazio-icone";
        const desenho = document.createElement("i");
        desenho.setAttribute("data-lucide", icone);
        simbolo.appendChild(desenho);
        const cabecalho = document.createElement("h3");
        cabecalho.textContent = titulo;
        const texto = document.createElement("p");
        texto.textContent = descricao;
        estado.append(simbolo, cabecalho, texto);
        listaAlertas.replaceChildren(estado);
        atualizarIcones();
    }

    function formatarDataHora(valor) {
        const data = new Date(valor);
        if (Number.isNaN(data.getTime())) return "Data indisponível";
        return data.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    function criarCardAlerta(alerta) {
        const card = document.createElement("article");
        card.className = "alertas-card";

        const topo = document.createElement("div");
        topo.className = "alertas-card-topo";
        const icone = document.createElement("i");
        icone.setAttribute("data-lucide", "megaphone");
        topo.appendChild(icone);

        const mensagem = document.createElement("p");
        mensagem.className = "alertas-card-mensagem";
        mensagem.textContent = alerta.message;

        const rodape = document.createElement("div");
        rodape.className = "alertas-card-rodape";

        const autor = document.createElement("small");
        autor.textContent = "Por: " + (alerta.author_name || "Equipe Matemática Avante") +
            (alerta.author_username ? " (@" + alerta.author_username + ")" : "");

        const data = document.createElement("small");
        data.textContent = formatarDataHora(alerta.published_at);

        rodape.append(autor, data);
        card.append(topo, mensagem, rodape);
        return card;
    }

    async function carregarAlertas() {
        if (!listaAlertas) return;
        mostrarEstadoLista("loader-circle", "Carregando comunicados...", "Aguarde um instante.");

        const { data, error } = await supabaseClient
            .from("global_alerts")
            .select("id,message,author_name,author_username,published_at,expires_at")
            .gt("expires_at", new Date().toISOString())
            .order("published_at", { ascending: false });

        if (error) throw error;

        if (!data || !data.length) {
            mostrarEstadoLista("bell-ring", "Nenhum alerta por enquanto", "Quando um comunicado for publicado, ele aparecerá aqui.");
            return;
        }

        const fragmento = document.createDocumentFragment();
        data.forEach(function(alerta) {
            fragmento.appendChild(criarCardAlerta(alerta));
        });
        listaAlertas.replaceChildren(fragmento);
        atualizarIcones();
    }

    try {
        if (typeof supabaseClient === "undefined" || !supabaseClient) {
            throw new Error("A conexão com o banco não está disponível.");
        }

        const { data: { user }, error: erroUsuario } = await supabaseClient.auth.getUser();
        if (erroUsuario) throw erroUsuario;
        if (!user) throw new Error("Sua sessão não foi encontrada. Entre novamente na plataforma.");

        const { data: perfil, error: erroPerfil } = await supabaseClient
            .from("profiles")
            .select("tipo_usuario")
            .eq("id", user.id)
            .single();

        if (erroPerfil) throw erroPerfil;

        const ehDev = perfil?.tipo_usuario === "dev";
        if (areaPublicar) areaPublicar.hidden = !ehDev;

        if (ehDev && formulario && botaoPublicar) {
            botaoPublicar.disabled = false;
            botaoPublicar.innerHTML = '<i data-lucide="send"></i> Enviar alerta';
            if (avisoPublicacao) avisoPublicacao.textContent = "O comunicado será enviado a todos os usuários e ficará disponível por 15 dias.";
            atualizarIcones();

            formulario.addEventListener("submit", async function(evento) {
                evento.preventDefault();
                const mensagem = (campoMensagem?.value || "").trim();

                if (!mensagem || mensagem.length > 2000) {
                    if (avisoPublicacao) avisoPublicacao.textContent = "Escreva uma mensagem de 1 a 2.000 caracteres.";
                    return;
                }

                botaoPublicar.disabled = true;
                botaoPublicar.textContent = "Enviando...";
                if (avisoPublicacao) avisoPublicacao.textContent = "Publicando o alerta e criando as notificações...";

                try {
                    const { data: alertId, error } = await supabaseClient.rpc("publish_global_alert", {
                        p_message: mensagem
                    });
                    if (error) throw error;

                    if (window.maPushNotifications && alertId) {
                        await window.maPushNotifications.enviarEvento("alert", { alert_id: alertId });
                    }

                    campoMensagem.value = "";
                    if (avisoPublicacao) avisoPublicacao.textContent = "Alerta publicado e enviado aos usuários.";
                    await carregarAlertas();
                } catch (erro) {
                    console.error("Erro ao publicar alerta:", erro);
                    if (avisoPublicacao) avisoPublicacao.textContent = erro.message || "Não foi possível publicar o alerta.";
                } finally {
                    botaoPublicar.disabled = false;
                    botaoPublicar.innerHTML = '<i data-lucide="send"></i> Enviar alerta';
                    atualizarIcones();
                }
            });
        }

        await carregarAlertas();
    } catch (erro) {
        console.error("Não foi possível inicializar Alertas e Eventos:", erro);
        if (areaPublicar) areaPublicar.hidden = true;
        mostrarEstadoLista("alert-circle", "Não foi possível carregar os alertas", "Verifique sua conexão e tente novamente.");
    }

    atualizarIcones();
});
