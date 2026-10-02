const CACHE_NAME = "painel-financeiro-v2";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

// O HTML atual usa essas bibliotecas. O Service Worker tenta guardá-las
// no primeiro acesso online para que os recursos continuem disponíveis offline.
const CDN_ASSETS = [
  "https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js",
  "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",
  "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",
  "https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js",
  "https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.4/dist/jspdf.plugin.autotable.min.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);

    // Não deixa uma CDN temporariamente indisponível impedir a instalação do PWA.
    await Promise.allSettled(CDN_ASSETS.map(async (url) => {
      try {
        const response = await fetch(url, { mode: "no-cors", cache: "reload" });
        await cache.put(url, response);
      } catch (_) {}
    }));

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Navegação: tenta a versão mais recente e cai para o app em cache quando offline.
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put("./index.html", fresh.clone());
        return fresh;
      } catch (_) {
        return (await caches.match(request)) || (await caches.match("./index.html"));
      }
    })());
    return;
  }

  // Assets: cache primeiro, rede como fallback; atualiza o cache em segundo plano.
  event.respondWith((async () => {
    const cached = await caches.match(request);
    const networkPromise = fetch(request).then(async response => {
      const cache = await caches.open(CACHE_NAME);
      try { await cache.put(request, response.clone()); } catch (_) {}
      return response;
    }).catch(() => null);

    if (cached) {
      event.waitUntil(networkPromise);
      return cached;
    }

    return (await networkPromise) || new Response("Recurso indisponível offline.", {
      status: 503,
      headers: {"Content-Type":"text/plain; charset=utf-8"}
    });
  })());
});
