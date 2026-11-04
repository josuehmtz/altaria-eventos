import type { ReactNode } from 'react'
import { Ornament } from './Ornament'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  id?: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  align?: 'center' | 'start'
  tone?: 'light' | 'dark'
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = 'center',
  tone = 'light',
}: SectionHeadingProps) {
  return (
    <header className={styles.heading} data-align={align} data-tone={tone}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      <Ornament className={styles.ornament} />
      {intro && <p className={styles.intro}>{intro}</p>}
    </header>
  )
}
