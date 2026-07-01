import type { ReactNode } from 'react'
import HeroScrollySection from '../../../components/scrolly/HeroScrollySection'
import NewsletterScrollySection from '../../../components/scrolly/NewsletterScrollySection'
import ScrollProgressBar from '../../../components/scrolly/ScrollProgressBar'
import ScrollyFeatures from '../../../components/scrolly/ScrollyFeatures'
import SpecsScrollySection from '../../../components/scrolly/SpecsScrollySection'
import ProductCatalogSection from '../../../features/commerce/components/ProductCatalogSection'

type IconProps = { className?: string }

const FEATURE_ICONS = [
  ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M13 2L4 14h6l-1 8 9-12h-6l1-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12l1.8 1.8L15 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
] as const

export default function HomeContent() {
  return (
    <div className="scrolly-story bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <ScrollProgressBar />
      <HeroScrollySection />
      <ScrollyFeatures icons={FEATURE_ICONS as readonly ((props: IconProps) => ReactNode)[]} />
      <ProductCatalogSection />
      <SpecsScrollySection />
      <NewsletterScrollySection />
    </div>
  )
}
