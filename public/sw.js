// Service worker mínimo — habilita a instalação do PWA sem cache agressivo
// (repassa tudo para a rede, evitando conteúdo desatualizado).
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // Sem interceptação: o navegador resolve normalmente pela rede.
});
