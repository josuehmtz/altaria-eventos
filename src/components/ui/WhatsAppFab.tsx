import { useScrolled } from '../../hooks/useScrolled'
import { whatsappUrl } from '../../utils/whatsapp'
import { Icon } from './Icon'

/** Botón flotante de WhatsApp: aparece después de pasar el hero. */
export function WhatsAppFab() {
  const visible = useScrolled(600)
  return (
    <a
      href={whatsappUrl('Hola, me gustaría información sobre Altaria Eventos.')}
      className={`fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full bg-gold-gradient text-ink shadow-[0_14px_30px_-10px_rgb(12_11_9/0.55)] transition-[opacity,translate,scale] duration-400 ease-out hover:-translate-y-[3px] [&_svg]:size-[26px] ${
        visible ? 'opacity-100' : 'pointer-events-none translate-y-4 scale-90 opacity-0'
      }`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      tabIndex={visible ? 0 : -1}
    >
      <Icon name="whatsapp" />
    </a>
  )
}
