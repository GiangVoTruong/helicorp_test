import type { Locale } from '../../i18n/translations'
import { PRODUCT_CATALOG, PRODUCT_IDS, type ProductId } from '../../data/products'

type Products = Record<ProductId, { name: string; description: string; category: string }>

const MODEL = 'gemini-2.5-flash'
const GEMINI_BASE = import.meta.env.DEV
  ? '/api/gemini/v1beta/models'
  : 'https://generativelanguage.googleapis.com/v1beta/models'

const SYSTEM_PROMPT: Record<Locale, string> = {
  vi: 'Bạn là trợ lý bán hàng TechNexus. Trả lời ngắn gọn, thân thiện bằng tiếng Việt. Tư vấn sản phẩm, giá, giỏ hàng và yêu thích.',
  en: 'You are the TechNexus sales assistant. Reply concisely in English. Advise on products, pricing, cart, and favorites.',
}

export function formatPrice(price: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    style: 'currency',
    currency: locale === 'vi' ? 'VND' : 'USD',
    maximumFractionDigits: 0,
  }).format(locale === 'vi' ? price * 24_000 : price)
}

function buildCatalog(locale: Locale, products: Products): string {
  return PRODUCT_IDS.map((id) => {
    const { name, category, description } = products[id]
    const price = formatPrice(PRODUCT_CATALOG[id].price, locale)
    return `- ${name} (${category}): ${price}. ${description}`
  }).join('\n')
}

function buildSystemPrompt(locale: Locale, products: Products): string {
  return `${SYSTEM_PROMPT[locale]}\nCatalog:\n${buildCatalog(locale, products)}`
}

function getAutoReply(message: string, locale: Locale, products: Products): string | null {
  const text = message.toLowerCase()

  if (/^(hi|hello|xin chào|chào|hey)\b/.test(text)) {
    return locale === 'vi'
      ? 'Xin chào! Tôi có thể tư vấn sản phẩm, giá cả, giỏ hàng và yêu thích.'
      : 'Hello! I can help with products, pricing, cart, and favorites.'
  }

  if (/giá|price|bao nhiêu|cost/.test(text)) {
    return PRODUCT_IDS.map(
      (id) => `• ${products[id].name}: ${formatPrice(PRODUCT_CATALOG[id].price, locale)}`,
    ).join('\n')
  }

  if (/giỏ|cart|checkout|mua/.test(text)) {
    return locale === 'vi'
      ? 'Thêm sản phẩm bằng nút "Thêm vào giỏ", mở giỏ ở icon header.'
      : 'Use "Add to cart" on product cards, then open the cart from the header.'
  }

  for (const id of PRODUCT_IDS) {
    const name = products[id].name.toLowerCase()
    if (text.includes(name) || text.includes(id.replace(/-/g, ' '))) {
      const { description, category } = products[id]
      const price = formatPrice(PRODUCT_CATALOG[id].price, locale)
      return locale === 'vi'
        ? `${products[id].name} — ${price}\n${description}\nDanh mục: ${category}.`
        : `${products[id].name} — ${price}\n${description}\nCategory: ${category}.`
    }
  }

  return null
}

function getErrorReply(locale: Locale): string {
  return locale === 'vi'
    ? 'Không kết nối được Gemini. Kiểm tra VITE_GEMINI_API_KEY trong .env và restart npm run dev.'
    : 'Unable to reach Gemini. Check VITE_GEMINI_API_KEY in .env and restart npm run dev.'
}

function getGeminiUrl(): string {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim()
  const path = `${GEMINI_BASE}/${MODEL}:generateContent`
  if (import.meta.env.DEV) return path
  if (!apiKey) throw new Error('missing_key')
  return `${path}?key=${encodeURIComponent(apiKey)}`
}

async function callGemini(userMessage: string, system: string): Promise<string> {
  const response = await fetch(getGeminiUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: 'user', parts: [{ text: userMessage }] }],
    }),
  })

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
    error?: { code?: number; message?: string }
  }

  if (!response.ok) {
    throw new Error(data.error?.message ?? `http_${response.status}`)
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? ''
}

export async function getChatReply(
  message: string,
  locale: Locale,
  products: Products,
): Promise<string> {
  try {
    const reply = await callGemini(message, buildSystemPrompt(locale, products))
    if (reply) return reply
  } catch {
    const auto = getAutoReply(message, locale, products)
    if (auto) return auto
    return getErrorReply(locale)
  }

  return getAutoReply(message, locale, products) ?? getErrorReply(locale)
}
