import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSmartBack, useReplaceNavigate } from '../../navigation/history'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import Sheet from '../../components/Sheet'
import SegmentedTabs from '../../components/SegmentedTabs'
import arrowBack from '../../assets/figma/learn-arrow-back.svg'
import playCircle from '../../assets/figma/learn-play-circle-blue.svg'
import chevronRight from '../../assets/figma/learn-chevron-right.svg'
import expandMore from '../../assets/figma/learn-expand-more.svg'
import menuBookBlue from '../../assets/figma/learn-menu-book-blue.svg'
import medicationBlue from '../../assets/figma/learn-medication.svg'
import eventBlue from '../../assets/figma/learn-event.svg'
import checkBlue from '../../assets/figma/learn-check-blue.svg'
import bookmarkBorder from '../../assets/figma/learn-bookmark-border.svg'
import bookmarkFilled from '../../assets/figma/learn-bookmark-filled-blue.svg'
import closeInk from '../../assets/figma/close-ink.svg'
import bookmarkSmall from '../../assets/figma/learn-bookmark-small.svg'
import { usePrototypeState, type SavedSource } from '../../state/PrototypeState'

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

const FAQS = [
  {
    q: 'Will it keep getting worse?',
    a: 'Not always. Many people stay stable in Stage 3 for years when blood pressure and blood sugar stay in range.',
  },
  {
    q: 'Can my eGFR improve?',
    a: 'Sometimes. Better blood pressure control, blood sugar, and avoiding kidney-stressing meds can help numbers stabilize or tick up.',
  },
  {
    q: 'Will I need dialysis?',
    a: 'Most people in Stage 3 never need dialysis. Staying in 3A and protecting what’s left is the everyday goal.',
  },
]

const HABITS = [
  {
    icon: menuBookBlue,
    title: 'Eating well',
    body: 'Lower salt, watch potassium and protein. Small swaps add up.',
  },
  {
    icon: medicationBlue,
    title: 'Your medicines',
    body: 'Lisinopril helps protect your kidneys. Take it as prescribed.',
  },
  {
    icon: eventBlue,
    title: 'Staying active',
    body: 'Movement helps your blood pressure and blood sugar.',
  },
]

const METRICS = [
  { label: 'eGFR', sub: 'how well kidneys filter', value: '48' },
  { label: 'Blood pressure', sub: 'keeping it in range helps', value: '138/86' },
  { label: 'Protein in urine', sub: 'an early stress signal', value: 'trace' },
]

