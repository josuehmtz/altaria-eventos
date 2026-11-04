import { siteImages, type ImageRef } from './images'

/**
 * Contenido del sitio. Editar aquí textos, contacto y galería
 * sin tocar los componentes.
 */

export const contact = {
  name: 'Altaria Eventos',
  phoneDisplay: '33 2355 1110',
  phoneE164: '+523323551110',
  /** Número de WhatsApp en formato internacional sin "+" */
  whatsapp: '523323551110',
  addressLines: ['Rita Pérez de Moreno', 'Nextipac, Zapopan, Jal.'],
  mapsQuery: 'Altaria Eventos, Rita Pérez de Moreno, Nextipac, Zapopan, Jalisco',
  facebook: 'https://www.facebook.com/profile.php?id=100063661324473',
  hours: 'Atención todos los días · previa cita',
  parking: 'Contamos con estacionamiento para tus invitados.',
} as const

export const navLinks = [
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'galeria', label: 'Galería' },
  { id: 'contacto', label: 'Contacto' },
] as const

export type SectionId = (typeof navLinks)[number]['id']

export const tagline =
  'Cuéntanos cómo lo soñaste y nos encargaremos de que cada detalle de esa fecha especial sea como lo imaginaste.'

export const eventTypes = [
  {
    title: 'Bodas',
    text: 'Una ceremonia y recepción a la altura de su historia, con montaje, iluminación y decoración pensados para ustedes.',
  },
  {
    title: 'XV Años',
    text: 'Pista amplia, escenario profesional y un ambiente de gala para que la quinceañera brille toda la noche.',
  },
  {
    title: 'Bautizos y comuniones',
    text: 'Celebraciones familiares cálidas, con mesa de postres, mobiliario elegante y espacio para todos.',
  },
  {
    title: 'Sociales y corporativos',
    text: 'Cumpleaños, graduaciones, aniversarios o reuniones de empresa con la logística resuelta de principio a fin.',
  },
] as const

export const experiences: ReadonlyArray<{ title: string; text: string; image: ImageRef }> = [
  {
    title: 'Decoración floral de autor',
    text: 'Cielos de tela, coronas florales suspendidas y backdrops con estructuras doradas que transforman el salón según el estilo de tu evento.',
    image: siteImages.experienceDecoration,
  },
  {
    title: 'Mesa de postres',
    text: 'Cheesecakes, cake pops, tartaletas de fruta y repostería presentada con el mismo cuidado que el resto de tu celebración.',
    image: siteImages.experienceDesserts,
  },
  {
    title: 'Audio, iluminación y show',
    text: 'Escenario con estructura, iluminación robótica y espacio para banda, DJ o mariachi. Tu pista lista para no parar de bailar.',
    image: siteImages.experienceShow,
  },
]

export const amenities = [
  'Estacionamiento para invitados',
  'Salón techado con cielo de tela',
  'Jardín y fachada iluminada',
  'Mobiliario y mantelería',
  'Servicio de barra y bebidas',
  'Pista de baile y escenario',
  'Coordinación el día del evento',
] as const

export const steps = [
  {
    title: 'Cuéntanos tu idea',
    text: 'Escríbenos por WhatsApp o llámanos con la fecha, el tipo de evento y el número de invitados.',
  },
  {
    title: 'Visita el salón',
    text: 'Agenda un recorrido, conoce los espacios y resolvemos juntos cada duda.',
  },
  {
    title: 'Diseñamos cada detalle',
    text: 'Definimos montaje, decoración y servicios para que solo te ocupes de disfrutar.',
  },
] as const

/** Galería: se administra desde el panel /admin (src/content/images.json). */
export const gallery = siteImages.gallery
