/// <reference types="vitest/config" />
import { cpSync, readFileSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'

/**
 * Content-Security-Policy del sitio público. Va como <meta> (solo en build,
 * porque el modo dev de Vite usa scripts inline) para que /admin pueda
 * tener una política distinta.
 */
const CSP = [
  "default-src 'self'",
  "img-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "script-src 'self'",
  'frame-src https://www.google.com https://maps.google.com',
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

/**
 * Publica las fotos originales en /assets-src/ para que el panel /admin
 * pueda mostrar la vista previa de cada imagen. El sitio público no las usa
 * (sirve las versiones WebP optimizadas de /images/).
 */
function publishOriginals(): Plugin {
  let outDir = 'dist'
  return {
    name: 'altaria-publish-originals',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      cpSync('assets-src', `${outDir}/assets-src`, { recursive: true })
    },
  }
}

/**
 * Dirección pública del sitio. Netlify define `URL` con el dominio principal
 * del proyecto: hoy altaria-eventos.netlify.app y, cuando se configure un
 * dominio propio como principal, ese dominio (sin tocar el código).
 */
const SITE_URL = (process.env.URL || 'https://altaria-eventos.netlify.app').replace(/\/+$/, '')

/** Genera robots.txt y sitemap.xml con la dirección pública del sitio. */
function seoFiles(): Plugin {
  return {
    name: 'altaria-seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: [
          'User-agent: *',
          'Allow: /',
          'Disallow: /admin/',
          'Disallow: /assets-src/',
          '',
          `Sitemap: ${SITE_URL}/sitemap.xml`,
          '',
        ].join('\n'),
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          `  <url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod></url>`,
          '</urlset>',
          '',
        ].join('\n'),
      })
    },
  }
}

/**
 * Pone la dirección pública en index.html (canonical, Open Graph, JSON-LD),
 * precarga la imagen del hero (sus nombres llevan hash) y agrega la CSP.
 */
function siteHtml(): Plugin {
  return {
    name: 'altaria-site-html',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const content = JSON.parse(readFileSync('src/content/images.json', 'utf8'))
        const manifest = JSON.parse(readFileSync('src/generated/images.manifest.json', 'utf8'))
        const hero = manifest[content.hero.src] as { base: string; widths: number[] }
        const srcset = hero.widths.map((w) => `${hero.base}-${w}.webp ${w}w`).join(', ')
        const fallback = `${hero.base}-${hero.widths.find((w) => w >= 960) ?? hero.widths.at(-1)}.webp`

        const tags: HtmlTagDescriptor[] = [
          {
            tag: 'link',
            injectTo: 'head',
            attrs: {
              rel: 'preload',
              as: 'image',
              type: 'image/webp',
              href: fallback,
              imagesrcset: srcset,
              imagesizes: '100vw',
              fetchpriority: 'high',
            },
          },
          ...(ctx.server
            ? []
            : [
                {
                  tag: 'meta',
                  injectTo: 'head-prepend' as const,
                  attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP },
                },
              ]),
        ]

        return { html: html.replaceAll('__SITE_URL__', SITE_URL), tags }
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteHtml(), seoFiles(), publishOriginals()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    restoreMocks: true,
  },
})
