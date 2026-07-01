import { useLanguage } from '../../i18n/useLanguage'
import type { Locale } from '../../i18n/translations'

const LOCALES: { value: Locale; label: string }[] = [
  { value: 'vi', label: 'VI' },
  { value: 'en', label: 'EN' },
]

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t.lang.switchLabel}
      className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-900"
    >
      {LOCALES.map(({ value, label }) => {
        const isActive = locale === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => setLocale(value)}
            aria-pressed={isActive}
            aria-label={value === 'vi' ? t.lang.vi : t.lang.en}
            className={`min-w-10 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${
              isActive
                ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-800 dark:text-brand-400'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
