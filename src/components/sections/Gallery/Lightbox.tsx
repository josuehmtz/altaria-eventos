import { useEffect, useRef, type KeyboardEvent, type TouchEvent } from 'react'
import { largestSrc, type GalleryItem } from '../../../data/images'
import { Icon } from '../../ui/Icon'

interface LightboxProps {
  items: ReadonlyArray<GalleryItem>
  index: number | null
  onChange: (index: number | null) => void
}

/**
 * Visor de imágenes basado en <dialog> nativo:
 * trampa de foco, tecla Escape y fondo inerte sin librerías externas.
 */
const roundButton =
  'absolute grid size-12 place-items-center rounded-full border border-gold/45 bg-ink/50 text-gold-light transition-[background-color,border-color] duration-250 hover:border-gold hover:bg-gold/18 [&_svg]:size-[22px]'
// En celular las flechas bajan junto al pie de foto para no tapar la imagen
const sideButton = `${roundButton} top-1/2 -translate-y-1/2 max-sm:top-auto max-sm:bottom-4 max-sm:translate-y-0`

export function Lightbox({ items, index, onChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const touchX = useRef<number | null>(null)
  const isOpen = index !== null
  const item = isOpen ? items[index] : undefined

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  const go = (step: number) => {
    if (index === null) return
    onChange((index + step + items.length) % items.length)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null
  }
  const onTouchEnd = (e: TouchEvent) => {
    const start = touchX.current
    const end = e.changedTouches[0]?.clientX
    if (start == null || end == null) return
    const delta = end - start
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1)
    touchX.current = null
  }

  return (
    <dialog
      ref={dialogRef}
      className="size-full max-h-full max-w-full border-0 bg-transparent p-0 text-fg-inverse backdrop:bg-ink/94 backdrop:backdrop-blur-[6px] open:animate-[fade-in_300ms_var(--ease-out)]"
      aria-label="Galería de imágenes"
      onClose={() => onChange(null)}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
    >
      {item && index !== null && (
        <div
          className="pointer-events-none relative grid size-full place-items-center px-4 pt-18 pb-8 *:pointer-events-auto max-sm:pb-24"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <figure className="grid max-h-full max-w-[min(1200px,100%)] justify-items-center gap-4">
            <img
              key={item.src}
              src={largestSrc(item.src)}
              alt={item.alt}
              className="h-auto max-h-[calc(100dvh-11rem)] w-auto max-w-full animate-zoom object-contain shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]"
            />
            <figcaption className="flex items-baseline gap-6 font-display text-[1.25rem] italic">
              <span>{item.caption}</span>
              <span className="font-body text-xs tracking-[0.2em] text-gold-light not-italic">
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className={`${sideButton} left-4`}
            onClick={() => go(-1)}
            aria-label="Imagen anterior"
          >
            <Icon name="chevronLeft" />
          </button>
          <button
            type="button"
            className={`${sideButton} right-4`}
            onClick={() => go(1)}
            aria-label="Imagen siguiente"
          >
            <Icon name="chevronRight" />
          </button>
          <button
            type="button"
            className={`${roundButton} top-4 right-4`}
            onClick={() => onChange(null)}
            aria-label="Cerrar galería"
            autoFocus
          >
            <Icon name="close" />
          </button>
        </div>
      )}
    </dialog>
  )
}
