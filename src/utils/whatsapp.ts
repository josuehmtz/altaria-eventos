import { contact } from '../data/site'

export interface QuoteRequest {
  name: string
  eventType: string
  date?: string
  guests?: string
  message?: string
}

/** Convierte "2026-12-05" en "5 de diciembre de 2026" sin depender de la zona horaria. */
export function formatEventDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  if (!y || !m || !d) return isoDate
  return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, d)),
  )
}

export function buildQuoteMessage(req: QuoteRequest): string {
  const lines = [
    `Hola, soy ${req.name.trim()}. Me interesa cotizar un evento en Altaria.`,
    `• Tipo de evento: ${req.eventType}`,
  ]
  if (req.date) lines.push(`• Fecha tentativa: ${formatEventDate(req.date)}`)
  if (req.guests) lines.push(`• Invitados: ${req.guests}`)
  if (req.message?.trim()) lines.push('', req.message.trim())
  return lines.join('\n')
}

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${contact.whatsapp}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
