import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import TopBar from './TopBar'
import waterDrop from '../../assets/figma/water-drop-blue.svg'
import directionsRun from '../../assets/figma/directions-run-blue.svg'
import restaurant from '../../assets/figma/restaurant-blue.svg'
import bedtime from '../../assets/figma/bedtime-blue.svg'

const ENTRIES = [
  { icon: waterDrop, title: 'Water', detail: '500 ml', time: '2:14 pm' },
  { icon: waterDrop, title: 'Water', detail: '250 ml', time: '11:02 am' },
  { icon: directionsRun, title: 'Activity', detail: 'Walk · 28 min', time: '9:40 am' },
  { icon: restaurant, title: 'Food', detail: 'Oatmeal + berries', time: '8:15 am' },
  { icon: bedtime, title: 'Sleep', detail: '7h 12m', time: 'Last night' },
]

export default function LogToday() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <TopBar fallback="/log" title="Today" subtitle="Thu, Jul 16 · Health Vault" />
      <div className="app-scroll flex flex-1 flex-col gap-2 px-5 pb-28">
        <div className="overflow-hidden rounded-2xl border border-accent-100 bg-card">
          {ENTRIES.map((e, i) => (
            <div
              key={`${e.title}-${e.time}`}
              className={`flex items-center gap-3 px-3.5 py-3.5 ${
                i > 0 ? 'border-t border-accent-100' : ''
              }`}
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-50">
                <img src={e.icon} alt="" className="size-[22px]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[15px] font-medium text-ink">{e.title}</p>
                <p className="font-sans text-[13px] text-ink-500">{e.detail}</p>
              </div>
              <span className="font-sans text-[12px] text-ink-400">{e.time}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-5 pb-8">
        <button
          type="button"
          onClick={() => navigate('/log')}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-[15px] font-sans text-[15px] font-semibold text-canvas"
        >
          Log something new
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
