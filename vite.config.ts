/// <reference types="vitest/config" />
import { cpSync, readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

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

/** Precarga la imagen del hero (sus nombres llevan hash) y agrega la CSP. */
function siteHtml(): Plugin {
  return {
    name: 'altaria-site-html',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const content = JSON.parse(readFileSync('src/content/images.json', 'utf8'))
        const manifest = JSON.parse(readFileSync('src/data/images.manifest.json', 'utf8'))
        const hero = manifest[content.hero.src] as { base: string; widths: number[] }
        const srcset = hero.widths.map((w) => `${hero.base}-${w}.webp ${w}w`).join(', ')
        const fallback = `${hero.base}-${hero.widths.find((w) => w >= 960) ?? hero.widths.at(-1)}.webp`

        return [
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
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteHtml(), publishOriginals()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
    restoreMocks: true,
  },
})
