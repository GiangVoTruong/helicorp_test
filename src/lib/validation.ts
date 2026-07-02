export type NewsletterValidationResult =
  | { valid: true; email: string }
  | { valid: false; error: string }

const EMAIL_MAX_LENGTH = 254
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateNewsletterEmail(
  rawEmail: string,
  invalidMessage: string,
): NewsletterValidationResult {
  const email = rawEmail.trim().toLowerCase()

  if (!email) {
    return { valid: false, error: invalidMessage }
  }

  if (email.length > EMAIL_MAX_LENGTH) {
    return { valid: false, error: invalidMessage }
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { valid: false, error: invalidMessage }
  }

  const [localPart, domain] = email.split('@')
  if (!localPart || !domain || localPart.length > 64 || domain.includes('..')) {
    return { valid: false, error: invalidMessage }
  }

  return { valid: true, email }
}

const PHONE_PATTERN = /^0\d{9}$/

export function validatePhone(rawPhone: string, invalidMessage: string) {
  const phone = rawPhone.trim()

  if (!phone) {
    return { valid: false as const, error: invalidMessage }
  }

  if (!PHONE_PATTERN.test(phone)) {
    return { valid: false as const, error: invalidMessage }
  }

  return { valid: true as const, phone }
}
