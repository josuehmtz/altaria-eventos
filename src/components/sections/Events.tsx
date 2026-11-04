import { eventTypes } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Events.module.css'

export function Events() {
  return (
    <section id="eventos" className={styles.section} aria-labelledby="eventos-title">
      <div className="container">
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

        <ol role="list" className={styles.grid}>
          {eventTypes.map((event, i) => (
            <Reveal as="li" key={event.title} delay={i * 90} className={styles.card}>
              <span className={styles.number} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.title}>{event.title}</h3>
              <p className={styles.text}>{event.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
