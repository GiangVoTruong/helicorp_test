import { useLanguage } from '../../../i18n/useLanguage'
import { useActiveStep } from '../hooks/useActiveStep'
import { ParallaxBlob } from '../primitives/Parallax'

const FEATURE_ICONS = [
  ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M13 2L4 14h6l-1 8 9-12h-6l1-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ({ className }: { className?: string }) => (
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
  ({ className }: { className?: string }) => (
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

export default function FeaturesSection() {
  const { t } = useLanguage()
  const { activeIndex, listRef } = useActiveStep(t.features.items.length)

  return (
    <section id="tinh-nang" className="relative px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <ParallaxBlob
        speed={0.08}
        className="absolute top-20 -left-32 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            {t.story.chapter2}
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
            {t.features.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-slate-100">
            {t.features.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-slate-600 dark:text-slate-400">
            {t.features.description}
          </p>

          <ol className="mt-10 hidden space-y-3 lg:block">
            {t.features.items.map((feature, index) => (
              <li
                key={feature.title}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/80 dark:text-brand-300'
                    : 'text-slate-500 dark:text-slate-500'
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                    activeIndex === index
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                {feature.title}
              </li>
            ))}
          </ol>
        </div>

        <div ref={listRef}>
          {t.features.items.map((feature, index) => {
            const Icon = FEATURE_ICONS[index]
            const isActive = activeIndex === index

            return (
              <div
                key={feature.title}
                data-step={index}
                className={`flex min-h-[70vh] items-center py-16 transition-opacity duration-500 lg:min-h-[85vh] ${
                  isActive ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <article className="w-full rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand-600">
                    {String(index + 1).padStart(2, '0')} /{' '}
                    {String(t.features.items.length).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
