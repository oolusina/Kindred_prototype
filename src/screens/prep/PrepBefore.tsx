import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PrepHeader, PrepFooter, Tag } from './shared'
import CommunityAiOverviewSheet from '../community/CommunityAiOverviewSheet'
import chevronRight from '../../assets/figma/chevron-right-gray.svg'
import visibilityBlue from '../../assets/figma/visibility-blue.svg'
import groupsBlue from '../../assets/figma/groups-blue-prep.svg'
import pictureAsPdf from '../../assets/figma/picture-as-pdf.svg'
import { usePrototypeState } from '../../state/PrototypeState'
import { markTourSeen, tourSeen, TOUR_PREP } from '../timeline/tour'
import {
  TourCaret,
  coachStyleBelow,
  coachStyleAbove,
  coachCaretLeft,
  useSpotlightBox,
} from '../../components/featureTour'
import {
  PrepTourCoach,
  PrepTourScrim,
  PrepTourWelcome,
  type PrepTourStep,
} from './PrepTour'

/** Figma 2929:7333 — welcome + steps 1 & 3. */
export default function PrepBefore() {
  const navigate = useNavigate()
  const location = useLocation()
  const resumeStep = (location.state as { tourStep?: PrepTourStep } | null)?.tourStep
  const { prepQuestions } = usePrototypeState()
  const rootRef = useRef<HTMLDivElement>(null)
  const questionsRef = useRef<HTMLDivElement>(null)
  const sendRef = useRef<HTMLDivElement>(null)
  const [discussionSheetOpen, setDiscussionSheetOpen] = useState(false)

  const [tourStep, setTourStep] = useState<PrepTourStep | -1>(() => {
    if (tourSeen(TOUR_PREP)) return -1
    if (resumeStep === 1 || resumeStep === 3) return resumeStep
    return 0
  })

  const questionsBox = useSpotlightBox(rootRef, questionsRef, tourStep === 1)
  const sendBox = useSpotlightBox(rootRef, sendRef, tourStep === 3)
  const touring = tourStep >= 0

  const dismissTour = () => {
    markTourSeen(TOUR_PREP)
    setTourStep(-1)
  }

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col bg-canvas">
      <PrepHeader phase="before" lockPhase={touring} />
      <div className="app-scroll flex flex-1 flex-col gap-[22px] px-6 pb-4 pt-4">
        <div
          ref={questionsRef}
          className={`flex flex-col gap-3 rounded-[20px] ${
            tourStep === 1 ? 'relative z-[60] bg-canvas p-1' : ''
          }`}
        >
          <div className="flex items-center">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
              Your questions
            </p>
            <div className="flex-1" />
            <button
              type="button"
              onClick={() => !touring && navigate('/prep/questions')}
              className="cursor-pointer font-sans text-[12.5px] font-medium text-accent"
            >
              Edit
            </button>
          </div>
          <div className="flex flex-col rounded-2xl bg-card px-4 py-1">
            {prepQuestions.map((q, i) => (
              <div key={q.id}>
                {i > 0 && <div className="h-px w-full bg-[rgba(0,43,143,0.06)]" />}
                {q.kind === 'community' ? (
                  <button
                    type="button"
                    onClick={() => !touring && setDiscussionSheetOpen(true)}
                    className="flex w-full cursor-pointer items-center justify-between py-3.5 text-left"
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <p className="font-sans text-[13.5px] font-medium leading-[19px] text-ink">
                        {q.text}
                      </p>
                      <Tag kind={q.kind} />
                    </div>
                    <img src={chevronRight} alt="" className="size-5 shrink-0" />
                  </button>
                ) : (
                  <div className="flex flex-col gap-1.5 py-3.5">
                    <p className="font-sans text-[13.5px] font-medium leading-[19px] text-ink">
                      {q.text}
                    </p>
                    <Tag kind={q.kind} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          ref={sendRef}
          className={`flex flex-col gap-3 rounded-[20px] ${
            tourStep === 3 ? 'relative z-[60] bg-canvas p-1' : ''
          }`}
        >
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
            Send to your doctor?
          </p>
          <div className="flex gap-2.5">
            <button
              type="button"
              className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-[rgba(0,43,143,0.1)] bg-card px-1.5 py-3.5"
            >
              <img src={pictureAsPdf} alt="" className="size-5" />
              <span className="font-sans text-[11.5px] font-medium text-accent">PDF</span>
            </button>
            <button
              type="button"
              onClick={() => !touring && navigate('/prep/brief')}
              className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-[rgba(0,43,143,0.1)] bg-card px-1.5 py-3.5"
            >
              <img src={visibilityBlue} alt="" className="size-5" />
              <span className="font-sans text-[11.5px] font-medium text-accent">Show in app</span>
            </button>
            <button
              type="button"
              onClick={() => !touring && navigate('/prep/sent')}
              className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-[rgba(0,43,143,0.1)] bg-card px-1.5 py-3.5"
            >
              <img src={groupsBlue} alt="" className="size-5" />
              <span className="font-sans text-[11.5px] font-medium text-accent">Send to portal</span>
            </button>
          </div>
          <p className="text-center font-sans text-[10.5px] text-ink-600">
            Sends only this prep - never your full record.
          </p>
        </div>
      </div>
      <PrepFooter
        label="Save prep"
        onClick={() => !touring && navigate('/prep/during', { replace: true })}
      />

      {tourStep >= 0 && (
        <div className="pointer-events-none absolute inset-0 z-50">
          <div className="pointer-events-auto absolute inset-0">
            <PrepTourScrim onDismiss={dismissTour} />
          </div>
          {tourStep === 0 && (
            <div className="pointer-events-auto">
              <PrepTourWelcome onStart={() => setTourStep(1)} onSkip={dismissTour} />
            </div>
          )}
          {tourStep === 1 && questionsBox && (
            <div className="pointer-events-auto">
              <PrepTourCoach
                step={1}
                style={coachStyleBelow(questionsBox)}
                onPrimary={() =>
                  navigate('/prep/questions', {
                    state: { tourStep: 2 },
                    replace: true,
                  })
                }
                onSecondary={dismissTour}
                caret={<TourCaret />}
              />
            </div>
          )}
          {tourStep === 3 && sendBox && (
            <div className="pointer-events-auto">
              <PrepTourCoach
                step={3}
                style={coachStyleAbove(sendBox, 16, 220)}
                onPrimary={() =>
                  navigate('/prep/during', {
                    state: { tourStep: 4 },
                    replace: true,
                  })
                }
                onSecondary={() =>
                  navigate('/prep/questions', {
                    state: { tourStep: 2 },
                    replace: true,
                  })
                }
                caret={
                  <TourCaret direction="down" className="" style={{ left: coachCaretLeft(sendBox) }} />
                }
              />
            </div>
          )}
        </div>
      )}

      <CommunityAiOverviewSheet
        open={discussionSheetOpen}
        onClose={() => setDiscussionSheetOpen(false)}
        onSeeDiscussion={() => {
          setDiscussionSheetOpen(false)
          navigate('/community/response')
        }}
      />
    </div>
  )
}
