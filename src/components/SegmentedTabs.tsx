import { useRef, useState, useLayoutEffect, type ReactNode } from 'react'
import { getLocalScale } from '../lib/scale'

type Option<T extends string> = {
  value: T
  label: ReactNode
}

/**
 * Pill segmented control with a sliding active indicator.
 */
export default function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
}: {
  options: Option<T>[]
  value: T
  onChange: (next: T) => void
  size?: 'sm' | 'md'
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [pill, setPill] = useState({ left: 0, width: 0 })

  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  )

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      const btn = btnRefs.current[activeIndex]
      if (!btn) return
      const trackBox = track.getBoundingClientRect()
      const btnBox = btn.getBoundingClientRect()
      // getBoundingClientRect returns real (post-transform) pixels — divide out any
      // ancestor CSS scale (e.g. the mobile shell's zoom-out) before using them as
      // `position: absolute` values in this same transformed subtree, or the pill
      // renders at a fraction of the real tab's size/offset. See src/lib/scale.ts.
      const scale = getLocalScale(track)
      setPill({
        left: (btnBox.left - trackBox.left) / scale,
        width: btnBox.width / scale,
      })
    }

    measure()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [activeIndex, options.length, size])

  const pad = size === 'sm' ? 'p-1' : 'p-1'
  const btnPad = size === 'sm' ? 'py-2 text-[12px]' : 'py-[9px] text-[15px]'

  return (
    <div
      ref={trackRef}
      className={`relative flex w-full items-center rounded-full border border-accent bg-accent-50 ${pad}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-accent transition-[left,width] duration-300 ease-out"
        style={{ left: pill.left, width: pill.width }}
      />
      {options.map((opt, i) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            ref={(el) => {
              btnRefs.current[i] = el
            }}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`relative z-10 flex-1 cursor-pointer rounded-full font-sans font-semibold transition-colors duration-300 ${btnPad} ${
              active ? 'text-white' : 'text-ink-500'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
