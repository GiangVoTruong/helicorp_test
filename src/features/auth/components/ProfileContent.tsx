import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../../i18n/useLanguage'
import { useAuth } from '../useAuth'
import { useProfile } from '../hooks/useProfile'

function getInitials(username: string) {
  return username.slice(0, 2).toUpperCase()
}

export default function ProfileContent() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { data: profile, isLoading, isError } = useProfile()

  function handleLogout() {
    logout()
    navigate('/')
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/90">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">{t.auth.profileLoading}</p>
        </div>
      </div>
    )
  }

  if (isError || !profile) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/90">
          <p className="text-center text-sm text-red-600 dark:text-red-400">{t.auth.profileError}</p>
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400"
            >
              {t.auth.backHome}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const fields = [
    { label: t.auth.usernameLabel, value: profile.username },
    { label: t.auth.emailLabel, value: profile.email },
    { label: t.auth.phoneLabel, value: profile.phone ?? '—' },
  ]

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-500 to-brand-700 text-2xl font-bold text-white shadow-lg shadow-brand-600/30">
            {getInitials(profile.username)}
          </span>
          <div className="mt-6 sm:mt-0 sm:ml-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {t.auth.profileTitle}
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t.auth.profileSubtitle}</p>
          </div>
        </div>

        <dl className="mt-8 space-y-4">
          {fields.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/60"
            >
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {t.auth.backHome}
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {t.auth.logout}
          </button>
        </div>
      </div>
    </div>
  )
}
