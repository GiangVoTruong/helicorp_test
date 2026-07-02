import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../useAuth'
import { login } from '../services/LoginService'

export const useLogin = () => {
  const navigate = useNavigate()
  const { setSession } = useAuth()

  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      login(username, password),
    onSuccess: (data, variables) => {
      setSession({
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
        username: variables.username,
      })
      navigate('/')
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
