import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TourHomeBackdrop from './TourHomeBackdrop'
import CoachMark from './CoachMark'
import { useSpotlightBox, coachStyleBelow, TourCaret } from '../../components/featureTour'

/** Figma 2649:6211 — STEP 1 OF 6 */
export default function TourVerify() {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const box = useSpotlightBox(rootRef, cardRef, true)

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col overflow-hidden bg-canvas">
      <TourHomeBackdrop spotlightVerifyCard verifyCardRef={cardRef} />
      <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]" />
      {box && (
        <CoachMark
          step={1}
          title="Verify your diagnosis"
          body="Connect your patient portal or upload a document to confirm your condition. This will help us connect you with verified individuals with the same diagnosis."
          secondaryLabel="Later"
          onSecondary={() => navigate('/onboarding/verify-later')}
          primaryLabel="Verify now"
          onPrimary={() => navigate('/onboarding/tour-add')}
          style={coachStyleBelow(box, 13)}
        >
          <TourCaret className="left-8" />
        </CoachMark>
      )}
    </div>
  )
}
