import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import { TopBar } from './shared'
import medicalServices from '../../assets/figma/medical-services.svg'
import favoriteBlue from '../../assets/figma/favorite-blue.svg'
import watchBlue from '../../assets/figma/watch-blue.svg'
import science from '../../assets/figma/science-blue.svg'
import pharmacy from '../../assets/figma/local-pharmacy.svg'
import shieldSmall from '../../assets/figma/onboarding-shield-small.svg'

const SOURCES = [
  {
    key: 'portal',
    icon: medicalServices,
    title: 'Health Portal',
    detail: 'Diagnoses, labs, visits & meds from your care team',
  },
  {
    key: 'apple',
    icon: favoriteBlue,
    title: 'Apple Health',
    detail: 'Steps, heart rate, sleep, workouts',
  },
  {
    key: 'wearables',
    icon: watchBlue,
    title: 'Wearables',
    detail: 'Oura, Fitbit, Garmin, Apple Watch',
  },
  {
    key: 'labs',
    icon: science,
    title: 'Lab providers',
    detail: 'Quest, Labcorp results',
  },
  {
    key: 'pharmacy',
    icon: pharmacy,
    title: 'Pharmacy',
    detail: 'Refills & medication history',
  },
]

export default function SourceHub() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <TopBar title="Connect a source" subtitle="Bring your health data into your vault" />
      <div className="app-scroll flex flex-1 flex-col gap-3.5 px-5 pb-6">
        <div className="flex items-center gap-2 rounded-xl bg-accent-50 p-3">
          <img src={shieldSmall} alt="" className="size-4 shrink-0" />
          <p className="flex-1 font-sans text-[13px] leading-[1.36] text-accent">
            Connections are read-only and stored on your device. You can disconnect at anytime.
          </p>
        </div>
        {SOURCES.map((source) => (
          <div
            key={source.key}
            className="flex items-center gap-3 rounded-2xl border border-accent-100 bg-card p-3.5"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-50">
              <img src={source.icon} alt="" className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                {source.title}
              </p>
              <p className="font-sans text-[13px] leading-[1.36] text-ink-500">{source.detail}</p>
            </div>
            {source.key === 'portal' ? (
              <button
                type="button"
                onClick={() => navigate('/onboarding/find-portal')}
                className="shrink-0 cursor-pointer rounded-full bg-accent px-3.5 py-2 font-sans text-[12px] text-white"
              >
                Connect
              </button>
            ) : (
              <span className="shrink-0 rounded-full bg-accent px-3.5 py-2 font-sans text-[12px] text-white opacity-40">
                Connect
              </span>
            )}
          </div>
        ))}
      </div>
      <HomeIndicator />
    </div>
  )
}
