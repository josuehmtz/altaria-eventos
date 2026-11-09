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

const label = 'text-xs font-medium tracking-[0.16em] text-fg-muted uppercase'
/** Campos con solo una línea inferior, que se vuelve dorada al enfocarlos */
const control =
  'min-h-12 w-full rounded-none border-0 border-b border-fg/25 bg-transparent py-3 text-base transition-[border-color] duration-250 focus:border-b-gold focus:shadow-[0_1px_0_var(--color-gold)] focus:outline-none aria-[invalid=true]:border-b-danger'

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
      <p id={id(`${name}-error`)} className="text-sm text-danger">
        {errors[name]}
      </p>
    ) : null

  return (
    <form
      ref={formRef}
      className="grid gap-6 bg-paper p-[clamp(1.5rem,1rem+3vw,3rem)] text-fg shadow-soft"
      onSubmit={onSubmit}
      noValidate
    >
      <h3 className="text-xl">Solicita tu cotización</h3>
      <p className="-mt-3 text-sm text-fg-muted">
        Completa los datos y te llevaremos a WhatsApp con tu mensaje listo para enviar.
      </p>

      <div className="grid gap-2">
        <label className={label} htmlFor={id('name')}>
          Nombre *
        </label>
        <input
          {...fieldProps('name')}
          className={control}
          type="text"
          autoComplete="name"
          required
        />
        {errorText('name')}
      </div>

      <div className="grid gap-2">
        <label className={label} htmlFor={id('eventType')}>
          Tipo de evento *
        </label>
        <select
          {...fieldProps('eventType')}
          className={`${control} select-chevron pr-8`}
          required
          defaultValue=""
        >
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

      <div className="grid gap-6 min-[32.5rem]:grid-cols-2">
        <div className="grid gap-2">
          <label className={label} htmlFor={id('date')}>
            Fecha tentativa
          </label>
          <input {...fieldProps('date')} className={control} type="date" min={todayISO()} />
          {errorText('date')}
        </div>
        <div className="grid gap-2">
          <label className={label} htmlFor={id('guests')}>
            Invitados
          </label>
          <input
            {...fieldProps('guests')}
            className={control}
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
          />
          {errorText('guests')}
        </div>
      </div>

      <div className="grid gap-2">
        <label className={label} htmlFor={id('message')}>
          Mensaje
        </label>
        <textarea
          id={id('message')}
          name="message"
          rows={3}
          className={`${control} min-h-24 resize-y`}
        />
      </div>

      <button type="submit" className="btn mt-2 w-full">
        <Icon name="whatsapp" /> Enviar por WhatsApp
      </button>

      <p className="min-h-[1.5em] text-center text-sm text-gold-deep" role="status">
        {sent && '¡Gracias! Se abrió WhatsApp con tu mensaje; solo presiona enviar.'}
      </p>
    </form>
  )
}
