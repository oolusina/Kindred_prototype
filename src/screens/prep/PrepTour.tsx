import type { CSSProperties, ReactNode } from 'react'
import {
  FeatureTourCoach,
  FeatureTourWelcome,
  TourScrim,
  SpotlightRing,
  coachStyleAbove,
  coachStyleBelow,
  useSpotlightBox,
  TourCaret,
  type SpotlightBox,
} from '../../components/featureTour'

/** Figma 2929:7333 — First time intro · Appointment Prep */

export type PrepTourStep = 0 | 1 | 2 | 3 | 4 | 5

export const PREP_TOUR_STEPS: Record<
  1 | 2 | 3 | 4 | 5,
  { title: string; body: string; secondary: 'Skip' | 'Back'; primary: string }
> = {
  1: {
    title: 'Your questions, collected',
    body: 'Questions you save from Care Team, AI Search and Community land here automatically — each tagged with where it came from.',
    secondary: 'Skip',
    primary: 'Next',
  },
  2: {
    title: 'Add what matters',
    body: 'Tap Edit to remove or reorder, add a question recommended for this visit, or write your own.',
    secondary: 'Back',
    primary: 'Next',
  },
  3: {
    title: 'Share it your way',
    body: 'Send your prep as a PDF, show it in the app, or push it to your portal — only this prep, never your full record.',
    secondary: 'Back',
    primary: 'Next',
  },
  4: {
    title: 'Built for the visit',
    body: "Switch to During visit when you're in the room — your doctor sees a quick snapshot of what's changed since last time.",
    secondary: 'Back',
    primary: 'Next',
  },
  5: {
    title: 'Never miss an answer',
    body: "Turn on Transcription and the doctor's answers attach to your questions — then save the whole visit to your timeline.",
    secondary: 'Back',
    primary: 'Finish',
  },
}

export {
  TourScrim as PrepTourScrim,
  SpotlightRing,
  coachStyleAbove,
  coachStyleBelow,
  useSpotlightBox,
  TourCaret,
  type SpotlightBox,
}

export function PrepTourWelcome({
  onStart,
  onSkip,
}: {
  onStart: () => void
  onSkip: () => void
}) {
  return (
    <FeatureTourWelcome
      title="Walk in ready"
      body="Questions you've gathered, the data your doctor needs, and what to ask next — all in one prep you control."
      onStart={onStart}
      onSkip={onSkip}
    />
  )
}

export function PrepTourCoach({
  step,
  onPrimary,
  onSecondary,
  className,
  style,
  caret,
}: {
  step: 1 | 2 | 3 | 4 | 5
  onPrimary: () => void
  onSecondary: () => void
  className?: string
  style?: CSSProperties
  caret?: ReactNode
}) {
  const copy = PREP_TOUR_STEPS[step]
  return (
    <FeatureTourCoach
      step={step}
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
