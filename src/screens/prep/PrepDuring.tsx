import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PrepHeader, PrepFooter, Tag } from './shared'
import micNone from '../../assets/figma/mic-none.svg'
import toggleOff from '../../assets/figma/toggle-off.svg'
import toggleOn from '../../assets/figma/toggle-on.svg'
import { usePrototypeState } from '../../state/PrototypeState'
import { markTourSeen, tourSeen, TOUR_PREP } from '../timeline/tour'
import {
  SpotlightRing,
  TourCaret,
  coachStyleAbove,
  coachStyleBelow,
  useSpotlightBox,
} from '../../components/featureTour'
import {
  PrepTourCoach,
  PrepTourScrim,
  type PrepTourStep,
} from './PrepTour'

const SNAPSHOT = [
  'eGFR 52 → 48 mL/min since April',
  'BP trending up: 138/86 this week',
  'New since last visit: urgent care · Jun 28',
]

/** Figma 2929:7333 — steps 4–5 on During visit. */
export default function PrepDuring() {
  const navigate = useNavigate()
  const location = useLocation()
  const resumeStep = (location.state as { tourStep?: PrepTourStep } | null)?.tourStep
  const { prepQuestions } = usePrototypeState()
  const rootRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const transcriptionRef = useRef<HTMLButtonElement>(null)
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [transcribe, setTranscribe] = useState(false)
  const [tourStep, setTourStep] = useState<PrepTourStep | -1>(() => {
    if (tourSeen(TOUR_PREP)) return -1
    if (resumeStep === 4 || resumeStep === 5) return resumeStep
    return -1
  })

  const tabsBox = useSpotlightBox(rootRef, tabsRef, tourStep === 4, 4)
  const transcriptionBox = useSpotlightBox(rootRef, transcriptionRef, tourStep === 5)
  const touring = tourStep >= 4

  useEffect(() => {
    if (tourStep === 5) {
      transcriptionRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [tourStep])

  const dismissTour = () => {
    markTourSeen(TOUR_PREP)
    setTourStep(-1)
    navigate('/prep', { replace: true })
  }

  const toggleQ = (id: string) => {
    if (touring) return
    setChecked((c) => ({ ...c, [id]: !c[id] }))
  }

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col bg-canvas">
      <PrepHeader
        phase="during"
        tabsRef={tabsRef}
        elevateTabs={tourStep === 4}
        lockPhase={touring}
      />
      <div className="app-scroll flex flex-1 flex-col gap-3 px-6 pb-4 pt-3">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
          Snapshot for the doctor
        </p>
        <div className="flex flex-col rounded-2xl bg-card px-4 py-1">
          {SNAPSHOT.map((line, i) => (
            <div key={line}>
              {i > 0 && <div className="h-px w-full bg-[rgba(0,43,143,0.06)]" />}
              <div className="flex items-center gap-2.5 py-2">
                <span
                  className={`size-2 shrink-0 rounded-full ${
                    i === 2 ? 'bg-accent-300' : 'bg-accent'
                  }`}
                />
                <p className="font-sans text-[12.5px] font-medium text-ink">{line}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center pt-1">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
            Questions
          </p>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => !touring && navigate('/prep/questions')}
            className="cursor-pointer font-sans text-[12.5px] font-medium text-accent"
          >
            ＋ Add question
          </button>
        </div>
        <div className="flex flex-col rounded-2xl bg-card px-4 py-1">
          {prepQuestions.map((q, i) => (
            <div key={q.id}>
              {i > 0 && <div className="h-px w-full bg-[rgba(0,43,143,0.06)]" />}
              <div className="flex items-start gap-3 py-2.5">
                <button
                  type="button"
                  onClick={() => toggleQ(q.id)}
                  className={`mt-0.5 flex size-[22px] shrink-0 cursor-pointer items-center justify-center rounded-[7px] border-[1.5px] ${
                    checked[q.id]
                      ? 'border-accent bg-accent'
                      : 'border-[rgba(0,43,143,0.4)] bg-transparent'
                  }`}
                >
                  {checked[q.id] && <span className="text-[12px] text-white">✓</span>}
                </button>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <p className="font-sans text-[13px] font-medium leading-[18px] text-ink">
                    {q.text}
                  </p>
                  <Tag kind={q.kind} />
                </div>
                <button
                  type="button"
                  className="cursor-pointer font-sans text-[12px] font-medium text-accent"
                >
                  Add note
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          ref={transcriptionRef}
          type="button"
          onClick={() => {
            if (touring) return
            const next = !transcribe
            setTranscribe(next)
            if (next) navigate('/prep/transcribe')
          }}
          className={`flex w-full cursor-pointer flex-col gap-1.5 rounded-2xl bg-card px-4 py-2.5 text-left ${
            tourStep === 5 ? 'relative z-[60]' : ''
          }`}
        >
          <div className="flex w-full items-center gap-2">
            <img src={micNone} alt="" className="size-[19px]" />
            <span className="font-sans text-[13.5px] font-medium text-ink">Transcription</span>
            <span className="rounded-lg bg-[rgba(0,43,143,0.08)] px-1.5 py-0.5 font-sans text-[9px] font-semibold tracking-[0.5px] text-[#001d61]">
              BETA
            </span>
            <div className="flex-1" />
            <img src={transcribe ? toggleOn : toggleOff} alt="" className="h-[26px] w-11" />
          </div>
          <p className="font-sans text-[11.5px] leading-[15px] text-ink-600">
            Automatically adds the doctor&apos;s answers to your questions.
          </p>
        </button>
      </div>
      <PrepFooter
        label="Save to timeline"
        onClick={() => !touring && navigate('/prep/saved')}
      />

      {tourStep >= 4 && (
        <div className="pointer-events-none absolute inset-0 z-50">
          <div className="pointer-events-auto absolute inset-0">
            <PrepTourScrim onDismiss={dismissTour} />
          </div>
          {tourStep === 4 && tabsBox && (
            <>
              <SpotlightRing box={tabsBox} className="rounded-full" />
              <div className="pointer-events-auto">
                <PrepTourCoach
                  step={4}
                  style={coachStyleBelow(tabsBox)}
                  onPrimary={() => setTourStep(5)}
                  onSecondary={() =>
                    navigate('/prep', { state: { tourStep: 3 }, replace: true })
                  }
                  caret={<TourCaret />}
                />
              </div>
            </>
          )}
          {tourStep === 5 && transcriptionBox && (
            <>
              <SpotlightRing box={transcriptionBox} className="rounded-[24px]" />
              <div className="pointer-events-auto">
                <PrepTourCoach
                  step={5}
                  style={coachStyleAbove(transcriptionBox)}
                  onPrimary={dismissTour}
                  onSecondary={() => setTourStep(4)}
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
