import { useNavigate } from 'react-router-dom'
import TourVerifiedBackdrop from './TourVerifiedBackdrop'
import CoachMark from './CoachMark'

/** Figma 2950:8118 — STEP 6 OF 6. Finish → home (all-set/share already done on verify path). */
export default function TourControl() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-canvas">
      <TourVerifiedBackdrop spotlight="sharing" />
      <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]" />
      <CoachMark
        step={6}
        title="You always have control"
        body="You can choose what to share and always edit tags from your Settings."
        secondaryLabel="Back"
        onSecondary={() => navigate('/onboarding/tour-timeline')}
        primaryLabel="Finish"
        onPrimary={() => navigate('/home')}
        className="left-[38px] top-[310px]"
      >
        <span className="absolute -bottom-[11px] right-[62px] h-0 w-0 border-x-[9px] border-t-[12px] border-x-transparent border-t-white" />
      </CoachMark>
    </div>
  )
}
