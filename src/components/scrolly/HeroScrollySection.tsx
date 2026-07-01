import { useLanguage } from '../../i18n/useLanguage'
import ParallaxLayer from './ParallaxLayer'
import RevealOnScroll from './RevealOnScroll'

const STAT_VALUES = ['99.9%', '<2ms', '150+'] as const

function HeroVisual() {
  const { t } = useLanguage()
  const stats = [
    { value: STAT_VALUES[0], label: t.hero.stats.uptime },
    { value: STAT_VALUES[1], label: t.hero.stats.latency },
  ] as const

  return (
    <div className="relative">
      <div
        className="absolute -inset-4 rounded-4xl bg-linear-to-tr from-brand-500/20 via-brand-400/10 to-transparent blur-2xl"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-4xl border border-white/60 bg-linear-to-br from-slate-900 to-brand-950 p-1 shadow-2xl shadow-brand-900/30">
        <div className="rounded-4xl bg-linear-to-br from-slate-950 via-slate-900 to-brand-900 p-8 sm:p-10">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <p className="text-2xl font-extrabold text-white sm:text-3xl">{value}</p>
                <p className="mt-1 text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-300">{t.hero.systemPerformance}</p>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                {t.hero.optimized}
              </span>
            </div>
            <div className="mt-4 flex items-end gap-1.5">
              {[40, 65, 50, 80, 60, 92, 75, 100, 85].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t bg-linear-to-t from-brand-600 to-brand-400"
                  style={{ height: `${h * 0.6}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HeroScrollySection() {
  const { t } = useLanguage()

  const stats = [
    { value: STAT_VALUES[0], label: t.hero.stats.uptime },
    { value: STAT_VALUES[1], label: t.hero.stats.latency },
    { value: STAT_VALUES[2], label: t.hero.stats.countries },
  ] as const

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-linear-to-b from-brand-50/70 via-white to-white dark:from-brand-950/40 dark:via-slate-950 dark:to-slate-950">
      <ParallaxLayer
        speed={0.25}
        className="pointer-events-none absolute -top-32 -right-24 h-112 w-md rounded-full bg-brand-400/25 blur-3xl"
      >
        <div className="h-full w-full" />
      </ParallaxLayer>
      <ParallaxLayer
        speed={-0.15}
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-brand-600/15 blur-3xl"
      >
        <div className="h-full w-full" />
      </ParallaxLayer>
      <ParallaxLayer
        speed={0.1}
        className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-300/10 blur-3xl"
      >
        <div className="h-full w-full" />
      </ParallaxLayer>

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8 lg:py-32">
        <RevealOnScroll>
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              {t.story.chapter1}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {t.hero.badge}
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-slate-100">
              {t.hero.titleBefore}{' '}
              <span className="bg-linear-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>{' '}
              {t.hero.titleAfter}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
              {t.hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#lien-he"
                data-track="hero-cta-primary"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl"
              >
                {t.hero.ctaPrimary}
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#tinh-nang"
                data-track="hero-cta-secondary"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-700 dark:hover:text-brand-400"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-slate-200 pt-8 dark:border-slate-800">
              {stats.map(({ value, label }, index) => (
                <RevealOnScroll key={label} delay={index * 100} direction="up">
                  <div>
                    <dt className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                      {value}
                    </dt>
                    <dd className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {label}
                    </dd>
                  </div>
                </RevealOnScroll>
              ))}
            </dl>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={150} direction="right">
          <ParallaxLayer speed={-0.12}>
            <HeroVisual />
          </ParallaxLayer>
        </RevealOnScroll>
      </div>

      <a
        href="#tinh-nang"
        className="relative mx-auto mb-10 flex flex-col items-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
      >
        <span>{t.story.scrollHint}</span>
        <span className="scroll-hint-bounce flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/80">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
              d="M12 5v14M6 13l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </section>
  )
}
