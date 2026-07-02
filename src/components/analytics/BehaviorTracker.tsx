import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../../i18n/useLanguage'
import { useToast } from '../ui/useToast'

const SCROLL_MILESTONES = [50, 100] as const

type ScrollMilestone = (typeof SCROLL_MILESTONES)[number]

function getScrollPercent(): number {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  if (maxScroll <= 0) return 100
  return Math.min(100, Math.round((window.scrollY / maxScroll) * 100))
}

export default function BehaviorTracker() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { locale, t } = useLanguage()
  const { showToast } = useToast()
  const reachedMilestones = useRef(new Set<ScrollMilestone>())

  useEffect(() => {
    reachedMilestones.current.clear()

    if (!isHome) return

    const messages: Record<ScrollMilestone, string> = {
      50: t.analytics.scroll50,
      100: t.analytics.scroll100,
    }

    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        ticking = false
        const percent = getScrollPercent()

        for (const milestone of SCROLL_MILESTONES) {
          if (percent < milestone || reachedMilestones.current.has(milestone)) continue
          reachedMilestones.current.add(milestone)
          showToast(messages[milestone], 'info')
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome, locale, showToast, t])

  return null
}
