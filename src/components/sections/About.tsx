import { siteImages } from '../../data/images'
import { amenities } from '../../data/site'
import { Icon } from '../ui/Icon'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  return (
    <section id="nosotros" className="py-section" aria-labelledby="nosotros-title">
      <div className="wrapper grid items-center gap-18 lg:grid-cols-[1fr_1.05fr] lg:gap-[clamp(3rem,6vw,7rem)]">
        <Reveal className="relative pr-[12%] pb-[18%]">
          {/* Marco dorado desplazado detrás de la foto principal */}
          <div className="relative before:pointer-events-none before:absolute before:inset-[-14px_14px_14px_-14px] before:border before:border-gold before:opacity-60">
            <ResponsiveImage
              image={siteImages.aboutMain}
              sizes="(min-width: 960px) 40vw, 90vw"
              className="relative aspect-4/5 w-full object-cover shadow-soft"
            />
          </div>
          <ResponsiveImage
            image={siteImages.aboutAccent}
            sizes="(min-width: 960px) 18vw, 40vw"
            className="absolute right-0 bottom-0 aspect-3/4 w-[46%] border-8 border-ivory object-cover shadow-soft"
          />
        </Reveal>

        <Reveal className="grid gap-4 text-lg text-fg-muted" delay={120}>
          <SectionHeading
            id="nosotros-title"
            align="start"
            eyebrow="Bienvenidos a Altaria"
            title={
              <>
                Un espacio elegante para <em>celebrar lo que importa</em>
              </>
            }
            className="mb-3"
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

          <ul
            role="list"
            className="mt-6 grid gap-x-6 gap-y-3 border-t border-line text-base text-fg min-[37.5rem]:grid-cols-2"
          >
            {amenities.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Icon name="check" className="size-4 shrink-0 text-gold-deep" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
