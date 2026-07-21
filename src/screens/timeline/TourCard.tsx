import type { ReactNode } from 'react'

/** Coach-mark / welcome card for first-visit tours. */
export default function TourCard({
  overline,
  title,
  body,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  step,
  totalSteps,
  className = '',
  children,
}: {
  overline?: string
  title: string
  body: string
  primaryLabel: string
  onPrimary: () => void
  secondaryLabel?: string
  onSecondary?: () => void
  step?: number
  totalSteps?: number
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={`absolute z-50 flex w-[min(320px,calc(100%-32px))] flex-col items-center gap-2.5 rounded-[20px] bg-white px-5 py-[22px] shadow-[0px_6px_24px_0px_rgba(0,0,0,0.18)] ${className}`}
    >
      {children}
      {overline && (
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
          {overline}
        </p>
      )}
      {step != null && totalSteps != null && (
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
          Step {step} of {totalSteps}
        </p>
      )}
      <p className="text-center font-serif text-[26px] font-medium leading-[1.18] text-ink">
        {title}
      </p>
      <p className="text-center font-sans text-[13px] leading-[1.36] text-ink-600">{body}</p>
      {step != null && totalSteps != null && (
        <div className="flex w-full items-center justify-between pt-1">
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
      )}
      {step == null && (
        <>
          <button
            type="button"
            onClick={onPrimary}
            className="mt-1 w-full cursor-pointer rounded-[10px] bg-accent px-3.5 py-[9px] font-sans text-[12px] text-white"
          >
            {primaryLabel}
          </button>
          {secondaryLabel && onSecondary && (
            <button
              type="button"
              onClick={onSecondary}
              className="cursor-pointer font-sans text-[12px] text-ink-600"
            >
              {secondaryLabel}
            </button>
          )}
        </>
      )}
    </div>
  )
}
