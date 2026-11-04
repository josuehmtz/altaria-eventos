import type { CSSProperties } from 'react'
import { imageMeta, type ImageRef } from '../../data/images'
import { defaultSrc, srcSetFor } from '../../utils/images'

interface ResponsiveImageProps {
  image: ImageRef
  /** Sobrescribe el texto alternativo (usa "" para imágenes decorativas) */
  alt?: string
  /** Atributo `sizes` según el ancho que ocupará la imagen en el layout */
  sizes?: string
  /** Para la imagen principal (LCP): sin lazy-loading y con prioridad alta */
  priority?: boolean
  className?: string
  style?: CSSProperties
}

export function ResponsiveImage({
  image,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  style,
}: ResponsiveImageProps) {
  const meta = imageMeta(image.src)

  return (
    <img
      src={defaultSrc(image.src)}
      srcSet={srcSetFor(image.src)}
      sizes={sizes}
      width={meta.width}
      height={meta.height}
      alt={alt ?? image.alt}
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
