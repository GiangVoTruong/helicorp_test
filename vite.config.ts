import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const geminiKey = env.VITE_GEMINI_API_KEY ?? process.env.VITE_GEMINI_API_KEY

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

  const logGeminiEnv = {
    name: 'log-gemini-env',
    configurePreviewServer() {
      const fromFile = Boolean(env.VITE_GEMINI_API_KEY?.trim())
      const fromProcess = Boolean(process.env.VITE_GEMINI_API_KEY?.trim())
      const hasKey = Boolean(geminiKey?.trim())
      console.log(
        `[env] VITE_GEMINI_API_KEY: ${hasKey ? 'set' : 'missing'} (file=${fromFile}, process.env=${fromProcess})`,
      )
    },
  }

  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss(), logGeminiEnv],
    server: { proxy: { '/api/gemini': geminiProxy } },
    preview: {
      host: '0.0.0.0',
      port: Number(process.env.PORT) || 4173,
      strictPort: true,
      proxy: { '/api/gemini': geminiProxy },
    },
  }
})
