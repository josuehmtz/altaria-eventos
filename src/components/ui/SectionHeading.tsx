import type { ReactNode } from 'react'
import { Ornament } from './Ornament'

interface SectionHeadingProps {
  id?: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  align?: 'center' | 'start'
  /** `dark` para secciones con fondo negro */
  tone?: 'light' | 'dark'
  /** Margen inferior (por defecto separa el encabezado del contenido de la sección) */
  className?: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = 'center',
  tone = 'light',
  className = 'mb-12',
}: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <header
      className={`grid max-w-[680px] gap-4 ${align === 'center' ? 'mx-auto justify-items-center text-center' : ''} ${className}`}
    >
      <p className={`eyebrow ${dark ? 'text-gold' : 'text-gold-deep'}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`text-2xl [&_em]:italic ${dark ? 'text-fg-inverse [&_em]:text-gold' : '[&_em]:text-gold-deep'}`}
      >
        {title}
      </h2>
      <Ornament />
      {intro && (
        <p className={`text-lg ${dark ? 'text-fg-inverse-muted' : 'text-fg-muted'}`}>{intro}</p>
      )}
    </header>
  )
}
