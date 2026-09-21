import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const out = path.join(root, 'public')
const copyTargets = ['index.html', 'src', 'assets', 'vendor']

fs.rmSync(out, { recursive: true, force: true })
fs.mkdirSync(out, { recursive: true })

for (const target of copyTargets) {
  const src = path.join(root, target)
  const dest = path.join(out, target)
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required deploy asset: ${target}`)
  }
  fs.cpSync(src, dest, { recursive: true })
}

console.log('Vercel build complete.')
console.log('Static output created at public/')
