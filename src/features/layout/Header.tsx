import { useState } from 'react'
import LanguageSwitcher from '../../components/ui/LanguageSwitcher'
import ThemeToggle from '../../components/ui/ThemeToggle'
import CommerceHeaderActions from '../commerce/components/CommerceHeaderActions'
import { useLanguage } from '../../i18n/useLanguage'

function Logo() {
  return (
    <a href="/" className="group flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/30 transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M12 2L3 7l9 5 9-5-9-5Z" fill="currentColor" fillOpacity="0.9" />
          <path
            d="M3 12l9 5 9-5M3 17l9 5 9-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
        Tech<span className="text-brand-600">Nexus</span>
      </span>
    </a>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLanguage()

  const navItems = [
    { label: t.nav.features, href: '#tinh-nang', track: 'nav-features' },
    { label: t.nav.products, href: '#san-pham', track: 'nav-products' },
    { label: t.nav.specs, href: '#thong-so', track: 'nav-specs' },
    { label: t.nav.contact, href: '#lien-he', track: 'nav-contact' },
  ] as const

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label={t.nav.mainNav} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map(({ label, href, track }) => (
              <li key={href}>
                <a
                  href={href}
                  data-track={track}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CommerceHeaderActions />
          <ThemeToggle />
          <LanguageSwitcher />

          <a
            href="#lien-he"
            data-track="nav-register"
            className="hidden rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/30 sm:inline-flex"
          >
            {t.nav.register}
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label={t.nav.mobileNav}
          className="border-t border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-950"
        >
          <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            {navItems.map(({ label, href, track }) => (
              <li key={href}>
                <a
                  href={href}
                  data-track={track}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-1">
              <a
                href="#lien-he"
                data-track="nav-register-mobile"
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl bg-brand-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700"
              >
                {t.nav.register}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
