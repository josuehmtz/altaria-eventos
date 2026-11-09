/** Línea dorada con destello central, inspirada en el logotipo. */
export function Ornament({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 text-gold ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-current opacity-70" />
      <svg viewBox="0 0 24 24" className="size-3 fill-current">
        <path d="M12 0c.6 6.6 2.4 10.2 12 12-9.6 1.8-11.4 5.4-12 12-.6-6.6-2.4-10.2-12-12C9.6 10.2 11.4 6.6 12 0Z" />
      </svg>
      <span className="h-px w-12 bg-current opacity-70" />
    </span>
  )
}
