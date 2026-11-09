import { describe, expect, it } from 'vitest'
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
