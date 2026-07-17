import {
  useLayoutEffect,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react'
import CoachMark from '../screens/onboarding/CoachMark'
import TourCard from '../screens/timeline/TourCard'

/** Shared first-visit feature-tour primitives (Ask, Prep, …). */

export type SpotlightBox = {
  left: number
  top: number
  width: number
  height: number
}

/** Measure a target inside the tour root so rings/coach marks track the live UI. */
export function useSpotlightBox(
  rootRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  active: boolean,
  pad = 6,
  remeasureKey?: string | number,
): SpotlightBox | null {
  const [box, setBox] = useState<SpotlightBox | null>(null)

  useLayoutEffect(() => {
    if (!active) {
      setBox(null)
      return
    }

    const measure = () => {
      const root = rootRef.current
      const target = targetRef.current
      if (!root || !target) {
        setBox(null)
        return
      }
      const rootRect = root.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      setBox({
        left: targetRect.left - rootRect.left - pad,
        top: targetRect.top - rootRect.top - pad,
        width: targetRect.width + pad * 2,
        height: targetRect.height + pad * 2,
      })
    }

    measure()
    // Remeasure after scroll/layout settles when the target just mounted.
    const raf = requestAnimationFrame(measure)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    if (rootRef.current) ro?.observe(rootRef.current)
    if (targetRef.current) ro?.observe(targetRef.current)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => {
      cancelAnimationFrame(raf)
      ro?.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
    }
  }, [rootRef, targetRef, active, pad, remeasureKey])

  return box
}

export function TourScrim({ onDismiss }: { onDismiss: () => void }) {
  return (
    <button
      type="button"
      aria-label="Dismiss tour"
      className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]"
      onClick={onDismiss}
    />
  )
}

export function SpotlightRing({
  box,
  className = '',
}: {
  box: SpotlightBox
  className?: string
}) {
  return (
    <div
      className={`pointer-events-none absolute z-[45] border-[3px] border-white shadow-[0px_0px_24px_2px_rgba(255,255,255,0.5)] ${className}`}
      style={{
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
      }}
    />
  )
}

/** Coach card placed just under a measured spotlight target. */
export function coachStyleBelow(box: SpotlightBox, gap = 16): CSSProperties {
  return {
    left: Math.max(16, box.left),
    top: box.top + box.height + gap,
  }
}

/** Coach card centered horizontally under a measured spotlight target. */
export function coachStyleCentered(box: SpotlightBox, gap = 16): CSSProperties {
  return {
    left: '50%',
    transform: 'translateX(-50%)',
    top: box.top + box.height + gap,
  }
}

/** Coach card placed just above a measured spotlight target. */
export function coachStyleAbove(box: SpotlightBox, gap = 16, cardHeight = 175): CSSProperties {
  return {
    left: Math.max(16, box.left),
    top: Math.max(12, box.top - gap - cardHeight),
  }
}

export function TourCaret({
  direction = 'up',
  className = 'left-5',
}: {
  direction?: 'up' | 'down'
  className?: string
}) {
  if (direction === 'down') {
    return (
      <span
        className={`absolute -bottom-[11px] h-0 w-0 border-x-[9px] border-t-[12px] border-x-transparent border-t-white ${className}`}
      />
    )
  }
  return (
    <span
      className={`absolute -top-[11px] h-0 w-0 border-x-[9px] border-b-[12px] border-x-transparent border-b-white ${className}`}
    />
  )
}

export function FeatureTourWelcome({
  overline = 'Quick tour · 30 seconds',
  title,
  body,
  onStart,
  onSkip,
  className = 'left-1/2 top-[274px] -translate-x-1/2',
}: {
  overline?: string
  title: string
  body: string
  onStart: () => void
  onSkip: () => void
  className?: string
}) {
  return (
    <TourCard
      className={className}
      overline={overline}
      title={title}
      body={body}
      primaryLabel="Show me around"
      onPrimary={onStart}
      secondaryLabel="I'll explore on my own"
      onSecondary={onSkip}
    />
  )
}

export function FeatureTourCoach({
  step,
  totalSteps = 5,
  title,
  body,
  secondaryLabel,
  primaryLabel,
  onPrimary,
  onSecondary,
  className,
  style,
  caret,
}: {
  step: number
  totalSteps?: number
  title: string
  body: string
  secondaryLabel: string
  primaryLabel: string
  onPrimary: () => void
  onSecondary: () => void
  className?: string
  style?: CSSProperties
  caret?: ReactNode
}) {
  return (
    <CoachMark
      step={step}
      totalSteps={totalSteps}
      title={title}
      body={body}
      secondaryLabel={secondaryLabel}
      onSecondary={onSecondary}
      primaryLabel={primaryLabel}
      onPrimary={onPrimary}
      className={className}
      style={style}
    >
      {caret}
    </CoachMark>
  )
}
