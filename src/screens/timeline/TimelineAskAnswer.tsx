import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBack from '../../assets/figma/arrow-back.svg'
import autoAwesome from '../../assets/figma/auto-awesome.svg'
import searchInk from '../../assets/figma/search-ink.svg'
import mic from '../../assets/figma/home_mic.svg'
import askFavicons from '../../assets/figma/ask-favicons.svg'

export default function TimelineAskAnswer() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex h-14 shrink-0 items-center justify-between px-6">
        <button type="button" aria-label="Back" onClick={() => navigate('/timeline/ask-entry')} className="cursor-pointer">
          <img src={arrowBack} alt="" className="size-[22px]" />
        </button>
        <p className="font-sans text-[15px] font-medium text-ink-600">Ask</p>
        <button type="button" onClick={() => navigate('/timeline/ask-entry')} className="cursor-pointer">
          <img src={searchInk} alt="" className="size-[22px]" />
        </button>
      </div>
      <div className="app-scroll flex-1 overflow-y-auto px-6 pb-4">
        <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
          You asked
        </p>
        <p className="mb-4 font-serif text-[22px] leading-[29px] text-ink">
          Why is my eGFR holding at 48?
        </p>
        <div className="mb-3 flex items-center gap-1.5">
          <img src={autoAwesome} alt="" className="size-[15px]" />
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
            From your timeline
          </p>
          <div className="flex-1" />
          <span className="flex items-center gap-2 rounded-[15px] border border-[rgba(0,43,143,0.12)] bg-white py-[5px] pr-3 pl-2">
            <img src={askFavicons} alt="" className="h-4 w-9" />
            <span className="font-sans text-[13px] font-medium text-ink-700">3 moments</span>
          </span>
        </div>
        <p className="mb-3 font-serif text-[17px] font-semibold leading-[1.28] text-accent">
          Your eGFR has been stable around 48 since April — consistent with Stage 3a and your current plan.
        </p>
        <p className="mb-4 font-sans text-[13px] leading-[1.36] text-ink-700">
          July labs match your April nephrology visit. Lisinopril and steady blood pressure help keep
          filtration stable. Your next check is due in August.
        </p>
        <button
          type="button"
          onClick={() => navigate('/timeline/ask/chat')}
          className="mb-3 cursor-pointer font-sans text-[13px] font-medium text-accent"
        >
          Refine in chat →
        </button>
      </div>
      <div className="shrink-0 px-6 pb-4 pt-2">
        <button
          type="button"
          onClick={() => navigate('/timeline/ask/chat')}
          className="flex h-12 w-full cursor-pointer items-center justify-between rounded-full border border-accent-200 bg-white py-2.5 pr-2.5 pl-5 shadow-[0px_6px_16px_0px_rgba(0,43,143,0.1)]"
        >
          <span className="font-sans text-[14px] text-ink-600">Ask a follow-up…</span>
          <span className="flex size-9 items-center justify-center rounded-[20px] bg-accent">
            <img src={mic} alt="" className="size-5" />
          </span>
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
