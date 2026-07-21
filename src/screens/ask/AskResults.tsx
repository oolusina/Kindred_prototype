import { useLayoutEffect, useRef, useState, type RefObject } from 'react'
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
import groupsBlue from '../../assets/figma/groups-blue-sm.svg'
import menuBook from '../../assets/figma/learn-menu-book-blue.svg'
import mic from '../../assets/figma/home_mic.svg'
import closeInk from '../../assets/figma/close-ink.svg'
import chevronRight from '../../assets/figma/learn-chevron-right.svg'
import thumbUp from '../../assets/figma/thumb-up.svg'
import expandMore from '../../assets/figma/expand-more.svg'
import RollingGhostPrompt from './RollingGhostPrompt'
import { markTourSeen, tourSeen, TOUR_ASK } from '../timeline/tour'
import {
  SpotlightRing,
  TourCaret,
  coachStyleAbove,
  coachStyleBelow,
  useSpotlightBox,
} from '../../components/featureTour'
import {
  AskTourCoach,
  AskTourScrim,
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

const MEDICAL_SOURCES = [
  {
    letter: 'N',
    color: '#002b8f',
    name: 'National Kidney Foundation',
    sub: 'kidney.org',
    quote:
      '“Choose fruits lower in potassium, such as berries and apples, and limit bananas, oranges and potatoes at Stage 3.”',
  },
  {
    letter: 'D',
    color: '#39c684',
    name: 'Diabetes UK',
    sub: 'diabetes.org.uk',
    quote:
      '“Snacks that pair fibre with protein, like veg sticks and hummus, slow the rise in blood glucose.”',
  },
  {
    letter: 'K',
    color: '#f0c519',
    name: 'KDOQI Clinical Guideline',
    sub: 'Nutrition in CKD, 2020',
    quote:
      '“Adjust dietary potassium based on serum levels rather than a fixed restriction.”',
  },
]

const COMMUNITY_POSTS = [
  {
    letter: 'Q',
    color: '#002b8f',
    name: 'QuietHeron',
    match: '92% match',
    when: '2w ago',
    text: "Roasted chickpeas were a game changer for me, crunchy like chips, but they don't touch my potassium. I do a half-cup with paprika.",
    verify: "Verified by 254 members' vault data",
    verified: true,
    helpful: '24 found helpful',
  },
  {
    letter: 'S',
    color: '#30a66f',
    name: 'SwiftWren',
    match: '78% match',
    when: '1mo ago',
    text: 'I keep frozen blueberries in the freezer, a small bowl feels like dessert and my glucose stays flat. My dietitian approved it.',
    verify: 'Not enough community vault data to verify',
    verified: false,
    helpful: '8 found helpful',
  },
]

const MY_DATA = [
  {
    label: 'Potassium',
    value: '4.9 mEq/L',
    detail: 'Apr 2026 labs · slightly high, target is under 5.0',
    tone: 'warn' as const,
  },
  {
    label: 'Glucose after snacks',
    value: 'avg 132 mg/dL',
    detail: 'Steadier on days you paired fruit with protein',
    tone: 'ok' as const,
  },
  {
    label: 'Best logged snack',
    value: 'Apple + peanut butter',
    detail: 'No spike on 3 of 3 afternoons last week',
    tone: 'ok' as const,
  },
]

const ALL_CONTENT = {
  headline:
    'Best picks: pepper strips, cucumber with hummus, or a small handful of blueberries.',
  body: 'Limit bananas, oranges, chips and salted nuts, which raise potassium or sodium quickly. Pairing fruit with a protein like Greek yogurt keeps your glucose steady.',
  personal: [
    'Your April labs put potassium at 4.9, on the higher side, so keep banana and orange portions small.',
    'Your CGM spiked after fruit-only snacks 3 times last week. Pairing with protein helps.',
  ],
}

const SHEET_SOURCES = [
  { name: 'NKF · Nutrition for CKD', sub: 'Medical' },
  { name: 'ADA · Snack guidance', sub: 'Medical' },
  { name: 'Kindred CKD community', sub: 'Community tip' },
  { name: 'Your April labs · K+ 4.9', sub: 'My Data' },
  { name: 'CGM week of Jul 7', sub: 'My Data' },
]

/** Figma 3142:8272 — Results tab panels + tour steps 3–5. */
export default function AskResults() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { q?: string; tourStep?: AskTourStep } | null
  const q = state?.q ?? 'What low-sugar snacks are kidney-safe?'
  const rootRef = useRef<HTMLDivElement>(null)
  const lensesRef = useRef<HTMLDivElement>(null)
  const sourcesRef = useRef<HTMLDivElement>(null)
  const personalRef = useRef<HTMLDivElement>(null)
  const [lens, setLens] = useState<Lens>(() => {
    if (state?.tourStep === 4) return 'Medical'
    if (state?.tourStep === 5) return 'My Data'
    return 'All'
  })
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [sortBy, setSortBy] = useState('Most similar to you')
  const [tourStep, setTourStep] = useState<AskTourStep | -1>(() => {
    if (tourSeen(TOUR_ASK)) return -1
    const step = state?.tourStep
    if (step === 3 || step === 4 || step === 5) return step
    return -1
  })
  const touring = tourStep >= 3

  const lensesBox = useSpotlightBox(rootRef, lensesRef, tourStep === 3)
  const sourcesBox = useSpotlightBox(
    rootRef,
    sourcesRef,
    tourStep === 4,
    4,
    `sources-${lens}-${tourStep}`,
  )
  const personalBox = useSpotlightBox(
    rootRef,
    personalRef,
    tourStep === 5,
    4,
    `data-${lens}-${tourStep}`,
  )

  useLayoutEffect(() => {
    if (tourStep === 4) {
      sourcesRef.current?.scrollIntoView({ block: 'center', behavior: 'instant' })
    }
    if (tourStep === 5) {
      personalRef.current?.scrollIntoView({ block: 'center', behavior: 'instant' })
    }
  }, [tourStep, lens])

  const dismissTour = () => {
    markTourSeen(TOUR_ASK)
    setTourStep(-1)
  }

  const goBackFromTour = () => {
    if (tourStep === 3) {
      navigate('/ask', { state: { tourStep: 2 }, replace: true })
      return
    }
    if (tourStep === 4) {
      setLens('All')
      setTourStep(3)
      return
    }
    if (tourStep === 5) {
      setLens('Medical')
      setTourStep(4)
    }
  }

  const goTourNext = () => {
    if (tourStep === 3) {
      setLens('Medical')
      setTourStep(4)
      return
    }
    if (tourStep === 4) {
      setLens('My Data')
      setTourStep(5)
    }
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
          className={`relative mb-4 ${tourStep === 3 ? 'z-[60] rounded-[14px] bg-canvas p-0.5' : ''}`}
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
          {lens === 'All' && <AllPanel />}
          {lens === 'Medical' && (
            <MedicalPanel
              sourcesRef={sourcesRef}
              elevate={tourStep === 4}
              touring={touring}
              onOpenSources={() => setSourcesOpen(true)}
            />
          )}
          {lens === 'Community' && (
            <CommunityPanel
              touring={touring}
              sortBy={sortBy}
              onSort={() => setSortOpen(true)}
              onViewDiscussion={() => navigate('/community/answers')}
            />
          )}
          {lens === 'My Data' && (
            <MyDataPanel dataRef={personalRef} elevate={tourStep === 5} />
          )}

          {(lens === 'All' || lens === 'Medical' || lens === 'Community') && (
            <DoMore
              touring={touring}
              onPrep={() => navigate('/prep')}
              onPost={() => navigate('/ask/post-question')}
              onGuide={() => navigate('/ask/guide')}
            />
          )}

          <div className="mt-3 flex gap-2 rounded-xl bg-accent-50 px-3 py-[9px]">
            <img src={autoAwesome} alt="" className="size-3.5 shrink-0" />
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
          {SHEET_SOURCES.map((s) => (
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

      <Sheet open={sortOpen} onClose={() => setSortOpen(false)}>
        <div className="px-5 pb-10">
          <p className="mb-3 font-serif text-[17px] font-semibold text-ink">Sort by</p>
          {['Most similar to you', 'Most helpful', 'Most recent'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setSortBy(opt)
                setSortOpen(false)
              }}
              className={`mb-2 w-full cursor-pointer rounded-[14px] px-4 py-3.5 text-left font-sans text-[15px] ${
                sortBy === opt ? 'bg-accent text-white' : 'bg-accent-50 text-ink'
              }`}
            >
              {opt}
            </button>
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
                  onPrimary={goTourNext}
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
                  style={coachStyleAbove(sourcesBox)}
                  onPrimary={goTourNext}
                  onSecondary={goBackFromTour}
                  caret={<TourCaret direction="down" />}
                />
              </div>
            </>
          )}
          {tourStep === 5 && personalBox && (
            <>
              <SpotlightRing box={personalBox} className="rounded-[20px]" />
              <div className="pointer-events-auto">
                <AskTourCoach
                  step={5}
                  style={coachStyleBelow(personalBox)}
                  onPrimary={dismissTour}
                  onSecondary={goBackFromTour}
                  caret={<TourCaret />}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function AllPanel() {
  return (
    <>
      <div className="mb-3 flex items-center gap-1.5">
        <img src={autoAwesome} alt="" className="size-[15px]" />
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
          AI overview
        </p>
      </div>
      <p className="mb-3 font-serif text-[17px] font-semibold leading-[1.28] text-accent">
        {ALL_CONTENT.headline}
      </p>
      <p className="mb-3 font-sans text-[13px] leading-[1.36] text-ink-700">{ALL_CONTENT.body}</p>
      <div className="mb-3 flex overflow-hidden rounded-[18px] border border-[#f0c519] bg-[#fefaed]">
        <div className="w-1 shrink-0 bg-[#f0c519]" />
        <div className="flex flex-col gap-1.5 px-4 py-2.5">
          <p className="font-sans text-[15px] font-medium text-[#564709]">How this applies to me</p>
          {ALL_CONTENT.personal.map((p) => (
            <p key={p} className="font-sans text-[13px] leading-[1.36] text-[#7d660d]">
              {p}
            </p>
          ))}
        </div>
      </div>
    </>
  )
}

function MedicalPanel({
  sourcesRef,
  elevate,
  touring,
  onOpenSources,
}: {
  sourcesRef: RefObject<HTMLDivElement | null>
  elevate: boolean
  touring: boolean
  onOpenSources: () => void
}) {
  return (
    <div className="mb-1">
      <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
        From vetted medical sources
      </p>
      <div className="flex flex-col gap-4">
        {MEDICAL_SOURCES.map((s, i) => {
          const card = (
            <div className="rounded-2xl bg-card px-4 py-3.5">
              <div className="mb-2.5 flex items-center gap-2.5">
                <span
                  className="flex size-[26px] items-center justify-center rounded-[13px] text-[12px] font-semibold text-white"
                  style={{ background: s.color }}
                >
                  {s.letter}
                </span>
                <div>
                  <p className="font-sans text-[13px] font-semibold text-ink">{s.name}</p>
                  <p className="font-sans text-[11px] text-ink-600">{s.sub}</p>
                </div>
              </div>
              <p className="mb-2.5 font-sans text-[12.5px] leading-[17px] text-ink-800">{s.quote}</p>
              <button
                type="button"
                onClick={() => !touring && onOpenSources()}
                className="flex cursor-pointer items-center gap-0.5"
              >
                <span className="font-sans text-[12px] font-medium text-accent">Open source</span>
                <img src={chevronRight} alt="" className="size-3.5" />
              </button>
            </div>
          )
          if (i === 0) {
            return (
              <div
                key={s.name}
                ref={sourcesRef}
                className={elevate ? 'relative z-[60] rounded-[20px] bg-canvas p-1' : undefined}
              >
                {card}
              </div>
            )
          }
          return <div key={s.name}>{card}</div>
        })}
      </div>
    </div>
  )
}

function CommunityPanel({
  touring,
  sortBy,
  onSort,
  onViewDiscussion,
}: {
  touring: boolean
  sortBy: string
  onSort: () => void
  onViewDiscussion: () => void
}) {
  return (
    <>
      <div className="mb-3 flex items-center gap-2">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
          From people like you
        </p>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => !touring && onSort()}
          className="flex cursor-pointer items-center gap-1 rounded-full border border-accent-200 bg-white py-1.5 pr-2.5 pl-3"
        >
          <span className="font-sans text-[12.5px] text-[#001d61]">{sortBy}</span>
          <img src={expandMore} alt="" className="size-3.5" />
        </button>
      </div>
      <div className="mb-3 flex flex-col gap-4">
        {COMMUNITY_POSTS.map((p) => (
          <div key={p.name} className="rounded-2xl bg-card px-4 py-3.5">
            <div className="mb-2.5 flex items-center gap-2.5">
              <span
                className="flex size-[34px] items-center justify-center rounded-[17px] text-[14px] font-semibold text-white"
                style={{ background: p.color }}
              >
                {p.letter}
              </span>
              <div>
                <p className="font-sans text-[15px] font-medium text-ink">{p.name}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="rounded-full bg-accent-50 px-2.5 py-0.5 font-sans text-[13px] text-[#001d61]">
                    {p.match} ›
                  </span>
                  <span className="font-sans text-[12px] text-ink-600">{p.when}</span>
                </div>
              </div>
            </div>
            <p className="mb-2.5 font-sans text-[13px] leading-[18px] text-ink-800">{p.text}</p>
            <div className="mb-2.5 flex items-center gap-1.5 rounded-[10px] bg-accent-50 px-2.5 py-1.5">
              <img src={autoAwesome} alt="" className="size-[13px]" />
              <p
                className={`font-sans text-[13px] ${p.verified ? 'text-[#001d61]' : 'text-ink-600'}`}
              >
                {p.verify}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <img src={thumbUp} alt="" className="size-3.5" />
              <span className="font-sans text-[12.5px] text-ink-600">{p.helpful}</span>
              <div className="flex-1" />
              <button
                type="button"
                onClick={() => !touring && onViewDiscussion()}
                className="flex cursor-pointer items-center gap-0.5"
              >
                <span className="font-sans text-[12px] font-medium text-accent">View discussion</span>
                <img src={chevronRight} alt="" className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="mb-3 text-center font-sans text-[10.5px] leading-[15px] text-ink-600">
        Members appear anonymously. Tips are experiences, not medical advice.
      </p>
    </>
  )
}

function MyDataPanel({
  dataRef,
  elevate,
}: {
  dataRef: RefObject<HTMLDivElement | null>
  elevate: boolean
}) {
  return (
    <div className="mb-1">
      <p className="mb-3 font-sans text-[10.5px] font-medium tracking-[1.2px] text-ink-600">
        FROM YOUR LOGS & LABS
      </p>
      <div className="mb-3 flex flex-col gap-4">
        {MY_DATA.map((d, i) => {
          const card = (
            <div className="rounded-2xl bg-card px-4 py-3.5">
              <div className="mb-1 flex items-center gap-2">
                <span
                  className={`size-2 rounded-full ${d.tone === 'warn' ? 'bg-[#f0c519]' : 'bg-[#39c684]'}`}
                />
                <p className="font-sans text-[12px] text-ink-600">{d.label}</p>
              </div>
              <p className="mb-1 font-sans text-[16px] font-semibold text-ink">{d.value}</p>
              <p className="font-sans text-[12px] leading-4 text-ink-600">{d.detail}</p>
            </div>
          )
          if (i === 0) {
            return (
              <div
                key={d.label}
                ref={dataRef}
                className={elevate ? 'relative z-[60] rounded-[20px] bg-canvas p-1' : undefined}
              >
                {card}
              </div>
            )
          }
          return <div key={d.label}>{card}</div>
        })}
      </div>
      <p className="mb-3 text-center font-sans text-[10.5px] leading-[15px] text-ink-600">
        Only you can see this. Pulled from your synced labs and CGM.
      </p>
    </div>
  )
}

function DoMore({
  touring,
  onPrep,
  onPost,
  onGuide,
}: {
  touring: boolean
  onPrep: () => void
  onPost: () => void
  onGuide: () => void
}) {
  return (
    <div className="mb-3 mt-4">
      <div className="mb-3 h-px w-full bg-[rgba(0,43,143,0.1)]" />
      <div className="flex flex-col gap-0.5">
        <button
          type="button"
          onClick={() => !touring && onPrep()}
          className="flex cursor-pointer items-center gap-1 py-1.5"
        >
          <img src={addBlue} alt="" className="size-4" />
          <span className="font-sans text-[13px] font-medium text-accent">
            Add to Appointment Prep
          </span>
        </button>
        <button
          type="button"
          onClick={() => !touring && onPost()}
          className="flex cursor-pointer items-center gap-1 py-1.5"
        >
          <img src={groupsBlue} alt="" className="size-4" />
          <span className="font-sans text-[13px] font-medium text-accent">Post to Community</span>
        </button>
        <button
          type="button"
          onClick={() => !touring && onGuide()}
          className="flex cursor-pointer items-center gap-1.5 py-1.5"
        >
          <img src={menuBook} alt="" className="size-4" />
          <span className="font-sans text-[13px] font-medium text-accent">Watch visual guide</span>
        </button>
      </div>
    </div>
  )
}
