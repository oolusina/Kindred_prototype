import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import { IntroSlide } from './shared'
import autoAwesome from '../../assets/figma/auto-awesome.svg'
import descriptionInk from '../../assets/figma/description-ink.svg'
import science from '../../assets/figma/science.svg'
import checkBlue from '../../assets/figma/home_check.svg'
import shieldWhite from '../../assets/figma/shield-white.svg'

function SourceRow({ icon, name, kind }: { icon: string; name: string; kind: string }) {
  return (
    <div className="flex w-full items-center gap-2.5">
      <img src={icon} alt="" className="size-[18px] shrink-0" />
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="font-sans text-[15px] font-medium leading-[1.4] text-ink">{name}</span>
        <span className="font-sans text-[12px] leading-[1.3] text-ink-500">{kind}</span>
      </div>
      <img src={checkBlue} alt="" className="size-4 shrink-0" />
    </div>
  )
}

export default function IntroAi() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <IntroSlide
        overline="MEDICALLY TRAINED AI"
        title="Answers you can trust"
        body="A medically trained model that cites peer-reviewed sources and grounds answers in records from you and the community."
        active={2}
        onNext={() => navigate('/onboarding/video')}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-[30px]">
          <div className="flex items-center gap-1.5 rounded-full bg-accent-100 px-3 py-2">
            <img src={autoAwesome} alt="" className="size-3.5" />
            <span className="font-sans text-[12px] leading-[1.3] text-accent">
              Is a CGM worth it for type 2?
            </span>
          </div>
          <div className="flex w-full flex-col gap-3 rounded-[16px] bg-white p-[18px] shadow-[0px_8px_24px_0px_rgba(10,23,71,0.1)]">
            <p className="font-serif text-[20px] font-medium leading-[1.32] text-ink">
              For many people with type 2, CGMs are linked to better A1C control.
            </p>
            <div className="h-px w-full bg-accent-100" />
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
              SOURCES
            </p>
            <SourceRow icon={descriptionInk} name="New England Journal of Medicine" kind="Peer-reviewed" />
            <SourceRow icon={science} name="American Diabetes Association" kind="Clinical guidelines" />
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-2">
            <img src={shieldWhite} alt="" className="size-3.5" />
            <span className="font-sans text-[12px] leading-[1.3] text-white">
              Medically trained model
            </span>
          </div>
        </div>
      </IntroSlide>
      <HomeIndicator />
    </div>
  )
}
