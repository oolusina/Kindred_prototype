import type { CSSProperties, ReactNode } from 'react'
import {
  FeatureTourCoach,
  FeatureTourWelcome,
  TourScrim,
} from '../../components/featureTour'

/** Figma 3139:8265 — FIRST TIME INTRO TO MODULES (3 steps + welcome). */

export type LearnTourStep = 0 | 1 | 2 | 3

export const LEARN_TOUR_STEPS: Record<
  1 | 2 | 3,
  { title: string; body: string; secondary: 'Skip' | 'Back'; primary: string }
> = {
  1: {
    title: 'Two tabs, everything here',
    body: 'Modules are bite-size courses for each of your conditions. Saved keeps every video and answer you bookmark, ready for later.',
    secondary: 'Skip',
    primary: 'Next',
  },
  2: {
    title: 'Pick your depth',
    body: 'Every module comes two ways: Simple for the essentials in plain language, Detailed when you want the full picture. Switch anytime — your spot is kept.',
    secondary: 'Back',
    primary: 'Next',
  },
  3: {
    title: 'Rather watch than read?',
    body: 'Every module has a short visual guide video, broken into chapters so you can jump to what you need — and Save keeps it in your library.',
    secondary: 'Back',
    primary: 'Finish',
  },
}

export { TourScrim as LearnTourScrim }

export function LearnTourWelcome({
  onStart,
  onSkip,
}: {
  onStart: () => void
  onSkip: () => void
}) {
  return (
    <FeatureTourWelcome
      overline="Quick tour · 15 seconds"
      title="Learn your condition"
      body="Bite-size modules built around your verified conditions — read them or watch them, at whatever depth you like."
      onStart={onStart}
      onSkip={onSkip}
    />
  )
}

export function LearnTourCoach({
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
  const copy = LEARN_TOUR_STEPS[step]
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
