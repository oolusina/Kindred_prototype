import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import TopBar from './TopBar'
import dayDot from '../../assets/figma/day-dot.svg'
import watchGray from '../../assets/figma/watch-gray.svg'
import directionsRunBlue from '../../assets/figma/directions-run-blue.svg'
import localFireBlue from '../../assets/figma/local-fire-blue.svg'
import monitorHeartBlue from '../../assets/figma/monitor-heart-blue.svg'
import bedtimeBlue from '../../assets/figma/bedtime-blue.svg'
import waterDropBlue from '../../assets/figma/water-drop-blue.svg'
import restaurantBlue from '../../assets/figma/restaurant-blue.svg'
import favoriteBlue from '../../assets/figma/favorite-blue.svg'
import sentimentSatisfiedBlue from '../../assets/figma/sentiment-satisfied-blue.svg'
import editWhite from '../../assets/figma/edit-white.svg'

type DeviceStat = { icon: string; value: string; label: string; source: string }
type LogRow = { icon: string; title: string; sub: string; time: string }

const dayData = {
  today: {
    subtitle: 'Today, July 15',
    stats: [
      { icon: directionsRunBlue, value: '8,432', label: 'Steps', source: 'APPLE WATCH' },
      { icon: localFireBlue, value: '172 cal', label: 'Active energy', source: 'APPLE WATCH' },
      { icon: monitorHeartBlue, value: '62 bpm', label: 'Resting HR', source: 'APPLE WATCH' },
      { icon: bedtimeBlue, value: '7h 20m', label: 'Sleep', source: 'OURA' },
    ] as DeviceStat[],
    logs: [
      { icon: waterDropBlue, title: 'Water', sub: '1.5 L, 3 glasses', time: '2:30 PM' },
      { icon: restaurantBlue, title: 'Breakfast', sub: 'Oatmeal & berries', time: '8:15 AM' },
      { icon: favoriteBlue, title: 'Blood pressure', sub: '129 / 82', time: '9:00 AM' },
      { icon: sentimentSatisfiedBlue, title: 'Mood', sub: 'Good', time: '10:00 AM' },
    ] as LogRow[],
  },
  jul13: {
    subtitle: 'Monday, July 13',
    stats: [
      { icon: directionsRunBlue, value: '11,204', label: 'Steps', source: 'APPLE WATCH' },
      { icon: localFireBlue, value: '240 cal', label: 'Active energy', source: 'APPLE WATCH' },
      { icon: monitorHeartBlue, value: '60 bpm', label: 'Resting HR', source: 'APPLE WATCH' },
      { icon: bedtimeBlue, value: '6h 50m', label: 'Sleep', source: 'OURA' },
    ] as DeviceStat[],
    logs: [
      { icon: waterDropBlue, title: 'Water', sub: '2 L, 4 glasses', time: '8:00 PM' },
      { icon: restaurantBlue, title: 'Dinner', sub: 'Salmon & rice', time: '7:15 PM' },
      { icon: sentimentSatisfiedBlue, title: 'Mood', sub: 'Okay', time: '9:00 PM' },
    ] as LogRow[],
  },
}

const week = [
  { label: 'M', day: 13, hasDot: true, route: '/vault/jul-13' },
  { label: 'T', day: 14, hasDot: true, route: null },
  { label: 'W', day: 15, hasDot: true, route: '/vault/today' },
  { label: 'T', day: 16, hasDot: false, route: null },
  { label: 'F', day: 17, hasDot: false, route: null },
  { label: 'S', day: 18, hasDot: false, route: null },
  { label: 'S', day: 19, hasDot: false, route: null },
]

export default function BiometricsDay({ day }: { day: 'today' | 'jul13' }) {
  const navigate = useNavigate()
  const data = dayData[day]
  const selectedDay = day === 'today' ? 15 : 13

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <TopBar fallback="/vault" title="Biometrics and Logs" subtitle={data.subtitle} />
      <div className="app-scroll flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 px-5 pb-6">
          <div className="flex w-full items-center gap-1">
            {week.map((d) => {
              const selected = d.day === selectedDay
              const future = d.day > 15
              const selectedBg =
                day === 'today' ? 'bg-accent text-card' : 'bg-ink-400 text-card'
              return (
                <button
                  key={d.day}
                  type="button"
                  disabled={future || (!d.route && !selected)}
                  onClick={() =>
                    d.route && !selected && navigate(d.route, { replace: true })
                  }
                  className={`flex flex-1 flex-col items-center justify-center gap-1.5 ${
                    future ? '' : 'cursor-pointer'
                  }`}
                >
                  <span
                    className={`font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] ${
                      selected && day === 'today'
                        ? 'text-accent'
                        : future
                          ? 'text-ink-300'
                          : d.day === 15 && day === 'jul13'
                            ? 'text-accent'
                            : 'text-ink-500'
                    }`}
                  >
                    {d.label}
                  </span>
                  <span
                    className={`flex size-9 items-center justify-center rounded-[18px] font-sans text-[15px] font-medium leading-[1.4] ${
                      selected ? selectedBg : future ? 'text-ink-300' : 'text-ink'
                    }`}
                  >
                    {d.day}
                  </span>
                  <span className="flex size-1.5 items-center justify-center">
                    {d.hasDot && <img src={dayDot} alt="" className="size-1.5" />}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex w-full items-center gap-1.5">
            <p className="flex-1 font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-ink-500">
              From your devices
            </p>
            <span className="flex items-center gap-1">
              <img src={watchGray} alt="" className="size-[13px]" />
              <span className="font-sans text-[12px] leading-[1.3] text-ink-500">auto-synced</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {data.stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-start gap-1.5 rounded-2xl border border-accent-100 bg-card p-3.5"
              >
                <span className="flex size-8 items-center justify-center rounded-2xl bg-accent-50">
                  <img src={s.icon} alt="" className="size-[18px]" />
                </span>
                <p className="font-serif text-[20px] font-medium leading-[1.24] text-ink">
                  {s.value}
                </p>
                <p className="font-sans text-[13px] leading-[1.36] text-ink-500">{s.label}</p>
                <p className="font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-accent">
                  {s.source}
                </p>
              </div>
            ))}
          </div>

          <p className="font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-ink-500">
            Your logs
          </p>
          <div className="flex flex-col rounded-2xl border border-accent-100 bg-card px-3.5 py-1">
            {data.logs.map((l, i) => (
              <div key={l.title}>
                {i > 0 && <div className="h-px w-full bg-accent-100" />}
                <div className="flex w-full items-center gap-3 py-3">
                  <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[17px] bg-accent-50">
                    <img src={l.icon} alt="" className="size-[18px]" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-px">
                    <span className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                      {l.title}
                    </span>
                    <span className="font-sans text-[13px] leading-[1.36] text-ink-500">
                      {l.sub}
                    </span>
                  </span>
                  <span className="font-sans text-[13px] leading-[1.36] text-ink-500">{l.time}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate('/log')}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-accent py-3.5"
          >
            <img src={editWhite} alt="" className="size-[18px]" />
            <span className="font-sans text-[15px] font-semibold leading-[1.2] text-card">
              Add to this day
            </span>
          </button>
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
