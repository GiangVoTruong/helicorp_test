import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext } from './languageContext'
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, translations, type Locale } from './translations'

function readStoredLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  return stored === 'en' || stored === 'vi' ? stored : DEFAULT_LOCALE
}

type LanguageProviderProps = {
  children: ReactNode
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale())

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
    localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
  }, [])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
    }),
    [locale, setLocale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
