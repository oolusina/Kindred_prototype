import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import TopBar from './TopBar'
import medicationBlue from '../../assets/figma/medication-blue.svg'
import medicationWhite from '../../assets/figma/medication-white.svg'
import medicationGray from '../../assets/figma/medication-gray.svg'

const current = [
  {
    name: 'Metformin',
    dose: '1000 mg',
    sub: 'Twice daily · for blood sugar',
    refill: 'Refill in 12 days',
  },
  {
    name: 'Lisinopril',
    dose: '10 mg',
    sub: 'Once daily · protects your kidneys',
    refill: 'Refill in 3 days',
  },
]

export default function VaultMedications() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <TopBar fallback="/vault" title="Medications" subtitle="Current & past" />
      <div className="app-scroll flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3.5 px-5 pb-6">
          <p className="font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-ink-500">
            Current
          </p>
          {current.map((m) => (
            <div
              key={m.name}
              className="flex w-full items-start gap-3 rounded-2xl border border-accent-100 bg-card p-3.5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-50">
                <img src={medicationBlue} alt="" className="size-[22px]" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <div className="flex items-center gap-1.5">
                  <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                    {m.name}
                  </p>
                  <p className="font-sans text-[13px] leading-[1.36] text-ink-500">{m.dose}</p>
                </div>
                <p className="font-sans text-[13px] leading-[1.36] text-ink-500">{m.sub}</p>
                <span className="self-start rounded-full bg-accent-50 py-1 pr-2.5 pl-2 font-sans text-[12px] leading-[1.3] text-accent">
                  {m.refill}
                </span>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => navigate('/connect')}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-accent py-[15px]"
          >
            <img src={medicationWhite} alt="" className="size-[18px]" />
            <span className="font-sans text-[15px] font-semibold leading-[1.2] text-card">
              Request a renewal
            </span>
          </button>

          <p className="font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-ink-500">
            Past
          </p>
          <div className="flex flex-col rounded-2xl border border-accent-100 bg-card px-3.5 py-1">
            <div className="flex w-full items-start gap-3 py-[13px]">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-50">
                <img src={medicationGray} alt="" className="size-[18px]" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                  Metformin 500 mg
                </p>
                <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
                  Increased to 1000 mg · stopped Jan 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
