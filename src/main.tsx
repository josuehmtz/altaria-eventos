import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fuentes auto-alojadas (sin peticiones a terceros, mejor privacidad y rendimiento)
import '@fontsource/cormorant-garamond/latin-400.css'
import '@fontsource/cormorant-garamond/latin-400-italic.css'
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/latin-500-italic.css'
import '@fontsource-variable/jost/index.css'

import './styles/global.css'
import App from './App'

const root = document.getElementById('root')
if (!root) throw new Error('No se encontró el elemento #root')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
