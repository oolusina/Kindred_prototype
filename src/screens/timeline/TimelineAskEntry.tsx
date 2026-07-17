import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import NavBar from '../../components/NavBar'
import arrowBack from '../../assets/figma/arrow-back.svg'
import autoAwesome from '../../assets/figma/home_auto_awesome.svg'
import mic from '../../assets/figma/home_mic.svg'
import history from '../../assets/figma/history-gray.svg'
import chevronRight from '../../assets/figma/chevron-right-gray.svg'
import insights from '../../assets/figma/insights-blue.svg'

const PROMPTS = [
  'Why is my eGFR at 48?',
  'When did I start Lisinopril?',
  'Show my A1C trend',
]

const RECENT = [
  'My CGM spikes after breakfast',
  'Metformin dose changes',
  'Nephrology visit notes',
]

export default function TimelineAskEntry() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <div className="shrink-0 rounded-b-header bg-accent">
        <SystemBar variant="light" />
        <div className="flex flex-col gap-1 px-5 pb-6 pt-1">
          <button
            type="button"
            aria-label="Back"
            onClick={() => navigate('/timeline')}
            className="mb-1 cursor-pointer self-start"
          >
            <img src={arrowBack} alt="" className="size-6 brightness-0 invert" />
          </button>
          <p className="font-serif text-[32px] font-medium leading-[1.16] text-white">
            Ask your timeline
          </p>
          <div className="mt-2.5 flex items-center gap-2 rounded-full border border-accent-200 bg-white py-1.5 pr-1.5 pl-4">
            <img src={autoAwesome} alt="" className="size-[18px]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/timeline/ask')}
              placeholder="Ask about a moment or trend"
              className="flex-1 bg-transparent font-sans text-[15px] text-ink outline-none placeholder:text-ink-500"
            />
            <button
              type="button"
              onClick={() => navigate('/ask/voice')}
              className="flex size-9 cursor-pointer items-center justify-center rounded-[18px] bg-accent"
            >
              <img src={mic} alt="" className="size-[18px]" />
            </button>
          </div>
        </div>
      </div>
      <div className="app-scroll flex-1 overflow-y-auto px-6 pt-6 pb-28">
        <p className="mb-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
          Try asking
        </p>
        <div className="mb-7 flex flex-wrap gap-2.5">
          {PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => navigate('/timeline/ask')}
              className="cursor-pointer rounded-full border border-[rgba(0,43,143,0.16)] bg-white px-4 py-[11px] font-sans text-[13px] text-accent"
            >
              {p}
            </button>
          ))}
        </div>
        <div className="mb-7 flex gap-2 rounded-xl bg-accent-50 px-3 py-[7px]">
          <img src={insights} alt="" className="size-3.5 shrink-0" />
          <p className="font-sans text-[12px] leading-[1.3] text-accent">
            Answers pull from your timeline moments only. Not medical advice.
          </p>
        </div>
        <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
          Recent
        </p>
        {RECENT.map((r, i) => (
          <div key={r}>
            <button
              type="button"
              onClick={() => navigate('/timeline/ask')}
              className="flex w-full cursor-pointer items-center justify-between py-4 text-left"
            >
              <span className="flex items-center gap-3.5">
                <img src={history} alt="" className="size-[18px]" />
                <span className="font-sans text-[14px] text-ink">{r}</span>
              </span>
              <img src={chevronRight} alt="" className="size-[18px]" />
            </button>
            {i < RECENT.length - 1 && <div className="h-px w-full bg-[rgba(0,43,143,0.06)]" />}
          </div>
        ))}
      </div>
      <NavBar tab="timeline" />
    </div>
  )
}
