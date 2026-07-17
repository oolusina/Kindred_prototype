import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBack from '../../assets/figma/arrow-back.svg'
import autoAwesome from '../../assets/figma/auto-awesome.svg'
import homeBlue from '../../assets/figma/navbar_home_active.svg'
import scienceBlue from '../../assets/figma/science-blue.svg'
import personBlue from '../../assets/figma/person-blue.svg'

export default function LookingAhead() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex shrink-0 flex-col gap-1 px-5 pt-2.5 pb-4">
        <button
          type="button"
          aria-label="Back"
          onClick={() => navigate('/timeline')}
          className="mb-1.5 cursor-pointer self-start"
        >
          <img src={arrowBack} alt="" className="size-[26px]" />
        </button>
        <h1 className="font-serif text-[26px] font-medium leading-[1.18] text-ink">Looking ahead</h1>
        <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
          Doctor notes show these next steps for you
        </p>
      </div>
      <div className="app-scroll flex-1 overflow-y-auto px-5 pb-6">
        <div className="mb-3.5 flex gap-2.5 rounded-2xl bg-accent-50 p-4">
          <img src={autoAwesome} alt="" className="size-5 shrink-0" />
          <p className="font-sans text-[15px] leading-[1.42] text-ink">
            If your kidney disease ever progresses, here&apos;s what your care may broadly involve.
            Everyone&apos;s path is different. Many people stay stable for years.
          </p>
        </div>
        <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          What this often looks like
        </p>
        <div className="mb-2 flex gap-3 rounded-2xl border border-accent-100 bg-card p-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-[20px] bg-accent-50">
            <img src={homeBlue} alt="" className="size-[22px]" style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(80%) saturate(2000%) hue-rotate(210deg)' }} />
          </span>
          <div>
            <p className="font-sans text-[15px] font-medium text-ink">Managing at home</p>
            <p className="font-sans text-[13px] text-ink-500">
              Diet, blood pressure and medication, where you are now.
            </p>
          </div>
        </div>
        <div className="mb-3.5 flex gap-3 rounded-2xl border border-accent-100 bg-card p-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-[20px] bg-accent-50">
            <img src={scienceBlue} alt="" className="size-[22px]" />
          </span>
          <div>
            <p className="font-sans text-[15px] font-medium text-ink">Closer monitoring</p>
            <p className="font-sans text-[13px] text-ink-500">
              More regular lab checks so your team can spot changes early.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 rounded-2xl bg-accent p-4">
          <div className="flex gap-2.5">
            <img src={personBlue} alt="" className="size-5 shrink-0 brightness-0 invert" />
            <div className="text-white">
              <p className="font-sans text-[15px] font-medium">Hear from people who&apos;ve been there</p>
              <p className="font-sans text-[13px]">Stories from others living with Stage 3</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/community')}
            className="w-full cursor-pointer rounded-[10px] border border-accent-200 bg-white py-[9px] font-sans text-[12px] text-accent"
          >
            Visit the community
          </button>
        </div>
      </div>
      <div className="shrink-0 px-5 pb-2">
        <button
          type="button"
          onClick={() => navigate('/prep')}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
        >
          Add to Appointment Prep
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
