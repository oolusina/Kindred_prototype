import { useNavigate } from 'react-router-dom'
import TourHomeBackdrop from './TourHomeBackdrop'
import CoachMark from './CoachMark'
import addIcon from '../../assets/figma/navbar_add.svg'

/** Figma 2655:5908 — STEP 2 OF 6. Next and + both open verify-add-menu. */
export default function TourAdd() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-canvas">
      <TourHomeBackdrop />
      <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]" />
      <CoachMark
        step={2}
        title="Tap the + button"
        body="Everything you add starts here. Tap + to connect your patient portal or upload a document that confirms your diagnosis."
        secondaryLabel="Back"
        onSecondary={() => navigate('/onboarding/tour-verify')}
        primaryLabel="Next"
        onPrimary={() => navigate('/onboarding/verify-add-menu')}
        className="bottom-[150px] left-[35px]"
      >
        <span className="absolute -bottom-[11px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[9px] border-t-[12px] border-x-transparent border-t-white" />
      </CoachMark>
      <div className="pointer-events-none absolute bottom-[41px] left-1/2 z-50 flex size-[90px] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white shadow-[0px_0px_24px_2px_rgba(255,255,255,0.5)]">
        <button
          type="button"
          aria-label="Add"
          onClick={() => navigate('/onboarding/verify-add-menu')}
          className="pointer-events-auto flex size-[67px] cursor-pointer items-center justify-center rounded-full border-[5px] border-canvas bg-accent drop-shadow-[0px_6px_7px_rgba(0,43,143,0.35)]"
        >
          <img src={addIcon} alt="" className="size-7" />
        </button>
      </div>
    </div>
  )
}
