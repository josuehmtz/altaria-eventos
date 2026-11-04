import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { navLinks } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { whatsappUrl } from '../../utils/whatsapp'
import { Icon } from '../ui/Icon'
import { Logo } from '../ui/Logo'
import styles from './Header.module.css'

const sectionIds = navLinks.map((l) => l.id)

export function Header() {
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Bloquea el scroll, permite cerrar con Escape y gestiona el foco del menú móvil
  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.matchMedia('(min-width: 960px)').matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      toggle?.focus()
    }
  }, [open])

  return (
    <header className={styles.header} data-scrolled={scrolled || open} data-open={open}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.brand} aria-label="Altaria Eventos, ir al inicio">
          <Logo />
        </a>

        <nav aria-label="Principal" className={styles.desktopNav}>
          <ul role="list" className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={styles.link}
                  aria-current={active === link.id ? 'location' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={whatsappUrl('Hola, me gustaría cotizar un evento en Altaria.')}
          className={`btn ${styles.cta}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Cotizar
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.bars} aria-hidden="true" />
        </button>
      </div>

      <div id={menuId} className={styles.mobileMenu} hidden={!open}>
        <nav aria-label="Menú móvil">
          <ul role="list" className={styles.mobileLinks}>
            {navLinks.map((link, i) => (
              <li key={link.id} style={{ '--i': i } as CSSProperties}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={whatsappUrl('Hola, me gustaría cotizar un evento en Altaria.')}
          className="btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="whatsapp" /> Cotizar por WhatsApp
        </a>
      </div>
    </header>
  )
}
