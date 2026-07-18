import { type ReactNode } from 'react'
import { useShellMode } from '../navigation/shell'

/** Slight zoom-out so more of each Figma screen fits in a mobile browser tab. */
const MOBILE_SCALE = 0.85

/**
 * Web (`#/...`): centered iPhone frame for laptop demos.
 * Mobile (`#/mobile/...`): full-viewport app, scaled down a bit for browser chrome.
 */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  const mode = useShellMode()
  const mobile = mode === 'mobile'

  if (mobile) {
    return (
      <div className="min-h-dvh w-full overflow-hidden bg-canvas">
        <div className="relative h-dvh w-full overflow-hidden bg-canvas pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
          <div
            className="flex min-h-0 flex-col overflow-hidden"
            style={{
              width: `${100 / MOBILE_SCALE}%`,
              height: `${100 / MOBILE_SCALE}%`,
              transform: `scale(${MOBILE_SCALE})`,
              transformOrigin: 'top left',
            }}
          >
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh w-full bg-[#e9e5dd] sm:flex sm:items-center sm:justify-center sm:py-8">
      <div className="relative mx-auto flex h-dvh w-full min-h-0 flex-col overflow-hidden bg-canvas sm:h-[844px] sm:w-[390px] sm:rounded-[54px] sm:shadow-[0_24px_80px_rgba(31,26,23,0.35)] sm:ring-8 sm:ring-[#1c1917]">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
      </div>
      <p className="fixed bottom-3 left-1/2 hidden -translate-x-1/2 font-sans text-[11px] tracking-wide text-[#8a8378] sm:block">
        Kindred · interactive prototype
      </p>
    </div>
  )
}
