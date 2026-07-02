import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../services/ProfileService'
import { useAuth } from '../useAuth'
import { saveUserProfile } from '../userProfiles'

export const useProfile = () => {
  const { isAuthenticated, username } = useAuth()

  return useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      const profile = await getProfile()
      saveUserProfile({
        username: profile.username,
        email: profile.email,
        phone: profile.phone ?? '',
      })
      return profile
    },
    enabled: isAuthenticated && Boolean(username),
    staleTime: 0,
  })
}
