// Página Alertas e Eventos
// Nesta primeira etapa, a página apresenta a interface. A leitura e publicação
// serão conectadas ao banco e às notificações globais na etapa seguinte.

document.addEventListener("DOMContentLoaded", async function() {
    const areaPublicar = document.getElementById("areaPublicarAlerta");

    if (!areaPublicar || !supabaseClient) {
        atualizarIcones();
        return;
    }

    try {
        const { data: { user }, error: erroUsuario } = await supabaseClient.auth.getUser();
        if (erroUsuario) throw erroUsuario;
        if (!user) return;

        const { data: perfil, error: erroPerfil } = await supabaseClient
            .from("profiles")
            .select("tipo_usuario")
            .eq("id", user.id)
            .single();

        if (erroPerfil) throw erroPerfil;

        // A exibição é apenas uma conveniência visual. A autorização real
        // de publicação será obrigatoriamente aplicada no banco de dados.
        areaPublicar.hidden = perfil?.tipo_usuario !== "dev";
    } catch (erro) {
        console.error("Não foi possível verificar as permissões da página de alertas:", erro);
        areaPublicar.hidden = true;
    }

    atualizarIcones();
});
