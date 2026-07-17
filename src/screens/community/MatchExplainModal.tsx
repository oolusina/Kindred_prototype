import closeInk from '../../assets/figma/close-ink.svg'
import lockBlue from '../../assets/figma/lock-blue.svg'

const FACTORS = [
  { label: 'Diagnosis', pct: 100 },
  { label: 'Biometrics', pct: 88 },
  { label: 'Age band', pct: 90 },
  { label: 'Lifestyle', pct: 84 },
]

/** Figma 2870:6876 — Why this is a 92% match */
export default function MatchExplainModal({
  open,
  onClose,
  onSeeAnswer,
  name = 'QuietHeron',
  matchPct = 92,
}: {
  open: boolean
  onClose: () => void
  onSeeAnswer?: () => void
  name?: string
  matchPct?: number
}) {
  if (!open) return null

  return (
    <div className="absolute inset-0 z-[70] flex items-center justify-center px-8">
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute inset-0 bg-[rgba(0,0,0,0.45)]"
        onClick={onClose}
      />
      <div className="relative z-10 flex w-full max-w-[330px] flex-col gap-2.5 rounded-[22px] bg-canvas p-5">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <p className="font-serif text-[17px] font-semibold leading-[1.28] text-ink">
              Why this is a {matchPct}% match
            </p>
            <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
              {name} · matched to your profile
            </p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="cursor-pointer">
            <img src={closeInk} alt="" className="size-[22px]" />
          </button>
        </div>

        {FACTORS.map((f) => (
          <div key={f.label} className="flex items-center gap-2.5">
            <p className="w-[110px] shrink-0 font-sans text-[13px] text-ink">{f.label}</p>
            <div className="h-2 min-w-0 flex-1 overflow-hidden rounded bg-accent-100">
              <div className="h-full rounded bg-accent" style={{ width: `${f.pct}%` }} />
            </div>
            <p className="w-9 shrink-0 text-right font-sans text-[12px] text-ink">{f.pct}%</p>
          </div>
        ))}

        <div className="flex items-center gap-2 pt-1.5">
          <img src={lockBlue} alt="" className="size-[15px] shrink-0" />
          <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
            Only match scores are shown. You never see their raw data.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            onClose()
            onSeeAnswer?.()
          }}
          className="mt-0.5 h-[34px] w-full cursor-pointer rounded-[10px] bg-accent font-sans text-[12px] text-white"
        >
          See their answer
        </button>
      </div>
    </div>
  )
}
