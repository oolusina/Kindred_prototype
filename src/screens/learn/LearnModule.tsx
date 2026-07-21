import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSmartBack, useReplaceNavigate } from '../../navigation/history'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import Sheet from '../../components/Sheet'
import SegmentedTabs from '../../components/SegmentedTabs'
import arrowBack from '../../assets/figma/learn-arrow-back.svg'
import scienceWhite from '../../assets/figma/science-white.svg'
import playCircle from '../../assets/figma/learn-play-circle-blue.svg'
import chevronRight from '../../assets/figma/learn-chevron-right.svg'
import bulletDot from '../../assets/figma/bullet-dot.svg'
import closeInk from '../../assets/figma/close-ink.svg'
import bookmarkBorder from '../../assets/figma/learn-bookmark-border.svg'
import bookmarkFilled from '../../assets/figma/learn-bookmark-filled-blue.svg'
import bookmarkSmall from '../../assets/figma/learn-bookmark-small.svg'
import { usePrototypeState, type SavedSource } from '../../state/PrototypeState'
import { markTourSeen, tourSeen, TOUR_LEARN } from '../timeline/tour'
import {
  SpotlightRing,
  TourCaret,
  coachStyleBelow,
  useSpotlightBox,
} from '../../components/featureTour'
import {
  LearnTourCoach,
  LearnTourScrim,
  type LearnTourStep,
} from './LearnTour'

const SOURCES: SavedSource[] = [
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
  {
    id: 'cleveland',
    letter: 'C',
    color: '#002b8f',
    name: 'Cleveland Clinic',
    sub: 'clevelandclinic.org · Understanding eGFR',
  },
]

