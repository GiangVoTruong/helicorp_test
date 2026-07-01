import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')
const port = Number(process.env.PORT) || 4173
const geminiKey = (process.env.GEMINI_API_KEY ?? process.env.VITE_GEMINI_API_KEY ?? '').trim()

const app = express()

app.get('/api/env-check', (_req, res) => {
  res.json({
    geminiKeySet: Boolean(geminiKey),
    source: {
      geminiEnv: Boolean(process.env.GEMINI_API_KEY?.trim()),
      viteEnv: Boolean(process.env.VITE_GEMINI_API_KEY?.trim()),
    },
  })
})

app.use(
  '/api/gemini',
  createProxyMiddleware({
    target: 'https://generativelanguage.googleapis.com',
    changeOrigin: true,
    pathRewrite: (requestPath) => {
      const stripped = requestPath.replace(/^\/api\/gemini/, '')
      if (!geminiKey) return stripped
      const separator = stripped.includes('?') ? '&' : '?'
      return `${stripped}${separator}key=${encodeURIComponent(geminiKey)}`
    },
  }),
)

app.use(express.static(distDir))

app.get(/^(?!\/api\/).*/, (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(port, '0.0.0.0', () => {
  console.log(`[server] listening on 0.0.0.0:${port}`)
  console.log(`[env] GEMINI_API_KEY: ${geminiKey ? 'set' : 'missing'}`)
})
