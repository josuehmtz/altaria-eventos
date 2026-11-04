import { experiences } from '../../data/site'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Experience.module.css'

export function Experience() {
  return (
    <section id="experiencia" className={styles.section} aria-labelledby="experiencia-title">
      <div className="container">
        <SectionHeading
          id="experiencia-title"
          eyebrow="La experiencia Altaria"
          title={
            <>
              Detalles que <em>hacen la diferencia</em>
            </>
          }
          intro="Todo lo que necesitas para tu celebración, coordinado en un solo lugar."
        />

        <div className={styles.rows}>
          {experiences.map((item, i) => (
            <article key={item.title} className={styles.row}>
              <Reveal className={styles.media}>
                <ResponsiveImage
                  name={item.image}
                  alt={item.alt}
                  sizes="(min-width: 900px) 50vw, 100vw"
                  className={styles.image}
                />
              </Reveal>
              <Reveal className={styles.copy} delay={120}>
                <span className={styles.index} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
