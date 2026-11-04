import { useEffect, useRef, type KeyboardEvent, type TouchEvent } from 'react'
import type { GalleryItem } from '../../data/images'
import { largestSrc } from '../../utils/images'
import { Icon } from '../ui/Icon'
import styles from './Lightbox.module.css'

interface LightboxProps {
  items: ReadonlyArray<GalleryItem>
  index: number | null
  onChange: (index: number | null) => void
}

/**
 * Visor de imágenes basado en <dialog> nativo:
 * trampa de foco, tecla Escape y fondo inerte sin librerías externas.
 */
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
      className={styles.dialog}
      aria-label="Galería de imágenes"
      onClose={() => onChange(null)}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
    >
      {item && index !== null && (
        <div className={styles.body} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <figure className={styles.figure}>
            <img
              key={item.src}
              src={largestSrc(item.src)}
              alt={item.alt}
              className={styles.image}
            />
            <figcaption className={styles.caption}>
              <span>{item.caption}</span>
              <span className={styles.counter}>
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className={`${styles.nav} ${styles.prev}`}
            onClick={() => go(-1)}
            aria-label="Imagen anterior"
          >
            <Icon name="chevronLeft" />
          </button>
          <button
            type="button"
            className={`${styles.nav} ${styles.next}`}
            onClick={() => go(1)}
            aria-label="Imagen siguiente"
          >
            <Icon name="chevronRight" />
          </button>
          <button
            type="button"
            className={styles.close}
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
