# Altaria Eventos — sitio web

Sitio one-page, responsive, para **Altaria Eventos**, salón de eventos en Nextipac, Zapopan, Jalisco.
Construido con **React 19 + TypeScript + Vite**, CSS Modules y design tokens.

## Requisitos

- **Node.js ≥ 22.12** (recomendado 24 LTS; ver `.nvmrc`).
  Con Node 22.11 o anterior, npm omite los binarios nativos de Vite/Oxlint y las pruebas fallan.

## Scripts

| Comando           | Descripción                                                   |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo en http://localhost:5173               |
| `npm run build`   | Typecheck + build de producción en `dist/`                    |
| `npm run preview` | Sirve el build de producción localmente                       |
| `npm test`        | Pruebas unitarias y de componentes (Vitest + Testing Library) |
| `npm run lint`    | Lint con Oxlint (reglas de React y hooks)                     |
| `npm run format`  | Formatea con Prettier                                         |
| `npm run images`  | Optimiza las fotos de `src/content/images.json` (automático)  |
| `npm run check`   | Lint + formato + pruebas (lo que corre CI y Netlify)          |
| `npm run cms`     | Backend local para probar el panel en `/admin/index.html`     |

## Estructura

```
assets-src/              Fotografías originales (aquí sube el panel /admin; se publican para su vista previa)
assets-brand/            Logo original (fuera de la biblioteca del panel)
public/admin/            Panel de administración (Decap CMS): index.html + config.yml
public/images/           ⚙️  WebP generados con hash (no se versionan)
scripts/optimize-images.mjs
src/
  components/
    layout/              Header (menú móvil accesible), Footer
    sections/            Hero, About, Events, Experience, Quote, Process
      Contact/           Contact + ContactForm
      Gallery/           Gallery + Lightbox (visor)
    ui/                  ResponsiveImage, Reveal, SectionHeading, Ornament, Icon, Logo, WhatsAppFab
  content/
    images.json          🖼️  Qué foto va en cada sección y la galería (lo edita el panel)
  data/
    site.ts              ✏️  Textos, contacto, servicios, pasos
    images.ts            Tipos, acceso a imágenes y rutas WebP (srcset)
  generated/
    images.manifest.json ⚙️  Generado por npm run images (no se versiona)
  hooks/                 useScrolled, useInView, useActiveSection
  styles/                tokens.css (paleta, tipografía, espaciado) y global.css
  utils/                 WhatsApp y validación del formulario
```

## Cómo editar contenido

- **Fotos y galería:** desde el panel **/admin** (ver abajo).
- **Textos, teléfono, dirección, servicios:** `src/data/site.ts`.
- **Colores y tipografía:** `src/styles/tokens.css`.

## Panel de administración de imágenes (/admin)

https://altaria-eventos.netlify.app/admin/ — basado en [Decap CMS](https://decapcms.org).

Permite cambiar la foto de cada sección (portada, nosotros, experiencia, fondo de la frase) y
administrar la galería: subir, quitar, reordenar (arrastrando), y editar título y descripción.

**Cómo funciona:** al pulsar _Publicar_, el panel guarda un commit en GitHub
(foto original en `assets-src/` + cambios en `src/content/images.json`). Netlify detecta el commit,
optimiza las fotos (WebP 480/960/1600 px), corre las verificaciones y publica en ~1–2 minutos.
Si algo falla (p. ej. falta una descripción), no se publica y el sitio sigue como estaba.

**Fotos sin usar:** al reemplazar o quitar una foto, el panel no borra la anterior. Después de cada
cambio de `src/content/images.json`, GitHub Actions (`clean-images.yml`) elimina de `assets-src/`
las fotos que ya no usa ninguna sección (quedan en el historial de git). Una foto subida a la
biblioteca sin asignarla a ninguna sección se borra en el siguiente cambio de imágenes.
Para revisarlo en local: `npm run images:clean -- --dry-run`.

**Configuración inicial (una sola vez):**

1. En GitHub → _Settings → Developer settings → OAuth Apps → New OAuth App_:
   - Homepage URL: `https://altaria-eventos.netlify.app`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. Copia el _Client ID_ y genera un _Client secret_.
3. En Netlify → _Project configuration → Access & security → OAuth → Install provider_ → GitHub,
   pega el Client ID y el Client secret.

**Dar acceso a otra persona:** necesita una cuenta gratuita de GitHub y ser agregada como
colaboradora del repositorio (_Settings → Collaborators_, permiso _Write_). Después entra a /admin
y pulsa _Iniciar sesión con GitHub_.

**Probar el panel en local:** `npm run cms` en una terminal y `npm run dev` en otra; abre
`http://localhost:5173/admin/index.html`. Los cambios se escriben en tus archivos locales.

## Buenas prácticas aplicadas

- **Rendimiento:** imágenes WebP con `srcset`/`sizes` y nombre con hash (caché inmutable), `width`/`height` para evitar CLS, placeholder borroso (LQIP),
  lazy-loading, precarga de la imagen del hero, fuentes auto-alojadas con `font-display: swap`.
- **Accesibilidad:** HTML semántico, un solo `h1`, _skip link_, `aria-current` en la navegación, foco visible,
  menú móvil con Escape y gestión de foco, visor de galería con `<dialog>` nativo (trampa de foco y teclado),
  formulario con errores asociados (`aria-invalid`, `aria-describedby`), respeto a `prefers-reduced-motion`.
- **SEO:** `lang="es-MX"`, meta description, Open Graph, URL canónica, datos estructurados `EventVenue` (JSON-LD), `robots.txt`, `sitemap.xml`, manifest.
- **Código:** TypeScript estricto, componentes pequeños, contenido separado de la presentación, CSS Modules + tokens, pruebas.

## Contacto / formulario

El formulario no requiere backend: valida los datos y abre **WhatsApp** (`wa.me/523323551110`) con el mensaje prellenado.
Si el número de WhatsApp es distinto al teléfono, cámbialo en `contact.whatsapp` (`src/data/site.ts`).

## Despliegue

`npm run build` genera `dist/`, que puede publicarse en cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
Al tener dominio, añade `<link rel="canonical">` y usa URLs absolutas en `og:image` dentro de `index.html`.
