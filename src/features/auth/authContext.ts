import { createContext } from 'react'

export type AuthSession = {
  isAuthenticated: boolean
  username: string | null
  email: string | null
  phone: string | null
}

export type SetSessionInput = {
  accessToken: string
  refreshToken: string
  username: string
  email?: string
  phone?: string
}

export type AuthContextValue = AuthSession & {
  setSession: (session: SetSessionInput) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
