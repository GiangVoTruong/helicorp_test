import { useEffect, useRef, useState, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion'

type ParallaxProps = {
  speed?: number
  className?: string
  children?: ReactNode
}

/** Dịch chuyển nhẹ theo scroll — bọc nội dung hoặc dùng làm blob trang trí. */
export default function Parallax({ speed = 0.15, className = '', children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    let ticking = false

    const update = () => {
      const element = ref.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const elementCenter = rect.top + rect.height / 2
      const viewportCenter = window.innerHeight / 2
      setOffset((elementCenter - viewportCenter) * speed)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        update()
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed, reducedMotion])

  return (
    <div
      ref={ref}
      className={`parallax-layer will-change-transform ${className}`}
      style={reducedMotion ? undefined : { transform: `translate3d(0, ${offset}px, 0)` }}
    >
      {children}
    </div>
  )
}

/** Blob nền mờ — shorthand cho `<Parallax className="...blob..." />`. */
export function ParallaxBlob({
  speed,
  className,
}: {
  speed?: number
  className: string
}) {
  return <Parallax speed={speed} className={`pointer-events-none ${className}`} />
}
