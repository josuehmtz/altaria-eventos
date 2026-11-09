import { contact } from '../../../data/site'
import { whatsappUrl } from '../../../utils/whatsapp'
import { Icon, type IconName } from '../../ui/Icon'
import { Reveal } from '../../ui/Reveal'
import { SectionHeading } from '../../ui/SectionHeading'
import styles from './Contact.module.css'
import { ContactForm } from './ContactForm'

const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapsQuery)}&z=15&output=embed`
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}`

export function Contact() {
  const details: Array<{ icon: IconName; label: string; value: string; href?: string }> = [
    {
      icon: 'phone',
      label: 'Teléfono',
      value: contact.phoneDisplay,
      href: `tel:${contact.phoneE164}`,
    },
    { icon: 'whatsapp', label: 'WhatsApp', value: contact.phoneDisplay, href: whatsappUrl() },
    { icon: 'pin', label: 'Ubicación', value: contact.addressLines.join(', '), href: mapsLink },
    { icon: 'clock', label: 'Horario', value: contact.hours },
  ]

  return (
    <section id="contacto" className={styles.section} aria-labelledby="contacto-title">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.info}>
          <SectionHeading
            id="contacto-title"
            align="start"
            tone="dark"
            eyebrow="Contacto"
            title={
              <>
                Hablemos de <em>tu fecha especial</em>
              </>
            }
            intro="Agenda una visita o pide tu cotización. Te respondemos a la brevedad."
          />

          <dl className={styles.details}>
            {details.map((d) => (
              <div key={d.label} className={styles.detail}>
                <dt>
                  <Icon name={d.icon} className={styles.icon} />
                  {d.label}
                </dt>
                <dd>
                  {d.href ? (
                    <a
                      href={d.href}
                      {...(d.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className={styles.map}>
            <iframe
              title="Mapa de ubicación de Altaria Eventos"
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <p className={styles.parking}>
            <Icon name="car" className={styles.parkingIcon} />
            {contact.parking}
          </p>
        </Reveal>

        <Reveal delay={150}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
