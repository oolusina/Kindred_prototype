import { useNavigate } from 'react-router-dom'
import TourVerifiedBackdrop from './TourVerifiedBackdrop'
import CoachMark from './CoachMark'

/** Figma 2941:9008 — STEP 5 OF 6 */
export default function TourTimeline() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-canvas">
      <TourVerifiedBackdrop spotlight="timeline" />
      <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]" />
      <CoachMark
        step={5}
        title="Your timeline lives here"
        body="Everything from your records and uploads lands in one searchable timeline you can filter and share before visits."
        secondaryLabel="Back"
        onSecondary={() => navigate('/onboarding/tour-community')}
        primaryLabel="Next"
        onPrimary={() => navigate('/onboarding/tour-control')}
        className="bottom-[114px] left-[35px]"
      >
        <span className="absolute -bottom-[11px] right-[75px] h-0 w-0 border-x-[9px] border-t-[12px] border-x-transparent border-t-white" />
      </CoachMark>
    </div>
  )
}
