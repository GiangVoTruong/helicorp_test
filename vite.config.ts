import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
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

  const apiProxyTarget =
    env.VITE_API_PROXY_TARGET ??
    process.env.VITE_API_PROXY_TARGET ??
    'http://localhost:8080'

  const apiProxy = {
    target: apiProxyTarget,
    changeOrigin: true,
    secure: true,
  }

  const proxy = {
    '/api/gemini': geminiProxy,
    '/api': apiProxy,
  }

  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
    server: { proxy },
    preview: {
      host: '0.0.0.0',
      port: Number(process.env.PORT) || 4173,
      strictPort: true,
      allowedHosts: ['helicorp-test.onrender.com'],
      proxy,
    },
  }
})
