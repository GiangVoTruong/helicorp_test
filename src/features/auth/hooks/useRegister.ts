import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/RegisterService'
import { saveUserProfile } from '../userProfiles'

export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      saveUserProfile({
        username: data.data.username,
        email: data.data.email,
        phone: data.data.phone,
      })
      navigate('/login')
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
