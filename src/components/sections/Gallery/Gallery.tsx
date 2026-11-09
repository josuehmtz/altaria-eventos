import { useState } from 'react'
import { contact, gallery } from '../../../data/site'
import { Icon } from '../../ui/Icon'
import { ResponsiveImage } from '../../ui/ResponsiveImage'
import { Reveal } from '../../ui/Reveal'
import { SectionHeading } from '../../ui/SectionHeading'
import styles from './Gallery.module.css'
import { Lightbox } from './Lightbox'

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)

  return (
    <section id="galeria" className={styles.section} aria-labelledby="galeria-title">
      <div className="container">
        <SectionHeading
          id="galeria-title"
          eyebrow="Galería"
          title={
            <>
              Momentos <em>en Altaria</em>
            </>
          }
          intro="Un vistazo a nuestros espacios y a algunas de las celebraciones que hemos tenido el honor de vivir."
        />

        <ul role="list" className={styles.grid}>
          {gallery.map((item, i) => (
            <Reveal as="li" key={`${item.src}-${i}`} delay={(i % 4) * 80} className={styles.item}>
              <button
                type="button"
                className={styles.button}
                onClick={() => setIndex(i)}
                aria-label={`Ampliar imagen: ${item.caption}`}
              >
                <ResponsiveImage
                  image={item}
                  sizes="(min-width: 1100px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className={styles.image}
                />
                <span className={styles.overlay} aria-hidden="true">
                  <span>{item.caption}</span>
                  <Icon name="expand" />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        <p className={styles.more}>
          <a
            href={contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--dark"
          >
            <Icon name="facebook" /> Más fotos en Facebook
          </a>
        </p>
      </div>

      <Lightbox items={gallery} index={index} onChange={setIndex} />
    </section>
  )
}
