import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

type RevealOnScrollProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

const OFFSET: Record<NonNullable<RevealOnScrollProps['direction']>, string> = {
  up: 'translate-y-8',
  left: '-translate-x-8',
  right: 'translate-x-8',
}

export default function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: RevealOnScrollProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15, once: true })

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll transition-all duration-700 ease-out ${OFFSET[direction]} ${
        inView ? 'revealed translate-x-0 translate-y-0 opacity-100' : 'opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
