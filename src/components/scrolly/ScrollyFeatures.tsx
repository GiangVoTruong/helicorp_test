import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import ParallaxLayer from './ParallaxLayer'

type ScrollyStepProps = {
  index: number
  setRef: (index: number) => (el: HTMLDivElement | null) => void
  active: boolean
  children: ReactNode
}

function ScrollyStep({ index, setRef, active, children }: ScrollyStepProps) {
  return (
    <div
      ref={setRef(index)}
      className={`flex min-h-[70vh] items-center py-16 transition-opacity duration-500 lg:min-h-[85vh] ${
        active ? 'opacity-100' : 'opacity-30'
      }`}
    >
      {children}
    </div>
  )
}

type ScrollyFeaturesProps = {
  icons: readonly ((props: { className?: string }) => ReactNode)[]
}

export default function ScrollyFeatures({ icons }: ScrollyFeaturesProps) {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const elements = stepRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (!visible.length) return
        const index = elements.indexOf(visible[0].target as HTMLDivElement)
        if (index >= 0) setActiveIndex(index)
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [t.features.items.length])

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    stepRefs.current[index] = el
  }

  return (
    <section id="tinh-nang" className="relative px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <ParallaxLayer
        speed={0.08}
        className="pointer-events-none absolute top-20 -left-32 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl"
      >
        <div className="h-full w-full" />
      </ParallaxLayer>

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

        <div>
          {t.features.items.map((feature, index) => {
            const Icon = icons[index]
            return (
              <ScrollyStep
                key={feature.title}
                index={index}
                setRef={setRef}
                active={activeIndex === index}
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
              </ScrollyStep>
            )
          })}
        </div>
      </div>
    </section>
  )
}
