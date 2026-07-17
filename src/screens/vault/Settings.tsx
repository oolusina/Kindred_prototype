import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import TopBar from './TopBar'
import lockBlue from '../../assets/figma/lock-blue.svg'
import chevronRight from '../../assets/figma/chevron-right-gray.svg'
import personBlue from '../../assets/figma/person-blue.svg'
import monitorHeartBlue from '../../assets/figma/monitor-heart-blue.svg'
import tuneBlue from '../../assets/figma/tune-blue.svg'
import medicalServicesBlue from '../../assets/figma/medical-services-blue.svg'
import scienceBlue from '../../assets/figma/science-blue.svg'
import eventBlue from '../../assets/figma/event-blue.svg'
import menuBookBlue from '../../assets/figma/menu-book-blue.svg'
import medicationBlue from '../../assets/figma/medication-blue.svg'
import checkBlue from '../../assets/figma/check-blue.svg'
import toggleOn from '../../assets/figma/toggle-on.svg'
import toggleOff from '../../assets/figma/toggle-off.svg'
import { usePrototypeState } from '../../state/PrototypeState'

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className="shrink-0 cursor-pointer"
    >
      <img src={on ? toggleOn : toggleOff} alt="" className="h-7 w-12" />
    </button>
  )
}

function IconChip({ icon }: { icon: string }) {
  return (
    <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[11px] bg-accent-50">
      <img src={icon} alt="" className="size-[22px]" />
    </span>
  )
}

function RowText({ title, sub }: { title: string; sub: string }) {
  return (
    <span className="flex min-w-0 flex-1 flex-col gap-px text-left">
      <span className="font-sans text-[15px] font-medium leading-[1.4] text-ink">{title}</span>
      <span className="font-sans text-[13px] leading-[1.36] text-ink-500">{sub}</span>
    </span>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-ink-500">
      {children}
    </p>
  )
}

function Card({ children }: { children: ReactNode }) {
  return <div className="flex w-full flex-col rounded-2xl bg-card px-3.5 py-1">{children}</div>
}

function Divider() {
  return <div className="h-px w-full bg-accent-100" />
}

export default function Settings() {
  const navigate = useNavigate()
  const { settings: toggles, setSetting } = usePrototypeState()
  const flip = (key: string) => setSetting(key, !toggles[key])

  const linkRow = (icon: string, title: string, sub: string, to?: string) => (
    <button
      type="button"
      onClick={() => to && navigate(to)}
      className="flex w-full cursor-pointer items-center gap-3 py-3.5 active:opacity-70"
    >
      <IconChip icon={icon} />
      <RowText title={title} sub={sub} />
      <img src={chevronRight} alt="" className="size-5 shrink-0" />
    </button>
  )

  const toggleRow = (icon: string, title: string, sub: string, key: string) => (
    <div className="flex w-full items-center gap-3 py-3.5">
      <IconChip icon={icon} />
      <RowText title={title} sub={sub} />
      <Toggle on={toggles[key]} onToggle={() => flip(key)} />
    </div>
  )

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <TopBar title="Settings" subtitle="You're in control of your data" />
      <div className="app-scroll flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3.5 px-5 pb-6">
          <div className="flex w-full items-center gap-2 rounded-xl bg-accent-50 p-3">
            <img src={lockBlue} alt="" className="size-4 shrink-0" />
            <p className="flex-1 font-sans text-[13px] leading-[1.36] text-accent">
              Your health data lives on this device. You choose what&rsquo;s shared — and you can
              change or undo it anytime.
            </p>
          </div>

          <SectionLabel>Account</SectionLabel>
          <Card>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 py-3.5 active:opacity-70"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-[22px] bg-accent">
                <span className="font-sans text-[15px] font-medium leading-[1.4] text-card">S</span>
              </span>
              <RowText title="Shania Williams" sub="shania.w@email.com" />
              <img src={chevronRight} alt="" className="size-5 shrink-0" />
            </button>
            <Divider />
            {linkRow(personBlue, 'Personal details', 'Name, date of birth, contact')}
            <Divider />
            {linkRow(monitorHeartBlue, 'Health conditions', 'Type 2 Diabetes · CKD Stage 3a', '/vault')}
          </Card>

          <SectionLabel>Privacy &amp; data</SectionLabel>
          <Card>
            {toggleRow(
              lockBlue,
              'Pause all data sharing',
              'Instantly stop sharing with everyone',
              'pauseSharing',
            )}
          </Card>
          <Card>
            {linkRow(tuneBlue, 'Data & purposes', 'Choose what each type can contribute to', '/upload/share')}
            <Divider />
            {linkRow(
              medicalServicesBlue,
              'Connected portals & providers',
              '3 connected · manage or disconnect',
              '/connect',
            )}
            <Divider />
            {linkRow(scienceBlue, 'What your data powers', 'See exactly how your data is used')}
            <Divider />
            {linkRow(eventBlue, 'Access log', 'Every time your data was viewed')}
            <Divider />
            {linkRow(menuBookBlue, 'Download my data', 'Export a full copy anytime')}
          </Card>

          <SectionLabel>Notifications</SectionLabel>
          <Card>
            {toggleRow(medicationBlue, 'Medication reminders', 'Doses and refills', 'medicationReminders')}
            <Divider />
            {toggleRow(eventBlue, 'Appointment reminders', 'Upcoming visits & prep', 'appointmentReminders')}
            <Divider />
            {toggleRow(personBlue, 'Community replies', 'Answers to your questions', 'communityReplies')}
            <Divider />
            {toggleRow(menuBookBlue, 'Learning nudges', 'New modules picked for you', 'learningNudges')}
          </Card>

          <SectionLabel>App &amp; support</SectionLabel>
          <Card>
            {linkRow(tuneBlue, 'Display & text size', 'Light theme · Default size')}
            <Divider />
            {linkRow(menuBookBlue, 'Help & FAQ', 'Guides and answers')}
            <Divider />
            {linkRow(lockBlue, 'Terms & Privacy Policy', 'How we protect your data')}
            <Divider />
            {linkRow(checkBlue, 'About Informed Patient', 'Version 1.0.4')}
          </Card>

          <button
            type="button"
            onClick={() => navigate('/onboarding/landing')}
            className="flex w-full cursor-pointer items-center justify-center rounded-[14px] bg-accent py-[15px]"
          >
            <span className="font-sans text-[15px] font-semibold leading-[1.2] text-card">
              Sign out
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/onboarding/landing')}
            className="flex w-full cursor-pointer flex-col items-center gap-[3px] rounded-2xl bg-card px-3.5 py-4 active:opacity-70"
          >
            <span className="font-sans text-[15px] font-semibold leading-[1.2] text-[#d2432d]">
              Delete account &amp; all data
            </span>
            <span className="font-sans text-[13px] leading-[1.36] text-ink-500">
              Permanently erase everything from this device
            </span>
          </button>

          <p className="text-center font-sans text-[13px] leading-[1.36] text-ink-400">
            Kindred · v1.0.4
          </p>
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
