import type { Ref } from 'react'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import SegmentedTabs from '../../components/SegmentedTabs'
import arrowBack from '../../assets/figma/arrow-back.svg'
import { useReplaceNavigate, useSmartBack } from '../../navigation/history'

export function PrepHeader({
  phase,
  /** Used only when there is no in-app history. */
  fallback = '/home',
  tabsRef,
  elevateTabs = false,
  lockPhase = false,
}: {
  phase: 'before' | 'during'
  fallback?: string
  tabsRef?: Ref<HTMLDivElement>
  elevateTabs?: boolean
  lockPhase?: boolean
}) {
  const goBack = useSmartBack(fallback)
  const replaceNavigate = useReplaceNavigate()
  return (
    <>
      <SystemBar variant="dark" />
      <div className="flex shrink-0 gap-3.5 px-6 pb-1.5 pt-2.5">
        <button
          type="button"
          aria-label="Back"
          onClick={goBack}
          className="mt-0.5 cursor-pointer"
        >
          <img src={arrowBack} alt="" className="size-6" />
        </button>
        <div className="flex flex-col gap-1">
          <p className="font-serif text-[22px] font-medium leading-normal text-ink">
            Prep for next appointment
          </p>
          <p className="font-sans text-[11.5px] font-medium text-ink-600">
            Nephrology · Tue, Jul 14 · 10:30 am
          </p>
        </div>
      </div>
      <div className="px-6 pt-4">
        <div
          ref={tabsRef}
          className={elevateTabs ? 'relative z-[60] rounded-full bg-canvas' : undefined}
        >
          <SegmentedTabs
            size="sm"
            value={phase}
            onChange={(next) => {
              if (lockPhase) return
              replaceNavigate(next === 'before' ? '/prep' : '/prep/during')
            }}
            options={[
              { value: 'before', label: 'Before visit' },
              { value: 'during', label: 'During visit' },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export function Tag({
  kind,
}: {
  kind: 'care' | 'ai' | 'community' | 'learning'
}) {
  const styles = {
    care: 'bg-ink-200 text-[#262626]',
    ai: 'bg-accent-50 text-[#001d61]',
    community: 'bg-[#e1f6ed] text-[#154730]',
    learning: 'bg-[#fdf6dc] text-[#564709]',
  }
  const labels = {
    care: 'CARE TEAM',
    ai: 'AI SEARCH',
    community: 'COMMUNITY',
    learning: 'LEARNING',
  }
  return (
    <span
      className={`rounded-md px-2 py-1.5 font-sans text-[11px] font-semibold tracking-[0.66px] ${styles[kind]}`}
    >
      {labels[kind]}
    </span>
  )
}

export function PrepFooter({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <div className="shrink-0 px-6 pb-3 pt-2.5">
      <button
        type="button"
        onClick={onClick}
        className="w-full cursor-pointer rounded-xl bg-accent py-[15px] font-sans text-[15px] font-semibold text-canvas shadow-[0px_8px_18px_0px_rgba(0,43,143,0.22)]"
      >
        {label}
      </button>
      <HomeIndicator />
    </div>
  )
}
