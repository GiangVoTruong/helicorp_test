import { PRODUCT_IDS } from '../../../data/products'
import { useLanguage } from '../../../i18n/useLanguage'
import RevealOnScroll from '../../../components/scrolly/RevealOnScroll'
import ProductCard from './ProductCard'

export default function ProductCatalogSection() {
  const { t } = useLanguage()

  return (
    <section id="san-pham" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              {t.commerce.catalog.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
              {t.commerce.catalog.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
              {t.commerce.catalog.description}
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_IDS.map((id, index) => (
            <RevealOnScroll key={id} delay={index * 80}>
              <ProductCard productId={id} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
