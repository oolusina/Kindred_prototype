import statusIcons from '../assets/figma/home_systembar_status_icons.svg'
import { useShellMode } from '../navigation/shell'

/**
 * Fake iOS status bar — shown in the web framed demo only.
 */
export default function SystemBar({ variant = 'dark' }: { variant?: 'light' | 'dark' }) {
  const mode = useShellMode()
  if (mode === 'mobile') return null

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
