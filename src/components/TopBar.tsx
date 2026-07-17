import { useSmartBack } from '../navigation/history'
import arrowBack from '../assets/figma/arrow-back.svg'

/**
 * Cream top bar with back, Lora title, optional caption.
 * Back uses React Router history when available, else `fallback`.
 */
export default function TopBar({
  title,
  subtitle,
  fallback = '/home',
  showBack = true,
}: {
  title: string
  subtitle?: string
  /** Used only when there is no in-app history (deep link / fresh load). */
  fallback?: string
  showBack?: boolean
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
        <p className="font-sans text-[13px] leading-[1.36] text-ink-500">{subtitle}</p>
      )}
    </div>
  )
}
