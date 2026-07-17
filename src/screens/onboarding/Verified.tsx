import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import { PrimaryButton } from './shared'
import checkWhite from '../../assets/figma/check-white-lg.svg'
import forum from '../../assets/figma/forum.svg'
import autoAwesome from '../../assets/figma/auto-awesome.svg'
import insights from '../../assets/figma/insights-blue.svg'
import dateRange from '../../assets/figma/home_nav_date_range.svg'
import checkBlue from '../../assets/figma/home_check.svg'

const UNLOCKS = [
  { icon: forum, label: 'Post & reply in Community' },
  { icon: autoAwesome, label: 'Ask AI about your health' },
  { icon: insights, label: 'Insights tuned to your condition' },
  { icon: dateRange, label: 'Timeline built from your records' },
]

export default function Verified() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <div className="app-scroll flex flex-1 flex-col items-center gap-3.5 px-5 pt-16 pb-4">
        <div className="flex size-[72px] items-center justify-center rounded-[36px] bg-accent">
          <img src={checkWhite} alt="" className="size-10" />
        </div>
        <h1 className="text-center font-serif text-[32px] font-medium leading-[1.16] text-ink">
          Diagnosis verified
        </h1>
        <p className="text-center font-sans text-[15px] leading-[1.42] text-ink">
          Chronic kidney disease · Stage 3 — confirmed from UPMC. Your records are syncing now.
        </p>
        <p className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
          What this unlocks
        </p>
        <div className="w-full overflow-hidden rounded-2xl border border-accent-100 bg-card">
          {UNLOCKS.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 px-3.5 py-3 ${
                i > 0 ? 'border-t border-accent-100' : ''
              }`}
            >
              <img src={item.icon} alt="" className="size-5" />
              <p className="min-w-0 flex-1 font-sans text-[15px] text-ink">{item.label}</p>
              <img src={checkBlue} alt="" className="size-[18px]" />
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 pb-4">
        <PrimaryButton
          label="Continue the tour"
          onClick={() => navigate('/onboarding/tour-prep')}
        />
      </div>
      <HomeIndicator />
    </div>
  )
}
