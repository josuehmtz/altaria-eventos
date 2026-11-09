import { useId, useRef, useState, type FormEvent } from 'react'
import { eventTypes } from '../../../data/site'
import {
  todayISO,
  validateQuote,
  type QuoteErrors as Errors,
  type QuoteField as Field,
} from '../../../utils/validateQuote'
import { buildQuoteMessage, whatsappUrl, type QuoteRequest } from '../../../utils/whatsapp'
import { Icon } from '../../ui/Icon'
import styles from './ContactForm.module.css'

export function ContactForm() {
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const id = (f: string) => `${uid}-${f}`

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data: QuoteRequest = {
      name: String(fd.get('name') ?? ''),
      eventType: String(fd.get('eventType') ?? ''),
      date: String(fd.get('date') ?? ''),
      guests: String(fd.get('guests') ?? ''),
      message: String(fd.get('message') ?? ''),
    }
    const found = validateQuote(data)
    setErrors(found)

    const first = Object.keys(found)[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      setSent(false)
      return
    }

    window.open(whatsappUrl(buildQuoteMessage(data)), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  const fieldProps = (name: Field) => ({
    id: id(name),
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? id(`${name}-error`) : undefined,
  })

  const errorText = (name: Field) =>
    errors[name] ? (
      <p id={id(`${name}-error`)} className={styles.error}>
        {errors[name]}
      </p>
    ) : null

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
      <h3 className={styles.title}>Solicita tu cotización</h3>
      <p className={styles.hint}>
        Completa los datos y te llevaremos a WhatsApp con tu mensaje listo para enviar.
      </p>

      <div className={styles.field}>
        <label htmlFor={id('name')}>Nombre *</label>
        <input {...fieldProps('name')} type="text" autoComplete="name" required />
        {errorText('name')}
      </div>

      <div className={styles.field}>
        <label htmlFor={id('eventType')}>Tipo de evento *</label>
        <select {...fieldProps('eventType')} required defaultValue="">
          <option value="" disabled>
            Selecciona una opción
          </option>
          {eventTypes.map((t) => (
            <option key={t.title}>{t.title}</option>
          ))}
          <option>Otro</option>
        </select>
        {errorText('eventType')}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={id('date')}>Fecha tentativa</label>
          <input {...fieldProps('date')} type="date" min={todayISO()} />
          {errorText('date')}
        </div>
        <div className={styles.field}>
          <label htmlFor={id('guests')}>Invitados</label>
          <input {...fieldProps('guests')} type="number" inputMode="numeric" min={1} step={1} />
          {errorText('guests')}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={id('message')}>Mensaje</label>
        <textarea id={id('message')} name="message" rows={3} />
      </div>

      <button type="submit" className={`btn ${styles.submit}`}>
        <Icon name="whatsapp" /> Enviar por WhatsApp
      </button>

      <p className={styles.status} role="status">
        {sent && '¡Gracias! Se abrió WhatsApp con tu mensaje; solo presiona enviar.'}
      </p>
    </form>
  )
}
