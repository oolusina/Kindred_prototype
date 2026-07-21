import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TourVerifiedBackdrop from './TourVerifiedBackdrop'
import CoachMark from './CoachMark'
import {
  useSpotlightBox,
  coachStyleAbove,
  coachCaretLeft,
  TourCaret,
} from '../../components/featureTour'

/** Figma 2950:8118 — STEP 6 OF 6. Finish → home (all-set/share already done on verify path). */
export default function TourControl() {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const box = useSpotlightBox(rootRef, cardRef, true)

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col overflow-hidden bg-canvas">
      <TourVerifiedBackdrop spotlight="sharing" sharingCardRef={cardRef} />
      <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]" />
      {box && (
        <CoachMark
          step={6}
          title="You always have control"
          body="You can choose what to share and always edit tags from your Settings."
          secondaryLabel="Back"
          onSecondary={() => navigate('/onboarding/tour-timeline')}
          primaryLabel="Finish"
          onPrimary={() => navigate('/home')}
          style={coachStyleAbove(box, 16, 195)}
        >
          <TourCaret direction="down" className="" style={{ left: coachCaretLeft(box) }} />
        </CoachMark>
      )}
    </div>
  )
}
