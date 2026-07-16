import statusIcons from '../assets/figma/home_systembar_status_icons.svg'

/**
 * iOS status bar. `variant="light"` renders cream (for dark/blue headers),
 * `variant="dark"` renders near-black (for light backgrounds).
 */
export default function SystemBar({ variant = 'dark' }: { variant?: 'light' | 'dark' }) {
  const isLight = variant === 'light'
  return (
    <div className="pointer-events-none relative z-20 flex h-11 w-full shrink-0 items-center justify-between px-[27px]">
      <span
        className={`w-[54px] text-center font-sans text-[14px] font-semibold tracking-[-0.28px] ${
          isLight ? 'text-canvas' : 'text-ink'
        }`}
      >
        9:41
      </span>
      <img
        src={statusIcons}
        alt=""
        className="h-[11px] w-[67px]"
        style={isLight ? undefined : { filter: 'brightness(0) saturate(100%)' }}
      />
    </div>
  )
}
