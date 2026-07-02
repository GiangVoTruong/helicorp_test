import axiosInstance from '../../../configs/axios/axiosInstance'

export type UserProfile = {
  id: number
  username: string
  email: string
  phone: string | null
}

export type ProfileResponse = {
  data: UserProfile
  message: string
  success: boolean
  timestamp: string
}

export const getProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get<ProfileResponse>('/users/profile')
  return response.data.data
}
