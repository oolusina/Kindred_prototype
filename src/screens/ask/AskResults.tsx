import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import Sheet from '../../components/Sheet'
import SegmentedTabs from '../../components/SegmentedTabs'
import arrowBack from '../../assets/figma/arrow-back.svg'
import searchInk from '../../assets/figma/search-ink.svg'
import autoAwesome from '../../assets/figma/auto-awesome.svg'
import askFavicons from '../../assets/figma/ask-favicons.svg'
import addBlue from '../../assets/figma/add-blue.svg'
import groups from '../../assets/figma/navbar_groups_inactive.svg'
import menuBook from '../../assets/figma/learn-menu-book-blue.svg'
import mic from '../../assets/figma/home_mic.svg'
import closeInk from '../../assets/figma/close-ink.svg'
import insights from '../../assets/figma/insights-blue.svg'
import RollingGhostPrompt from './RollingGhostPrompt'
import { markTourSeen, tourSeen, TOUR_ASK } from '../timeline/tour'
import {
  AskTourCoach,
  AskTourScrim,
  SpotlightRing,
  TourCaret,
  coachStyleBelow,
  useSpotlightBox,
  type AskTourStep,
} from './AskTour'

type Lens = 'All' | 'Medical' | 'Community' | 'My Data'

const FOLLOW_UP_GHOSTS = [
  'Ask a follow-up…',
  'Why does potassium matter here?',
  'What portion size is safe?',
  'How does this fit my labs?',
  'Any alternatives for walking days?',
]

const CONTENT: Record<
  Lens,
  { headline: string; body: string; personal?: string[] }
> = {
  All: {
    headline:
      'Best picks: pepper strips, cucumber with hummus, or a small handful of blueberries.',
    body: 'Limit bananas, oranges, chips and salted nuts, which raise potassium or sodium quickly. Pairing fruit with a protein like Greek yogurt keeps your glucose steady.',
    personal: [
      'Your April labs put potassium at 4.9, on the higher side, so keep banana and orange portions small.',
      'Your CGM spiked after fruit-only snacks 3 times last week. Pairing with protein helps.',
    ],
  },
  Medical: {
    headline: 'Kidney-safe snacks emphasize low potassium, low sodium, and controlled carbs.',
    body: 'Clinical guidance for Stage 3 CKD favors fresh vegetables like peppers and cucumbers, berries in modest portions, and unsalted popcorn. Avoid high-potassium fruit juices.',
  },
  Community: {
    headline: 'People with Stage 3 often share hummus + veggies as their go-to afternoon snack.',
    body: 'In your communities, members recommend pre-portioning blueberries and pairing with Greek yogurt before walks to blunt CGM spikes.',
  },
  'My Data': {
    headline: 'Your logs show fruit-only snacks precede afternoon glucose rises.',
    body: 'Over the last 14 days, snacks with protein kept your CGM flatter. Potassium at 4.9 suggests going easy on bananas.',
    personal: [
      'Logged snacks last week: apple only (3×), yogurt + berries (2×), chips (1×).',
    ],
  },
}

const SOURCES = [
  { name: 'NKF · Nutrition for CKD', sub: 'Medical' },
  { name: 'ADA · Snack guidance', sub: 'Medical' },
  { name: 'Kindred CKD community', sub: 'Community tip' },
  { name: 'Your April labs · K+ 4.9', sub: 'My Data' },
  { name: 'CGM week of Jul 7', sub: 'My Data' },
]

