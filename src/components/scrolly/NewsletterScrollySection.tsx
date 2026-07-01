import { useState, type SubmitEvent } from 'react'
import { useToast } from '../ui/useToast'
import { useLanguage } from '../../i18n/useLanguage'
import { validateNewsletterEmail } from '../../lib/validation'
import ParallaxLayer from './ParallaxLayer'
import RevealOnScroll from './RevealOnScroll'

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const { showToast } = useToast()
  const { t } = useLanguage()

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const validation = validateNewsletterEmail(email, t.newsletter.emailError)
    if (!validation.valid) {
      setError(validation.error)
      showToast(validation.error, 'error')
      return
    }

    setError('')
    setEmail('')
    showToast(t.newsletter.successToast)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8">
      <label
        htmlFor="newsletter-email"
        className="text-sm font-semibold text-slate-900 dark:text-slate-100"
      >
        {t.newsletter.emailLabel}
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M4 7l8 6 8-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (error) setError('')
            }}
            aria-label={t.newsletter.emailAria}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'newsletter-error' : 'newsletter-hint'}
            placeholder={t.newsletter.emailPlaceholder}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 pr-4 pl-11 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-500 dark:focus:bg-slate-900"
          />
        </div>
        <button
          type="submit"
          data-track="newsletter-submit"
          data-track-toast="false"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl"
        >
          {t.newsletter.submit}
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {error ? (
        <p
          id="newsletter-error"
          className="mt-2.5 text-xs font-semibold text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      ) : (
        <p
          id="newsletter-hint"
          className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400"
        >
          {t.newsletter.privacyHint}
        </p>
      )}
    </form>
  )
}

export default function NewsletterScrollySection() {
  const { t } = useLanguage()

  return (
    <section
      id="lien-he"
      className="relative bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28 dark:bg-slate-900/50"
    >
      <RevealOnScroll>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid lg:grid-cols-2 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <div className="relative overflow-hidden bg-linear-to-br from-slate-950 via-brand-950 to-brand-900 px-8 py-12 sm:px-12 sm:py-14 lg:py-16">
            <ParallaxLayer
              speed={0.15}
              className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-brand-500/25 blur-3xl"
            >
              <div className="h-full w-full" />
            </ParallaxLayer>
            <ParallaxLayer
              speed={-0.1}
              className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-brand-400/15 blur-3xl"
            >
              <div className="h-full w-full" />
            </ParallaxLayer>

            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-300">
                {t.story.chapter4}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-brand-100 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t.newsletter.badge}
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t.newsletter.title}
              </h2>
              <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
                {t.newsletter.description}
              </p>

              <ul className="mt-8 space-y-3.5">
                {t.newsletter.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-slate-200">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                      <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
                        <path
                          d="M6 12l3 3 7-7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-8">
                <div className="flex -space-x-2">
                  {['TN', 'NX', 'TE'].map((initials) => (
                    <span
                      key={initials}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-900 bg-brand-600 text-[10px] font-bold text-white"
                    >
                      {initials}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-slate-400">
                  <span className="font-semibold text-white">12.000+</span>{' '}
                  {t.newsletter.subscribers}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center px-8 py-12 sm:px-12 sm:py-14 lg:py-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              {t.newsletter.formEyebrow}
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {t.newsletter.formTitle}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {t.newsletter.formDescription}
            </p>
            <NewsletterForm />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
