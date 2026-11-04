import content from '../content/images.json'
import manifest from './images.manifest.json'

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
