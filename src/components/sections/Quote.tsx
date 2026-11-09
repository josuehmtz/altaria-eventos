import { siteImages } from '../../data/images'
import { tagline } from '../../data/site'
import { Ornament } from '../ui/Ornament'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { Reveal } from '../ui/Reveal'

/** Banda de transición con la frase de la casa sobre una fotografía oscurecida. */
export function Quote() {
  return (
    <section
      className="relative isolate overflow-hidden bg-ink py-[clamp(6rem,4rem+10vw,12rem)] text-center text-fg-inverse before:absolute before:inset-0 before:-z-1 before:bg-ink/78"
      aria-label="Nuestra promesa"
    >
      <ResponsiveImage
        image={siteImages.quote}
        alt=""
        sizes="100vw"
        className="absolute inset-0 -z-2 size-full object-cover saturate-85"
      />
      <Reveal className="wrapper grid max-w-[900px] justify-items-center gap-6">
        <Ornament />
        <blockquote>
          <p className="font-display text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] leading-[1.25] font-normal text-balance italic">
            “{tagline}”
          </p>
        </blockquote>
        <p className="text-xs tracking-eyebrow text-gold-light uppercase">— Altaria Eventos</p>
      </Reveal>
    </section>
  )
}
