/**
 * Elimina de `assets-src/` las fotos que ya no usa ninguna sección ni la
 * galería en `src/content/images.json`. Pasa cuando en el panel /admin se
 * reemplaza o se quita una foto: Decap CMS sube la nueva, pero no borra la
 * anterior.
 *
 * Lo ejecuta GitHub Actions después de cada cambio de contenido
 * (.github/workflows/clean-images.yml). Las fotos borradas siguen en el
 * historial de git por si hiciera falta recuperarlas.
 *
 * Uso: npm run images:clean            (borra)
 *      npm run images:clean -- --dry-run  (solo lista)
 */
import { readFile, readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentPath = path.join(root, 'src', 'content', 'images.json')
const originalsDir = path.join(root, 'assets-src')
const dryRun = process.argv.includes('--dry-run')

/** Recorre el JSON y devuelve todas las rutas `src` de imágenes. */
function collectSources(node, found = new Set()) {
  if (Array.isArray(node)) node.forEach((n) => collectSources(n, found))
  else if (node && typeof node === 'object') {
    if (typeof node.src === 'string' && node.src) found.add(node.src)
    Object.values(node).forEach((n) => collectSources(n, found))
  }
  return found
}

const content = JSON.parse(await readFile(contentPath, 'utf8'))
const used = new Set([...collectSources(content)].map((src) => path.basename(src)))

const orphans = (await readdir(originalsDir, { withFileTypes: true }))
  .filter((f) => f.isFile() && !f.name.startsWith('.') && !used.has(f.name))
  .map((f) => f.name)

if (!orphans.length) {
  console.log('✓ No hay imágenes sin usar en assets-src/')
} else {
  for (const name of orphans) {
    if (!dryRun) await rm(path.join(originalsDir, name))
    console.log(`${dryRun ? '•' : '✗'} ${dryRun ? 'Sin usar' : 'Eliminada'}: assets-src/${name}`)
  }
}
