/* WALLIO · Parte de cámara — service worker propio.
   Caché aparte de la plataforma entera: son dos apps distintas en el
   teléfono y no se pisan la una a la otra.                              */

const VERSION = "wallio-parte-v27";
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
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate"){
    e.respondWith(
      caches.match("./index.html").then(guardado => {
        const red = fetch(req).then(r => {
          if (r && r.ok) caches.open(VERSION).then(c => c.put("./index.html", r.clone()));
          return r;
        }).catch(() => guardado);
        return guardado || red;
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(guardado => {
      const red = fetch(req).then(r => {
        if (r && r.ok && r.type === "basic")
          caches.open(VERSION).then(c => c.put(req, r.clone()));
        return r;
      }).catch(() => guardado);
      return guardado || red;
    })
  );
});

self.addEventListener("message", e => {
  if (e.data === "actualiza") self.skipWaiting();
});
