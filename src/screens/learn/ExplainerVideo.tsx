import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import NavBar from '../../components/NavBar'
import arrowBack from '../../assets/figma/learn-arrow-back.svg'
import playCircle from '../../assets/figma/learn-play-circle-blue.svg'
import playDark from '../../assets/figma/learn-play-circle-dark.svg'
import bookmarkBorder from '../../assets/figma/learn-bookmark-border.svg'
import bookmarkFilled from '../../assets/figma/learn-bookmark-filled-blue.svg'
import chevronRight from '../../assets/figma/learn-chevron-right.svg'
import { markTourSeen, tourSeen, TOUR_LEARN } from '../timeline/tour'
import {
  LearnTourCoach,
  LearnTourScrim,
  SpotlightRing,
  TourCaret,
  coachStyleAbove,
  useSpotlightBox,
  type LearnTourStep,
} from './LearnTour'

const CHAPTERS = [
  { time: '0:00', title: 'What Stage 3a means' },
  { time: '0:55', title: 'Reading your eGFR' },
  { time: '1:40', title: 'What to focus on now' },
  { time: '2:25', title: 'Working with your care team' },
]

const SOURCE_LETTERS = [
  { letter: 'N', color: '#1c804d' },
  { letter: 'M', color: '#1c4fd9' },
  { letter: 'R', color: '#002b8f' },
]

/** Figma 3139:8265 — step 3 (explainer video chapters). */
export default function ExplainerVideo() {
  const navigate = useNavigate()
  const location = useLocation()
  const resumeStep = (location.state as { tourStep?: LearnTourStep } | null)?.tourStep
  const rootRef = useRef<HTMLDivElement>(null)
  const chaptersRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [saved, setSaved] = useState(false)
  const [progress, setProgress] = useState(22)
  const [tourStep, setTourStep] = useState<LearnTourStep | -1>(() => {
    if (tourSeen(TOUR_LEARN)) return -1
    if (resumeStep === 3) return 3
    return -1
  })

  const chaptersBox = useSpotlightBox(rootRef, chaptersRef, tourStep === 3, 4)
  const touring = tourStep === 3

  useEffect(() => {
    if (tourStep === 3) {
      chaptersRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [tourStep])

  const dismissTour = () => {
    markTourSeen(TOUR_LEARN)
    setTourStep(-1)
    navigate('/learn', { replace: true })
  }

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex shrink-0 items-center gap-3.5 px-5 pt-2.5">
        <button
          type="button"
          aria-label="Back"
          onClick={() => !touring && navigate('/learn/module')}
          className="cursor-pointer"
        >
          <img src={arrowBack} alt="" className="size-[26px]" />
        </button>
        <p className="font-sans text-[15px] font-medium text-ink">Visual Guide</p>
      </div>

      <div className="app-scroll flex-1 overflow-y-auto px-5 pt-4 pb-36">
        <button
          type="button"
          onClick={() => {
            if (touring) return
            setPlaying(!playing)
            if (!playing) setProgress(55)
          }}
          className="relative mb-3.5 flex h-[197px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[18px] bg-accent"
        >
          <span className="flex size-16 items-center justify-center rounded-[32px] bg-white">
            <img src={playDark} alt="" className="size-10" />
          </span>
          <span className="absolute right-4 bottom-8 rounded-md bg-black/55 px-2 py-0.5 font-sans text-[12px] text-white">
            3:00
          </span>
          <span className="absolute right-4 bottom-4 left-4 h-1 overflow-hidden rounded-sm bg-white/35">
            <span className="block h-full rounded-sm bg-white" style={{ width: `${progress}%` }} />
          </span>
        </button>

        <h1 className="mb-3.5 font-serif text-[26px] font-medium leading-[1.18] text-ink">
          Your stage in 3 minutes
        </h1>
        <div className="mb-3.5 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-accent-50 py-1 pr-2.5 pl-2">
            <span className="size-4 rounded-lg bg-accent" />
            <span className="font-sans text-[12px] text-accent">Riverside Nephrology</span>
          </span>
          <span className="font-sans text-[13px] text-ink-500">· 3 min</span>
          <button
            type="button"
            onClick={() => !touring && setSaved(!saved)}
            className="ml-auto flex cursor-pointer items-center gap-1"
          >
            <img src={saved ? bookmarkFilled : bookmarkBorder} alt="" className="size-4" />
            <span className="font-sans text-[12px] text-accent">{saved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
        <p className="mb-3.5 font-sans text-[15px] leading-[1.42] text-ink">
          Riverside Nephrology walks through Stage 3a, what eGFR means, and what to focus on next.
        </p>

        <div
          ref={chaptersRef}
          className={`mb-3.5 flex flex-col gap-2 ${
            tourStep === 3 ? 'relative z-[60] rounded-2xl bg-canvas p-1' : ''
          }`}
        >
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
            In this video
          </p>
          <div className="rounded-2xl border border-accent-100 bg-card px-3.5 py-0.5">
            {CHAPTERS.map((ch, i) => (
              <div key={ch.title}>
                {i > 0 && <div className="h-px w-full bg-accent-100" />}
                <button
                  type="button"
                  onClick={() => !touring && setProgress(10 + i * 22)}
                  className="flex w-full cursor-pointer items-center gap-3 py-[13px] text-left"
                >
                  <span className="w-10 shrink-0 font-sans text-[15px] font-medium text-accent">
                    {ch.time}
                  </span>
                  <span className="min-w-0 flex-1 font-sans text-[15px] leading-[1.42] text-ink">
                    {ch.title}
                  </span>
                  <img src={playCircle} alt="" className="size-[18px]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="mb-6 flex w-full cursor-pointer items-center gap-2.5 rounded-[14px] bg-accent-50 py-2.5 pr-3.5 pl-3 text-left"
        >
          <div className="flex items-center">
            {SOURCE_LETTERS.map((s, i) => (
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
            <span className="block font-sans text-[13px] text-ink-500">
              3 clinician-reviewed sources
            </span>
          </span>
          <img src={chevronRight} alt="" className="size-5" />
        </button>

        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => !touring && navigate('/ask')}
            className="flex-1 cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
          >
            Ask about this video
          </button>
          <button
            type="button"
            onClick={() => !touring && setSaved(!saved)}
            className="cursor-pointer rounded-[14px] border border-accent-200 bg-white px-5 py-3.5 font-sans text-[15px] font-semibold text-accent"
          >
            Save
          </button>
        </div>
      </div>

      <NavBar tab="learn" />

      {tourStep === 3 && (
        <div className="pointer-events-none absolute inset-0 z-50">
          <div className="pointer-events-auto absolute inset-0">
            <LearnTourScrim onDismiss={dismissTour} />
          </div>
          {chaptersBox && (
            <>
              <SpotlightRing box={chaptersBox} className="rounded-[20px]" />
              <div className="pointer-events-auto">
                <LearnTourCoach
                  step={3}
                  style={coachStyleAbove(chaptersBox, 16, 190)}
                  onPrimary={dismissTour}
                  onSecondary={() =>
                    navigate('/learn/module', {
                      state: { tourStep: 2 },
                      replace: true,
                    })
                  }
                  caret={<TourCaret direction="down" />}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
