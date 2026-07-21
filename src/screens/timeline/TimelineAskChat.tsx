import { useState } from 'react'
import { useSmartBack } from '../../navigation/history'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBack from '../../assets/figma/arrow-back.svg'
import autoAwesome from '../../assets/figma/auto-awesome.svg'
import mic from '../../assets/figma/home_mic.svg'

const INITIAL = [
  { role: 'user' as const, text: 'Why is my eGFR holding at 48?' },
  {
    role: 'ai' as const,
    text: 'Your July eGFR of 48 matches April. With Lisinopril and stable blood pressure, Stage 3a often plateaus for months.',
  },
]

export default function TimelineAskChat() {
  const goBack = useSmartBack('/timeline')
  const [msgs, setMsgs] = useState(INITIAL)
  const [draft, setDraft] = useState('')

  const send = () => {
    const t = draft.trim()
    if (!t) return
    setMsgs((m) => [
      ...m,
      { role: 'user', text: t },
      {
        role: 'ai',
        text: 'Based on your timeline, the next useful check is your August eGFR. Want me to add a reminder for your next appointment?',
      },
    ])
    setDraft('')
  }

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex h-14 shrink-0 items-center gap-3 px-5">
        <button type="button" aria-label="Back" onClick={goBack} className="cursor-pointer">
          <img src={arrowBack} alt="" className="size-[22px]" />
        </button>
        <p className="font-sans text-[15px] font-medium text-ink">Refine in chat</p>
      </div>
      <div className="app-scroll flex-1 space-y-3 overflow-y-auto px-5 pb-4">
        {msgs.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="ml-8 rounded-2xl bg-accent-50 px-4 py-3.5">
              <p className="mb-1 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
                You
              </p>
              <p className="font-sans text-[15px] leading-[1.42] text-ink">{m.text}</p>
            </div>
          ) : (
            <div key={i} className="mr-4 rounded-2xl border border-accent-100 bg-card px-4 py-3.5">
              <div className="mb-1.5 flex items-center gap-1.5">
                <img src={autoAwesome} alt="" className="size-[15px]" />
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
                  Assistant
                </p>
              </div>
              <p className="font-sans text-[15px] leading-[1.42] text-ink">{m.text}</p>
            </div>
          ),
        )}
      </div>
      <div className="shrink-0 px-5 pb-2">
        <div className="flex h-12 items-center gap-2 rounded-full border border-accent-200 bg-white py-2 pr-2 pl-5">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask a follow-up…"
            className="flex-1 bg-transparent font-sans text-[14px] text-ink outline-none placeholder:text-ink-600"
          />
          <button
            type="button"
            onClick={send}
            className="flex size-9 cursor-pointer items-center justify-center rounded-[20px] bg-accent"
          >
            <img src={mic} alt="" className="size-5" />
          </button>
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
