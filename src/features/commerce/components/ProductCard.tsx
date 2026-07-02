import { PRODUCT_CATALOG, type ProductId } from '../../../data/products'
import { useLanguage } from '../../../i18n/useLanguage'
import { useToast } from '../../../components/ui/useToast'
import { formatPrice } from '../../chatbot/chatService'
import { useCommerce } from '../useCommerce'

type ProductCardProps = {
  productId: ProductId
}

export default function ProductCard({ productId }: ProductCardProps) {
  const { locale, t } = useLanguage()
  const { showToast } = useToast()
  const { addToCart, toggleFavorite, isFavorite, trackView, getCartQuantity } = useCommerce()

  const product = t.commerce.products[productId]
  const meta = PRODUCT_CATALOG[productId]
  const favorited = isFavorite(productId)
  const inCart = getCartQuantity(productId)

  function handleView() {
    trackView(productId)
  }

  function handleAddToCart() {
    trackView(productId)
    addToCart(productId)
    const trackLabel = `add-cart-${productId}`
    showToast(t.analytics.clickTracked.replace('{label}', trackLabel), 'info')
  }

  function handleToggleFavorite() {
    trackView(productId)
    toggleFavorite(productId)
  }

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20"
      onMouseEnter={handleView}
    >
      <div
        className={`relative flex h-44 items-center justify-center bg-linear-to-br ${meta.gradient} p-6`}
      >
        {'badge' in product && product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
            {t.commerce.badges[product.badge]}
          </span>
        )}
        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-label={favorited ? t.commerce.unfavorite : t.commerce.favorite}
          aria-pressed={favorited}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
        >
          <svg viewBox="0 0 24 24" fill={favorited ? 'currentColor' : 'none'} className="h-5 w-5" aria-hidden="true">
            <path
              d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 6.5-7 11-7 11Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
          <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-white/90" aria-hidden="true">
            <path d="M12 2L3 7l9 5 9-5-9-5Z" fill="currentColor" fillOpacity="0.85" />
            <path
              d="M3 12l9 5 9-5M3 17l9 5 9-5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-600">{product.category}</p>
        <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">{product.name}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
            {formatPrice(meta.price, locale)}
          </p>
          {inCart > 0 && (
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              ×{inCart}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          data-track={`add-cart-${productId}`}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-700"
        >
          {t.commerce.addToCart}
        </button>
      </div>
    </article>
  )
}
