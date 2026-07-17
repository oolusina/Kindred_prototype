import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBack from '../../assets/figma/arrow-back.svg'
import autoAwesome from '../../assets/figma/home_auto_awesome.svg'
import mic from '../../assets/figma/home_mic.svg'
import history from '../../assets/figma/history-gray.svg'
import chevronRight from '../../assets/figma/chevron-right-gray.svg'
import insights from '../../assets/figma/insights-blue.svg'
import { markTourSeen, tourSeen, TOUR_ASK } from '../timeline/tour'
import RollingGhostPrompt from './RollingGhostPrompt'
import {
  ASK_TOUR_DEMO_Q,
  AskTourCoach,
  AskTourScrim,
  AskTourWelcome,
  SpotlightRing,
  TourCaret,
  coachStyleBelow,
  useSpotlightBox,
  type AskTourStep,
} from './AskTour'

const PROMPTS = [
  'Kidney-friendly breakfast?',
  'Snacks before a walk?',
  'What foods should I limit at Stage 3?',
]

const GHOST_PROMPTS = [
  'Ask about your health',
  'Kidney-friendly breakfast ideas?',
  'Is my potassium too high?',
  'Snacks before a walk?',
  'Metformin with Stage 3 CKD?',
]

const RECENT = [
  'My CGM spikes after breakfast',
  'Metformin side effects',
  'Can I take ibuprofen with CKD?',
]

/** Figma 3120:8263 — Ask entry hosts welcome + steps 1–2. */
export default function AskEntry() {
  const navigate = useNavigate()
  const location = useLocation()
  const resumeStep = (location.state as { tourStep?: AskTourStep } | null)?.tourStep
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const promptsRef = useRef<HTMLDivElement>(null)
  const [q, setQ] = useState('')
  const [tourStep, setTourStep] = useState<AskTourStep | -1>(() => {
    if (tourSeen(TOUR_ASK)) return -1
    if (resumeStep === 1 || resumeStep === 2) return resumeStep
    return 0
  })

  const searchBox = useSpotlightBox(rootRef, searchRef, tourStep === 1)
  const promptsBox = useSpotlightBox(rootRef, promptsRef, tourStep === 2)

  const touring = tourStep >= 0

  const go = (query?: string) => {
    if (touring) return
    navigate('/ask/thinking', { state: { q: query ?? (q || PROMPTS[0]) } })
  }

  const dismissTour = () => {
    markTourSeen(TOUR_ASK)
    setTourStep(-1)
  }

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col bg-canvas">
      <div className="shrink-0 rounded-b-header bg-accent">
        <SystemBar variant="light" />
        <div className="flex flex-col gap-1 px-5 pb-6 pt-1">
          <button
            type="button"
            aria-label="Back"
            onClick={() => navigate('/home')}
            className="mb-1 cursor-pointer self-start"
          >
            <img src={arrowBack} alt="" className="size-6 brightness-0 invert" />
          </button>
          <p className="font-serif text-[32px] font-medium leading-[1.16] text-white">Ask</p>
          <div
            ref={searchRef}
            className={`relative mt-2.5 flex items-center gap-2 rounded-full border border-accent-200 bg-white py-1.5 pr-1.5 pl-4 ${
              tourStep === 1 ? 'z-[60]' : ''
            }`}
          >
            <img src={autoAwesome} alt="" className="size-[18px]" />
            <div className="relative min-w-0 flex-1">
              {!q && (
                <div className="pointer-events-none absolute inset-0 flex items-center">
                  <RollingGhostPrompt
                    prompts={GHOST_PROMPTS}
                    className="font-sans text-[15px] text-ink-500"
                  />
                </div>
              )}
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && go()}
                placeholder=""
                aria-label="Ask about your health"
                className="w-full bg-transparent font-sans text-[15px] text-ink outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => !touring && navigate('/ask/voice')}
              className="flex size-9 cursor-pointer items-center justify-center rounded-[18px] bg-accent"
            >
              <img src={mic} alt="" className="size-[18px]" />
            </button>
          </div>
        </div>
      </div>
      <div className="app-scroll flex-1 overflow-y-auto px-6 pt-6 pb-6">
        <div
          ref={promptsRef}
          className={`relative mb-7 rounded-[20px] ${tourStep === 2 ? 'z-[60] bg-canvas p-1' : ''}`}
        >
          <p className="mb-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
            Try asking
          </p>
          <div className="flex flex-wrap gap-2.5">
            {PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => go(p)}
                className="cursor-pointer rounded-full border border-[rgba(0,43,143,0.16)] bg-white px-4 py-[11px] font-sans text-[13px] text-accent"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-7 flex gap-2 rounded-xl bg-accent-50 px-3 py-[7px]">
          <img src={insights} alt="" className="size-3.5 shrink-0" />
          <p className="font-sans text-[12px] leading-[1.3] text-accent">
            Aggregated from medical sources, community data, and your data. Not medical advice.
          </p>
        </div>
        <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
          Recent
        </p>
        {RECENT.map((r, i) => (
          <div key={r}>
            <button
              type="button"
              onClick={() => go(r)}
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
      <HomeIndicator />

      {tourStep >= 0 && (
        <div className="pointer-events-none absolute inset-0 z-50">
          <div className="pointer-events-auto absolute inset-0">
            <AskTourScrim onDismiss={dismissTour} />
          </div>
          {tourStep === 0 && (
            <div className="pointer-events-auto">
              <AskTourWelcome onStart={() => setTourStep(1)} onSkip={dismissTour} />
            </div>
          )}
          {tourStep === 1 && searchBox && (
            <>
              <SpotlightRing box={searchBox} className="rounded-full" />
              <div className="pointer-events-auto">
                <AskTourCoach
                  step={1}
                  style={coachStyleBelow(searchBox)}
                  onPrimary={() => setTourStep(2)}
                  onSecondary={dismissTour}
                  caret={<TourCaret />}
                />
              </div>
            </>
          )}
          {tourStep === 2 && promptsBox && (
            <div className="pointer-events-auto">
              <AskTourCoach
                step={2}
                style={coachStyleBelow(promptsBox)}
                onPrimary={() =>
                  navigate('/ask/results', {
                    state: { q: ASK_TOUR_DEMO_Q, tourStep: 3 },
                    replace: true,
                  })
                }
                onSecondary={() => setTourStep(1)}
                caret={<TourCaret />}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
