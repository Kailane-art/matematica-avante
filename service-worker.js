self.addEventListener("push", function (event) {
    let dados = {};
    try { dados = event.data ? event.data.json() : {}; }
    catch (e) { dados = { body: event.data ? event.data.text() : "" }; }
    event.waitUntil(self.registration.showNotification(dados.title || "Matemática Avante", {
        body: dados.body || "Você tem uma nova notificação.",
        data: { url: dados.url || "inicio.html" },
        renotify: false,
        tag: dados.tag || undefined
    }));
});

self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    const destino = new URL(event.notification.data?.url || "inicio.html", self.registration.scope);
    if (destino.origin !== self.location.origin) return;
    event.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(async function (janelas) {
        for (const janela of janelas) {
            if (new URL(janela.url).origin === destino.origin) {
                await janela.navigate(destino.href);
                return janela.focus();
            }
        }
        return self.clients.openWindow(destino.href);
    }));
});