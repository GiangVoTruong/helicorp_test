import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../../components/ui/useToast'
import { useLanguage } from '../../../i18n/useLanguage'
import { useAuth } from '../useAuth'
import { login } from '../services/LoginService'

function getLoginErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined
    if (data?.message) return data.message
  }

  return fallback
}

export const useLogin = () => {
  const navigate = useNavigate()
  const { setSession } = useAuth()
  const { showToast } = useToast()
  const { t } = useLanguage()

  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      login(username, password),
    onSuccess: (data, variables) => {
      setSession({
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
        username: variables.username,
      })
      showToast(t.auth.loginSuccess, 'success')
      navigate('/')
    },
    onError: (error) => {
      showToast(getLoginErrorMessage(error, t.auth.loginError), 'error')
    },
  })
}
