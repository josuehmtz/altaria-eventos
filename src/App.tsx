import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact/Contact'
import { Events } from './components/sections/Events'
import { Experience } from './components/sections/Experience'
import { Gallery } from './components/sections/Gallery/Gallery'
import { Hero } from './components/sections/Hero'
import { Process } from './components/sections/Process'
import { Quote } from './components/sections/Quote'
import { WhatsAppFab } from './components/ui/WhatsAppFab'

export default function App() {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <About />
        <Events />
        <Experience />
        <Quote />
        <Gallery />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
