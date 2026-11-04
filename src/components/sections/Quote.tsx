import { siteImages } from '../../data/images'
import { tagline } from '../../data/site'
import { Ornament } from '../ui/Ornament'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { Reveal } from '../ui/Reveal'
import styles from './Quote.module.css'

/** Banda de transición con la frase de la casa sobre una fotografía oscurecida. */
export function Quote() {
  return (
    <section className={styles.band} aria-label="Nuestra promesa">
      <ResponsiveImage image={siteImages.quote} alt="" sizes="100vw" className={styles.bg} />
      <Reveal className={`container ${styles.content}`}>
        <Ornament />
        <blockquote className={styles.quote}>
          <p>“{tagline}”</p>
        </blockquote>
        <p className={styles.cite}>— Altaria Eventos</p>
      </Reveal>
    </section>
  )
}
