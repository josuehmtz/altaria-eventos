import { useState } from 'react'
import { contact, gallery } from '../../../data/site'
import { Icon } from '../../ui/Icon'
import { ResponsiveImage } from '../../ui/ResponsiveImage'
import { Reveal } from '../../ui/Reveal'
import { SectionHeading } from '../../ui/SectionHeading'
import { Lightbox } from './Lightbox'

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)

  return (
    <section id="galeria" className="py-section" aria-labelledby="galeria-title">
      <div className="wrapper">
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

        {/* Masonry con columnas CSS: respeta la proporción original de cada foto */}
        <ul
          role="list"
          className="columns-2 gap-x-3 sm:columns-3 sm:gap-x-4 min-[68.75rem]:columns-4"
        >
          {gallery.map((item, i) => (
            <Reveal
              as="li"
              key={`${item.src}-${i}`}
              delay={(i % 4) * 80}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
              <button
                type="button"
                className="group relative block w-full overflow-hidden"
                onClick={() => setIndex(i)}
                aria-label={`Ampliar imagen: ${item.caption}`}
              >
                <ResponsiveImage
                  image={item}
                  sizes="(min-width: 1100px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="h-auto w-full transition-[scale,filter] duration-[1s,600ms] ease-out group-hover:scale-105 group-focus-visible:scale-105"
                />
                {/* En pantallas táctiles el título siempre está visible */}
                <span
                  className="absolute inset-0 flex items-end justify-between gap-3 bg-[linear-gradient(180deg,transparent_50%,rgb(12_11_9/0.75))] p-4 text-left font-display text-[1.25rem] text-fg-inverse italic opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:text-base [@media(hover:none)]:opacity-100"
                  aria-hidden="true"
                >
                  <span>{item.caption}</span>
                  <Icon
                    name="expand"
                    className="size-[18px] shrink-0 text-gold-light [@media(hover:none)]:hidden"
                  />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        <p className="mt-12 flex justify-center">
          <a
            href={contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark"
          >
            <Icon name="facebook" /> Más fotos en Facebook
          </a>
        </p>
      </div>

      <Lightbox items={gallery} index={index} onChange={setIndex} />
    </section>
  )
}
