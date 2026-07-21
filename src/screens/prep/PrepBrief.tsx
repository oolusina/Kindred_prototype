import { useSmartBack } from '../../navigation/history'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import closeInk from '../../assets/figma/close-ink.svg'
import { usePrototypeState } from '../../state/PrototypeState'

const SOURCE_LABEL: Record<string, string> = {
  care: 'Patient + care team',
  ai: 'Patient, via AI Search',
  community: 'Patient, via Community',
  learning: 'Patient, via Learning',
}

export default function PrepBrief() {
  const goBack = useSmartBack('/prep')
  const { prepQuestions } = usePrototypeState()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <div className="flex shrink-0 items-start justify-between px-6 pb-1.5 pt-2.5">
        <div className="flex flex-col gap-1">
          <p className="font-serif text-[22px] font-medium text-ink">Visit brief · Garrett M.</p>
          <p className="font-sans text-[11.5px] font-medium text-ink-600">
            Shared Jul 12 · Read-only · Nephrology, Jul 14
          </p>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={goBack}
          className="cursor-pointer"
        >
          <img src={closeInk} alt="" className="size-[22px]" />
        </button>
      </div>
      <div className="app-scroll flex flex-1 flex-col gap-3.5 px-6 pb-6 pt-3.5">
        <div className="flex flex-wrap gap-2">
          {['Type 2 Diabetes', 'CKD Stage 3a · eGFR 48'].map((t) => (
            <span
              key={t}
              className="rounded-full border border-accent bg-accent-50 px-2.5 py-1 font-sans text-[11.5px] font-medium text-[#001d61]"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
          Patient questions
        </p>
        <div className="flex flex-col rounded-2xl bg-card px-4 py-1">
          {prepQuestions.map((q, i) => (
            <div key={q.id}>
              {i > 0 && <div className="h-px w-full bg-[rgba(0,43,143,0.06)]" />}
              <div className="flex flex-col gap-1 py-2.5">
                <p className="font-sans text-[13px] font-medium leading-[18px] text-ink">
                  {i + 1}.  {q.text}
                </p>
                <p className="font-sans text-[11px] text-ink-600">{SOURCE_LABEL[q.kind]}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
          What&apos;s changed since April
        </p>
        <div className="flex flex-col rounded-2xl bg-card px-4 py-1">
          {[
            'eGFR 52 → 48 mL/min',
            'BP trending up: avg 138/86 this month',
            'Urgent care visit, Jun 28 (dehydration)',
            'Metformin 500 mg, unchanged',
          ].map((line, i) => (
            <div key={line}>
              {i > 0 && <div className="h-px w-full bg-[rgba(0,43,143,0.06)]" />}
              <div className="flex items-center gap-2.5 py-2">
                <span
                  className={`size-2 shrink-0 rounded-full ${
                    i >= 2 ? 'bg-accent-300' : 'bg-accent'
                  }`}
                />
                <p className="font-sans text-[12.5px] font-medium text-ink">{line}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-accent bg-accent-50 px-3 py-2">
          <p className="font-sans text-[11px] leading-[15px] text-[#001d61]">
            Prepared by Shania in Kindred. Sources are attached to each question. This brief shares
            only visit prep, not the full record.
          </p>
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
