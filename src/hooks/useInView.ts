import { useEffect, useRef, useState } from 'react'

/**
 * Marca un elemento como visible la primera vez que entra al viewport.
 * Si el navegador no soporta IntersectionObserver, se considera visible.
 */
export function useInView<T extends Element>(options: IntersectionObserverInit = {}) {
  const ref = useRef<T>(null)
  // Sin soporte de IntersectionObserver, el contenido se muestra desde el inicio
  const [inView, setInView] = useState(() => !('IntersectionObserver' in globalThis))
  const { root = null, rootMargin = '0px 0px -10% 0px', threshold = 0.12 } = options

  useEffect(() => {
    const node = ref.current
    if (!node || inView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { root, rootMargin, threshold },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [root, rootMargin, threshold, inView])

  return { ref, inView }
}
