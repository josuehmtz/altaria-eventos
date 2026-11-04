/**
 * Genera versiones WebP responsivas de las fotos en `assets-src/`
 * y un manifiesto tipado con dimensiones (evita saltos de layout / CLS).
 *
 * Uso: npm run images
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = path.join(root, 'assets-src')
const outDir = path.join(root, 'public', 'images')
const manifestPath = path.join(root, 'src', 'data', 'images.generated.ts')

const WIDTHS = [480, 960, 1600]
const QUALITY = 74

await mkdir(outDir, { recursive: true })

const files = (await readdir(srcDir)).filter(
  (f) => /\.(jpe?g|png)$/i.test(f) && !f.startsWith('logo'),
)
const manifest = {}

for (const file of files) {
  const name = path.parse(file).name
  const input = sharp(path.join(srcDir, file)).rotate()
  const { width, height } = await input.metadata()
  const widths = WIDTHS.filter((w) => w < width).concat(width > WIDTHS.at(-1) ? [] : [width])
  const unique = [...new Set(widths)].sort((a, b) => a - b)

  for (const w of unique) {
    await input
      .clone()
      .resize({ width: w })
      .webp({ quality: QUALITY })
      .toFile(path.join(outDir, `${name}-${w}.webp`))
  }

  // Placeholder borroso diminuto (LQIP) embebido como data URI
  const blur = await input.clone().resize({ width: 24 }).webp({ quality: 40 }).toBuffer()

  manifest[name] = {
    width,
    height,
    widths: unique,
    placeholder: `data:image/webp;base64,${blur.toString('base64')}`,
  }
  console.log(`✓ ${name} → ${unique.join(', ')}`)
}

// Logo: favicon, apple-touch-icon e imagen para redes sociales
const logo = sharp(path.join(srcDir, 'logo.jpg'))
await logo
  .clone()
  .resize(512)
  .png()
  .toFile(path.join(root, 'public', 'logo-512.png'))
await logo
  .clone()
  .resize(180)
  .png()
  .toFile(path.join(root, 'public', 'apple-touch-icon.png'))
await logo.clone().resize(640).webp({ quality: 85 }).toFile(path.join(outDir, 'logo-640.webp'))
await sharp(path.join(srcDir, 'fachada-noche.jpg'))
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 80 })
  .toFile(path.join(root, 'public', 'og-image.jpg'))
console.log('✓ logo, favicon y og-image')

const banner = '// Archivo generado por scripts/optimize-images.mjs — no editar a mano.\n'
const body = `export const imageManifest = ${JSON.stringify(manifest, null, 2)} as const\n\nexport type ImageName = keyof typeof imageManifest\n`
await mkdir(path.dirname(manifestPath), { recursive: true })
await writeFile(manifestPath, banner + body)
console.log(`✓ manifiesto → ${path.relative(root, manifestPath)}`)
