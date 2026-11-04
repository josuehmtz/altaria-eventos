import type { ImageName } from './images.generated'

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

export const experiences: ReadonlyArray<{
  title: string
  text: string
  image: ImageName
  alt: string
}> = [
  {
    title: 'Decoración floral de autor',
    text: 'Cielos de tela, coronas florales suspendidas y backdrops con estructuras doradas que transforman el salón según el estilo de tu evento.',
    image: 'backdrop-floral',
    alt: 'Backdrop de flores blancas y rosas con ramas y estructuras doradas junto a una silla capitonada blanca',
  },
  {
    title: 'Mesa de postres',
    text: 'Cheesecakes, cake pops, tartaletas de fruta y repostería presentada con el mismo cuidado que el resto de tu celebración.',
    image: 'mesa-postres',
    alt: 'Mesa de postres con cortinas rosas, cupcakes, tartaletas de fruta y donas sobre bases de madera',
  },
  {
    title: 'Audio, iluminación y show',
    text: 'Escenario con estructura, iluminación robótica y espacio para banda, DJ o mariachi. Tu pista lista para no parar de bailar.',
    image: 'pista-mariachi',
    alt: 'Mariachi en el escenario con luces, letras iluminadas EVE y corona floral en el techo del salón',
  },
]

export const amenities = [
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

export const gallery: ReadonlyArray<{ image: ImageName; alt: string; caption: string }> = [
  {
    image: 'fachada-noche',
    alt: 'Fachada de Altaria de noche con techo de luces y letras iluminadas M y A',
    caption: 'Bienvenida bajo un cielo de luces',
  },
  {
    image: 'salon-interior',
    alt: 'Interior del salón con cielo de tela, corona floral y mesas montadas con sillas de madera',
    caption: 'Salón principal',
  },
  {
    image: 'backdrop-floral',
    alt: 'Backdrop floral con flores blancas y rosas y estructuras doradas',
    caption: 'Backdrop floral',
  },
  {
    image: 'mesa-postres',
    alt: 'Mesa de postres decorada con telas rosas',
    caption: 'Mesa de postres',
  },
  {
    image: 'escenario',
    alt: 'Escenario con iluminación y audio profesional bajo una corona de flores',
    caption: 'Escenario y pista',
  },
  {
    image: 'cheesecakes',
    alt: 'Mini cheesecakes con moras azules y hojas de menta sobre bases doradas',
    caption: 'Mini cheesecakes',
  },
  {
    image: 'pista-mariachi',
    alt: 'Mariachi tocando en el escenario del salón',
    caption: 'Música en vivo',
  },
  {
    image: 'cake-pops',
    alt: 'Cake pops color rosa con chispas blancas',
    caption: 'Cake pops',
  },
]
