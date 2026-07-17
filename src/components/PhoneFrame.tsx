import { type ReactNode } from 'react'

/**
 * On phones the app fills the viewport. On larger screens the app is rendered
 * inside a centered iPhone-like frame so the prototype can be demoed on a laptop.
 */
export default function PhoneFrame({ children }: { children: ReactNode }) {
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
