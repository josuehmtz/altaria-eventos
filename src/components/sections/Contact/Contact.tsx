import { contact } from '../../../data/site'
import { whatsappUrl } from '../../../utils/whatsapp'
import { Icon, type IconName } from '../../ui/Icon'
import { Reveal } from '../../ui/Reveal'
import { SectionHeading } from '../../ui/SectionHeading'
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
    <section
      id="contacto"
      className="bg-ink bg-[radial-gradient(ellipse_50%_60%_at_100%_100%,rgb(198_161_91/0.1),transparent_70%)] py-section text-fg-inverse"
      aria-labelledby="contacto-title"
    >
      <div className="wrapper grid gap-18 min-[62.5rem]:grid-cols-2 min-[62.5rem]:gap-[clamp(3rem,6vw,6rem)]">
        <Reveal className="grid content-start gap-8">
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
            className="mb-0"
          />

          <dl className="grid gap-6 sm:grid-cols-2">
            {details.map((d) => (
              <div key={d.label} className="grid gap-1 border-b border-ink-line pb-4">
                <dt className="flex items-center gap-2 text-xs tracking-[0.2em] text-gold uppercase">
                  <Icon name={d.icon} className="size-4" />
                  {d.label}
                </dt>
                <dd className="m-0 font-display text-[1.375rem]">
                  {d.href ? (
                    <a
                      href={d.href}
                      className="transition-colors duration-250 hover:text-gold-light"
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

          <div className="aspect-16/10 overflow-hidden border border-ink-line">
            <iframe
              title="Mapa de ubicación de Altaria Eventos"
              src={mapsEmbed}
              loading="lazy"
              className="size-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.85)_sepia(0.25)]"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <p className="flex items-center gap-3 border border-gold/35 bg-gold/6 px-6 py-4 text-fg-inverse">
            <Icon name="car" className="size-[22px] shrink-0 text-gold" />
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
