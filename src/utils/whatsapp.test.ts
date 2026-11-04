import { describe, expect, it } from 'vitest'
import { validateQuote } from './validateQuote'
import { buildQuoteMessage, formatEventDate, whatsappUrl } from './whatsapp'

describe('whatsappUrl', () => {
  it('genera el enlace base sin texto', () => {
    expect(whatsappUrl()).toBe('https://wa.me/523323551110')
  })

  it('codifica el mensaje en la URL', () => {
    expect(whatsappUrl('Hola & adiós')).toBe(
      'https://wa.me/523323551110?text=Hola%20%26%20adi%C3%B3s',
    )
  })
})

describe('buildQuoteMessage', () => {
  it('incluye solo los campos capturados', () => {
    const msg = buildQuoteMessage({ name: ' Ana ', eventType: 'Bodas', guests: '150' })
    expect(msg).toContain('soy Ana.')
    expect(msg).toContain('Tipo de evento: Bodas')
    expect(msg).toContain('Invitados: 150')
    expect(msg).not.toContain('Fecha')
  })

  it('formatea la fecha en español', () => {
    expect(formatEventDate('2026-12-05')).toBe('5 de diciembre de 2026')
  })
})

describe('validateQuote', () => {
  const now = new Date(2026, 10, 3)

  it('exige nombre y tipo de evento', () => {
    expect(validateQuote({ name: '', eventType: '' }, now)).toEqual({
      name: expect.any(String),
      eventType: expect.any(String),
    })
  })

  it('rechaza fechas pasadas y número de invitados inválido', () => {
    const errors = validateQuote(
      { name: 'Ana', eventType: 'Bodas', date: '2026-01-01', guests: '-3' },
      now,
    )
    expect(errors.date).toBeDefined()
    expect(errors.guests).toBeDefined()
  })

  it('acepta una solicitud válida', () => {
    expect(
      validateQuote({ name: 'Ana', eventType: 'XV Años', date: '2027-02-14', guests: '200' }, now),
    ).toEqual({})
  })
})
