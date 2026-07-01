import { createContext } from 'react'
import type { Locale, Translations } from './translations'

export type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
