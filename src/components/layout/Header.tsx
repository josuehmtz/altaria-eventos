import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { navLinks } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { whatsappUrl } from '../../utils/whatsapp'
import { Icon } from '../ui/Icon'
import { Logo } from '../ui/Logo'

const sectionIds = navLinks.map((l) => l.id)
const quoteUrl = whatsappUrl('Hola, me gustaría cotizar un evento en Altaria.')

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

  // Con el menú abierto el fondo es sólido: backdrop-filter crearía un
  // containing block que rompería el panel fijo del menú móvil.
  const background = open
    ? 'bg-ink'
    : scrolled
      ? 'bg-ink/88 backdrop-blur-[14px] backdrop-saturate-140'
      : ''

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-fg-inverse transition-[background-color,box-shadow,backdrop-filter] duration-400 ease-out ${background} ${
        scrolled || open ? 'shadow-[0_1px_0_rgb(198_161_91/0.18)]' : ''
      }`}
    >
      <div className="wrapper flex h-header items-center gap-8">
        <a href="#inicio" className="mr-auto py-2" aria-label="Altaria Eventos, ir al inicio">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul role="list" className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="relative py-2 text-xs font-normal tracking-[0.2em] text-fg-inverse uppercase opacity-82 transition-opacity duration-250 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-gold after:transition-[scale] after:duration-400 after:ease-out hover:opacity-100 hover:after:origin-left hover:after:scale-x-100 aria-[current]:opacity-100 aria-[current]:after:origin-left aria-[current]:after:scale-x-100"
                  aria-current={active === link.id ? 'location' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={quoteUrl}
          className="btn hidden min-h-[42px] px-6 lg:inline-flex"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cotizar
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="relative grid size-11 place-items-center lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {/* Hamburguesa: tres líneas que se convierten en una X */}
          <span
            aria-hidden="true"
            className={`relative block h-px w-6 transition-[opacity] duration-200 before:absolute before:-top-[7px] before:left-0 before:block before:h-px before:w-6 before:bg-current before:transition-[translate,rotate] before:duration-350 before:ease-out after:absolute after:top-[7px] after:left-0 after:block after:h-px after:bg-current after:transition-[translate,rotate] after:duration-350 after:ease-out ${
              open
                ? 'bg-transparent before:translate-y-[7px] before:rotate-45 after:w-6 after:-translate-y-[7px] after:-rotate-45'
                : 'bg-current after:w-4'
            }`}
          />
        </button>
      </div>

      <div
        id={menuId}
        className="fixed inset-x-0 top-header bottom-0 flex animate-fade-in flex-col items-center justify-center gap-12 bg-ink px-gutter pt-8 pb-18 lg:hidden"
        hidden={!open}
      >
        <nav aria-label="Menú móvil">
          <ul role="list" className="grid gap-4 text-center">
            {navLinks.map((link, i) => (
              <li key={link.id} style={{ '--i': i } as CSSProperties}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="inline-block animate-rise px-4 py-2 font-display text-[2.25rem] font-normal text-fg-inverse [animation-delay:calc(var(--i)*60ms+80ms)] hover:text-gold-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={quoteUrl} className="btn" target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" /> Cotizar por WhatsApp
        </a>
      </div>
    </header>
  )
}
