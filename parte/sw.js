/* WALLIO · service worker (parte de cámara)
   Para qué sirve: que la app abra en un plató sin cobertura.
   Estrategia: cache primero y red por detrás. BLINDADO (v52): este worker
   limpia SOLO su propia familia de cachés (wallio-parte-v*) — antes la plataforma
   y el parte se borraban la caché el uno al otro —, jamás responde vacío
   (eso daba ERR_FAILED con el sitio perfectamente vivo), y aplana las
   respuestas redirigidas, que el navegador rechaza en navegaciones. */

const VERSION = "wallio-parte-v41";
const FAMILIA = "wallio-parte-v";
const AJENA = "";
const BASICOS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icono-192.png",
  "./icono-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => Promise.allSettled(BASICOS.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks
        .filter(k => k !== VERSION && k.indexOf(FAMILIA) === 0 && !(AJENA && k.indexOf(AJENA) === 0))
        .map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function aplana(r){
  /* una respuesta redirigida no se puede entregar a una navegación: se copia */
  if (!r || !r.redirected) return r;
  const cuerpo = await r.clone().blob();
  return new Response(cuerpo, { status: 200,
    headers: { "Content-Type": r.headers.get("Content-Type") || "text/html; charset=utf-8" } });
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate"){
    e.respondWith((async () => {
      const guardado = await caches.match("./index.html").catch(() => null);
      const red = (async () => {
        try {
          const r = await fetch(req);
          if (r && r.ok) caches.open(VERSION).then(c => c.put("./index.html", r.clone())).catch(() => {});
          return await aplana(r);
        } catch(_){ return null; }
      })();
      const res = guardado || await red || null;
      if (res) return res;
      return new Response("<!doctype html><meta charset=utf-8><meta http-equiv=refresh content=\'2\'>" +
        "<body style=\'font:16px -apple-system,system-ui;padding:2em\'>WALLIO no pudo abrir. Reintentando…",
        { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } });
    })());
    return;
  }

  e.respondWith((async () => {
    const guardado = await caches.match(req).catch(() => null);
    const red = (async () => {
      try {
        const r = await fetch(req);
        if (r && r.ok && r.type === "basic") caches.open(VERSION).then(c => c.put(req, r.clone())).catch(() => {});
        return r;
      } catch(_){ return null; }
    })();
    const res = guardado || await red || null;
    if (res) return res;
    return new Response("", { status: 504 });
  })());
});

self.addEventListener("message", e => {
  if (e.data === "actualiza") self.skipWaiting();
});
