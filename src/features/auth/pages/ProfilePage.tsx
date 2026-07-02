import { Navigate } from 'react-router-dom'
import ProfileContent from '../components/ProfileContent'
import { useAuth } from '../useAuth'

export default function ProfilePage() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <ProfileContent />
}
