import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TourVerifiedBackdrop from './TourVerifiedBackdrop'
import CoachMark from './CoachMark'
import { useSpotlightBox, coachStyleCentered, TourCaret } from '../../components/featureTour'

/** Figma 2941:8654 — STEP 3 OF 6 */
export default function TourPrep() {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const box = useSpotlightBox(rootRef, cardRef, true)

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col overflow-hidden bg-canvas">
      <TourVerifiedBackdrop spotlight="prep" prepCardRef={cardRef} />
      <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]" />
      {box && (
        <CoachMark
          step={3}
          title="Preparing For Your Next Appointment"
          body="Your questions, visits, and labs pull in from your records — with reminders and plain-language summaries when things change."
          secondaryLabel="Back"
          onSecondary={() => navigate('/onboarding/verify-later')}
          primaryLabel="Next"
          onPrimary={() => navigate('/onboarding/tour-community')}
          style={coachStyleCentered(box, 13)}
        >
          <TourCaret className="left-1/2 -translate-x-1/2" />
        </CoachMark>
      )}
    </div>
  )
}
