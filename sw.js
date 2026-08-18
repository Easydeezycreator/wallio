/* WALLIO · service worker
   Para qué sirve: que la app abra en un plató sin cobertura.
   Estrategia: la app es un único archivo, así que se guarda entero en cache
   la primera vez y a partir de ahí se sirve desde ahí, incluso sin red.
   Cuando hay red se pide una copia nueva por detrás y se guarda para la
   próxima vez: así nunca esperas a la red, pero tampoco te quedas anclado
   a una versión vieja.                                                     */

const VERSION = "wallio-v17";
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
  if (req.method !== "GET") return;                       // subir a la nube no se cachea nunca
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;        // Supabase y demás, directo a la red

  // Navegación (abrir la app): primero lo guardado, y se refresca por detrás.
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

/* la app puede pedir que se actualice ya, sin esperar a cerrar la pestaña */
self.addEventListener("message", e => {
  if (e.data === "actualiza") self.skipWaiting();
});