/** Figma 3139:8265 — step 2 (Simple vs Detailed). */
export default function LearnModule() {
  const navigate = useNavigate()
  const replaceNavigate = useReplaceNavigate()
  const location = useLocation()
  const resumeStep = (location.state as { tourStep?: LearnTourStep } | null)?.tourStep
  const { isSourceSaved, toggleSavedSource } = usePrototypeState()
  const rootRef = useRef<HTMLDivElement>(null)
  const depthRef = useRef<HTMLDivElement>(null)
  const goBack = useSmartBack('/learn')
  const [mode, setMode] = useState<'simple' | 'detailed'>('simple')
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const [done, setDone] = useState(false)
  const [tourStep, setTourStep] = useState<LearnTourStep | -1>(() => {
    if (tourSeen(TOUR_LEARN)) return -1
    if (resumeStep === 2) return 2
    return -1
  })

  const depthBox = useSpotlightBox(rootRef, depthRef, tourStep === 2, 4)
  const touring = tourStep === 2

  const dismissTour = () => {
    markTourSeen(TOUR_LEARN)
    setTourStep(-1)
    navigate('/learn', { replace: true })
  }

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex shrink-0 items-center gap-[5px] px-5 pt-2.5">
        <button
          type="button"
          aria-label="Back"
          onClick={() => !touring && goBack()}
          className="cursor-pointer"
        >
          <img src={arrowBack} alt="" className="size-[26px]" />
        </button>
        <p className="ml-2 font-sans text-[13px] text-accent">Kidney disease</p>
        <p className="font-sans text-[13px] text-ink-500">· Module 2 of 5</p>
      </div>
      <div className="app-scroll flex-1 overflow-y-auto px-5 pt-4 pb-8">
        <div
          ref={depthRef}
          className={`mb-3.5 ${tourStep === 2 ? 'relative z-[60]' : ''}`}
        >
          <SegmentedTabs
            size="sm"
            value={mode}
            onChange={(next) => {
              if (touring) return
              if (next === 'detailed') {
                replaceNavigate('/learn/module/step-1')
                return
              }
              setMode(next)
            }}
            options={[
              { value: 'simple', label: 'Simple' },
              { value: 'detailed', label: 'Detailed' },
            ]}
          />
        </div>
        <h1 className="mb-3.5 font-serif text-[26px] font-medium leading-[1.18] text-ink">
          Your stage, explained
        </h1>
        <p className="mb-3.5 font-sans text-[15px] leading-[1.42] text-ink">
          You&apos;re at an early-to-middle stage. Your kidneys still do most of their job. Right now,
          the goal is simple: protect what you have.
        </p>
        <div className="mb-3.5 flex items-center gap-3 rounded-2xl bg-accent-50 p-4">
          <span className="flex size-11 items-center justify-center rounded-xl bg-accent">
            <img src={scienceWhite} alt="" className="size-6" />
          </span>
          <div>
            <p className="font-sans text-[15px] font-medium text-ink">You&apos;re Stage 3A</p>
            <p className="font-sans text-[13px] text-ink-500">Your eGFR is 48 · from your labs</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => !touring && navigate('/learn/video')}
          className="mb-3.5 flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-accent-200 bg-accent-50 py-2.5 pr-3.5 pl-2.5 text-left"
        >
          <span className="flex h-11 w-[60px] items-center justify-center rounded-[10px] bg-accent">
            <img src={playCircle} alt="" className="size-[26px] brightness-0 invert" />
          </span>
          <span className="flex-1">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
              Watch instead
            </span>
            <span className="block font-sans text-[15px] font-medium text-ink">Your stage in 3 minutes</span>
            <span className="block font-sans text-[13px] text-ink-500">
              3 min visual guide · Riverside Nephrology
            </span>
          </span>
          <img src={chevronRight} alt="" className="size-5" />
        </button>
        <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          What matters now
        </p>
        <div className="mb-3.5 flex flex-col gap-2.5">
          {[
            'Keep blood pressure and blood sugar steady.',
            'Take your medicines as prescribed.',
            'Your team checks your labs a few times a year.',
          ].map((t) => (
            <div key={t} className="flex items-center gap-2.5">
              <img src={bulletDot} alt="" className="size-2 shrink-0" />
              <p className="font-sans text-[15px] leading-[1.42] text-ink">{t}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => !touring && setSourcesOpen(true)}
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-[14px] bg-accent-50 py-2.5 pr-3.5 pl-3 text-left"
        >
          <div className="flex items-center">
            {SOURCES.map((s, i) => (
              <span
                key={s.letter}
                className="flex size-7 items-center justify-center rounded-[14px] border-2 border-accent-50 text-[12px] text-white"
                style={{ background: s.color, marginLeft: i === 0 ? 0 : -9 }}
              >
                {s.letter}
              </span>
            ))}
          </div>
          <span className="flex-1">
            <span className="block font-sans text-[15px] font-medium text-ink">Sources</span>
            <span className="block font-sans text-[13px] text-ink-500">4 clinician-reviewed sources</span>
          </span>
          <img src={chevronRight} alt="" className="size-5" />
        </button>
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => !touring && navigate('/learn/module/step-1')}
            className="flex-1 cursor-pointer rounded-[14px] border border-accent-200 bg-white py-3.5 font-sans text-[15px] font-semibold text-accent"
          >
            Start steps
          </button>
          <button
            type="button"
            onClick={() => {
              if (touring) return
              setDone(true)
              setTimeout(() => navigate('/learn/module/complete'), 400)
            }}
            className="flex-1 cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
          >
            {done ? 'Saved…' : 'Mark as done'}
          </button>
        </div>
      </div>
      <HomeIndicator />
      <Sheet open={sourcesOpen} onClose={() => setSourcesOpen(false)}>
        <div className="px-5 pb-8">
          <div className="mb-1 flex items-start pt-1">
            <div className="flex-1">
              <p className="font-serif text-[17px] font-semibold text-ink">Sources</p>
              <p className="font-sans text-[13px] text-ink-500">
                Reviewed by clinicians · tap the bookmark to save
              </p>
            </div>
            <button type="button" aria-label="Close" onClick={() => setSourcesOpen(false)}>
              <img src={closeInk} alt="" className="size-[22px]" />
            </button>
          </div>
          <div className="mt-3">
            {SOURCES.map((s, i) => {
              const saved = isSourceSaved(s.id)
              return (
                <div key={s.id}>
                  {i > 0 && <div className="h-px w-full bg-accent-100" />}
                  <div className="flex items-center gap-3 py-3.5">
                    <span
                      className="flex size-8 shrink-0 items-center justify-center rounded-full text-[13px] font-medium text-white"
                      style={{ background: s.color }}
                    >
                      {s.letter}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-sans text-[15px] font-medium text-ink">{s.name}</p>
                      <p className="font-sans text-[13px] text-ink-500">{s.sub}</p>
                    </div>
                    <button
                      type="button"
                      aria-label={saved ? 'Remove bookmark' : 'Save source'}
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
                </div>
              )
            })}
          </div>
          <div className="mt-2 flex items-center gap-2 pt-2">
            <img src={bookmarkSmall} alt="" className="size-3.5" />
            <p className="font-sans text-[13px] text-ink-500">
              Saved sources appear in Learning ▸ Saved
            </p>
          </div>
        </div>
      </Sheet>

      {tourStep === 2 && (
        <div className="pointer-events-none absolute inset-0 z-50">
          <div className="pointer-events-auto absolute inset-0">
            <LearnTourScrim onDismiss={dismissTour} />
          </div>
          {depthBox && (
            <>
              <SpotlightRing box={depthBox} className="rounded-full" />
              <div className="pointer-events-auto">
                <LearnTourCoach
                  step={2}
                  style={coachStyleBelow(depthBox)}
                  onPrimary={() =>
                    navigate('/learn/video', {
                      state: { tourStep: 3 },
                      replace: true,
                    })
                  }
                  onSecondary={() =>
                    navigate('/learn', {
                      state: { tourStep: 1 },
                      replace: true,
                    })
                  }
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
