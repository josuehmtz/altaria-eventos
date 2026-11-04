import { describe, expect, it } from 'vitest'
import { imageMeta, siteImages } from './images'

/**
 * Protege el contenido editado desde /admin: si una foto queda sin
 * optimizar o sin descripción, la verificación falla y Netlify no publica.
 */
describe('contenido de imágenes (src/content/images.json)', () => {
  const { hero, quote, gallery, ...withAlt } = siteImages
  const all = [hero, quote, ...Object.values(withAlt), ...gallery]

  it('todas las imágenes referenciadas están optimizadas', () => {
    for (const img of all) {
      const meta = imageMeta(img.src)
      expect(meta.widths.length).toBeGreaterThan(0)
      expect(meta.width).toBeGreaterThan(0)
    }
  })

  it('las fotos con contenido tienen descripción y la galería tiene títulos', () => {
    for (const img of [...Object.values(withAlt), ...gallery]) {
      expect(img.alt.trim(), `Falta la descripción de ${img.src}`).not.toBe('')
    }
    for (const item of gallery) {
      expect(item.caption.trim(), `Falta el título de ${item.src}`).not.toBe('')
    }
  })

  it('la galería tiene al menos una foto', () => {
    expect(gallery.length).toBeGreaterThan(0)
  })
})
