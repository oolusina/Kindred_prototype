import { useNavigate } from 'react-router-dom'
import TourHomeBackdrop from './TourHomeBackdrop'
import { PrimaryButton } from './shared'

export default function TourWelcome() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-canvas">
      <TourHomeBackdrop />
      <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]" />
      <div className="absolute left-1/2 top-1/2 z-50 flex w-[320px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 rounded-card-lg bg-white px-5 py-[22px] shadow-[0px_6px_24px_0px_rgba(0,0,0,0.18)]">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
          QUICK TOUR
        </p>
        <p className="text-center font-serif text-[26px] font-medium leading-[1.18] text-ink">
          Welcome, Shania
        </p>
        <p className="w-[280px] text-center font-sans text-[13px] leading-[1.36] text-ink-600">
          This is your homepage. Take a 1 minute tour to see how things work.
        </p>
        <PrimaryButton label="Start the tour" onClick={() => navigate('/onboarding/tour-verify')} />
      </div>
    </div>
  )
}
