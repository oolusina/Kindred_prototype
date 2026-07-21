import { useNavigate } from 'react-router-dom'
import { useSmartBack } from '../../navigation/history'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBack from '../../assets/figma/arrow-back.svg'
import tips from '../../assets/figma/tips-and-updates.svg'
import autoAwesome from '../../assets/figma/home_auto_awesome.svg'
import comment from '../../assets/figma/comment.svg'
import thumbUp from '../../assets/figma/thumb-up.svg'

export default function CommunityTip() {
  const navigate = useNavigate()
  const goBack = useSmartBack('/community/t2d')

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <div className="flex items-center gap-2.5 px-5 pt-2">
        <button
          type="button"
          aria-label="Back"
          onClick={goBack}
          className="cursor-pointer"
        >
          <img src={arrowBack} alt="" className="size-[26px]" />
        </button>
        <p className="font-serif text-[20px] font-medium text-ink">Tip</p>
      </div>
      <div className="app-scroll flex flex-1 flex-col gap-4 px-5 pb-8 pt-4">
        <div className="overflow-hidden rounded-2xl border border-accent-200 bg-accent-50">
          <div className="flex items-center justify-between bg-accent-subtle px-4 py-2.5">
            <span className="flex items-center gap-1.5">
              <img src={tips} alt="" className="size-[15px]" />
              <span className="font-sans text-[12px] text-white">TIP</span>
            </span>
            <span className="flex items-center gap-1.5">
              <img src={autoAwesome} alt="" className="size-[13px] brightness-200" />
              <span className="font-sans text-[12px] text-[#b8c7eb]">from AI Search</span>
            </span>
          </div>
          <div className="flex flex-col gap-3 px-4 py-4">
            <span className="w-fit rounded-full bg-accent-100 px-2.5 py-0.5 font-sans text-[12px] text-accent">
              Kidney Disease
            </span>
            <p className="font-serif text-[20px] font-medium leading-[1.24] text-ink">
              Batch-cooking low-sodium meals helps with lower blood pressure
            </p>
            <p className="font-sans text-[15px] leading-[1.42] text-ink-600">
              Members who prep 2–3 low-sodium dinners on Sunday report steadier evening BP readings
              through the week — especially when they also track water.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <img src={comment} alt="" className="size-[15px]" />
                <span className="font-sans text-[13px] text-ink-500">3 comments</span>
              </span>
              <span className="flex items-center gap-1">
                <img src={thumbUp} alt="" className="size-[15px]" />
                <span className="font-sans text-[13px] text-ink-500">41 found helpful</span>
              </span>
            </div>
          </div>
        </div>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Comments
        </p>
        {[
          ['ML', 'MapleLynx', 'Salt-free spice blends made this sustainable for me.'],
          ['OT', 'OtterTrail', 'I freeze single portions — weeknights got easier.'],
        ].map(([ini, name, text]) => (
          <div
            key={name}
            className="flex flex-col gap-2 rounded-2xl border border-accent-100 bg-card px-4 py-3.5"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-full bg-accent">
                <span className="font-sans text-[12px] text-white">{ini}</span>
              </div>
              <p className="font-sans text-[15px] font-medium text-ink">{name}</p>
            </div>
            <p className="font-sans text-[15px] leading-[1.42] text-ink">{text}</p>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 px-5 pb-8">
        <button
          type="button"
          onClick={() => navigate('/prep')}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
        >
          Add to appointment prep
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
