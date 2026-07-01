import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import { getChatReply } from './chatService'

type ChatMessage = {
  id: number
  role: 'user' | 'assistant'
  content: string
}

export default function ChatWidget() {
  const { locale, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const listRef = useRef<HTMLDivElement>(null)

  function handleToggle() {
    setOpen((wasOpen) => {
      if (!wasOpen) {
        setMessages((prev) =>
          prev.length === 0
            ? [{ id: Date.now(), role: 'assistant', content: t.chatbot.welcome }]
            : prev,
        )
      }
      return !wasOpen
    })
  }

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = input.trim()
    if (!text || typing) return

    setInput('')
    const userMsg: ChatMessage = { id: Date.now(), role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setTyping(true)

    const reply = await getChatReply(text, locale, t.commerce.products)
    setTyping(false)
    setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', content: reply }])
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div className="flex h-[min(32rem,calc(100vh-8rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30">
          <div className="flex items-center gap-3 border-b border-slate-200 bg-linear-to-r from-brand-600 to-brand-700 px-4 py-3 dark:border-slate-800">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M12 3c-4 0-7 2.5-7 6 0 2.2 1.2 4.1 3 5.2V19l3.5-2c.5.1 1 .1 1.5.1 4 0 7-2.5 7-6s-3-6-7-6Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white">{t.chatbot.title}</p>
              <p className="truncate text-xs text-brand-100">{t.chatbot.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.chatbot.close}
              className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'rounded-br-md bg-brand-600 text-white'
                      : 'rounded-bl-md bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {typing && (
              <p className="text-xs text-slate-400">{t.chatbot.typing}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-200 p-3 dark:border-slate-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chatbot.placeholder}
                aria-label={t.chatbot.placeholder}
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
              />
              <button
                type="submit"
                disabled={typing || !input.trim()}
                aria-label={t.chatbot.send}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
              >
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
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={handleToggle}
        aria-label={open ? t.chatbot.close : t.chatbot.open}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-all hover:scale-105 hover:bg-brand-700"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            <path
              d="M12 3c-4 0-7 2.5-7 6 0 2.2 1.2 4.1 3 5.2V19l3.5-2c.5.1 1 .1 1.5.1 4 0 7-2.5 7-6s-3-6-7-6Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
