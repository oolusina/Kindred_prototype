import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TourVerifiedBackdrop from './TourVerifiedBackdrop'
import CoachMark from './CoachMark'
import {
  useSpotlightBox,
  SpotlightRing,
  coachStyleAbove,
  coachCaretLeft,
  TourCaret,
} from '../../components/featureTour'

/** Figma 2941:8824 — STEP 4 OF 6 */
export default function TourCommunityQa() {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement>(null)
  const tabRef = useRef<HTMLButtonElement>(null)
  const box = useSpotlightBox(rootRef, tabRef, true, 10)

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col overflow-hidden bg-canvas">
      <TourVerifiedBackdrop spotlight="community" communityTabRef={tabRef} />
      <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]" />
      {box && (
        <>
          <SpotlightRing box={box} className="rounded-[20px]" />
          <CoachMark
            step={4}
            title="Community"
            body="Your diagnosis is verified, so you can ask and answer alongside people managing the same condition, with evidence-tagged replies."
            secondaryLabel="Back"
            onSecondary={() => navigate('/onboarding/tour-prep')}
            primaryLabel="Next"
            onPrimary={() => navigate('/onboarding/tour-timeline')}
            style={coachStyleAbove(box, 16, 170)}
          >
            <TourCaret
              direction="down"
              className="-translate-x-1/2"
              style={{ left: coachCaretLeft(box) }}
            />
          </CoachMark>
        </>
      )}
    </div>
  )
}
