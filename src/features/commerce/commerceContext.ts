import { createContext } from 'react'
import type { ProductId } from '../../data/products'

export type CommercePanel = 'cart' | 'favorites' | 'recent' | null

export type CartItem = {
  productId: ProductId
  quantity: number
}

export type CommerceContextValue = {
  cart: CartItem[]
  favorites: ProductId[]
  recentlyViewed: ProductId[]
  panel: CommercePanel
  cartCount: number
  favoritesCount: number
  openPanel: (panel: Exclude<CommercePanel, null>) => void
  closePanel: () => void
  addToCart: (productId: ProductId, quantity?: number) => void
  removeFromCart: (productId: ProductId) => void
  updateCartQuantity: (productId: ProductId, quantity: number) => void
  toggleFavorite: (productId: ProductId) => void
  isFavorite: (productId: ProductId) => boolean
  trackView: (productId: ProductId) => void
  getCartQuantity: (productId: ProductId) => number
}

export const CommerceContext = createContext<CommerceContextValue | null>(null)
