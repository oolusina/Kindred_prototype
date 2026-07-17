import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBack from '../../assets/figma/arrow-back.svg'

export default function PostQuestion() {
  const navigate = useNavigate()
  const [text, setText] = useState(
    'What low-sugar snacks have worked for you with Stage 3 CKD and CGM spikes?',
  )
  const [anon, setAnon] = useState(false)

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex shrink-0 items-center justify-between px-5 pt-2.5">
        <button type="button" aria-label="Back" onClick={() => navigate('/ask/results')} className="cursor-pointer">
          <img src={arrowBack} alt="" className="size-[26px]" />
        </button>
        <p className="font-sans text-[15px] font-medium text-ink">Post question</p>
        <span className="w-[26px]" />
      </div>
      <div className="app-scroll flex-1 overflow-y-auto px-5 pt-4 pb-6">
        <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Community
        </p>
        <p className="mb-4 font-serif text-[22px] font-medium leading-[1.24] text-ink">
          Chronic Kidney Disease
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="mb-4 w-full resize-none rounded-2xl border border-accent-100 bg-card p-4 font-sans text-[15px] leading-[1.42] text-ink outline-none focus:border-accent-200"
        />
        <label className="mb-6 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={anon}
            onChange={(e) => setAnon(e.target.checked)}
            className="size-5 accent-[#002b8f]"
          />
          <span className="font-sans text-[15px] text-ink">Post anonymously</span>
        </label>
        <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
          Your question will appear in the CKD community feed. You can delete it anytime.
        </p>
      </div>
      <div className="shrink-0 px-5 pb-2">
        <button
          type="button"
          onClick={() => navigate('/community/posted')}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
        >
          Post to community
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