/** Figma 3142:8271 — Detailed module steps 1–3. */
export default function LearnStep({ step }: { step: 1 | 2 | 3 }) {
  const navigate = useNavigate()
  const replaceNavigate = useReplaceNavigate()
  const { isSourceSaved, toggleSavedSource } = usePrototypeState()
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const goBack = useSmartBack('/learn')
  const nextTo =
    step === 1
      ? '/learn/module/step-2'
      : step === 2
        ? '/learn/module/step-3'
        : '/learn/module/complete'
  const nextLabel =
    step === 1 ? 'Next: your numbers' : step === 2 ? 'Next: day to day' : 'Finish module'

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex shrink-0 items-center gap-3.5 px-5 pt-2.5">
        <button
          type="button"
          aria-label="Back"
          onClick={goBack}
          className="cursor-pointer"
        >
          <img src={arrowBack} alt="" className="size-[26px]" />
        </button>
        <div>
          <p className="font-sans text-[15px] font-medium text-ink">Your stage, explained</p>
          <p className="font-sans text-[13px] text-ink-500">Kidney disease · Step {step} of 3</p>
        </div>
      </div>

      <div className="app-scroll flex-1 overflow-y-auto px-5 pt-4 pb-28">
        <div className="mb-3.5">
          <SegmentedTabs
            size="sm"
            value="detailed"
            onChange={(next) => {
              if (next === 'simple') replaceNavigate('/learn/module')
            }}
            options={[
              { value: 'simple', label: 'Simple' },
              { value: 'detailed', label: 'Detailed' },
            ]}
          />
        </div>

        <div className="mb-3.5 flex gap-1.5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-[5px] flex-1 rounded-[3px] ${n <= step ? 'bg-accent' : 'bg-accent-200'}`}
            />
          ))}
        </div>

        {step === 1 && (
          <div key="step-1" className="animate-[tabSlide_280ms_ease-out]">
            <h1 className="mb-3.5 font-serif text-[26px] font-medium leading-[1.18] text-ink">
              What Stage 3 means
            </h1>
            <p className="mb-3.5 font-sans text-[15px] leading-[1.42] text-ink">
              Kidney disease is measured in five stages, from mild (1) to advanced (5), based on
              your eGFR, a number for how well your kidneys filter.
            </p>
            <div className="mb-2 flex gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className={`flex h-[63px] flex-1 items-center justify-center rounded-[10px] ${
                    n === 3 ? 'bg-accent' : 'bg-accent-50'
                  }`}
                >
                  <span
                    className={`font-serif text-[20px] font-medium ${
                      n === 3 ? 'text-white' : 'text-ink-500'
                    }`}
                  >
                    {n}
                  </span>
                </div>
              ))}
            </div>
            <div className="mb-3.5 flex items-center justify-between font-sans text-[13px]">
              <span className="text-ink-500">Mild</span>
              <span className="text-accent">You&apos;re at 3</span>
              <span className="text-ink-500">Advanced</span>
            </div>
            <p className="mb-3.5 font-sans text-[15px] leading-[1.42] text-ink">
              You&apos;re in Stage 3, the middle. Your kidneys work less than before, but still do
              most of the job.
            </p>
            <SourcesRow onOpen={() => setSourcesOpen(true)} letters={['N', 'M', 'K', 'C']} />
          </div>
        )}

        {step === 2 && (
          <div key="step-2" className="animate-[tabSlide_280ms_ease-out]">
            <h1 className="mb-3.5 font-serif text-[26px] font-medium leading-[1.18] text-ink">
              Your numbers
            </h1>
            <p className="mb-3.5 font-sans text-[15px] leading-[1.42] text-ink">
              Here&apos;s where you stand today, pulled straight from your latest labs.
            </p>
            <div className="mb-3.5 flex flex-col gap-3 rounded-2xl bg-accent-50 p-4">
              <div className="flex items-center gap-2.5">
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-[26px] font-medium leading-[1.18] text-accent">
                    Stage 3A
                  </p>
                  <p className="font-sans text-[13px] text-ink-500">from your latest labs</p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-[26px] font-medium leading-[1.18] text-ink">48</p>
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
                    Your eGFR
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-[10px] bg-accent px-3 py-2.5">
                <p className="flex-1 font-sans text-[15px] font-medium text-white">
                  Stage 3A · eGFR 45–59
                </p>
                <p className="font-sans text-[12px] text-white">you are here</p>
              </div>
              <div className="rounded-[10px] bg-white px-3 py-2.5">
                <p className="font-sans text-[15px] font-medium text-ink-500">
                  Stage 3B · eGFR 30–44
                </p>
              </div>
            </div>
            <p className="mb-3.5 font-sans text-[15px] leading-[1.42] text-ink">
              Stage 3 splits into 3A (45–59) and 3B (30–44). Your 48 puts you in 3A, the milder half.
              Staying here is the goal.
            </p>
            <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
              What your team watches
            </p>
            <div className="mb-3.5 rounded-2xl border border-accent-100 bg-card px-3.5">
              {METRICS.map((m, i) => (
                <div key={m.label}>
                  {i > 0 && <div className="h-px w-full bg-accent-100" />}
                  <div className="flex items-center gap-2.5 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-sans text-[15px] font-medium text-ink">{m.label}</p>
                      <p className="font-sans text-[13px] text-ink-500">{m.sub}</p>
                    </div>
                    <p className="font-sans text-[15px] font-medium text-accent">{m.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <WatchCard
              title="What eGFR really means"
              sub="3 min explainer · Riverside Nephrology"
              onClick={() => navigate('/learn/video')}
            />
            <SourcesRow onOpen={() => setSourcesOpen(true)} letters={['N', 'M', 'K', 'C']} />
          </div>
        )}

        {step === 3 && (
          <div key="step-3" className="animate-[tabSlide_280ms_ease-out]">
            <h1 className="mb-3.5 font-serif text-[26px] font-medium leading-[1.18] text-ink">
              What it means day to day
            </h1>
            <p className="mb-3.5 font-sans text-[15px] leading-[1.42] text-ink">
              Small, steady habits protect your kidneys more than any single big change.
            </p>
            <div className="mb-3.5 flex flex-col gap-2.5">
              {HABITS.map((h) => (
                <div
                  key={h.title}
                  className="flex gap-3 rounded-2xl border border-accent-100 bg-card p-3.5"
                >
                  <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[19px] bg-accent-50">
                    <img src={h.icon} alt="" className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-sans text-[15px] font-medium text-ink">{h.title}</p>
                    <p className="font-sans text-[13px] leading-[1.36] text-ink-500">{h.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <WatchCard
              title="Kidney-friendly meals"
              sub="4 min explainer · Riverside Nephrology"
              onClick={() => navigate('/learn/video')}
            />
            <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
              Common questions
            </p>
            <div className="mb-3.5 flex flex-col gap-2">
              {FAQS.map((faq, i) => {
                const open = openFaq === i
                return (
                  <button
                    key={faq.q}
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full cursor-pointer rounded-[14px] border border-accent-100 bg-card px-3.5 py-3.5 text-left"
                  >
                    <span className="flex items-center gap-2">
                      <span className="min-w-0 flex-1 font-sans text-[15px] font-medium text-ink">
                        {faq.q}
                      </span>
                      <img
                        src={open ? expandMore : chevronRight}
                        alt=""
                        className="size-5 shrink-0"
                      />
                    </span>
                    {open && (
                      <span className="mt-2 block font-sans text-[13px] leading-[1.36] text-ink-500">
                        {faq.a}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            <SourcesRow onOpen={() => setSourcesOpen(true)} letters={['N', 'M', 'K', 'C']} />
            <div className="mt-3.5 flex items-center gap-1.5">
              <img src={checkBlue} alt="" className="size-4" />
              <p className="font-sans text-[13px] text-ink-500">Reviewed by your care team</p>
            </div>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 px-5">
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(nextTo)}
            className="flex-1 cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
          >
            {nextLabel}
          </button>
          {step > 1 && (
            <button
              type="button"
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
              onClick={() => setBookmarked(!bookmarked)}
              className="flex size-[46px] shrink-0 cursor-pointer items-center justify-center rounded-[14px] border border-accent-200 bg-white"
            >
              <img
                src={bookmarked ? bookmarkFilled : bookmarkBorder}
                alt=""
                className="size-[22px]"
              />
            </button>
          )}
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
    </div>
  )
}

function SourcesRow({
  onOpen,
  letters,
}: {
  onOpen: () => void
  letters: string[]
}) {
  const colors = ['#1c804d', '#1c4fd9', '#b83333', '#002b8f']
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full cursor-pointer items-center gap-2.5 rounded-[14px] bg-accent-50 py-2.5 pr-3.5 pl-3 text-left"
    >
      <div className="flex items-center">
        {letters.map((letter, i) => (
          <span
            key={letter}
            className="flex size-7 items-center justify-center rounded-[14px] border-2 border-accent-50 text-[12px] text-white"
            style={{ background: colors[i], marginLeft: i === 0 ? 0 : -9 }}
          >
            {letter}
          </span>
        ))}
      </div>
      <span className="flex-1">
        <span className="block font-sans text-[15px] font-medium text-ink">Sources</span>
        <span className="block font-sans text-[13px] text-ink-500">4 clinician-reviewed sources</span>
      </span>
      <img src={chevronRight} alt="" className="size-5" />
    </button>
  )
}

function WatchCard({
  title,
  sub,
  onClick,
}: {
  title: string
  sub: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-3.5 flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-accent-200 bg-accent-50 py-2.5 pr-3.5 pl-2.5 text-left"
    >
      <span className="flex h-11 w-[60px] items-center justify-center rounded-[10px] bg-accent">
        <img src={playCircle} alt="" className="size-[26px] brightness-0 invert" />
      </span>
      <span className="flex-1">
        <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
          Watch instead
        </span>
        <span className="block font-sans text-[15px] font-medium text-ink">{title}</span>
        <span className="block font-sans text-[13px] text-ink-500">{sub}</span>
      </span>
      <img src={chevronRight} alt="" className="size-5" />
    </button>
  )
}
