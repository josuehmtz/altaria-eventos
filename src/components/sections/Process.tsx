import { steps } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Process() {
  return (
    <section className="bg-sand py-section" aria-labelledby="proceso-title">
      <div className="wrapper">
        <SectionHeading
          id="proceso-title"
          eyebrow="Cómo trabajamos"
          title={
            <>
              Tu evento en <em>tres pasos</em>
            </>
          }
        />
        {/* En escritorio una línea dorada conecta los tres pasos */}
        <ol
          role="list"
          className="relative grid gap-12 min-[53.75rem]:grid-cols-3 min-[53.75rem]:gap-8 min-[53.75rem]:before:absolute min-[53.75rem]:before:top-8 min-[53.75rem]:before:right-[16.66%] min-[53.75rem]:before:left-[16.66%] min-[53.75rem]:before:h-px min-[53.75rem]:before:bg-[linear-gradient(90deg,transparent,var(--color-gold),transparent)]"
        >
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 120}
              className="relative grid justify-items-center gap-3 text-center"
            >
              <span
                className="relative z-1 mb-3 grid size-16 place-items-center rounded-full border border-gold bg-sand font-display text-[1.75rem] text-gold-deep italic"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="text-xl">{step.title}</h3>
              <p className="max-w-[320px] text-fg-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
