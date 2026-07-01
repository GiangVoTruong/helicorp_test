type EnvCheckResponse = {
  geminiKeySet: boolean
  source: { file: boolean; processEnv: boolean }
}

export async function logGeminiEnvOnLoad(): Promise<void> {
  const clientHasKey = Boolean(import.meta.env.VITE_GEMINI_API_KEY?.trim())
  console.log(
    `[env] client bundle VITE_GEMINI_API_KEY: ${clientHasKey ? 'set' : 'missing'}`,
  )

  try {
    const response = await fetch('/api/env-check')
    if (!response.ok) throw new Error(`http_${response.status}`)
    const data = (await response.json()) as EnvCheckResponse
    console.log(
      `[env] server VITE_GEMINI_API_KEY: ${data.geminiKeySet ? 'set' : 'missing'}`,
      data.source,
    )
  } catch {
    console.warn('[env] server VITE_GEMINI_API_KEY: unknown (env-check unavailable)')
  }
}
