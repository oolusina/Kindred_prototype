import type { CSSProperties, ReactNode } from 'react'
import {
  FeatureTourCoach,
  FeatureTourWelcome,
  TourScrim,
  SpotlightRing,
  coachStyleAbove,
  coachStyleBelow,
  coachStyleCentered,
  useSpotlightBox,
  TourCaret,
  type SpotlightBox,
} from '../../components/featureTour'

/** Figma 2910:7360 — Community first-time intro (5 steps + welcome). */

export type CommunityTourStep = 0 | 1 | 2 | 3 | 4 | 5

export const COMMUNITY_TOUR_STEPS: Record<
  1 | 2 | 3 | 4 | 5,
  { title: string; body: string; secondary: 'Skip' | 'Back'; primary: string }
> = {
  1: {
    title: 'Your spaces',
    body: 'Each community matches one of your verified conditions — everyone inside has it too. Join as many as apply.',
    secondary: 'Skip',
    primary: 'Next',
  },
  2: {
    title: 'Browse anything, post in yours',
    body: "You can look up and read any community here. Posting and replying stays limited to communities that match your verified conditions — that's what keeps every answer real.",
    secondary: 'Back',
    primary: 'Next',
  },
  3: {
    title: 'Tap a question to dive in',
    body: 'Real questions from members like you — answers marked data-checked are backed by member data. Tap this one to continue.',
    secondary: 'Back',
    primary: 'Next',
  },
  4: {
    title: '% match = people like you',
    body: "Each answer shows how closely that member's health profile matches yours — condition, stage, meds, age band. Tap any badge for the full breakdown.",
    secondary: 'Back',
    primary: 'Next',
  },
  5: {
    title: 'Backed by real data',
    body: "Some answers carry this badge. The community's vault data is used to verify the answer. Tap it to see the actual numbers.",
    secondary: 'Back',
    primary: 'Finish',
  },
}

export {
  TourScrim as CommunityTourScrim,
  SpotlightRing,
  coachStyleAbove,
  coachStyleBelow,
  coachStyleCentered,
  useSpotlightBox,
  TourCaret,
  type SpotlightBox,
}

export function CommunityTourWelcome({
  onStart,
  onSkip,
}: {
  onStart: () => void
  onSkip: () => void
}) {
  return (
    <FeatureTourWelcome
      title="People who get it"
      body="Every member here has a verified diagnosis — so answers come from real, lived experience. Here's how to find yours."
      onStart={onStart}
      onSkip={onSkip}
    />
  )
}

export function CommunityTourCoach({
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
  const copy = COMMUNITY_TOUR_STEPS[step]
  return (
    <FeatureTourCoach
      step={step}
      totalSteps={5}
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
