import type { CSSProperties } from 'react'
import { imageManifest, type ImageName } from '../../data/images.generated'
import { imageSrc, srcSetFor } from '../../utils/images'

interface ResponsiveImageProps {
  name: ImageName
  alt: string
  /** Atributo `sizes` según el ancho que ocupará la imagen en el layout */
  sizes?: string
  /** Para la imagen principal (LCP): sin lazy-loading y con prioridad alta */
  priority?: boolean
  className?: string
  style?: CSSProperties
}

export function ResponsiveImage({
  name,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  style,
}: ResponsiveImageProps) {
  const meta = imageManifest[name]
  const srcSet = srcSetFor(name)
  const fallback = imageSrc(name, meta.widths.find((w) => w >= 960) ?? meta.widths[0] ?? 960)

  return (
    <img
      src={fallback}
      srcSet={srcSet}
      sizes={sizes}
      width={meta.width}
      height={meta.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      style={{
        backgroundImage: `url(${meta.placeholder})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style,
      }}
    />
  )
}
