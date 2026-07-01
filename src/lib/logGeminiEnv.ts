type EnvCheckResponse = {
  geminiKeySet: boolean
  source: { geminiEnv: boolean; viteEnv: boolean }
}

export async function logGeminiEnvOnLoad(): Promise<void> {
  try {
    const response = await fetch('/api/env-check')
    if (!response.ok) throw new Error(`http_${response.status}`)
    const data = (await response.json()) as EnvCheckResponse
    console.log(
      `[env] server GEMINI_API_KEY: ${data.geminiKeySet ? 'set' : 'missing'}`,
      data.source,
    )
  } catch {
    console.warn(
      '[env] server GEMINI_API_KEY: unknown (env-check unavailable)',
    )
    console.warn(
      '[deploy] Render phải là Web Service (không phải Static Site). Start Command: pnpm start',
    )
  }
}
