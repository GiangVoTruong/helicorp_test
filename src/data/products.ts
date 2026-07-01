export const PRODUCT_IDS = [
  'nexus-x1-pro',
  'nexus-x1-quantum',
  'nexus-hub-iot',
  'nexus-watch-ultra',
] as const

export type ProductId = (typeof PRODUCT_IDS)[number]

export type ProductMeta = {
  price: number
  gradient: string
  badge?: 'new' | 'bestseller'
}

export const PRODUCT_CATALOG: Record<ProductId, ProductMeta> = {
  'nexus-x1-pro': {
    price: 899,
    gradient: 'from-brand-600 to-brand-900',
    badge: 'bestseller',
  },
  'nexus-x1-quantum': {
    price: 1299,
    gradient: 'from-violet-600 to-brand-950',
    badge: 'new',
  },
  'nexus-hub-iot': {
    price: 349,
    gradient: 'from-cyan-600 to-brand-800',
  },
  'nexus-watch-ultra': {
    price: 599,
    gradient: 'from-slate-700 to-brand-900',
    badge: 'bestseller',
  },
}

export function isProductId(value: string): value is ProductId {
  return PRODUCT_IDS.includes(value as ProductId)
}
