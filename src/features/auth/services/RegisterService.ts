import axiosInstance from '../../../configs/axios/axiosInstance'

export type RegisterPayload = {
  username: string
  password: string
  confirmPassword: string
  email: string
  phone: string
}

export type RegisterResponse = {
  data: {
    id: number
    username: string
    email: string
    phone: string
  }
  message: string
  success: boolean
  timestamp: string
}

export const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>('/auth/register', payload)
  return response.data
}
