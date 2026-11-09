import { experiences } from '../../data/site'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Experience() {
  return (
    <section id="experiencia" className="bg-paper py-section" aria-labelledby="experiencia-title">
      <div className="wrapper">
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

        <div className="grid gap-18 min-[56.25rem]:gap-section">
          {experiences.map((item, i) => (
            // En escritorio las filas pares invierten el orden (foto a la derecha)
            <article
              key={item.title}
              className="group grid items-center gap-8 min-[56.25rem]:grid-cols-[1.15fr_1fr] min-[56.25rem]:gap-[clamp(3rem,7vw,7rem)]"
            >
              <Reveal className="overflow-hidden min-[56.25rem]:group-even:order-2">
                <ResponsiveImage
                  image={item.image}
                  sizes="(min-width: 900px) 50vw, 100vw"
                  className="aspect-4/3 w-full object-cover transition-[scale] duration-1200 ease-out group-hover:scale-104"
                />
              </Reveal>
              <Reveal
                className="grid max-w-[460px] gap-4 min-[56.25rem]:group-even:justify-self-end"
                delay={120}
              >
                <span
                  className="font-display text-[4rem] leading-none text-transparent italic [-webkit-text-stroke:1px_var(--color-gold)]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)]">{item.title}</h3>
                <p className="text-lg text-fg-muted">{item.text}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
