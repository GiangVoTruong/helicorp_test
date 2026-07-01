import { useEffect, useRef, useState } from 'react'

/** Theo dõi step nào đang ở giữa viewport (dùng cho section tính năng sticky). */
export function useActiveStep(stepCount: number) {
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = listRef.current
    if (!root || stepCount === 0) return

    const steps = root.querySelectorAll<HTMLElement>('[data-step]')
    if (!steps.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!mostVisible) return

        const index = Number((mostVisible.target as HTMLElement).dataset.step)
        if (!Number.isNaN(index)) setActiveIndex(index)
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    steps.forEach((step) => observer.observe(step))
    return () => observer.disconnect()
  }, [stepCount])

  return { activeIndex, listRef }
}
