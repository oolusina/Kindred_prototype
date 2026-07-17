import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import TopBar from './TopBar'

export default function UploadManual() {
  const navigate = useNavigate()
  const [name, setName] = useState('Metformin')
  const [dose, setDose] = useState('1000 mg')
  const [freq, setFreq] = useState('Twice daily')

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <TopBar fallback="/upload/method" title="Manual entry" subtitle="Health Vault" />
      <div className="app-scroll flex flex-1 flex-col gap-4 px-5 pb-6">
        {[
          { label: 'Medication name', value: name, set: setName, placeholder: 'e.g. Metformin' },
          { label: 'Dose', value: dose, set: setDose, placeholder: 'e.g. 500 mg' },
          { label: 'How often', value: freq, set: setFreq, placeholder: 'e.g. Once daily' },
        ].map((field) => (
          <label key={field.label} className="flex flex-col gap-1.5">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
              {field.label}
            </span>
            <input
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              placeholder={field.placeholder}
              className="rounded-2xl border border-accent-100 bg-card px-4 py-3.5 font-sans text-[15px] text-ink outline-none placeholder:text-ink-400 focus:border-accent"
            />
          </label>
        ))}
      </div>
      <div className="shrink-0 px-5 pb-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('/upload/share')}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-[15px] font-sans text-[15px] font-semibold text-canvas shadow-[0px_8px_18px_0px_rgba(0,43,143,0.22)]"
        >
          Save medication
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
