import { useState, type SubmitEvent } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../../i18n/useLanguage'
import { useLogin } from '../hooks/useLogin'

const inputClassName =
  'w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pr-4 pl-11 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-500 dark:focus:bg-slate-900'

export default function LoginForm() {
  const { t } = useLanguage()
  const { mutate: login, isPending } = useLogin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    login({ username, password })
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/20">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/30">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
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
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t.auth.title}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t.auth.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="login-email"
              className="text-sm font-semibold text-slate-900 dark:text-slate-100"
            >
              {t.auth.usernameLabel}
            </label>
            <div className="relative mt-2">
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
                id="login-email"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder={t.auth.usernamePlaceholder}
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="text-sm font-semibold text-slate-900 dark:text-slate-100"
            >
              {t.auth.passwordLabel}
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <rect
                    x="5"
                    y="11"
                    width="14"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M8 11V8a4 4 0 1 1 8 0v3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={t.auth.passwordPlaceholder}
                className={`${inputClassName} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M7.7 7.7C5.6 9.1 4 11.2 3 12c1.5 2.4 5.1 6 9 6 1.4 0 2.7-.4 3.9-1M14.3 5.3C13.6 5.1 12.8 5 12 5c-3.9 0-7.5 3.6-9 6 .7 1.1 1.7 2.2 2.9 3.1"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-900"
              />
              <span>{t.auth.rememberMe}</span>
            </label>
            <a
              href="#"
              className="font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              {t.auth.forgotPassword}
            </a>
          </div>

          <button
            type="submit"
            data-track="login-submit"
            disabled={isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl disabled:pointer-events-none disabled:opacity-60"
          >
            {t.auth.submit}
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
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="border-t border-slate-200 dark:border-slate-700" />
            <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs font-medium uppercase tracking-wide text-slate-400 dark:bg-slate-900 dark:text-slate-500">
              {t.auth.orContinue}
            </span>
          </div>

          <button
            type="button"
            className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84Z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
              />
            </svg>
            {t.auth.google}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          {t.auth.noAccount}{' '}
          <Link
            to="/register"
            className="font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
          >
            {t.auth.signUp}
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center">
        <Link
          to="/"
          className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          ← {t.auth.backHome}
        </Link>
      </p>
    </div>
  )
}
