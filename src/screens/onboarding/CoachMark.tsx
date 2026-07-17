import type { CSSProperties, ReactNode } from 'react'

/** White coach-mark card used by the tour steps. */
export default function CoachMark({
  step,
  totalSteps = 6,
  title,
  body,
  secondaryLabel,
  onSecondary,
  primaryLabel,
  onPrimary,
  className = '',
  style,
  children,
}: {
  step: number
  totalSteps?: number
  title: string
  body: string
  secondaryLabel?: string
  onSecondary?: () => void
  primaryLabel: string
  onPrimary: () => void
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  return (
    <div
      className={`absolute z-50 flex w-[320px] flex-col gap-2 rounded-[16px] bg-white px-4 pb-3.5 pt-4 drop-shadow-[0px_6px_12px_rgba(0,0,0,0.18)] ${className}`}
      style={style}
    >
      {children}
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
        STEP {step} OF {totalSteps}
      </p>
      <p className="font-sans text-[17px] font-semibold text-ink">{title}</p>
      <p className="font-sans text-[13px] leading-[1.36] text-ink-600">{body}</p>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1">
          {Array.from({ length: totalSteps }, (_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full ${
                i === step - 1 ? 'w-[14px] bg-accent' : 'w-1.5 bg-ink-300'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3.5">
          {secondaryLabel && onSecondary && (
            <button
              type="button"
              onClick={onSecondary}
              className="cursor-pointer font-sans text-[13px] font-semibold text-ink-600"
            >
              {secondaryLabel}
            </button>
          )}
          <button
            type="button"
            onClick={onPrimary}
            className="cursor-pointer rounded-full bg-accent px-4 py-[9px] font-sans text-[13px] font-semibold text-white"
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
