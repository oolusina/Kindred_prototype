import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import TopBar from './TopBar'
import shieldBlue from '../../assets/figma/shield-blue.svg'
import medicalServices from '../../assets/figma/medical-services-blue.svg'
import favorite from '../../assets/figma/favorite-blue.svg'
import checkBlue from '../../assets/figma/check-blue.svg'
import watchGray from '../../assets/figma/watch-gray.svg'
import scienceBlue from '../../assets/figma/science-blue.svg'
import localPharmacy from '../../assets/figma/local-pharmacy.svg'

type Source = {
  icon: string
  title: string
  sub: string
  status: 'connect' | 'connected'
  to?: string
}

const SOURCES: Source[] = [
  {
    icon: medicalServices,
    title: 'Health Portal',
    sub: 'Diagnoses, labs, visits & meds from your care team',
    status: 'connect',
    to: '/connect/find',
  },
  {
    icon: favorite,
    title: 'Apple Health',
    sub: 'Steps, heart rate, sleep, workouts',
    status: 'connected',
  },
  {
    icon: watchGray,
    title: 'Wearables',
    sub: 'Oura, Fitbit, Garmin, Apple Watch',
    status: 'connect',
  },
  {
    icon: scienceBlue,
    title: 'Lab providers',
    sub: 'Quest, Labcorp results',
    status: 'connect',
  },
  {
    icon: localPharmacy,
    title: 'Pharmacy',
    sub: 'Refills & medication history',
    status: 'connect',
  },
]

export default function ConnectHub() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <TopBar fallback="/home" title="Connect a source" subtitle="Bring your health data into your vault" />
      <div className="app-scroll flex flex-1 flex-col gap-3.5 px-5 pb-28">
        <div className="flex items-start gap-2 rounded-xl bg-accent-50 p-3">
          <img src={shieldBlue} alt="" className="mt-0.5 size-4 shrink-0" />
          <p className="font-sans text-[13px] leading-[1.36] text-accent">
            Connections are read-only and stored on your device. You can disconnect at anytime.
          </p>
        </div>
        {SOURCES.map((s) => (
          <div
            key={s.title}
            className="flex items-center gap-3 rounded-2xl border border-accent-100 bg-card p-3.5"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-50">
              <img src={s.icon} alt="" className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[15px] font-medium text-ink">{s.title}</p>
              <p className="font-sans text-[13px] leading-[1.36] text-ink-500">{s.sub}</p>
            </div>
            {s.status === 'connected' ? (
              <span className="flex items-center gap-1 rounded-full bg-accent-50 py-2 pl-2.5 pr-3.5">
                <img src={checkBlue} alt="" className="size-3.5" />
                <span className="font-sans text-[12px] text-accent">Connected</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => navigate(s.to ?? '/connect/find')}
                className="cursor-pointer rounded-full bg-accent px-3.5 py-2 font-sans text-[12px] text-white"
              >
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 px-5 pb-8">
        <button
          type="button"
          onClick={() => navigate('/vault')}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
        >
          Save to my record
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
