import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBack from '../../assets/figma/arrow-back.svg'
import dragHandleBar from '../../assets/figma/drag-handle-bar.svg'
import toggleOn from '../../assets/figma/toggle-on.svg'
import toggleOff from '../../assets/figma/toggle-off.svg'
import eventBlue from '../../assets/figma/event-blue.svg'
import menuBookBlue from '../../assets/figma/menu-book-blue.svg'
import scienceBlue from '../../assets/figma/science-blue.svg'
import lockBlue from '../../assets/figma/lock-blue.svg'
import monitorHeartBlue from '../../assets/figma/monitor-heart-blue.svg'
import medicationBlue from '../../assets/figma/medication-blue.svg'
import checkBlue from '../../assets/figma/check-blue.svg'
import personBlue from '../../assets/figma/person-blue.svg'
import medicalServicesBlue from '../../assets/figma/medical-services-blue.svg'
import checkBoxBlue from '../../assets/figma/check-box-blue.svg'
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

const homeWidgets = [
  { key: 'appointments', icon: eventBlue, title: 'Appointments', sub: "What's coming up" },
  { key: 'learning', icon: menuBookBlue, title: 'Learning progress', sub: 'Your current module' },
  { key: 'snapshot', icon: scienceBlue, title: "Today's snapshot", sub: 'Your key numbers' },
  {
    key: 'sharing',
    icon: lockBlue,
    title: 'Currently sharing',
    sub: 'Data tags that were selected by you',
  },
]

const addWidgets = [
  { key: 'biometrics', icon: monitorHeartBlue, title: 'Biometrics', sub: 'From other IoT Health Apps' },
  { key: 'timeline', icon: eventBlue, title: 'New on timeline', sub: 'Events pulled from health portals' },
  { key: 'medications', icon: medicationBlue, title: 'Medications', sub: "Today's doses & reminders" },
  { key: 'reminders', icon: checkBlue, title: 'Reminders', sub: 'Meds, labs, tasks' },
  { key: 'labs', icon: scienceBlue, title: 'Lab trends', sub: 'See your eGFR over time' },
  { key: 'community', icon: personBlue, title: 'Community', sub: 'New replies for you' },
  { key: 'care', icon: medicalServicesBlue, title: 'Care team', sub: 'who to contact' },
  { key: 'goals', icon: checkBoxBlue, title: 'Goals & habits', sub: 'track daily habits' },
]

export default function HomeCustomize() {
  const navigate = useNavigate()
  const { homeWidgets: toggles, setHomeWidget } = usePrototypeState()
  const [added, setAdded] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem('kindred.home.added') || '{}')
    } catch {
      return {}
    }
  })

  const setAddedPersist = (next: Record<string, boolean>) => {
    setAdded(next)
    localStorage.setItem('kindred.home.added', JSON.stringify(next))
  }

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex shrink-0 flex-col gap-1 px-5 pt-2.5 pb-4">
        <div className="flex w-full items-center justify-between pb-1.5">
          <button
            type="button"
            aria-label="Back"
            onClick={() => navigate('/home')}
            className="cursor-pointer"
          >
            <img src={arrowBack} alt="" className="size-[26px]" />
          </button>
        </div>
        <h1 className="font-serif text-[26px] font-medium leading-[1.18] text-ink">
          Customize home
        </h1>
        <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
          Turn widgets on or off, or add new ones.
        </p>
      </div>

      <div className="app-scroll flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3.5 px-5 pb-6">
          <p className="font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-ink-500">
            On your home
          </p>
          <div className="flex flex-col rounded-2xl border border-accent-100 bg-card px-3.5 py-1">
            {homeWidgets.map((w, i) => (
              <div key={w.key}>
                {i > 0 && <div className="h-px w-full bg-accent-100" />}
                <div className="flex w-full items-center gap-3 py-3">
                  <span className="flex h-4 w-2.5 shrink-0 gap-[3px] overflow-clip">
                    <img src={dragHandleBar} alt="" className="h-4 w-[3px]" />
                    <img src={dragHandleBar} alt="" className="h-4 w-[3px]" />
                  </span>
                  <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[10px] bg-accent-50">
                    <img src={w.icon} alt="" className="size-[18px]" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-px">
                    <span className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                      {w.title}
                    </span>
                    <span className="font-sans text-[13px] leading-[1.36] text-ink-500">
                      {w.sub}
                    </span>
                  </span>
                  <Toggle
                    on={Boolean(toggles[w.key])}
                    onToggle={() => setHomeWidget(w.key, !toggles[w.key])}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="pt-1 font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-ink-500">
            Add widgets
          </p>
          <div className="grid grid-cols-2 gap-3">
            {addWidgets.map((w) => (
              <div
                key={w.key}
                className="flex flex-col items-start gap-2 rounded-2xl border border-accent-100 bg-card p-3.5"
              >
                <span className="flex size-9 items-center justify-center rounded-[11px] bg-accent-50">
                  <img src={w.icon} alt="" className="size-5" />
                </span>
                <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">{w.title}</p>
                <p className="font-sans text-[13px] leading-[1.36] text-ink-500">{w.sub}</p>
                <button
                  type="button"
                  onClick={() => setAddedPersist({ ...added, [w.key]: !added[w.key] })}
                  className={`mt-auto cursor-pointer rounded-full py-1.5 pr-3 pl-2.5 font-sans text-[12px] leading-[1.3] ${
                    added[w.key] ? 'bg-accent text-card' : 'bg-accent-50 text-accent'
                  }`}
                >
                  {added[w.key] ? '✓ Added' : '+ Add'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0 px-[21px] pt-2 pb-2">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-accent px-5 py-3.5"
        >
          <span className="font-sans text-[15px] font-semibold leading-[1.2] text-card">Done</span>
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
