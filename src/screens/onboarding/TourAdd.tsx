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

/** Figma 2655:5908 — STEP 2 OF 6. Next and + both open verify-add-menu. */
export default function TourAdd() {
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
            title="Tap the + button"
            body="Everything you add starts here. Tap + to connect your patient portal or upload a document that confirms your diagnosis."
            secondaryLabel="Back"
            onSecondary={() => navigate('/onboarding/tour-verify')}
            primaryLabel="Next"
            onPrimary={openAddMenu}
            style={coachStyleAboveCentered(box, 16, 190)}
          >
            <TourCaret direction="down" className="left-1/2 -translate-x-1/2" />
          </CoachMark>
        </>
      )}
    </div>
  )
}
