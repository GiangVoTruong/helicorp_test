import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { ToastContext, type Toast, type ToastType } from './toastContext'

const TOAST_DURATION_MS = 4000

const TYPE_STYLES: Record<ToastType, string> = {
  success:
    'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
  error: 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200',
  info: 'border-brand-200 bg-brand-50 text-brand-800 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200',
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, TOAST_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [onClose])

  return (
    <div
      role="status"
      aria-live="polite"
      className={`toast-enter pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg shadow-slate-900/10 ${TYPE_STYLES[toast.type]}`}
    >
      {toast.type === 'success' ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M8.5 12l2 2 5-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : toast.type === 'info' ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 10v6M12 8h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng thông báo"
        className="shrink-0 rounded-md p-0.5 opacity-60 transition-opacity hover:opacity-100"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-label="Thông báo"
        className="pointer-events-none fixed top-4 right-4 z-50 flex w-[calc(100%-2rem)] flex-col gap-3 sm:w-auto"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
