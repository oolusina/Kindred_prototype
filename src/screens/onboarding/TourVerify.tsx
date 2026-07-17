import { useNavigate } from 'react-router-dom'
import TourHomeBackdrop from './TourHomeBackdrop'
import CoachMark from './CoachMark'

/** Figma 2649:6211 — STEP 1 OF 6 */
export default function TourVerify() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-canvas">
      <TourHomeBackdrop spotlightVerifyCard />
      <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]" />
      <CoachMark
        step={1}
        title="Verify your diagnosis"
        body="Connect your patient portal or upload a document to confirm your condition. This will help us connect you with verified individuals with the same diagnosis."
        secondaryLabel="Later"
        onSecondary={() => navigate('/onboarding/verify-later')}
        primaryLabel="Verify now"
        onPrimary={() => navigate('/onboarding/tour-add')}
        className="left-[22px] top-[324px]"
      >
        <span className="absolute -top-[11px] left-8 h-0 w-0 border-x-[9px] border-b-[12px] border-x-transparent border-b-white" />
      </CoachMark>
    </div>
  )
}
