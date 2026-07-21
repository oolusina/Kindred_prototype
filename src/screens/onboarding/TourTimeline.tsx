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

/** Figma 2941:9008 — STEP 5 OF 6 */
export default function TourTimeline() {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement>(null)
  const tabRef = useRef<HTMLButtonElement>(null)
  const box = useSpotlightBox(rootRef, tabRef, true, 10)

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col overflow-hidden bg-canvas">
      <TourVerifiedBackdrop spotlight="timeline" timelineTabRef={tabRef} />
      <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]" />
      {box && (
        <>
          <SpotlightRing box={box} className="rounded-[20px]" />
          <CoachMark
            step={5}
            title="Your timeline lives here"
            body="Everything from your records and uploads lands in one searchable timeline you can filter and share before visits."
            secondaryLabel="Back"
            onSecondary={() => navigate('/onboarding/tour-community')}
            primaryLabel="Next"
            onPrimary={() => navigate('/onboarding/tour-control')}
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
