import styles from './Logo.module.css'

/** Logotipo tipográfico (versión ligera del logo para header y footer). */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`${styles.logo} ${className}`}>
      <span className={styles.word}>Altaria</span>
      <span className={styles.sub}>Eventos</span>
    </span>
  )
}
