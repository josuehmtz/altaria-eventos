import { describe, expect, it } from 'vitest'
import { validateQuote } from './validateQuote'

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
