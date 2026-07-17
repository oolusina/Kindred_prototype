import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import { TopBar } from './shared'
import medicalServicesWhite from '../../assets/figma/medical-services-white.svg'
import launchBlue from '../../assets/figma/launch-blue.svg'
import launchWhite from '../../assets/figma/launch-white.svg'

const STEPS = [
  "UPMC's secure portal opens in your browser",
  'You sign in there and approve read-only access',
  'Come back here and your records sync automatically',
]

export default function Authorize() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <TopBar title="MyUPMC" subtitle="Connect securely" />
      <div className="app-scroll flex flex-1 flex-col gap-4 px-5 pb-4">
        <div className="flex flex-col items-center gap-2.5 rounded-card-lg bg-accent-50 pb-[22px] pt-6">
          <div className="flex size-[60px] items-center justify-center rounded-2xl bg-accent">
            <img src={medicalServicesWhite} alt="" className="size-8" />
          </div>
          <p className="font-serif text-[20px] font-medium leading-[1.24] text-ink">MyUPMC</p>
          <div className="flex items-center gap-1.5">
            <img src={launchBlue} alt="" className="size-3.5" />
            <span className="font-sans text-[12px] uppercase tracking-wide text-accent">
              Opens in your browser
            </span>
          </div>
        </div>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          How it works
        </p>
        <div className="flex flex-col gap-3.5">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-start gap-3">
              <div className="flex size-[26px] shrink-0 items-center justify-center rounded-[13px] bg-accent font-sans text-[12px] text-white">
                {i + 1}
              </div>
              <p className="font-sans text-[15px] leading-[1.42] text-ink">{step}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-center gap-2.5 px-5 pb-4">
        <button
          type="button"
          onClick={() => navigate('/onboarding/review-confirm')}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-accent px-5 py-3.5 font-sans text-[15px] font-semibold text-white"
        >
          Continue to MyUPMC
          <img src={launchWhite} alt="" className="size-[18px]" />
        </button>
        <p className="text-center font-sans text-[13px] text-ink-500">
          Disconnect anytime in Settings.
        </p>
      </div>
      <HomeIndicator />
    </div>
  )
}
