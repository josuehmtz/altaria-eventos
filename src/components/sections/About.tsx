import { siteImages } from '../../data/images'
import { amenities } from '../../data/site'
import { Icon } from '../ui/Icon'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './About.module.css'

export function About() {
  return (
    <section id="nosotros" className={styles.section} aria-labelledby="nosotros-title">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.media}>
          <div className={styles.frame}>
            <ResponsiveImage
              image={siteImages.aboutMain}
              sizes="(min-width: 960px) 40vw, 90vw"
              className={styles.main}
            />
          </div>
          <ResponsiveImage
            image={siteImages.aboutAccent}
            sizes="(min-width: 960px) 18vw, 40vw"
            className={styles.accent}
          />
        </Reveal>

        <Reveal className={styles.copy} delay={120}>
          <SectionHeading
            id="nosotros-title"
            align="start"
            eyebrow="Bienvenidos a Altaria"
            title={
              <>
                Un espacio elegante para <em>celebrar lo que importa</em>
              </>
            }
          />
          <p>
            En Altaria creemos que cada celebración merece un escenario a su altura. Nuestro salón
            en Nextipac, Zapopan, combina una arquitectura cálida, iluminación envolvente y un
            equipo atento a cada detalle para que tu evento fluya con naturalidad.
          </p>
          <p>
            Desde el primer recorrido hasta el último baile, te acompañamos para convertir tu idea
            en una noche memorable para ti y tus invitados.
          </p>

          <ul role="list" className={styles.list}>
            {amenities.map((item) => (
              <li key={item}>
                <Icon name="check" className={styles.check} />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
