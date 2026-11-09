import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import { gallery } from './data/site'

describe('App', () => {
  it('renderiza un único h1 y todas las secciones navegables', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    for (const id of ['nosotros', 'eventos', 'experiencia', 'galeria', 'contacto']) {
      expect(document.getElementById(id)).toBeInTheDocument()
    }
  })

  it('indica que el salón cuenta con estacionamiento', () => {
    render(<App />)
    expect(screen.getByText('Estacionamiento para invitados')).toBeInTheDocument()
    expect(screen.getByText(/Contamos con estacionamiento/)).toBeInTheDocument()
  })

  it('todas las imágenes tienen texto alternativo definido', () => {
    render(<App />)
    for (const img of document.querySelectorAll('img')) {
      expect(img).toHaveAttribute('alt')
    }
  })

  it('abre y cierra el menú móvil', async () => {
    const user = userEvent.setup()
    render(<App />)
    const toggle = screen.getByRole('button', { name: 'Abrir menú' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    const mobileNav = screen.getByRole('navigation', { name: 'Menú móvil' })
    expect(within(mobileNav).getByRole('link', { name: 'Nosotros' })).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  // La galería se edita desde /admin: la prueba no depende del número ni del orden de fotos.
  it('abre la galería y navega entre imágenes', async () => {
    const user = userEvent.setup()
    const total = gallery.length
    render(<App />)
    await user.click(screen.getAllByRole('button', { name: /^Ampliar imagen:/ })[0]!)

    const dialog = screen.getByRole('dialog', { name: 'Galería de imágenes' })
    expect(within(dialog).getByText(`1 / ${total}`)).toBeInTheDocument()

    await user.click(within(dialog).getByRole('button', { name: 'Imagen siguiente' }))
    expect(within(dialog).getByText(`${total > 1 ? 2 : 1} / ${total}`)).toBeInTheDocument()

    await user.click(within(dialog).getByRole('button', { name: 'Cerrar galería' }))
    expect(within(dialog).queryByText(new RegExp(`/ ${total}$`))).not.toBeInTheDocument()
  })

  it('valida el formulario y abre WhatsApp con el mensaje', async () => {
    const user = userEvent.setup()
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    render(<App />)

    const submit = screen.getByRole('button', { name: /Enviar por WhatsApp/ })
    await user.click(submit)
    expect(screen.getByText('Escribe tu nombre.')).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre *')).toHaveFocus()
    expect(open).not.toHaveBeenCalled()

    await user.type(screen.getByLabelText('Nombre *'), 'Laura')
    await user.selectOptions(screen.getByLabelText('Tipo de evento *'), 'XV Años')
    await user.click(submit)

    expect(open).toHaveBeenCalledOnce()
    const url = String(open.mock.calls[0]?.[0])
    expect(decodeURIComponent(url)).toContain('soy Laura')
    expect(screen.getByRole('status')).toHaveTextContent('Se abrió WhatsApp')
  })
})
