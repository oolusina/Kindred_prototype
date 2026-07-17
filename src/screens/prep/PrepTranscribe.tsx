import { useNavigate } from 'react-router-dom'
import { PrepHeader, PrepFooter, Tag } from './shared'
import micNone from '../../assets/figma/mic-none.svg'
import toggleOn from '../../assets/figma/toggle-on.svg'

export default function PrepTranscribe() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <PrepHeader phase="during" fallback="/prep/during" />
      <div className="app-scroll flex flex-1 flex-col gap-3 px-6 pb-4 pt-3">
        <div className="flex items-center gap-2 rounded-2xl border border-accent bg-accent-50 px-4 py-3">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
          </span>
          <p className="font-sans text-[13px] font-medium text-accent">Listening · transcription on</p>
        </div>

        <div className="flex w-full flex-col gap-1.5 rounded-2xl bg-card px-4 py-3">
          <div className="flex w-full items-center gap-2">
            <img src={micNone} alt="" className="size-[19px]" />
            <span className="font-sans text-[13.5px] font-medium text-ink">Transcription</span>
            <span className="rounded-lg bg-[rgba(0,43,143,0.08)] px-1.5 py-0.5 font-sans text-[9px] font-semibold tracking-[0.5px] text-[#001d61]">
              BETA
            </span>
            <div className="flex-1" />
            <button type="button" onClick={() => navigate('/prep/during')} className="cursor-pointer">
              <img src={toggleOn} alt="" className="h-[26px] w-11" />
            </button>
          </div>
          <p className="font-sans text-[11.5px] leading-[15px] text-ink-600">
            Capturing answers as you talk. You can edit notes after the visit.
          </p>
        </div>

        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
          Live notes
        </p>
        <div className="flex flex-col gap-2 rounded-2xl bg-card p-4">
          <div className="flex flex-col gap-1">
            <Tag kind="care" />
            <p className="font-sans text-[13px] leading-[1.4] text-ink">
              Dr. noted BP meds may increase if home readings stay elevated.
            </p>
          </div>
          <div className="h-px w-full bg-accent-100" />
          <div className="flex flex-col gap-1">
            <Tag kind="ai" />
            <p className="font-sans text-[13px] leading-[1.4] text-ink">
              Discussing SGLT2 — labs needed before starting.
            </p>
          </div>
        </div>
      </div>
      <PrepFooter label="Save to timeline" onClick={() => navigate('/prep/saved')} />
    </div>
  )
}
