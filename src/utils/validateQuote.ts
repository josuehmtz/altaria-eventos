import type { QuoteRequest } from './whatsapp'

export type QuoteField = 'name' | 'eventType' | 'date' | 'guests'
export type QuoteErrors = Partial<Record<QuoteField, string>>

/** Fecha local de hoy en formato YYYY-MM-DD (mismo formato que <input type="date">). */
export const todayISO = (now = new Date()) => now.toLocaleDateString('en-CA')

export function validateQuote(data: QuoteRequest, now = new Date()): QuoteErrors {
  const errors: QuoteErrors = {}
  if (data.name.trim().length < 2) errors.name = 'Escribe tu nombre.'
  if (!data.eventType) errors.eventType = 'Selecciona el tipo de evento.'
  if (data.date && data.date < todayISO(now)) errors.date = 'Elige una fecha a partir de hoy.'
  if (data.guests) {
    const n = Number(data.guests)
    if (!Number.isInteger(n) || n < 1 || n > 2000) errors.guests = 'Ingresa un número válido.'
  }
  return errors
}
