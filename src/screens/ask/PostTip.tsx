import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBack from '../../assets/figma/arrow-back.svg'

export default function PostTip() {
  const navigate = useNavigate()
  const [text, setText] = useState(
    'Pepper strips + hummus before a walk keeps my CGM flatter than fruit alone — and stays kidney-friendly at Stage 3.',
  )

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex shrink-0 items-center justify-between px-5 pt-2.5">
        <button type="button" aria-label="Back" onClick={() => navigate('/ask/results')} className="cursor-pointer">
          <img src={arrowBack} alt="" className="size-[26px]" />
        </button>
        <p className="font-sans text-[15px] font-medium text-ink">Share a tip</p>
        <span className="w-[26px]" />
      </div>
      <div className="app-scroll flex-1 overflow-y-auto px-5 pt-4 pb-6">
        <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
          From your Ask answer
        </p>
        <h1 className="mb-4 font-serif text-[26px] font-medium leading-[1.18] text-ink">
          Post a tip
        </h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="mb-4 w-full resize-none rounded-2xl border border-accent-100 bg-card p-4 font-sans text-[15px] leading-[1.42] text-ink outline-none"
        />
        <div className="rounded-2xl bg-accent-50 p-4">
          <p className="font-sans text-[13px] leading-[1.36] text-accent">
            Tips help others in your community. Avoid sharing identifying medical details.
          </p>
        </div>
      </div>
      <div className="flex shrink-0 gap-3 px-5 pb-2">
        <button
          type="button"
          onClick={() => navigate('/ask/results')}
          className="flex-1 cursor-pointer rounded-[14px] border border-accent-200 bg-white py-3.5 font-sans text-[15px] font-semibold text-accent"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => navigate('/community')}
          className="flex-1 cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
        >
          Share tip
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
