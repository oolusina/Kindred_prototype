import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSmartBack } from '../../navigation/history'
import { usePrototypeState, type SavedSource } from '../../state/PrototypeState'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import Sheet from '../../components/Sheet'
import arrowBack from '../../assets/figma/arrow-back.svg'
import searchInk from '../../assets/figma/search-ink.svg'
import autoAwesome from '../../assets/figma/auto-awesome.svg'
import mic from '../../assets/figma/home_mic.svg'
import closeInk from '../../assets/figma/close-ink.svg'
import askFavicons from '../../assets/figma/ask-favicons.svg'
import bookmarkBorder from '../../assets/figma/learn-bookmark-border.svg'
import bookmarkFilled from '../../assets/figma/learn-bookmark-filled-blue.svg'
import bookmarkSmall from '../../assets/figma/learn-bookmark-small.svg'
import RollingGhostPrompt from './RollingGhostPrompt'

const FOLLOW_UP_GHOSTS = [
  'Ask a follow-up…',
  'Why does potassium matter here?',
  'What portion size is safe?',
  'How does this fit my labs?',
  'Any alternatives for walking days?',
]

type Message = { role: 'user' | 'ai'; text: string; sources?: string[] }

const MEDICAL_SOURCES: SavedSource[] = [
  {
    id: 'nkf',
    letter: 'N',
    color: '#1c804d',
    name: 'National Kidney Foundation',
    sub: 'kidney.org · Stages of CKD',
  },
  {
    id: 'mayo',
    letter: 'M',
    color: '#1c4fd9',
    name: 'Mayo Clinic',
    sub: 'mayoclinic.org · Chronic kidney disease',
  },
  {
    id: 'kdigo',
    letter: 'K',
    color: '#b83333',
    name: 'KDIGO Guideline',
    sub: 'kdigo.org · CKD classification, 2024',
  },
]

export default function AskChat() {
  const navigate = useNavigate()
  const goBack = useSmartBack('/ask/results')
  const location = useLocation()
  const { toggleSavedSource, isSourceSaved } = usePrototypeState()
  const q =
    (location.state as { q?: string } | null)?.q ?? 'What low-sugar snacks are kidney-safe?'
  const [msgs, setMsgs] = useState<Message[]>([
    { role: 'user', text: q },
    {
      role: 'ai',
      text: 'Pepper strips with hummus or blueberries with Greek yogurt are strong kidney-safe picks. Want portion ideas for a walk?',
      sources: ['nkf', 'mayo', 'cgm'],
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
        sources: ['mayo', 'cgm'],
      },
    ])
    setDraft('')
  }

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex h-14 shrink-0 items-center justify-between px-6">
        <button type="button" aria-label="Back" onClick={goBack} className="cursor-pointer">
          <img src={arrowBack} alt="" className="size-[22px]" />
        </button>
        <p className="font-sans text-[15px] font-medium text-ink-600">Ask</p>
        <button type="button" onClick={() => navigate('/ask')} className="cursor-pointer">
          <img src={searchInk} alt="" className="size-[22px]" />
        </button>
      </div>
      <div className="app-scroll flex-1 space-y-3 overflow-y-auto px-5 pb-4">
        <div className="flex flex-col gap-1.5 rounded-2xl bg-card px-4 pt-3.5 pb-3.5">
          <div className="flex items-center gap-1.5">
            <img src={autoAwesome} alt="" className="size-[13px]" />
            <p className="font-sans text-[10px] font-medium tracking-[1px] text-ink-600">
              AI OVERVIEW · PINNED
            </p>
          </div>
          <p className="font-sans text-[13.5px] font-semibold text-ink">{q}</p>
          <p className="font-sans text-[12px] leading-4 text-ink-600">
            Best picks: pepper strips, cucumber + hummus, small handful of blueberries…
          </p>
          <button
            type="button"
            onClick={() => navigate('/ask/results', { state: { q } })}
            className="w-fit cursor-pointer font-sans text-[12px] font-medium text-accent"
          >
            View full answer
          </button>
        </div>
        {msgs.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[250px] rounded-tl-[22px] rounded-tr-[22px] rounded-bl-[22px] rounded-br-[8px] bg-accent px-4 py-3">
                <p className="font-sans text-[15px] leading-[1.42] text-canvas">{m.text}</p>
              </div>
            </div>
          ) : (
            <div
              key={i}
              className="flex flex-col gap-2.5 rounded-tl-[8px] rounded-tr-[22px] rounded-bl-[22px] rounded-br-[22px] bg-card px-4 py-3"
            >
              <p className="font-sans text-[15px] leading-[1.42] text-ink">{m.text}</p>
              {m.sources && m.sources.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSourcesOpen(true)}
                  className="flex w-fit cursor-pointer items-center gap-1.5 rounded-full bg-accent-50 py-1.5 pl-2 pr-3"
                >
                  <img src={askFavicons} alt="" className="h-3 w-7" />
                  <span className="font-sans text-[12.5px] font-medium text-ink-700">
                    {m.sources.length} source{m.sources.length === 1 ? '' : 's'}
                  </span>
                </button>
              )}
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
        <div className="px-5 pb-8">
          <div className="mb-1 flex items-start gap-2 pt-1">
            <div className="flex-1">
              <p className="font-serif text-[20px] font-medium text-ink">Sources</p>
              <p className="font-sans text-[13px] text-ink-500">
                Reviewed by clinicians · tap the bookmark to save
              </p>
            </div>
            <button type="button" onClick={() => setSourcesOpen(false)}>
              <img src={closeInk} alt="" className="size-[22px]" />
            </button>
          </div>

          <p className="mt-4 mb-1 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
            Medical
          </p>
          {MEDICAL_SOURCES.map((s) => {
            const saved = isSourceSaved(s.id)
            return (
              <div key={s.id}>
                <div className="flex items-center gap-3 py-2">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-100 text-[12px] text-accent">
                    {s.letter}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-sans text-[15px] font-medium text-ink">{s.name}</p>
                    <p className="font-sans text-[13px] text-ink-500">{s.sub}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSavedSource(s)}
                    className="flex shrink-0 cursor-pointer items-center gap-1.5"
                  >
                    {saved && (
                      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
                        Saved
                      </span>
                    )}
                    <img
                      src={saved ? bookmarkFilled : bookmarkBorder}
                      alt=""
                      className="size-[22px]"
                    />
                  </button>
                </div>
                <div className="h-px w-full bg-accent-100" />
              </div>
            )
          })}

          <div className="mt-3 flex items-center gap-2">
            <img src={bookmarkSmall} alt="" className="size-3.5" />
            <p className="font-sans text-[13px] text-ink-500">
              Saved sources appear in Learning ▸ Saved
            </p>
          </div>
        </div>
      </Sheet>
    </div>
  )
}
