import { imageMeta } from '../data/images'

export const imageUrl = (src: string, width: number) => `${imageMeta(src).base}-${width}.webp`

export const srcSetFor = (src: string) =>
  imageMeta(src)
    .widths.map((w) => `${imageUrl(src, w)} ${w}w`)
    .join(', ')

/** Versión de mayor resolución disponible (para el visor de galería). */
export function largestSrc(src: string) {
  const { widths } = imageMeta(src)
  return imageUrl(src, widths[widths.length - 1] ?? 960)
}

/** Versión mediana para el atributo `src` de respaldo. */
export function defaultSrc(src: string) {
  const { widths } = imageMeta(src)
  return imageUrl(src, widths.find((w) => w >= 960) ?? widths[widths.length - 1] ?? 960)
}
