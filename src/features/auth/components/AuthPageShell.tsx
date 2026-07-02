import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '../../../components/ui/LanguageSwitcher'
import ThemeToggle from '../../../components/ui/ThemeToggle'

type AuthPageShellProps = {
  children: ReactNode
}

export default function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-brand-600/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-128 w-lg -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/10 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
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
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  )
}
