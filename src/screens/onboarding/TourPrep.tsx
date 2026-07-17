import { useNavigate } from 'react-router-dom'
import TourVerifiedBackdrop from './TourVerifiedBackdrop'
import CoachMark from './CoachMark'

/** Figma 2941:8654 — STEP 3 OF 6 */
export default function TourPrep() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-canvas">
      <TourVerifiedBackdrop spotlight="prep" />
      <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]" />
      <CoachMark
        step={3}
        title="Preparing For Your Next Appointment"
        body="Your questions, visits, and labs pull in from your records — with reminders and plain-language summaries when things change."
        secondaryLabel="Back"
        onSecondary={() => navigate('/onboarding/verify-later')}
        primaryLabel="Next"
        onPrimary={() => navigate('/onboarding/tour-community')}
        className="left-1/2 -translate-x-1/2 top-[394px]"
      >
        <span className="absolute -top-[11px] left-1/2 h-0 w-0 border-x-[9px] border-b-[12px] border-x-transparent border-b-white" />
      </CoachMark>
    </div>
  )
}
