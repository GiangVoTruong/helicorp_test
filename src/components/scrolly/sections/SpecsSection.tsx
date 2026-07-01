import { useLanguage } from '../../../i18n/useLanguage'
import { ParallaxBlob } from '../primitives/Parallax'
import RevealOnScroll from '../primitives/RevealOnScroll'

const SPEC_KEYS = ['chipset', 'ram', 'storage', 'battery', 'os', 'material'] as const

export default function SpecsSection() {
  const { t } = useLanguage()

  const specs = SPEC_KEYS.map((key) => ({
    key,
    label: t.specs.labels[key],
    value: t.specs.values[key],
  }))

  return (
    <section
      id="thong-so"
      className="relative overflow-hidden bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28 dark:bg-slate-900/50"
    >
      <ParallaxBlob
        speed={0.12}
        className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl"
      />
      <ParallaxBlob
        speed={-0.08}
        className="absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <RevealOnScroll direction="left">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              {t.story.chapter3}
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
              {t.specs.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-slate-100">
              {t.specs.title}
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-600 dark:text-slate-400">
              {t.specs.description}
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 px-5 py-4 dark:border-brand-900 dark:bg-brand-950/60">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {t.specs.certified}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.specs.certifications}
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <dl className="grid gap-4 sm:grid-cols-2">
          {specs.map(({ key, label, value }, index) => (
            <RevealOnScroll key={key} delay={index * 80} direction="up">
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {label}
                </dt>
                <dd className="mt-1.5 text-base font-bold text-slate-900 dark:text-slate-100">
                  {value}
                </dd>
              </div>
            </RevealOnScroll>
          ))}
        </dl>
      </div>
    </section>
  )
}
