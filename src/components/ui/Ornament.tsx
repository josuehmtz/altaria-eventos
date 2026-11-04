import styles from './Ornament.module.css'

/** Línea dorada con destello central, inspirada en el logotipo. */
export function Ornament({ className = '' }: { className?: string }) {
  return (
    <span className={`${styles.ornament} ${className}`} aria-hidden="true">
      <span className={styles.line} />
      <svg viewBox="0 0 24 24" className={styles.star}>
        <path d="M12 0c.6 6.6 2.4 10.2 12 12-9.6 1.8-11.4 5.4-12 12-.6-6.6-2.4-10.2-12-12C9.6 10.2 11.4 6.6 12 0Z" />
      </svg>
      <span className={styles.line} />
    </span>
  )
}
