import { useNavigate } from 'react-router-dom'
import TourVerifiedBackdrop from './TourVerifiedBackdrop'
import CoachMark from './CoachMark'

/** Figma 2941:8824 — STEP 4 OF 6 */
export default function TourCommunityQa() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-canvas">
      <TourVerifiedBackdrop spotlight="community" />
      <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]" />
      <CoachMark
        step={4}
        title="Community"
        body="Your diagnosis is verified, so you can ask and answer alongside people managing the same condition, with evidence-tagged replies."
        secondaryLabel="Back"
        onSecondary={() => navigate('/onboarding/tour-prep')}
        primaryLabel="Next"
        onPrimary={() => navigate('/onboarding/tour-timeline')}
        className="bottom-[114px] left-[35px]"
      >
        <span className="absolute -bottom-[11px] left-[77px] h-0 w-0 border-x-[9px] border-t-[12px] border-x-transparent border-t-white" />
      </CoachMark>
    </div>
  )
}
