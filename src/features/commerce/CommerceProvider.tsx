import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { isProductId, type ProductId } from '../../data/products'
import {
  CommerceContext,
  type CartItem,
  type CommercePanel,
} from './commerceContext'

const CART_KEY = 'technexus-cart'
const FAVORITES_KEY = 'technexus-favorites'
const RECENT_KEY = 'technexus-recent'
const MAX_RECENT = 8

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return parsed.filter((item) => isProductId(item.productId) && item.quantity > 0)
  } catch {
    return []
  }
}

function readIds(key: string): ProductId[] {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw) as string[]
    return parsed.filter(isProductId)
  } catch {
    return []
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

type CommerceProviderProps = {
  children: ReactNode
}

export default function CommerceProvider({ children }: CommerceProviderProps) {
  const [cart, setCart] = useState<CartItem[]>(() => readCart())
  const [favorites, setFavorites] = useState<ProductId[]>(() => readIds(FAVORITES_KEY))
  const [recentlyViewed, setRecentlyViewed] = useState<ProductId[]>(() => readIds(RECENT_KEY))
  const [panel, setPanel] = useState<CommercePanel>(null)

  const openPanel = useCallback((next: Exclude<CommercePanel, null>) => setPanel(next), [])
  const closePanel = useCallback(() => setPanel(null), [])

  const addToCart = useCallback((productId: ProductId, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId)
      const next = existing
        ? prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...prev, { productId, quantity }]
      writeCart(next)
      return next
    })
  }, [])

  const removeFromCart = useCallback((productId: ProductId) => {
    setCart((prev) => {
      const next = prev.filter((item) => item.productId !== productId)
      writeCart(next)
      return next
    })
  }, [])

  const updateCartQuantity = useCallback((productId: ProductId, quantity: number) => {
    setCart((prev) => {
      const next =
        quantity <= 0
          ? prev.filter((item) => item.productId !== productId)
          : prev.map((item) => (item.productId === productId ? { ...item, quantity } : item))
      writeCart(next)
      return next
    })
  }, [])

  const toggleFavorite = useCallback((productId: ProductId) => {
    setFavorites((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [productId, ...prev]
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (productId: ProductId) => favorites.includes(productId),
    [favorites],
  )

  const trackView = useCallback((productId: ProductId) => {
    setRecentlyViewed((prev) => {
      const next = [productId, ...prev.filter((id) => id !== productId)].slice(0, MAX_RECENT)
      localStorage.setItem(RECENT_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const getCartQuantity = useCallback(
    (productId: ProductId) => cart.find((item) => item.productId === productId)?.quantity ?? 0,
    [cart],
  )

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  )

  const value = useMemo(
    () => ({
      cart,
      favorites,
      recentlyViewed,
      panel,
      cartCount,
      favoritesCount: favorites.length,
      openPanel,
      closePanel,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      toggleFavorite,
      isFavorite,
      trackView,
      getCartQuantity,
    }),
    [
      cart,
      favorites,
      recentlyViewed,
      panel,
      cartCount,
      openPanel,
      closePanel,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      toggleFavorite,
      isFavorite,
      trackView,
      getCartQuantity,
    ],
  )

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>
}
