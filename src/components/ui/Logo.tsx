/** Logotipo tipográfico (versión ligera del logo para header y footer). */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-grid justify-items-center leading-none ${className}`}>
      <span className="text-gold-gradient font-display text-[1.75rem] font-medium tracking-[0.14em] uppercase">
        Altaria
      </span>
      <span className="mt-1 -mr-[0.6em] text-[0.5625rem] font-medium tracking-[0.6em] text-gold uppercase">
        Eventos
      </span>
    </span>
  )
}
