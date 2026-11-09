import { siteImages } from '../../data/images'
import { tagline } from '../../data/site'
import { whatsappUrl } from '../../utils/whatsapp'
import { Icon } from '../ui/Icon'
import { ResponsiveImage } from '../ui/ResponsiveImage'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate grid min-h-[max(100svh,640px)] place-items-center overflow-hidden bg-ink pt-[calc(var(--spacing-header)+2rem)] pb-18 text-center text-fg-inverse"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-1 after:absolute after:inset-0 after:bg-hero-scrim">
        <ResponsiveImage
          image={siteImages.hero}
          alt=""
          priority
          sizes="100vw"
          className="size-full animate-kenburns object-cover object-[center_40%]"
        />
      </div>

      <div className="wrapper grid max-w-[880px] justify-items-center gap-4">
        <img
          src="/logo-640.webp"
          alt="Altaria Eventos"
          width={640}
          height={640}
          // El logo tiene fondo negro: "screen" lo vuelve transparente sobre la foto
          className="-mb-2 h-auto w-[clamp(150px,26vw,230px)] animate-fade-up mix-blend-screen"
          fetchPriority="high"
        />
        <p className="animate-fade-up eyebrow text-gold-light [animation-delay:150ms]">
          Salón de eventos · Zapopan, Jalisco
        </p>
        <h1
          id="hero-title"
          className="animate-fade-up text-3xl font-normal [animation-delay:250ms] [&_em]:text-gold-gradient [&_em]:pr-[0.06em] [&_em]:italic"
        >
          Donde cada detalle se vuelve <em>inolvidable</em>
        </h1>
        <p className="max-w-[560px] animate-fade-up text-lg text-fg-inverse/82 [animation-delay:350ms]">
          {tagline}
        </p>
        <div className="mt-4 flex animate-fade-up flex-wrap justify-center gap-4 [animation-delay:450ms] max-[30.06rem]:w-full max-[30.06rem]:flex-col max-[30.06rem]:[&_.btn]:w-full">
          <a
            href={whatsappUrl('Hola, me gustaría agendar una visita a Altaria.')}
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" />
            Agenda tu visita
          </a>
          <a href="#galeria" className="btn btn-ghost">
            Ver galería
          </a>
        </div>
      </div>

      <a
        href="#nosotros"
        className="absolute bottom-6 left-1/2 grid h-16 w-11 -translate-x-1/2 place-items-center max-[30.06rem]:hidden"
        aria-label="Desplazarse a la siguiente sección"
      >
        <span className="h-12 w-px origin-top animate-drip bg-[linear-gradient(to_bottom,transparent,var(--color-gold))]" />
      </a>
    </section>
  )
}
