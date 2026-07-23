import Sheet from '../../components/Sheet'
import info from '../../assets/figma/info.svg'
import verified from '../../assets/figma/verified-blue.svg'

const BARS = [
  { label: 'Lower readings', pct: 62, width: '62%' },
  { label: 'No change', pct: 26, width: '26%' },
  { label: 'Higher / unsure', pct: 12, width: '12%' },
]

const MATCHED_ON = ['Diagnosis', 'A1c range', 'Kidney stage']

/**
 * Figma 2766:7427 — "AI Overview of Responses" preview sheet, opened from a
 * Community question in Prep instead of navigating straight to the answer.
 */
export default function CommunityAiOverviewSheet({
  open,
  onClose,
  onSeeDiscussion,
}: {
  open: boolean
  onClose: () => void
  onSeeDiscussion: () => void
}) {
  return (
    <Sheet open={open} onClose={onClose}>
      <div className="flex flex-col gap-3.5 px-5 pt-1 pb-8">
        <p className="text-center font-serif text-[20px] font-medium text-ink">
          AI Overview of Responses
        </p>

        <div className="flex items-start gap-2 rounded-xl border border-accent-200 bg-white px-3 py-2.5">
          <img src={info} alt="" className="mt-px size-4 shrink-0" />
          <p className="font-sans text-[13px] leading-[1.36] text-ink">
            Matched on your diabetes. Because you also have kidney disease, check big diet
            changes with your care team.
          </p>
        </div>

        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Claim
        </p>
        <p className="font-serif text-[17px] font-semibold leading-[1.28] text-ink">
          Reducing breakfast carbs lowers morning readings
        </p>
        <div className="flex items-center gap-1.5">
          <img src={verified} alt="" className="size-4" />
          <p className="font-sans text-[15px] font-medium text-accent">
            Verified by 254 members&apos; vault data
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-accent-100 bg-card p-4">
          {BARS.map((b) => (
            <div key={b.label} className="flex items-center gap-2.5">
              <span className="w-32 shrink-0 font-sans text-[13px] text-ink">{b.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded bg-accent-100">
                <div className="h-2 rounded bg-accent" style={{ width: b.width }} />
              </div>
              <span className="w-8 text-right font-sans text-[12px] text-ink">{b.pct}%</span>
            </div>
          ))}
          <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
            Of 254 members who tried this · similar diagnosis, A1c range and kidney stage.
          </p>
        </div>

        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Matched on
        </p>
        <div className="flex flex-wrap gap-2">
          {MATCHED_ON.map((t) => (
            <span
              key={t}
              className="rounded-full border border-accent-200 bg-card px-3 py-1.5 font-sans text-[12px] text-accent"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="text-center font-sans text-[13px] text-ink-500">
          Aggregated &amp; de-identified. No individual data shown.
        </p>

        <button
          type="button"
          onClick={onSeeDiscussion}
          className="cursor-pointer self-center font-sans text-[13px] font-semibold text-accent"
        >
          See discussion
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full cursor-pointer rounded-xl bg-accent py-3.5 font-sans text-[15px] font-semibold text-canvas"
        >
          Close
        </button>
      </div>
    </Sheet>
  )
}
