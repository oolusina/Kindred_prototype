import type { CSSProperties, ReactNode } from 'react'
import {
  FeatureTourCoach,
  FeatureTourWelcome,
  TourScrim,
} from '../../components/featureTour'

/** Figma 3120:8263 — FIRST TIME INTRO TO AI SEARCH */

export const ASK_TOUR_DEMO_Q = 'What low-sugar snacks are kidney-safe?'

export type AskTourStep = 0 | 1 | 2 | 3 | 4 | 5

export const ASK_TOUR_STEPS: Record<
  1 | 2 | 3 | 4 | 5,
  { title: string; body: string; secondary: 'Skip' | 'Back'; primary: string }
> = {
  1: {
    title: 'Ask in your own words',
    body: 'Type or tap the mic — no medical jargon needed. Your questions stay private to you.',
    secondary: 'Skip',
    primary: 'Next',
  },
  2: {
    title: 'Not sure where to start?',
    body: 'These prompts are tailored to your verified conditions — tap one to see how answers work.',
    secondary: 'Back',
    primary: 'Next',
  },
  3: {
    title: 'One answer, four lenses',
    body: 'Flip between Medical, Community and My Data to see the same question from every angle.',
    secondary: 'Back',
    primary: 'Next',
  },
  4: {
    title: 'Check the sources',
    body: 'Medical answers cite vetted guidance — tap Open source to read what clinicians reviewed.',
    secondary: 'Back',
    primary: 'Next',
  },
  5: {
    title: 'Made personal',
    body: 'My Data connects the answer to your own labs and readings — only you can see this view.',
    secondary: 'Back',
    primary: 'Finish',
  },
}

export { TourScrim as AskTourScrim }

export function AskTourWelcome({
  onStart,
  onSkip,
}: {
  onStart: () => void
  onSkip: () => void
}) {
  return (
    <FeatureTourWelcome
      title="Answers built around you"
      body="Ask anything about your health — answers draw on trusted medical sources, your community, and your own data."
      onStart={onStart}
      onSkip={onSkip}
    />
  )
}

export function AskTourCoach({
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
  const copy = ASK_TOUR_STEPS[step]
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
