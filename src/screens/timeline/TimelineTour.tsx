import type { CSSProperties, ReactNode } from 'react'
import {
  FeatureTourCoach,
  FeatureTourWelcome,
  TourScrim,
} from '../../components/featureTour'

/** Figma 3139:8256 — Timeline first-time intro (3 steps + welcome). */

export type TimelineTourStep = 0 | 1 | 2 | 3

export const TIMELINE_TOUR_STEPS: Record<
  1 | 2 | 3,
  { title: string; body: string; secondary: 'Skip' | 'Back'; primary: string }
> = {
  1: {
    title: 'Focus with lenses',
    body: 'Tap a lens to filter your timeline by condition, medication, or topic — or use filter & sort for more control.',
    secondary: 'Skip',
    primary: 'Next',
  },
  2: {
    title: 'Tap any moment to open it',
    body: 'Every entry shows the original source, what it means in plain language, and related moments.',
    secondary: 'Back',
    primary: 'Next',
  },
  3: {
    title: 'Ask about your timeline',
    body: 'Try “When did my eGFR last change?” — answers come from your own records, with sources.',
    secondary: 'Back',
    primary: 'Finish',
  },
}

export { TourScrim as TimelineTourScrim }

export function TimelineTourWelcome({
  onStart,
  onSkip,
}: {
  onStart: () => void
  onSkip: () => void
}) {
  return (
    <FeatureTourWelcome
      overline="Quick tour · 20 seconds"
      title="Your timeline, in one place"
      body="Every record, upload, and log becomes a moment here — organized for you. Here's how to get around."
      onStart={onStart}
      onSkip={onSkip}
    />
  )
}

export function TimelineTourCoach({
  step,
  onPrimary,
  onSecondary,
  className,
  style,
  caret,
}: {
  step: 1 | 2 | 3
  onPrimary: () => void
  onSecondary: () => void
  className?: string
  style?: CSSProperties
  caret?: ReactNode
}) {
  const copy = TIMELINE_TOUR_STEPS[step]
  return (
    <FeatureTourCoach
      step={step}
      totalSteps={3}
      title={copy.title}
      body={copy.body}
      secondaryLabel={copy.secondary}
      primaryLabel={copy.primary}
      onPrimary={onPrimary}
      onSecondary={onSecondary}
      className={className}
      style={style}
      caret={caret}
    />
  )
}
