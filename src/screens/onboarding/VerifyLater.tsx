import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TourHomeBackdrop from './TourHomeBackdrop'
import CoachMark from './CoachMark'
import {
  useSpotlightBox,
  SpotlightRing,
  coachStyleAboveCentered,
  TourCaret,
} from '../../components/featureTour'

/** Figma 2657:5530 — skip-verify branch of STEP 2. Next resumes tour at step 3. */
export default function VerifyLater() {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const box = useSpotlightBox(rootRef, buttonRef, true, 11)
  const openAddMenu = () => navigate('/onboarding/verify-add-menu')

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col overflow-hidden bg-canvas">
      <TourHomeBackdrop addButtonRef={buttonRef} onAddClick={openAddMenu} />
      <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]" />
      {box && (
        <>
          <SpotlightRing box={box} className="rounded-full" />
          <CoachMark
            step={2}
            title="Add everything from +"
            body="This is where you connect sources like your portal or wearables, and add medications, appointments, and daily logs. More sources lead to deeper insights!"
            secondaryLabel="Back"
            onSecondary={() => navigate('/onboarding/tour-verify')}
            primaryLabel="Next"
            onPrimary={() => navigate('/onboarding/tour-prep')}
            style={coachStyleAboveCentered(box, 16, 210)}
          >
            <TourCaret direction="down" className="left-1/2 -translate-x-1/2" />
          </CoachMark>
        </>
      )}
    </div>
  )
}
