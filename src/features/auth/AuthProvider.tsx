import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { AuthContext, type AuthSession, type SetSessionInput } from './authContext'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const USERNAME_KEY = 'username'

function decodeUsernameFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as { sub?: string }
    return typeof payload.sub === 'string' ? payload.sub : null
  } catch {
    return null
  }
}

function readSession(): AuthSession {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (!accessToken) {
    return { isAuthenticated: false, username: null, email: null, phone: null }
  }

  const username = localStorage.getItem(USERNAME_KEY) ?? decodeUsernameFromToken(accessToken)

  if (!username) {
    return { isAuthenticated: false, username: null, email: null, phone: null }
  }

  return {
    isAuthenticated: true,
    username,
    email: null,
    phone: null,
  }
}

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient()
  const [session, setSessionState] = useState<AuthSession>(readSession)

  const clearProfileCache = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['profile'] })
  }, [queryClient])

  const setSession = useCallback(
    (input: SetSessionInput) => {
      clearProfileCache()

      localStorage.setItem(ACCESS_TOKEN_KEY, input.accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, input.refreshToken)
      localStorage.setItem(USERNAME_KEY, input.username)
      setSessionState({
        isAuthenticated: true,
        username: input.username,
        email: input.email ?? null,
        phone: input.phone ?? null,
      })
    },
    [clearProfileCache],
  )

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USERNAME_KEY)
    clearProfileCache()
    setSessionState({ isAuthenticated: false, username: null, email: null, phone: null })
  }, [clearProfileCache])

  const value = useMemo(
    () => ({
      ...session,
      setSession,
      logout,
    }),
    [session, setSession, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
