import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PrepHeader, PrepFooter, Tag } from './shared'
import closeInk from '../../assets/figma/close-ink.svg'
import addBlue from '../../assets/figma/add-blue.svg'
import { usePrototypeState, type PrepQuestion } from '../../state/PrototypeState'
import { useSmartBack } from '../../navigation/history'
import { markTourSeen, tourSeen, TOUR_PREP } from '../timeline/tour'
import {
  SpotlightRing,
  coachStyleAbove,
  coachCaretLeft,
  useSpotlightBox,
  TourCaret,
} from '../../components/featureTour'
import {
  PrepTourCoach,
  PrepTourScrim,
  type PrepTourStep,
} from './PrepTour'

/** Figma 2929:7333 — step 2 on Edit questions. */
export default function PrepQuestions() {
  const navigate = useNavigate()
  const location = useLocation()
  const resumeStep = (location.state as { tourStep?: PrepTourStep } | null)?.tourStep
  const { prepQuestions, prepRecommended, setPrepQuestions, setPrepRecommended } =
    usePrototypeState()
  const goBackToPrep = useSmartBack('/prep')
  const rootRef = useRef<HTMLDivElement>(null)
  const addAreaRef = useRef<HTMLDivElement>(null)
  const [draft, setDraft] = useState('')
  const [adding, setAdding] = useState(false)
  const [tourStep, setTourStep] = useState<PrepTourStep | -1>(() => {
    if (tourSeen(TOUR_PREP)) return -1
    if (resumeStep === 2) return 2
    return -1
  })

  const addBox = useSpotlightBox(rootRef, addAreaRef, tourStep === 2)
  const touring = tourStep === 2

  useEffect(() => {
    if (tourStep === 2) addAreaRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [tourStep])

  const dismissTour = () => {
    markTourSeen(TOUR_PREP)
    setTourStep(-1)
  }

  const remove = (id: string) => {
    if (touring) return
    setPrepQuestions((q) => q.filter((x) => x.id !== id))
  }
  const addRec = (q: PrepQuestion) => {
    if (touring) return
    setPrepQuestions((prev) => [...prev, { ...q, id: `a-${q.id}` }])
    setPrepRecommended((prev) => prev.filter((x) => x.id !== q.id))
  }

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col bg-canvas">
      <PrepHeader phase="before" fallback="/prep" lockPhase={touring} />
      <div className="app-scroll flex flex-1 flex-col gap-3 px-6 pb-4 pt-4">
        <div className="flex items-center">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
            Your questions
          </p>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() =>
              touring
                ? navigate('/prep', { state: { tourStep: 3 }, replace: true })
                : goBackToPrep()
            }
            className="cursor-pointer font-sans text-[12.5px] font-medium text-accent"
          >
            Done
          </button>
        </div>
        <div className="flex flex-col rounded-2xl bg-card px-4 py-1">
          {prepQuestions.map((q, i) => (
            <div key={q.id}>
              {i > 0 && <div className="h-px w-full bg-[rgba(0,43,143,0.06)]" />}
              <div className="flex items-center gap-3 py-3">
                <button
                  type="button"
                  aria-label="Remove"
                  onClick={() => remove(q.id)}
                  className="cursor-pointer"
                >
                  <img src={closeInk} alt="" className="size-4" />
                </button>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <p className="font-sans text-[13.5px] font-medium leading-[19px] text-ink">
                    {q.text}
                  </p>
                  <Tag kind={q.kind} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={addAreaRef}
          className={`flex flex-col gap-3 rounded-[20px] ${
            tourStep === 2 ? 'relative z-[60] bg-canvas p-1' : ''
          }`}
        >
          {prepRecommended.length > 0 && (
            <>
              <p className="pt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
                Recommended for this visit
              </p>
              <div className="flex flex-col rounded-2xl bg-card px-4 py-1">
                {prepRecommended.map((q, i) => (
                  <div key={q.id}>
                    {i > 0 && <div className="h-px w-full bg-[rgba(0,43,143,0.06)]" />}
                    <div className="flex items-center gap-3 py-3">
                      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <p className="font-sans text-[13px] font-medium text-ink">{q.text}</p>
                        <Tag kind={q.kind} />
                      </div>
                      <button
                        type="button"
                        aria-label="Add"
                        onClick={() => addRec(q)}
                        className="flex size-[30px] cursor-pointer items-center justify-center rounded-full bg-accent-50"
                      >
                        <img src={addBlue} alt="" className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {adding ? (
          <div className="flex flex-col gap-2 rounded-2xl border border-accent-200 bg-card p-3">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your question"
              className="w-full bg-transparent font-sans text-[15px] text-ink outline-none"
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setAdding(false)
                  setDraft('')
                }}
                className="cursor-pointer font-sans text-[13px] text-ink-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!draft.trim() || touring) return
                  setPrepQuestions((prev) => [
                    ...prev,
                    { id: `c-${Date.now()}`, text: draft.trim(), kind: 'care' },
                  ])
                  setDraft('')
                  setAdding(false)
                }}
                className="cursor-pointer font-sans text-[13px] font-semibold text-accent"
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => !touring && setAdding(true)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-dashed border-[rgba(0,43,143,0.3)] py-3"
          >
            <img src={addBlue} alt="" className="size-4" />
            <span className="font-sans text-[13px] font-medium text-accent">
              Add your own question
            </span>
          </button>
        )}
      </div>
      <PrepFooter
        label="Save prep"
        onClick={() =>
          touring
            ? navigate('/prep', { state: { tourStep: 3 }, replace: true })
            : goBackToPrep()
        }
      />

      {tourStep === 2 && (
        <div className="pointer-events-none absolute inset-0 z-50">
          <div className="pointer-events-auto absolute inset-0">
            <PrepTourScrim onDismiss={dismissTour} />
          </div>
          {addBox && (
            <>
              <SpotlightRing box={addBox} className="rounded-[20px]" />
              <div className="pointer-events-auto">
                <PrepTourCoach
                  step={2}
                  style={coachStyleAbove(addBox, 16, 200)}
                  onPrimary={() =>
                    navigate('/prep', { state: { tourStep: 3 }, replace: true })
                  }
                  onSecondary={() =>
                    navigate('/prep', { state: { tourStep: 1 }, replace: true })
                  }
                  caret={
                    <TourCaret direction="down" className="" style={{ left: coachCaretLeft(addBox) }} />
                  }
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
