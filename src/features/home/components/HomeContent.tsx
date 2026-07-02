import FeaturesSection from '../../../components/scrolly/sections/FeaturesSection'
import HeroSection from '../../../components/scrolly/sections/HeroSection'
import NewsletterSection from '../../../components/scrolly/sections/NewsletterSection'
import SpecsSection from '../../../components/scrolly/sections/SpecsSection'
import ProductCatalogSection from '../../../features/commerce/components/ProductCatalogSection'

export default function HomeContent() {
  return (
    <div className="scrolly-story bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <HeroSection />
      <FeaturesSection />
      <ProductCatalogSection />
      <SpecsSection />
      <NewsletterSection />
    </div>
  )
}
