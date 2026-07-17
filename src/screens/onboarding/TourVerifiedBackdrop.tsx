import SystemBar from '../../components/SystemBar'
import NavBar from '../../components/NavBar'
import autoAwesome from '../../assets/figma/home_auto_awesome.svg'
import mic from '../../assets/figma/home_mic.svg'
import keyboardArrowRight from '../../assets/figma/home_keyboard_arrow_right.svg'
import menuBook from '../../assets/figma/navbar_menu_book_active.svg'
import checkBlue from '../../assets/figma/home_check.svg'
import type { NavTab } from '../../components/NavBar'

/** Post-verify Home underlay for feature tour steps (prep / community / timeline / control). */
export default function TourVerifiedBackdrop({
  spotlight = 'prep',
  navTab = 'home',
}: {
  spotlight?: 'prep' | 'community' | 'timeline' | 'sharing' | 'none'
  navTab?: NavTab
}) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-canvas">
      <div className="relative flex shrink-0 flex-col gap-2.5 rounded-b-header bg-accent px-5 pb-6">
        <div className="-mx-5">
          <SystemBar variant="light" />
        </div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col">
              <span className="font-sans text-[11px] font-semibold tracking-[0.66px] text-accent-300">
                GOOD MORNING
              </span>
              <span className="font-serif text-[38px] font-medium leading-[1.1] text-canvas">
                Shania
              </span>
            </div>
            <div className="flex gap-[7px]">
              <span className="rounded-2xl bg-accent-subtle px-3 py-1.5 font-sans text-[12px] text-canvas">
                Type 2 Diabetes
              </span>
              <span className="rounded-2xl bg-accent-subtle px-3 py-1.5 font-sans text-[12px] text-canvas">
                CKD · Stage 3a · eGFR 48
              </span>
            </div>
          </div>
          <div className="flex size-[42px] items-center justify-center rounded-full bg-accent-subtle">
            <span className="font-serif text-[26px] font-medium text-canvas">S</span>
          </div>
        </div>
        <div className="py-1">
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

      <div className="flex flex-1 flex-col gap-4 px-[22px] pt-4 pb-28">
        <div
          className={`flex h-[103px] w-full items-center gap-6 rounded-card bg-card px-5 shadow-[0px_0px_14px_0px_rgba(0,43,143,0.05)] ${
            spotlight === 'prep'
              ? 'relative z-50 border-[3px] border-white shadow-[0px_0px_28px_4px_rgba(255,255,255,0.45)]'
              : ''
          }`}
        >
          <div className="flex flex-1 flex-col gap-2.5">
            <p className="font-sans text-[12px] font-bold leading-[1.3] text-ink-600">
              Tue, Jul 14 · 10:30 AM · In 2 weeks
            </p>
            <p className="font-sans text-[15px] leading-[1.42] text-ink">Nephrology appointment</p>
            <p className="font-sans text-[12px] leading-[1.3] text-ink-600">
              Prep For Your Next Appointment
            </p>
          </div>
          <img src={keyboardArrowRight} alt="" className="size-6 shrink-0" />
        </div>

        <div className="flex w-full gap-3 rounded-card-lg bg-card p-4 shadow-[0px_4px_14px_0px_rgba(0,43,143,0.05)]">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-50">
            <img src={menuBook} alt="" className="size-5" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
            <p className="font-sans text-[15px] leading-[1.42] text-ink">Understanding your kidneys</p>
            <p className="font-sans text-[12px] leading-[1.3] text-ink-500">Learning module · 2 of 5</p>
            <div className="h-1.5 w-full overflow-hidden rounded-[3px] bg-accent-50">
              <div className="h-full w-[40%] rounded-[3px] bg-accent" />
            </div>
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex w-[164px] flex-col gap-2.5 rounded-card-lg bg-accent-100 px-3 py-3">
            <p className="font-sans text-[15px] text-accent">Today&apos;s Snapshot</p>
            <div>
              <p className="font-sans text-[12px] text-accent">Glucose (avg)</p>
              <p className="font-sans text-[15px] font-medium text-accent">132 mg/dL</p>
            </div>
            <div>
              <p className="font-sans text-[12px] text-accent">Blood pressure</p>
              <p className="font-sans text-[15px] font-medium text-accent">129 / 82</p>
            </div>
          </div>
          <div
            className={`flex w-[164px] flex-col gap-2 rounded-2xl border border-accent-100 bg-card p-3.5 ${
              spotlight === 'sharing'
                ? 'relative z-50 border-white shadow-[0px_0px_28px_4px_rgba(255,255,255,0.45)]'
                : ''
            }`}
          >
            <p className="font-sans text-[15px] font-medium text-ink">Currently Sharing</p>
            {['Medications', 'Diagnoses', 'Lab Results...'].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <img src={checkBlue} alt="" className="size-[18px]" />
                <span className="font-sans text-[15px] font-medium text-accent">{label}</span>
              </div>
            ))}
            <div className="mt-1 flex w-full items-center justify-center rounded-full bg-accent-50 py-1.5">
              <span className="font-sans text-[12px] text-accent">Edit</span>
            </div>
          </div>
        </div>
      </div>

      <NavBar
        tab={
          spotlight === 'community'
            ? 'community'
            : spotlight === 'timeline'
              ? 'timeline'
              : navTab
        }
        locked
      />
      {spotlight === 'community' && (
        <div className="pointer-events-none absolute bottom-[18px] left-[84px] z-[55] h-[78px] w-[72px] rounded-[20px] border-[3px] border-white shadow-[0px_0px_24px_2px_rgba(255,255,255,0.5)]" />
      )}
      {spotlight === 'timeline' && (
        <div className="pointer-events-none absolute bottom-[18px] right-[84px] z-[55] h-[78px] w-[72px] rounded-[20px] border-[3px] border-white shadow-[0px_0px_24px_2px_rgba(255,255,255,0.5)]" />
      )}
    </div>
  )
}

