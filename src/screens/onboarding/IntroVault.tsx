import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import { IntroSlide } from './shared'
import waterDrop from '../../assets/figma/water-drop.svg'
import monitorHeart from '../../assets/figma/monitor-heart.svg'
import medication from '../../assets/figma/medication.svg'
import autoAwesome from '../../assets/figma/auto-awesome.svg'

function EntryPill({ icon, label, rotate }: { icon: string; label: string; rotate: string }) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-full bg-white py-2 pl-2.5 pr-[18px] shadow-[0px_8px_24px_0px_rgba(10,23,71,0.1)] ${rotate}`}
    >
      <div className="flex size-7 items-center justify-center rounded-full bg-accent-50">
        <img src={icon} alt="" className="size-4" />
      </div>
      <span className="font-sans text-[15px] font-medium leading-[1.4] text-ink">{label}</span>
    </div>
  )
}

export default function IntroVault() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <IntroSlide
        overline="HEALTH VAULT"
        title="Your health story, in one vault"
        body="Add anything: daily logs, meds, vitals, labs. Kindred turns years of history into insights made just for you."
        active={1}
        onNext={() => navigate('/onboarding/intro-ai')}
      >
        <div className="absolute inset-0 flex flex-col justify-center px-[30px]">
          <div className="flex flex-col gap-2.5">
            <div className="ml-6 self-start">
              <EntryPill icon={waterDrop} label="Water · 1.5 L" rotate="rotate-2" />
            </div>
            <div className="ml-[78px] self-start">
              <EntryPill icon={monitorHeart} label="Resting HR · 62 bpm" rotate="-rotate-1" />
            </div>
            <div className="ml-9 self-start">
              <EntryPill icon={medication} label="Metformin · 500 mg" rotate="rotate-1" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 py-3">
            <span className="size-[5px] rounded-full bg-accent-200" />
            <span className="size-[5px] rounded-full bg-accent-200" />
            <span className="size-[5px] rounded-full bg-accent-200" />
          </div>
          <div className="flex w-full flex-col gap-2.5 rounded-[16px] border border-accent-200 bg-accent-50 p-[18px]">
            <div className="flex items-center gap-2">
              <img src={autoAwesome} alt="" className="size-4" />
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
                AI INSIGHT
              </span>
            </div>
            <p className="font-serif text-[20px] font-medium leading-[1.32] text-ink">
              Your blood pressure runs lower on weeks you sleep 7+ hours.
            </p>
            <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
              From 6 months of your vault history
            </p>
          </div>
        </div>
      </IntroSlide>
      <HomeIndicator />
    </div>
  )
}
