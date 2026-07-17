import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import TopBar from './TopBar'
import searchInk from '../../assets/figma/search-ink.svg'
import medicalServices from '../../assets/figma/medical-services.svg'
import chevronRight from '../../assets/figma/chevron-right-ink.svg'
import shieldBlue from '../../assets/figma/shield-blue.svg'

const PORTALS = [
  { name: 'MyChart', detail: 'Epic · most hospitals' },
  { name: 'Riverside Health', detail: 'hospital portal' },
  { name: 'Kaiser Permanente', detail: 'member portal' },
  { name: 'UPMC', detail: 'health system' },
  { name: 'Cleveland Clinic', detail: 'health system' },
]

export default function ConnectFind() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const filtered = PORTALS.filter(
    (p) =>
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.detail.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <TopBar fallback="/connect" title="Find your provider" subtitle="Search hospitals, clinics, portals" />
      <div className="app-scroll flex flex-1 flex-col gap-3.5 px-5 pb-6">
        <label className="flex h-12 items-center gap-2 rounded-full border border-accent-200 bg-card px-3.5">
          <img src={searchInk} alt="" className="size-[18px]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hospitals, clinics, portals"
            className="w-full bg-transparent font-sans text-[15px] text-ink outline-none placeholder:text-ink-600"
          />
        </label>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
          Popular
        </p>
        <div className="overflow-hidden rounded-2xl border border-accent-100 bg-card">
          {filtered.map((portal, i) => (
            <button
              key={portal.name}
              type="button"
              onClick={() => navigate('/connect/authorize')}
              className={`flex w-full cursor-pointer items-center gap-3 px-3.5 py-3.5 text-left ${
                i > 0 ? 'border-t border-accent-100' : ''
              }`}
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-accent-50">
                <img src={medicalServices} alt="" className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[15px] font-medium text-ink">{portal.name}</p>
                <p className="font-sans text-[13px] text-ink-600">{portal.detail}</p>
              </div>
              <img src={chevronRight} alt="" className="size-5" />
            </button>
          ))}
        </div>
        <div className="flex items-start gap-2 rounded-xl bg-accent-50 p-3">
          <img src={shieldBlue} alt="" className="mt-0.5 size-4 shrink-0" />
          <p className="font-sans text-[13px] text-accent">
            We connect through your provider&apos;s secure portal. Your login is never stored or
            shared.
          </p>
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
