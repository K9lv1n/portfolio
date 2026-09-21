import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const requestedPort = Number(process.env.PORT || 5173)

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf'
}

const server = http.createServer((req, res) => {
  const rawPath = decodeURIComponent((req.url || '/').split('?')[0])
  const safePath = rawPath === '/' ? 'index.html' : rawPath.replace(/^\/+/, '')
  const filePath = path.resolve(__dirname, safePath)

  if (!filePath.startsWith(__dirname + path.sep) && filePath !== path.join(__dirname, 'index.html')) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Forbidden')
    return
  }

  fs.readFile(filePath, (err, file) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('Not found')
      return
    }
    res.writeHead(200, {
      'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    })
    res.end(file)
  })
})

let port = requestedPort
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE' && !process.env.PORT && port < requestedPort + 20) {
    port += 1
    console.log(`Port ${port - 1} is busy, trying ${port}...`)
    setTimeout(() => server.listen(port, '127.0.0.1'), 40)
    return
  }
  console.error(error)
  process.exit(1)
})

server.on('listening', () => {
  console.log(`Portfolio running at http://127.0.0.1:${port}`)
})

server.listen(port, '127.0.0.1')
