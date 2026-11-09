import { eventTypes } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Events() {
  return (
    <section
      id="eventos"
      className="relative bg-ink bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgb(198_161_91/0.12),transparent_70%)] py-section text-fg-inverse"
      aria-labelledby="eventos-title"
    >
      <div className="wrapper">
        <SectionHeading
          id="eventos-title"
          tone="dark"
          eyebrow="Eventos"
          title={
            <>
              Cada celebración, <em>a su manera</em>
            </>
          }
          intro="Adaptamos el montaje, la decoración y los servicios al estilo y tamaño de tu evento."
        />

        <ol
          role="list"
          className="grid border-t border-l border-ink-line sm:grid-cols-2 min-[67.5rem]:grid-cols-4"
        >
          {eventTypes.map((event, i) => (
            <Reveal
              as="li"
              key={event.title}
              delay={i * 90}
              // La línea dorada inferior se dibuja al pasar el cursor
              className="relative grid content-start gap-4 border-r border-b border-ink-line px-8 py-12 transition-colors duration-500 ease-out after:absolute after:inset-x-8 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-gold-gradient after:transition-[scale] after:duration-600 after:ease-out hover:bg-ink-soft hover:after:scale-x-100 min-[67.5rem]:min-h-[320px]"
            >
              <span className="font-display text-[1.125rem] text-gold italic" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-medium">{event.title}</h3>
              <p className="text-fg-inverse-muted">{event.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
