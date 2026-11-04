import { siteImages } from '../../data/images'
import { tagline } from '../../data/site'
import { whatsappUrl } from '../../utils/whatsapp'
import { Icon } from '../ui/Icon'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        <ResponsiveImage
          image={siteImages.hero}
          alt=""
          priority
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <div className={`container ${styles.content}`}>
        <img
          src="/logo-640.webp"
          alt="Altaria Eventos"
          width={640}
          height={640}
          className={styles.logo}
          fetchPriority="high"
        />
        <p className={styles.eyebrow}>Salón de eventos · Zapopan, Jalisco</p>
        <h1 id="hero-title" className={styles.title}>
          Donde cada detalle se vuelve <em>inolvidable</em>
        </h1>
        <p className={styles.lead}>{tagline}</p>
        <div className={styles.actions}>
          <a
            href={whatsappUrl('Hola, me gustaría agendar una visita a Altaria.')}
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" />
            Agenda tu visita
          </a>
          <a href="#galeria" className="btn btn--ghost">
            Ver galería
          </a>
        </div>
      </div>

      <a href="#nosotros" className={styles.scroll} aria-label="Desplazarse a la siguiente sección">
        <span />
      </a>
    </section>
  )
}
