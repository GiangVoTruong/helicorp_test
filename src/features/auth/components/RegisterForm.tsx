import { useState, type SubmitEvent } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../../i18n/useLanguage'
import { validateNewsletterEmail, validatePhone } from '../../../lib/validation'
import { useRegister } from '../hooks/useRegister'

const inputClassName =
  'w-full rounded-xl border border-slate-300 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-500 dark:focus:bg-slate-900'

type FormErrors = {
  username?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
}

export default function RegisterForm() {
  const { t } = useLanguage()
  const { mutate: register, isPending } = useRegister()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: FormErrors = {}

    if (!username.trim()) {
      nextErrors.username = t.auth.usernameError
    }

    const emailValidation = validateNewsletterEmail(email, t.auth.emailError)
    if (!emailValidation.valid) {
      nextErrors.email = emailValidation.error
    }

    const phoneValidation = validatePhone(phone, t.auth.phoneError)
    if (!phoneValidation.valid) {
      nextErrors.phone = phoneValidation.error
    }

    if (!password.trim()) {
      nextErrors.password = t.auth.passwordError
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = t.auth.confirmPasswordError
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = t.auth.passwordMismatchError
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    register({
      username: username.trim(),
      email: emailValidation.valid ? emailValidation.email : email.trim(),
      phone: phoneValidation.valid ? phoneValidation.phone : phone.trim(),
      password,
      confirmPassword,
    })
  }

  function clearError(field: keyof FormErrors) {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
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
            {t.auth.registerTitle}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t.auth.registerSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
          <div>
            <label htmlFor="register-username" className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t.auth.usernameLabel}
            </label>
            <input
              id="register-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value)
                clearError('username')
              }}
              placeholder={t.auth.usernamePlaceholder}
              aria-invalid={Boolean(errors.username)}
              className={`${inputClassName} mt-2`}
            />
            {errors.username && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="register-email" className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t.auth.emailLabel}
            </label>
            <input
              id="register-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                clearError('email')
              }}
              placeholder={t.auth.emailPlaceholder}
              aria-invalid={Boolean(errors.email)}
              className={`${inputClassName} mt-2`}
            />
            {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="register-phone" className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t.auth.phoneLabel}
            </label>
            <input
              id="register-phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value)
                clearError('phone')
              }}
              placeholder={t.auth.phonePlaceholder}
              aria-invalid={Boolean(errors.phone)}
              className={`${inputClassName} mt-2`}
            />
            {errors.phone && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="register-password" className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t.auth.passwordLabel}
            </label>
            <div className="relative mt-2">
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  clearError('password')
                }}
                placeholder={t.auth.passwordPlaceholder}
                aria-invalid={Boolean(errors.password)}
                className={`${inputClassName} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? t.auth.hidePassword : t.auth.showPassword}
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
            {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="register-confirm-password" className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t.auth.confirmPasswordLabel}
            </label>
            <input
              id="register-confirm-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value)
                clearError('confirmPassword')
              }}
              placeholder={t.auth.confirmPasswordPlaceholder}
              aria-invalid={Boolean(errors.confirmPassword)}
              className={`${inputClassName} mt-2`}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl disabled:pointer-events-none disabled:opacity-60"
          >
            {t.auth.registerSubmit}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          {t.auth.hasAccount}{' '}
          <Link
            to="/login"
            className="font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
          >
            {t.auth.loginLink}
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
