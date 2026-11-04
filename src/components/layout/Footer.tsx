import { contact, navLinks } from '../../data/site'
import { whatsappUrl } from '../../utils/whatsapp'
import { Icon } from '../ui/Icon'
import { Logo } from '../ui/Logo'
import { Ornament } from '../ui/Ornament'
import styles from './Footer.module.css'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" aria-label="Altaria Eventos, volver al inicio">
          <Logo />
        </a>
        <Ornament />

        <nav aria-label="Pie de página">
          <ul role="list" className={styles.links}>
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ul role="list" className={styles.social}>
          <li>
            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Icon name="facebook" />
            </a>
          </li>
          <li>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <Icon name="whatsapp" />
            </a>
          </li>
          <li>
            <a href={`tel:${contact.phoneE164}`} aria-label={`Llamar al ${contact.phoneDisplay}`}>
              <Icon name="phone" />
            </a>
          </li>
        </ul>

        <p className={styles.legal}>
          © {year} {contact.name} · {contact.addressLines.join(', ')}
        </p>
      </div>
    </footer>
  )
}
