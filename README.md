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
| `npm run images`  | Regenera las imágenes optimizadas desde `assets-src/`         |

## Estructura

```
assets-src/              Fotografías originales (fuente de verdad)
public/images/           WebP responsivos generados (480 / 960 / 1600 px)
scripts/optimize-images.mjs
src/
  components/
    layout/              Header (menú móvil accesible), Footer
    sections/            Hero, About, Events, Experience, Quote, Gallery + Lightbox, Process, Contact
    ui/                  ResponsiveImage, Reveal, SectionHeading, Ornament, Icon, Logo, WhatsAppFab
  data/
    site.ts              ✏️  Todo el contenido editable: textos, contacto, galería
    images.generated.ts  Manifiesto de imágenes (no editar a mano)
  hooks/                 useScrolled, useInView, useActiveSection
  styles/                tokens.css (paleta, tipografía, espaciado) y global.css
  utils/                 WhatsApp, validación del formulario, rutas de imágenes
```

## Cómo editar contenido

- **Textos, teléfono, dirección, tipos de evento, galería:** `src/data/site.ts`.
- **Colores y tipografía:** `src/styles/tokens.css`.
- **Agregar fotos:** copia el JPG a `assets-src/`, ejecuta `npm run images` y añádelo a `gallery` en `site.ts` (el nombre del archivo, sin extensión, queda tipado).

## Buenas prácticas aplicadas

- **Rendimiento:** imágenes WebP con `srcset`/`sizes`, `width`/`height` para evitar CLS, placeholder borroso (LQIP),
  lazy-loading, precarga de la imagen del hero, fuentes auto-alojadas con `font-display: swap`.
- **Accesibilidad:** HTML semántico, un solo `h1`, _skip link_, `aria-current` en la navegación, foco visible,
  menú móvil con Escape y gestión de foco, visor de galería con `<dialog>` nativo (trampa de foco y teclado),
  formulario con errores asociados (`aria-invalid`, `aria-describedby`), respeto a `prefers-reduced-motion`.
- **SEO:** `lang="es-MX"`, meta description, Open Graph, datos estructurados `EventVenue` (JSON-LD), `robots.txt`, manifest.
- **Código:** TypeScript estricto, componentes pequeños, contenido separado de la presentación, CSS Modules + tokens, pruebas.

## Contacto / formulario

El formulario no requiere backend: valida los datos y abre **WhatsApp** (`wa.me/523323551110`) con el mensaje prellenado.
Si el número de WhatsApp es distinto al teléfono, cámbialo en `contact.whatsapp` (`src/data/site.ts`).

## Despliegue

`npm run build` genera `dist/`, que puede publicarse en cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
Al tener dominio, añade `<link rel="canonical">` y usa URLs absolutas en `og:image` dentro de `index.html`.
