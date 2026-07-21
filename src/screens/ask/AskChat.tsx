import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSmartBack } from '../../navigation/history'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import Sheet from '../../components/Sheet'
import arrowBack from '../../assets/figma/arrow-back.svg'
import autoAwesome from '../../assets/figma/auto-awesome.svg'
import mic from '../../assets/figma/home_mic.svg'
import closeInk from '../../assets/figma/close-ink.svg'
import askFavicons from '../../assets/figma/ask-favicons.svg'
import RollingGhostPrompt from './RollingGhostPrompt'

const FOLLOW_UP_GHOSTS = [
  'Ask a follow-up…',
  'Why does potassium matter here?',
  'What portion size is safe?',
  'How does this fit my labs?',
  'Any alternatives for walking days?',
]

export default function AskChat() {
  const navigate = useNavigate()
  const goBack = useSmartBack('/ask/results')
  const location = useLocation()
  const q =
    (location.state as { q?: string } | null)?.q ?? 'What low-sugar snacks are kidney-safe?'
  const [msgs, setMsgs] = useState([
    { role: 'user' as const, text: q },
    {
      role: 'ai' as const,
      text: 'Pepper strips with hummus or blueberries with Greek yogurt are strong kidney-safe picks. Want portion ideas for a walk?',
    },
  ])
  const [draft, setDraft] = useState('')
  const [sourcesOpen, setSourcesOpen] = useState(false)

  const send = () => {
    const t = draft.trim()
    if (!t) return
    setMsgs((m) => [
      ...m,
      { role: 'user', text: t },
      {
        role: 'ai',
        text: 'Try half a cup of blueberries with 2 tbsp yogurt about 20 minutes before you walk. That pattern flattened your CGM last week.',
      },
    ])
    setDraft('')
  }

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex h-14 shrink-0 items-center justify-between px-5">
        <button type="button" aria-label="Back" onClick={goBack} className="cursor-pointer">
          <img src={arrowBack} alt="" className="size-[22px]" />
        </button>
        <p className="font-sans text-[15px] font-medium text-ink">Follow-up</p>
        <button
          type="button"
          onClick={() => setSourcesOpen(true)}
          className="cursor-pointer font-sans text-[13px] font-medium text-accent"
        >
          Sources
        </button>
      </div>
      <div className="app-scroll flex-1 space-y-3 overflow-y-auto px-5 pb-4">
        {msgs.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="ml-10 rounded-2xl bg-accent-50 px-4 py-3">
              <p className="font-sans text-[15px] leading-[1.42] text-ink">{m.text}</p>
            </div>
          ) : (
            <div key={i} className="mr-6 rounded-2xl border border-accent-100 bg-card px-4 py-3">
              <div className="mb-1 flex items-center gap-1.5">
                <img src={autoAwesome} alt="" className="size-[15px]" />
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
                  Assistant
                </p>
              </div>
              <p className="font-sans text-[15px] leading-[1.42] text-ink">{m.text}</p>
            </div>
          ),
        )}
        <div className="flex flex-wrap gap-2 pt-1">
          {['Portion for a walk?', 'Post as a tip', 'Add to prep'].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => {
                if (chip === 'Post as a tip') navigate('/ask/post-tip')
                else if (chip === 'Add to prep') navigate('/prep')
                else {
                  setDraft(chip)
                }
              }}
              className="cursor-pointer rounded-full border border-accent-200 bg-white px-3 py-1.5 font-sans text-[12px] text-accent"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
      <div className="shrink-0 px-5 pb-2">
        <div className="flex h-12 items-center gap-2 rounded-full border border-accent-200 bg-white py-2 pr-2 pl-5">
          <div className="relative min-w-0 flex-1">
            {!draft && (
              <div className="pointer-events-none absolute inset-0 flex items-center">
                <RollingGhostPrompt
                  prompts={FOLLOW_UP_GHOSTS}
                  className="font-sans text-[14px] text-ink-600"
                />
              </div>
            )}
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder=""
              aria-label="Ask a follow-up"
              className="w-full bg-transparent font-sans text-[14px] text-ink outline-none"
            />
          </div>
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
      <Sheet open={sourcesOpen} onClose={() => setSourcesOpen(false)}>
        <div className="px-5 pb-10">
          <div className="mb-2 flex items-center pt-1">
            <p className="flex-1 font-serif text-[17px] font-semibold text-ink">Sources</p>
            <button type="button" onClick={() => setSourcesOpen(false)}>
              <img src={closeInk} alt="" className="size-[22px]" />
            </button>
          </div>
          {['NKF nutrition', 'ADA snacks', 'Your CGM logs'].map((s) => (
            <div key={s} className="flex items-center gap-3 py-3">
              <img src={askFavicons} alt="" className="h-4 w-9" />
              <p className="font-sans text-[15px] font-medium text-ink">{s}</p>
            </div>
          ))}
        </div>
      </Sheet>
    </div>
  )
}
