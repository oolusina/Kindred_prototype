import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import TopBar from './TopBar'
import waterDrop from '../../assets/figma/water-drop-blue.svg'
import directionsRun from '../../assets/figma/directions-run-blue.svg'
import restaurant from '../../assets/figma/restaurant-blue.svg'
import bedtime from '../../assets/figma/bedtime-blue.svg'
import sentiment from '../../assets/figma/sentiment-satisfied-blue.svg'
import medicalServices from '../../assets/figma/medical-services-blue.svg'
import favorite from '../../assets/figma/favorite-blue.svg'
import tune from '../../assets/figma/tune-blue.svg'
import addBlue from '../../assets/figma/add-blue.svg'

/** Figma 2398:3786 — Upload · Daily log */
const KEEP = [
  { icon: waterDrop, title: 'Water', sub: 'Last logged 2h ago', to: '/log/water' },
  { icon: directionsRun, title: 'Activity', sub: 'Last logged this morning', to: '/log/water' },
  { icon: restaurant, title: 'Food', sub: 'Last logged yesterday', to: '/log/water' },
  { icon: bedtime, title: 'Sleep', sub: 'Last logged last night', to: '/log/water' },
]

const NEW_ROW1 = [
  { icon: sentiment, label: 'Mood' },
  { icon: medicalServices, label: 'Symptom' },
  { icon: favorite, label: 'Blood pressure' },
]

const NEW_ROW2 = [
  { icon: tune, label: 'More' },
  { icon: addBlue, label: 'Add' },
]

function NewTile({
  icon,
  label,
  onClick,
}: {
  icon: string
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[92px] min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-[18px] border border-accent-100 bg-card py-3.5"
    >
      <div className="flex size-[38px] items-center justify-center rounded-full bg-accent-50">
        <img src={icon} alt="" className="size-[22px]" />
      </div>
      <span className="px-1 text-center font-sans text-[12px] leading-[1.3] text-ink">{label}</span>
    </button>
  )
}

export default function DailyLog() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <TopBar fallback="/home" title="Daily log" subtitle="Health Vault" />
      <div className="app-scroll flex min-h-0 flex-1 flex-col gap-3.5 px-5 pb-28">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Keep logging
        </p>
        <div className="flex flex-col gap-2">
          {KEEP.map((row) => (
            <div
              key={row.title}
              className="flex items-center gap-3 rounded-2xl border border-accent-100 bg-card px-3.5 py-3"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-50">
                <img src={row.icon} alt="" className="size-[22px]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[15px] font-medium text-ink">{row.title}</p>
                <p className="font-sans text-[13px] text-ink-500">{row.sub}</p>
              </div>
              <button
                type="button"
                onClick={() => navigate(row.to)}
                className="cursor-pointer rounded-full bg-accent px-3.5 py-2 font-sans text-[15px] font-semibold text-white"
              >
                Log again
              </button>
            </div>
          ))}
        </div>

        <p className="pt-1 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Log something new
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            {NEW_ROW1.map((tile) => (
              <NewTile
                key={tile.label}
                icon={tile.icon}
                label={tile.label}
                onClick={() => navigate('/log/water')}
              />
            ))}
          </div>
          <div className="flex gap-3">
            {NEW_ROW2.map((tile) => (
              <NewTile
                key={tile.label}
                icon={tile.icon}
                label={tile.label}
                onClick={() => navigate('/log/water')}
              />
            ))}
            {/* Empty third cell — matches Figma 3-column rhythm */}
            <div className="min-w-0 flex-1" aria-hidden />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 px-5 pb-8">
        <button
          type="button"
          onClick={() => navigate('/vault/today')}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
        >
          View past log records
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
