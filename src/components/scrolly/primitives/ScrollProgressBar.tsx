import { useScrollProgress } from '../../../hooks/useScrollProgress'

/** Thanh tiến độ scroll cố định bên trái màn hình. */
export default function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-20 left-4 z-40 hidden h-[calc(100vh-6rem)] w-0.5 overflow-hidden rounded-full bg-slate-200/80 sm:block dark:bg-slate-800/80"
    >
      <div
        className="w-full rounded-full bg-linear-to-b from-brand-400 to-brand-600 transition-[height] duration-150 ease-out"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
  )
}
