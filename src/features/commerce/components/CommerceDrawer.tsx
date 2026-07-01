import { PRODUCT_CATALOG, type ProductId } from '../../../data/products'
import { useLanguage } from '../../../i18n/useLanguage'
import { formatPrice } from '../../chatbot/chatService'
import { useCommerce } from '../useCommerce'

function PanelItem({
  productId,
  quantity,
  onRemove,
  onUpdateQuantity,
}: {
  productId: ProductId
  quantity?: number
  onRemove?: () => void
  onUpdateQuantity?: (qty: number) => void
}) {
  const { locale, t } = useLanguage()
  const product = t.commerce.products[productId]
  const meta = PRODUCT_CATALOG[productId]

  return (
    <li className="flex gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-linear-to-br ${meta.gradient}`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white/90" aria-hidden="true">
          <path d="M12 2L3 7l9 5 9-5-9-5Z" fill="currentColor" fillOpacity="0.85" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
          {product.name}
        </p>
        <p className="text-sm font-bold text-brand-600">{formatPrice(meta.price, locale)}</p>
        {onUpdateQuantity && quantity !== undefined && (
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              aria-label={t.commerce.decreaseQty}
              onClick={() => onUpdateQuantity(quantity - 1)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-sm dark:border-slate-700"
            >
              −
            </button>
            <span className="min-w-6 text-center text-sm font-medium">{quantity}</span>
            <button
              type="button"
              aria-label={t.commerce.increaseQty}
              onClick={() => onUpdateQuantity(quantity + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-sm dark:border-slate-700"
            >
              +
            </button>
          </div>
        )}
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={t.commerce.removeItem}
          className="shrink-0 self-start rounded-lg p-1 text-slate-400 hover:text-red-500"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </li>
  )
}

export default function CommerceDrawer() {
  const { locale, t } = useLanguage()
  const {
    panel,
    closePanel,
    cart,
    favorites,
    recentlyViewed,
    removeFromCart,
    updateCartQuantity,
    openPanel,
  } = useCommerce()

  if (!panel) return null

  const tabs = [
    { id: 'cart' as const, label: t.commerce.cart.title, count: cart.length },
    { id: 'favorites' as const, label: t.commerce.favorites.title, count: favorites.length },
    { id: 'recent' as const, label: t.commerce.recent.title, count: recentlyViewed.length },
  ]

  const cartTotal = cart.reduce(
    (sum, item) => sum + PRODUCT_CATALOG[item.productId].price * item.quantity,
    0,
  )

  return (
    <>
      <button
        type="button"
        aria-label={t.commerce.closePanel}
        className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={closePanel}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={tabs.find((tab) => tab.id === panel)?.label}
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-slate-950"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => openPanel(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  panel === tab.id
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {tab.label}
                {tab.count > 0 && ` (${tab.count})`}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={closePanel}
            aria-label={t.commerce.closePanel}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {panel === 'cart' && (
            <>
              {cart.length === 0 ? (
                <p className="py-12 text-center text-sm text-slate-500">{t.commerce.cart.empty}</p>
              ) : (
                <ul className="space-y-3">
                  {cart.map((item) => (
                    <PanelItem
                      key={item.productId}
                      productId={item.productId}
                      quantity={item.quantity}
                      onRemove={() => removeFromCart(item.productId)}
                      onUpdateQuantity={(qty) => updateCartQuantity(item.productId, qty)}
                    />
                  ))}
                </ul>
              )}
            </>
          )}

          {panel === 'favorites' && (
            <>
              {favorites.length === 0 ? (
                <p className="py-12 text-center text-sm text-slate-500">{t.commerce.favorites.empty}</p>
              ) : (
                <ul className="space-y-3">
                  {favorites.map((id) => (
                    <PanelItem key={id} productId={id} />
                  ))}
                </ul>
              )}
            </>
          )}

          {panel === 'recent' && (
            <>
              {recentlyViewed.length === 0 ? (
                <p className="py-12 text-center text-sm text-slate-500">{t.commerce.recent.empty}</p>
              ) : (
                <ul className="space-y-3">
                  {recentlyViewed.map((id) => (
                    <PanelItem key={id} productId={id} />
                  ))}
                </ul>
              )}
            </>
          )}
        </div>

        {panel === 'cart' && cart.length > 0 && (
          <div className="border-t border-slate-200 p-5 dark:border-slate-800">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">{t.commerce.cart.total}</span>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {formatPrice(cartTotal, locale)}
              </span>
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {t.commerce.cart.checkout}
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
