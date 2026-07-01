import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import type { Connect } from 'vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const geminiKey =
    env.GEMINI_API_KEY ??
    process.env.GEMINI_API_KEY ??
    env.VITE_GEMINI_API_KEY ??
    process.env.VITE_GEMINI_API_KEY

  const geminiProxy = {
    target: 'https://generativelanguage.googleapis.com',
    changeOrigin: true,
    rewrite: (path: string) => {
      const stripped = path.replace(/^\/api\/gemini/, '')
      if (!geminiKey) return stripped
      const separator = stripped.includes('?') ? '&' : '?'
      return `${stripped}${separator}key=${encodeURIComponent(geminiKey)}`
    },
  }

  const envCheckMiddleware: Connect.NextHandleFunction = (req, res, next) => {
    if (req.url !== '/api/env-check') return next()

    const fromFile = Boolean(
      (env.GEMINI_API_KEY ?? env.VITE_GEMINI_API_KEY)?.trim(),
    )
    const fromProcess = Boolean(
      (process.env.GEMINI_API_KEY ?? process.env.VITE_GEMINI_API_KEY)?.trim(),
    )
    const hasKey = Boolean(geminiKey?.trim())

    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        geminiKeySet: hasKey,
        source: { file: fromFile, processEnv: fromProcess },
      }),
    )
  }

  const envCheckPlugin = {
    name: 'env-check',
    configureServer(server: { middlewares: Connect.Server }) {
      server.middlewares.use(envCheckMiddleware)
    },
    configurePreviewServer(server: { middlewares: Connect.Server }) {
      server.middlewares.use(envCheckMiddleware)
    },
  }

  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss(), envCheckPlugin],
    server: { proxy: { '/api/gemini': geminiProxy } },
    preview: {
      host: '0.0.0.0',
      port: Number(process.env.PORT) || 4173,
      strictPort: true,
      proxy: { '/api/gemini': geminiProxy },
    },
  }
})
