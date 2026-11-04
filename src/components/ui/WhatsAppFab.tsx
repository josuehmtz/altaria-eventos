import { useScrolled } from '../../hooks/useScrolled'
import { whatsappUrl } from '../../utils/whatsapp'
import { Icon } from './Icon'
import styles from './WhatsAppFab.module.css'

/** Botón flotante de WhatsApp: aparece después de pasar el hero. */
export function WhatsAppFab() {
  const visible = useScrolled(600)
  return (
    <a
      href={whatsappUrl('Hola, me gustaría información sobre Altaria Eventos.')}
      className={styles.fab}
      data-visible={visible}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      tabIndex={visible ? 0 : -1}
    >
      <Icon name="whatsapp" />
    </a>
  )
}
