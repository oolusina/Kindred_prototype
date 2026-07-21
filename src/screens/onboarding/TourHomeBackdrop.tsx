import type { RefObject } from 'react'
import SystemBar from '../../components/SystemBar'
import NavBar from '../../components/NavBar'
import autoAwesome from '../../assets/figma/home_auto_awesome.svg'
import mic from '../../assets/figma/home_mic.svg'
import keyboardArrowRight from '../../assets/figma/home_keyboard_arrow_right.svg'
import addBlue from '../../assets/figma/add-blue.svg'
import editBlue from '../../assets/figma/edit-blue.svg'

/**
 * Simplified static copy of the onboarding-state Home screen, rendered dimmed
 * underneath the tour coach marks. NavBar is locked so tabs / + cannot leave onboarding.
 */
export default function TourHomeBackdrop({
  spotlightVerifyCard = false,
  verifyCardRef,
  addButtonRef,
  onAddClick,
  addIcon,
  addLabel,
}: {
  spotlightVerifyCard?: boolean
  /** Lets the tour step measure the real card position instead of a guessed offset. */
  verifyCardRef?: RefObject<HTMLDivElement | null>
  /** Lets the tour step measure the real + button instead of drawing a duplicate on top of it. */
  addButtonRef?: RefObject<HTMLButtonElement | null>
  /** Keeps the real + button clickable during the tour instead of a separate floating copy. */
  onAddClick?: () => void
  /** Swaps the real + button's icon while onAddClick is active, e.g. to a close icon. */
  addIcon?: string
  /** Swaps the real + button's aria-label while onAddClick is active. */
  addLabel?: string
}) {
  return (
    <div className="absolute inset-0 flex flex-col bg-canvas">
      <div className="flex h-[223px] shrink-0 flex-col rounded-b-header bg-accent px-5">
        <div className="-mx-5">
          <SystemBar variant="light" />
        </div>
        <div className="flex items-start justify-between pt-[22px]">
          <div className="flex flex-col gap-[3px]">
            <span className="font-sans text-[11px] font-semibold tracking-[0.66px] text-accent-200">
              GOOD MORNING
            </span>
            <span className="font-serif text-[38px] font-medium leading-[1.1] text-canvas">
              Shania
            </span>
          </div>
          <div className="flex size-[46px] items-center justify-center rounded-full bg-accent-subtle">
            <span className="font-serif text-[26px] font-medium text-canvas">S</span>
          </div>
        </div>
        <div className="py-2">
          <div className="h-px w-full bg-accent-subtle" />
        </div>
        <div className="flex h-12 items-center gap-2 rounded-full border border-accent-200 bg-white py-1.5 pl-4 pr-1.5">
          <img src={autoAwesome} alt="" className="size-[18px]" />
          <span className="flex-1 font-sans text-[15px] leading-[1.42] text-ink-500">
            Ask about your health
          </span>
          <div className="flex size-9 items-center justify-center rounded-full bg-accent">
            <img src={mic} alt="" className="size-[18px]" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-[22px] pt-[18px]">
        <div
          ref={verifyCardRef}
          className={`flex h-[70px] w-full items-center rounded-card border border-[#f0c519] bg-[#faecb5] px-5 text-left ${
            spotlightVerifyCard ? 'relative z-50' : ''
          }`}
        >
          <div className="flex flex-1 flex-col gap-2.5">
            <span className="font-sans text-[12px] leading-[1.3] text-ink-600">
              Connect with your EHR
            </span>
            <span className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
              Confirm your Diagnosis
            </span>
          </div>
          <img src={keyboardArrowRight} alt="" className="size-6" />
        </div>
        <div className="flex w-full gap-3">
          <div className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-[14px] border-[1.5px] border-dashed border-accent-200">
            <img src={addBlue} alt="" className="size-5" />
            <span className="font-sans text-[15px] font-medium text-accent">Add a widget</span>
          </div>
          <div className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-[14px] border-[1.5px] border-dashed border-accent-200">
            <img src={editBlue} alt="" className="size-5" />
            <span className="font-sans text-[15px] font-medium text-accent">Customize Home</span>
          </div>
        </div>
      </div>
      <NavBar
        tab="home"
        locked
        addButtonRef={addButtonRef}
        onAddOverride={onAddClick}
        addIconOverride={addIcon}
        addLabelOverride={addLabel}
      />
    </div>
  )
}
