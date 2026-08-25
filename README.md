# Habita — Plataforma de anuncios de vivienda

Sitio web para publicar y buscar casas, apartamentos y **cuartos en renta**,
tanto para venta como para renta. Incluye cuentas de usuario, publicación de
anuncios, búsqueda con filtros, mensajes de contacto entre interesados y
anunciantes, anuncios destacados, y un panel de administrador para ver
cuántos usuarios se han registrado.

## Publicar Habita en internet (Render)

Esta es la forma recomendada de tener el sitio funcionando de verdad, con una
dirección web propia. Son dos partes: subir el código a GitHub, y conectar
ese código con Render.

### Parte 1 — Sube el código a GitHub

1. Entra a https://github.com e inicia sesión (o crea una cuenta si no tienes).
2. Haz clic en el botón verde **"New"** (o el ícono `+` arriba a la derecha →
   "New repository") para crear un repositorio nuevo.
3. Ponle de nombre `habita`, déjalo en **Private** o **Public** (como
   prefieras) y dale clic a **"Create repository"**. No marques ninguna
   opción de agregar README ni .gitignore — el proyecto ya los trae.
4. GitHub te va a mostrar unos comandos. En tu computadora, abre la Terminal
   dentro de la carpeta descomprimida del proyecto y copia/pega, uno por uno:

```
git init
git add .
git commit -m "Primera version de Habita"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/habita.git
git push -u origin main
```

Reemplaza `TU-USUARIO` por tu usuario de GitHub (aparece en la URL que
GitHub te mostró). Te va a pedir iniciar sesión la primera vez.

### Parte 2 — Conecta Render

1. Entra a https://dashboard.render.com e inicia sesión (o crea una cuenta
   gratis con tu correo o con GitHub).
2. Haz clic en **"New"** → **"Blueprint"**.
3. Conecta tu cuenta de GitHub si te lo pide, y selecciona el repositorio
   `habita` que acabas de crear.
4. Render va a detectar automáticamente el archivo `render.yaml` incluido en
   el proyecto y te va a mostrar dos cosas por crear: el sitio web (`habita`,
   plan gratis) y la base de datos (`habita-db`, plan de pago **Basic 256mb,
   $6 USD/mes** — así tus usuarios y anuncios nunca se borran).
5. Haz clic en **"Apply"** o **"Create New Resources"**. Te va a pedir tu
   método de pago para la base de datos (la parte del sitio web es gratis).
6. Espera unos minutos mientras Render instala y construye el sitio. Cuando
   termine, te dará una dirección como `https://habita.onrender.com` — esa
   es tu plataforma ya en internet.

> El plan gratis del sitio web "se duerme" si nadie lo visita en 15 minutos,
> y tarda como 1 minuto en despertar con la siguiente visita. Es normal y no
> afecta tus datos — solo la primera carga es más lenta. Si más adelante
> quieres que siempre responda al instante, en Render puedes cambiar el plan
> del servicio web a "Starter" ($7 USD/mes).

### Conviértete en dueño de la plataforma (para ver el contador de usuarios)

Una vez que el sitio esté en línea:

1. Entra a tu sitio y crea tu cuenta normal (botón "Crear cuenta").
2. Con tu cuenta ya iniciada, visita esta dirección (cambia el dominio por
   el tuyo):

```
https://TU-SITIO.onrender.com/api/admin/bootstrap-owner
```

3. Verás un mensaje de confirmación. A partir de ese momento te aparecerá un
   enlace **"Admin"** en la parte de arriba del sitio, donde puedes ver
   cuántos usuarios se han registrado, cuántos anuncios hay, y los últimos
   usuarios que se unieron. Esta dirección solo funciona una vez — la
   siguiente persona que la visite no podrá volverse dueño también.

## Cómo correrlo en tu computadora (para hacerle cambios y probarlos)

Esto es opcional — solo si quieres modificar el sitio y ver los cambios
antes de subirlos. Necesitas tener instalados **Node.js** (18+) y
**PostgreSQL**.

1. Descomprime el proyecto y abre la Terminal en esa carpeta.
2. Instala las dependencias:

```
npm install
```

3. Crea un archivo `.env` (copia `.env.example` y renómbralo a `.env`) con
   los datos de tu base de datos Postgres local y una clave de sesión
   cualquiera.
4. Crea las tablas y datos de ejemplo:

```
npm run db:push
npm run db:seed
```

Esto crea 5 anuncios de ejemplo y un usuario de prueba:

- **Correo:** demo@habita.com
- **Contraseña:** demo1234

5. Enciende el sitio:

```
npm run dev
```

Abre tu navegador en `http://localhost:3000`. Para apagarlo, `Ctrl + C` en
la Terminal.

Cuando hagas cambios y quieras subirlos a la versión en internet:

```
git add .
git commit -m "Describe aquí tu cambio"
git push
```

Render vuelve a construir el sitio automáticamente en cuanto detecta el
cambio en GitHub.

## Qué incluye

- Registro e inicio de sesión de usuarios.
- Publicar, editar y eliminar anuncios propios.
- Tipos de operación: **venta** y **renta**.
- Tipos de propiedad: casa, apartamento, **cuarto en renta**, estudio,
  oficina, local y terreno — con campos especiales para cuartos (baño
  privado, servicios incluidos, reglas de convivencia).
- Búsqueda y filtros por ciudad, operación, tipo de propiedad y precio.
- Página de detalle con fotos, descripción y formulario de contacto.
- Panel "Mi cuenta" con tus anuncios y los mensajes que recibas.
- **Anuncios destacados**: el dueño de un anuncio puede activarlo para que
  aparezca primero en los resultados (ver sección de pagos abajo).
- Panel de administrador (`/admin`) con el número de usuarios registrados,
  anuncios publicados y mensajes enviados.
- Fotos por URL (pega enlaces de imágenes públicas al publicar un anuncio).

## Cómo vas a ganar dinero (anuncios destacados)

Por ahora, publicar un anuncio es gratis y sin límite — así se llena la
plataforma de anuncios más rápido. La forma de generar ingresos ya está
construida a nivel de funcionalidad: cualquier dueño de anuncio puede
activar "Destacar este anuncio" para aparecer primero en las búsquedas.

**Importante:** ese botón todavía **no cobra de verdad** — lo dejamos así a
propósito para que puedas probarlo sin arriesgar dinero. Para que sí cobre,
falta conectar Stripe (procesador de pagos):

1. Crea tu cuenta en https://dashboard.stripe.com con tus datos bancarios
   (para que el dinero te llegue a ti).
2. Pídele a Claude que conecte Stripe cuando estés listo — los lugares del
   código donde va esa conexión ya están marcados con comentarios `TODO(pagos)`
   en `src/lib/constants.ts` y `src/app/api/listings/[id]/feature/route.ts`.

## Notas técnicas

- Construido con Next.js, TypeScript, Tailwind CSS y Drizzle ORM sobre
  PostgreSQL.
- Las contraseñas se guardan con hash (bcrypt), nunca en texto plano.
- La clave de sesión (`JWT_SECRET`) se genera automáticamente y de forma
  segura al desplegar con el Blueprint de Render — no necesitas configurarla
  a mano.
