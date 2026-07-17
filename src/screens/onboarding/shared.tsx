import arrowBack from '../../assets/figma/arrow-back.svg'
import shieldSmall from '../../assets/figma/onboarding-shield-small.svg'
import type { SyncKey } from '../../state/PrototypeState'
import { useSmartBack } from '../../navigation/history'

/** All-set "Choose what syncs" rows — also the share-insights chip catalog. */
export const SYNC_OPTIONS: {
  key: SyncKey
  label: string
  detail?: string
  locked?: boolean
}[] = [
  { key: 'diagnoses', label: 'Diagnoses', detail: 'Required for verification', locked: true },
  { key: 'medications', label: 'Medications' },
  { key: 'labs', label: 'Lab results' },
  { key: 'appointments', label: 'Appointments' },
  { key: 'notes', label: 'Visit notes' },
  { key: 'immunizations', label: 'Immunizations' },
]

/** Primary CTA button used across onboarding. */
export function PrimaryButton({
  label,
  onClick,
  variant = 'blue',
  className = '',
}: {
  label: string
  onClick: () => void
  variant?: 'blue' | 'white'
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] px-5 py-3.5 font-sans text-[15px] font-semibold leading-[1.2] ${
        variant === 'blue'
          ? 'bg-accent text-white'
          : 'border border-accent-200 bg-white text-accent'
      } ${className}`}
    >
      {label}
    </button>
  )
}

/** "Your data stays private, on your device" footer line. */
export function PrivacyFooter({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <img src={shieldSmall} alt="" className="size-4" />
      <span className={`font-sans text-[13px] ${light ? 'text-canvas' : 'text-ink-600'}`}>
        Your data stays private, on your device
      </span>
    </div>
  )
}

/** Back arrow + Lora heading + caption header used on onboarding steps. */
export function TopBar({
  title,
  subtitle,
  showBack = true,
  fallback = '/onboarding/landing',
}: {
  title: string
  subtitle?: string
  showBack?: boolean
  fallback?: string
}) {
  const goBack = useSmartBack(fallback)
  return (
    <div className="flex w-full shrink-0 flex-col gap-1 px-5 pb-4 pt-2.5">
      <div className="flex w-full items-center justify-between pb-1.5">
        {showBack ? (
          <button type="button" aria-label="Back" onClick={goBack} className="cursor-pointer">
            <img src={arrowBack} alt="" className="size-[26px]" />
          </button>
        ) : (
          <div className="size-[26px]" />
        )}
      </div>
      <h1 className="font-serif text-[26px] font-medium leading-[1.18] text-ink">{title}</h1>
      {subtitle && (
        <p className="font-sans text-[13px] leading-[1.36] text-ink-600">{subtitle}</p>
      )}
    </div>
  )
}

/** Shared layout for the three intro carousel slides (Community / Vault / AI). */
export function IntroSlide({
  overline,
  title,
  body,
  active,
  onNext,
  nextLabel = 'Next',
  children,
}: {
  overline: string
  title: React.ReactNode
  body: string
  active: number
  onNext: () => void
  nextLabel?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 flex-col items-center gap-3.5 px-5 pt-12">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
          {overline}
        </p>
        <h1 className="text-center font-serif text-[32px] font-medium leading-[1.16] text-ink">
          {title}
        </h1>
        <p className="w-[310px] text-center font-sans text-[15px] leading-[1.42] text-ink-500">
          {body}
        </p>
      </div>
      <div className="relative flex-1">{children}</div>
      <div className="flex shrink-0 flex-col items-center gap-3 px-5 pb-4">
        <Dots count={3} active={active} />
        <PrimaryButton label={nextLabel} onClick={onNext} className="mt-2" />
        <PrivacyFooter />
      </div>
    </div>
  )
}

/** Progress dots (active dot is an elongated pill). */
export function Dots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-[3px] ${
            i === active ? 'w-5 bg-accent' : 'w-1.5 bg-accent-200'
          }`}
        />
      ))}
    </div>
  )
}
