import axiosInstance from '../../../configs/axios/axiosInstance'

export type LoginResponse = {
  data: {
    accessToken: string
    refreshToken: string
  }
  message: string
  success: boolean
  timestamp: string
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/auth/login', { username, password })
  return response.data
}
