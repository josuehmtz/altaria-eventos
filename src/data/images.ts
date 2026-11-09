import content from '../content/images.json'
import manifest from '../generated/images.manifest.json'

/** Una imagen tal como la guarda el panel /admin en `src/content/images.json`. */
export interface ImageRef {
  src: string
  alt: string
}

export interface GalleryItem extends ImageRef {
  caption: string
}

export interface ImageMeta {
  /** Ruta pública sin ancho ni extensión, p. ej. `/images/fachada-noche-4a3cbda4` */
  base: string
  width: number
  height: number
  widths: number[]
  placeholder: string
}

interface SiteImages {
  hero: ImageRef
  aboutMain: ImageRef
  aboutAccent: ImageRef
  experienceDecoration: ImageRef
  experienceDesserts: ImageRef
  experienceShow: ImageRef
  quote: ImageRef
  gallery: GalleryItem[]
}

export const siteImages: SiteImages = content

const metaBySrc: Record<string, ImageMeta | undefined> = manifest

export function imageMeta(src: string): ImageMeta {
  const meta = metaBySrc[src]
  if (!meta) throw new Error(`Imagen sin optimizar: ${src}. Ejecuta "npm run images".`)
  return meta
}

/** URL de la versión WebP de una imagen en un ancho dado. */
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
