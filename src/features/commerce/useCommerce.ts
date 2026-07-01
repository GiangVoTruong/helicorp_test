import { useContext } from 'react'
import { CommerceContext } from './commerceContext'

export function useCommerce() {
  const context = useContext(CommerceContext)
  if (!context) {
    throw new Error('useCommerce phải được dùng bên trong CommerceProvider')
  }
  return context
}
