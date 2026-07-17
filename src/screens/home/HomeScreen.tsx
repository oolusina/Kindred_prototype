import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import NavBar from '../../components/NavBar'
import SideMenu, { ProfileAvatarButton } from '../../components/SideMenu'
import autoAwesome from '../../assets/figma/home_auto_awesome.svg'
import mic from '../../assets/figma/home_mic.svg'
import keyboardArrowRight from '../../assets/figma/home_keyboard_arrow_right.svg'
import menuBook from '../../assets/figma/home_menu_book.svg'
import check from '../../assets/figma/home_check.svg'
import tuneBlue from '../../assets/figma/tune-blue.svg'
import { usePrototypeState } from '../../state/PrototypeState'

const SHARING_LABELS: Record<string, string> = {
  meds: 'Medications',
  labs: 'Lab Results',
  vitals: 'Vitals',
  logs: 'Daily logs',
}

export default function HomeScreen() {
  const navigate = useNavigate()
  const { homeWidgets, sharing } = usePrototypeState()
  const [menuOpen, setMenuOpen] = useState(false)

  const sharingOn = Object.entries(sharing)
    .filter(([, on]) => on)
    .map(([key]) => SHARING_LABELS[key] ?? key)

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-canvas">
      <div className="shrink-0 rounded-b-header bg-accent">
        <SystemBar variant="light" />
        <div className="flex flex-col gap-2.5 px-5 pt-5 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex w-[291px] flex-col gap-2.5">
              <div className="flex flex-col">
                <p className="font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-accent-300">
                  Good morning
                </p>
                <p className="font-serif text-[38px] font-medium leading-[1.1] text-canvas">
                  Shania
                </p>
              </div>
              <div className="flex items-center gap-[7px]">
                <span className="rounded-2xl bg-accent-subtle px-3 py-1.5 font-sans text-[12px] leading-[1.3] whitespace-nowrap text-canvas">
                  Type 2 Diabetes
                </span>
                <span className="rounded-2xl bg-accent-subtle px-3 py-1.5 font-sans text-[12px] leading-[1.3] whitespace-nowrap text-canvas">
                  CKD · Stage 3a · eGFR 48
                </span>
              </div>
            </div>
            <ProfileAvatarButton onClick={() => setMenuOpen(true)} />
          </div>
          <div className="py-1">
            <div className="h-px w-full bg-accent-subtle" />
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate('/ask')}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/ask')}
            className="flex h-12 w-full cursor-pointer items-center gap-2 rounded-full border border-accent-200 bg-card py-1.5 pr-1.5 pl-4"
          >
            <img src={autoAwesome} alt="" className="size-[18px]" />
            <span className="flex-1 text-left font-sans text-[15px] leading-[1.42] text-ink-500">
              Ask about your health
            </span>
            <button
              type="button"
              aria-label="Voice search"
              onClick={(e) => {
                e.stopPropagation()
                navigate('/ask/voice')
              }}
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-[18px] bg-accent"
            >
              <img src={mic} alt="" className="size-[18px]" />
            </button>
          </div>
        </div>
      </div>

      <div className="app-scroll flex-1">
        <div className="flex flex-col gap-4 px-[22px] pt-4 pb-[130px]">
          {homeWidgets.appointments !== false && (
            <button
              type="button"
              onClick={() => navigate('/prep')}
              className="flex w-full cursor-pointer items-center gap-[25px] rounded-card border-[3px] border-white bg-card px-5 py-4 text-left shadow-[0px_0px_14px_0px_rgba(0,43,143,0.05)]"
            >
              <div className="flex flex-1 flex-col gap-2.5">
                <p className="font-sans text-[12px] font-bold leading-[1.3] text-ink-600">
                  Tue, Jul 14 · 10:30 AM · In 2 weeks
                </p>
                <p className="font-sans text-[15px] leading-[1.42] text-ink">
                  Nephrology appointment
                </p>
                <p className="font-sans text-[12px] leading-[1.3] text-ink-600">
                  Prep For Your Next Appointment
                </p>
              </div>
              <img src={keyboardArrowRight} alt="" className="size-6 shrink-0" />
            </button>
          )}

          {homeWidgets.learning !== false && (
            <button
              type="button"
              onClick={() => navigate('/learn/module')}
              className="flex w-full cursor-pointer items-start gap-4 rounded-card-lg bg-card p-4 text-left shadow-card"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-50">
                <img src={menuBook} alt="" className="size-5 object-contain" />
              </div>
              <div className="flex flex-1 flex-col gap-2.5">
                <p className="font-sans text-[15px] leading-[1.42] text-ink">
                  Understanding your kidneys
                </p>
                <p className="font-sans text-[12px] leading-[1.3] text-ink-500">
                  Learning module · 2 of 5
                </p>
                <div className="h-1.5 w-full rounded-[3px] bg-accent-50">
                  <div className="h-1.5 w-[40%] rounded-[3px] bg-accent" />
                </div>
              </div>
            </button>
          )}

          {(homeWidgets.snapshot !== false || homeWidgets.sharing !== false) && (
            <div className="flex items-stretch gap-5">
              {homeWidgets.snapshot !== false && (
                <div className="flex flex-1 flex-col gap-2.5 rounded-card-lg bg-accent-100 px-3 py-[13px] text-accent">
                  <p className="font-sans text-[15px] leading-[1.42]">Today&rsquo;s Snapshot</p>
                  <div className="flex flex-col">
                    <p className="font-sans text-[12px] leading-[1.3]">Glucose (avg)</p>
                    <p className="font-sans text-[15px] font-medium leading-[1.4]">132 mg/dL</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-sans text-[12px] leading-[1.3]">Blood pressure</p>
                    <p className="font-sans text-[15px] font-medium leading-[1.4]">129 / 82</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-sans text-[12px] leading-[1.3]">Hemoglobin A1C</p>
                    <p className="font-sans text-[15px] font-medium leading-[1.4]">7.3%</p>
                  </div>
                </div>
              )}
              {homeWidgets.sharing !== false && (
                <div className="flex flex-1 flex-col gap-[9px] rounded-2xl border border-accent-100 bg-card p-3.5">
                  <p className="font-sans text-[15px] font-medium leading-[1.4] whitespace-nowrap text-ink">
                    Currently Sharing
                  </p>
                  {(sharingOn.length ? sharingOn.slice(0, 3) : ['Nothing selected']).map(
                    (label, i) => (
                      <div key={label} className="flex w-full items-start gap-[9px]">
                        {sharingOn.length > 0 && (
                          <img src={check} alt="" className="size-[18px] shrink-0" />
                        )}
                        <p className="flex-1 font-sans text-[15px] font-medium leading-[1.4] text-accent">
                          {label}
                          {sharingOn.length > 3 && i === 2 ? '...' : ''}
                        </p>
                      </div>
                    ),
                  )}
                  <button
                    type="button"
                    onClick={() => navigate('/upload/share')}
                    className="w-full cursor-pointer rounded-full bg-accent-50 py-1.5 font-sans text-[12px] leading-[1.3] text-accent"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => navigate('/home/customize')}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-dashed border-accent px-5 py-3.5"
          >
            <img src={tuneBlue} alt="" className="size-[18px]" />
            <span className="font-sans text-[15px] font-semibold leading-[1.2] text-accent">
              Customize Home
            </span>
          </button>
        </div>
      </div>

      <NavBar tab="home" />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}