/** Figma 3120:8263 — Results hosts tour steps 3–5. */
export default function AskResults() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { q?: string; tourStep?: AskTourStep } | null
  const q = state?.q ?? 'What low-sugar snacks are kidney-safe?'
  const rootRef = useRef<HTMLDivElement>(null)
  const lensesRef = useRef<HTMLDivElement>(null)
  const sourcesRef = useRef<HTMLDivElement>(null)
  const personalRef = useRef<HTMLDivElement>(null)
  const [lens, setLens] = useState<Lens>('All')
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const [tourStep, setTourStep] = useState<AskTourStep | -1>(() => {
    if (tourSeen(TOUR_ASK)) return -1
    const step = state?.tourStep
    if (step === 3 || step === 4 || step === 5) return step
    return -1
  })
  const c = CONTENT[lens]
  const touring = tourStep >= 3

  const lensesBox = useSpotlightBox(rootRef, lensesRef, tourStep === 3)
  const sourcesBox = useSpotlightBox(rootRef, sourcesRef, tourStep === 4)
  const personalBox = useSpotlightBox(rootRef, personalRef, tourStep === 5)

  useEffect(() => {
    if (tourStep === 5) personalRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [tourStep])

  const dismissTour = () => {
    markTourSeen(TOUR_ASK)
    setTourStep(-1)
  }

  const goBackFromTour = () => {
    if (tourStep === 3) {
      navigate('/ask', { state: { tourStep: 2 }, replace: true })
      return
    }
    if (tourStep === 4 || tourStep === 5) setTourStep((tourStep - 1) as AskTourStep)
  }

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex h-14 shrink-0 items-center justify-between px-6">
        <button
          type="button"
          aria-label="Back"
          onClick={() => (touring ? dismissTour() : navigate('/ask'))}
          className="cursor-pointer"
        >
          <img src={arrowBack} alt="" className="size-[22px]" />
        </button>
        <p className="font-sans text-[15px] font-medium text-ink-600">Ask</p>
        <button
          type="button"
          onClick={() => (touring ? dismissTour() : navigate('/ask'))}
          className="cursor-pointer"
        >
          <img src={searchInk} alt="" className="size-[22px]" />
        </button>
      </div>
      <div className="shrink-0 px-6 pt-1.5">
        <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
          You asked
        </p>
        <p className="font-serif text-[22px] leading-[29px] text-ink">{q}</p>
      </div>
      <div className="app-scroll flex-1 overflow-y-auto px-6 pt-3 pb-4">
        <div
          ref={lensesRef}
          className={`relative mb-3 ${tourStep === 3 ? 'z-[60] rounded-[14px] bg-canvas p-0.5' : ''}`}
        >
          <SegmentedTabs
            size="sm"
            value={lens}
            onChange={(v) => {
              if (!touring) setLens(v)
            }}
            options={(
              [
                { value: 'All', label: 'All' },
                { value: 'Medical', label: 'Medical' },
                { value: 'Community', label: 'Community' },
                { value: 'My Data', label: 'My Data' },
              ] as const
            ).map((o) => ({ ...o }))}
          />
        </div>
        <div key={lens} className="animate-[tabSlide_280ms_ease-out]">
          <div
            ref={sourcesRef}
            className={`mb-3 flex items-center gap-1.5 ${tourStep === 4 ? 'relative z-[60] rounded-xl bg-canvas py-1' : ''}`}
          >
            <img src={autoAwesome} alt="" className="size-[15px]" />
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
              AI overview
            </p>
            <div className="flex-1" />
            <button
              type="button"
              onClick={() => !touring && setSourcesOpen(true)}
              className="flex cursor-pointer items-center gap-2 rounded-[15px] border border-[rgba(0,43,143,0.12)] bg-white py-[5px] pr-3 pl-2"
            >
              <img src={askFavicons} alt="" className="h-4 w-9" />
              <span className="font-sans text-[13px] font-medium text-ink-700">5 sources</span>
            </button>
          </div>
          <p className="mb-3 font-serif text-[17px] font-semibold leading-[1.28] text-accent">
            {c.headline}
          </p>
          <p className="mb-3 font-sans text-[13px] leading-[1.36] text-ink-700">{c.body}</p>
          {c.personal && (
            <div
              ref={personalRef}
              className={`mb-3 flex overflow-hidden rounded-[18px] border border-[#f0c519] bg-[#fefaed] ${
                tourStep === 5 ? 'relative z-[60]' : ''
              }`}
            >
              <div className="w-1 shrink-0 bg-[#f0c519]" />
              <div className="flex flex-col gap-1.5 px-4 py-2.5">
                <p className="font-sans text-[15px] font-medium text-[#564709]">
                  How this applies to me
                </p>
                {c.personal.map((p) => (
                  <p key={p} className="font-sans text-[13px] leading-[1.36] text-[#7d660d]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}
          <div className="mb-3 h-px w-full bg-[rgba(0,43,143,0.1)]" />
          <div className="mb-3 flex flex-col gap-0.5">
            <button
              type="button"
              onClick={() => !touring && navigate('/prep')}
              className="flex cursor-pointer items-center gap-1 py-1.5"
            >
              <img src={addBlue} alt="" className="size-4" />
              <span className="font-sans text-[13px] font-medium text-accent">
                Add to Appointment Prep
              </span>
            </button>
            <button
              type="button"
              onClick={() => !touring && navigate('/ask/post-question')}
              className="flex cursor-pointer items-center gap-1 py-1.5"
            >
              <img
                src={groups}
                alt=""
                className="size-4"
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(14%) sepia(80%) saturate(2000%) hue-rotate(210deg)',
                }}
              />
              <span className="font-sans text-[13px] font-medium text-accent">Post to Community</span>
            </button>
            <button
              type="button"
              onClick={() => !touring && navigate('/ask/guide')}
              className="flex cursor-pointer items-center gap-1.5 py-1.5"
            >
              <img src={menuBook} alt="" className="size-4" />
              <span className="font-sans text-[13px] font-medium text-accent">Watch visual guide</span>
            </button>
          </div>
          <div className="flex gap-2 rounded-xl bg-accent-50 px-3 py-[9px]">
            <img src={insights} alt="" className="size-3.5 shrink-0" />
            <p className="font-sans text-[11px] leading-[15px] text-accent">
              Aggregated from medical sources, community data, and your data. Not medical advice.
            </p>
          </div>
        </div>
      </div>
      <div className="shrink-0 px-6 pb-4 pt-2">
        <button
          type="button"
          onClick={() => !touring && navigate('/ask/chat', { state: { q } })}
          className="flex h-12 w-full cursor-pointer items-center justify-between rounded-full border border-accent-200 bg-white py-2.5 pr-2.5 pl-5 shadow-[0px_6px_16px_0px_rgba(0,43,143,0.1)]"
        >
          <RollingGhostPrompt
            prompts={FOLLOW_UP_GHOSTS}
            className="min-w-0 flex-1 text-left font-sans text-[14px] text-ink-600"
          />
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[20px] bg-accent">
            <img src={mic} alt="" className="size-5" />
          </span>
        </button>
      </div>
      <HomeIndicator />
      <Sheet open={sourcesOpen} onClose={() => setSourcesOpen(false)}>
        <div className="px-5 pb-10">
          <div className="mb-2 flex items-center pt-1">
            <p className="flex-1 font-serif text-[17px] font-semibold text-ink">Sources</p>
            <button type="button" aria-label="Close" onClick={() => setSourcesOpen(false)}>
              <img src={closeInk} alt="" className="size-[22px]" />
            </button>
          </div>
          {SOURCES.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-3 border-b border-accent-100 py-3.5 last:border-0"
            >
              <img src={askFavicons} alt="" className="h-4 w-9 shrink-0" />
              <div>
                <p className="font-sans text-[15px] font-medium text-ink">{s.name}</p>
                <p className="font-sans text-[13px] text-ink-500">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Sheet>

      {tourStep >= 3 && (
        <div className="pointer-events-none absolute inset-0 z-50">
          <div className="pointer-events-auto absolute inset-0">
            <AskTourScrim onDismiss={dismissTour} />
          </div>
          {tourStep === 3 && lensesBox && (
            <>
              <SpotlightRing box={lensesBox} className="rounded-full" />
              <div className="pointer-events-auto">
                <AskTourCoach
                  step={3}
                  style={coachStyleBelow(lensesBox)}
                  onPrimary={() => setTourStep(4)}
                  onSecondary={goBackFromTour}
                  caret={<TourCaret />}
                />
              </div>
            </>
          )}
          {tourStep === 4 && sourcesBox && (
            <>
              <SpotlightRing box={sourcesBox} className="rounded-[20px]" />
              <div className="pointer-events-auto">
                <AskTourCoach
                  step={4}
                  style={coachStyleBelow(sourcesBox)}
                  onPrimary={() => setTourStep(5)}
                  onSecondary={goBackFromTour}
                  caret={<TourCaret className="right-5 left-auto" />}
                />
              </div>
            </>
          )}
          {tourStep === 5 && personalBox && (
            <div className="pointer-events-auto">
              <AskTourCoach
                step={5}
                style={coachStyleBelow(personalBox)}
                onPrimary={dismissTour}
                onSecondary={goBackFromTour}
                caret={<TourCaret />}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
