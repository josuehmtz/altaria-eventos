import { imageManifest, type ImageName } from '../data/images.generated'

export const imageSrc = (name: ImageName, width: number) => `/images/${name}-${width}.webp`

export const srcSetFor = (name: ImageName) =>
  imageManifest[name].widths.map((w) => `${imageSrc(name, w)} ${w}w`).join(', ')

/** Versión de mayor resolución disponible (para el visor de galería). */
export function largestSrc(name: ImageName) {
  const { widths } = imageManifest[name]
  return imageSrc(name, widths[widths.length - 1] ?? 960)
}
