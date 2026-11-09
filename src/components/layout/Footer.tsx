import { contact, navLinks } from '../../data/site'
import { whatsappUrl } from '../../utils/whatsapp'
import { Icon } from '../ui/Icon'
import { Logo } from '../ui/Logo'
import { Ornament } from '../ui/Ornament'

const year = new Date().getFullYear()

const socialLink =
  'grid size-11 place-items-center rounded-full border border-ink-line text-gold transition-[border-color,background-color] duration-250 hover:border-gold hover:bg-gold/10'

export function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink pt-18 pb-8 text-fg-inverse-muted">
      <div className="wrapper grid justify-items-center gap-8 text-center">
        <a href="#inicio" aria-label="Altaria Eventos, volver al inicio">
          <Logo />
        </a>
        <Ornament />

        <nav aria-label="Pie de página">
          <ul
            role="list"
            className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs tracking-[0.2em] uppercase"
          >
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="inline-block py-2 transition-colors duration-250 hover:text-gold-light"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul role="list" className="flex gap-3 [&_svg]:size-[18px]">
          <li>
            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={socialLink}
            >
              <Icon name="facebook" />
            </a>
          </li>
          <li>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={socialLink}
            >
              <Icon name="whatsapp" />
            </a>
          </li>
          <li>
            <a
              href={`tel:${contact.phoneE164}`}
              aria-label={`Llamar al ${contact.phoneDisplay}`}
              className={socialLink}
            >
              <Icon name="phone" />
            </a>
          </li>
        </ul>

        <p className="text-xs tracking-[0.06em] opacity-80">
          © {year} {contact.name} · {contact.addressLines.join(', ')}
        </p>
      </div>
    </footer>
  )
}
