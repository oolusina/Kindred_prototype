import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import TopBar from './TopBar'
import lockBlue from '../../assets/figma/lock-blue.svg'
import chevronRight from '../../assets/figma/chevron-right-gray.svg'
import monitorHeartBlue from '../../assets/figma/monitor-heart-blue.svg'
import scienceBlue from '../../assets/figma/science-blue.svg'
import medicationBlue from '../../assets/figma/medication-blue.svg'
import favoriteBlue from '../../assets/figma/favorite-blue.svg'
import medicalServicesBlue from '../../assets/figma/medical-services-blue.svg'
import eventBlue from '../../assets/figma/event-blue.svg'
import warningAmberBlue from '../../assets/figma/warning-amber-blue.svg'
import vaccinesBlue from '../../assets/figma/vaccines-blue.svg'
import descriptionBlue from '../../assets/figma/description-blue.svg'

type Row = { icon: string; title: string; sub: string; to?: string }

const recordRows: Row[] = [
  { icon: scienceBlue, title: 'Lab results', sub: 'eGFR, A1C, and more', to: '/vault/labs' },
  { icon: medicationBlue, title: 'Medications', sub: 'Current meds & doses', to: '/vault/medications' },
  { icon: favoriteBlue, title: 'Vitals', sub: 'Blood pressure, weight, heart rate', to: '/vault/vitals' },
  { icon: medicalServicesBlue, title: 'Conditions', sub: 'Kidney disease, Type 2 Diabetes', to: '/timeline/kidney' },
  { icon: eventBlue, title: 'Appointments & visits', sub: 'Notes & upcoming', to: '/prep' },
  { icon: warningAmberBlue, title: 'Allergies', sub: 'Recorded allergies' },
  { icon: vaccinesBlue, title: 'Immunizations', sub: 'Vaccines & dates' },
  { icon: descriptionBlue, title: 'Documents', sub: 'Files & care summaries', to: '/upload' },
]

export default function VaultHub() {
  const navigate = useNavigate()

  const row = ({ icon, title, sub, to }: Row) => (
    <button
      key={title}
      type="button"
      onClick={() => to && navigate(to)}
      className="flex w-full cursor-pointer items-center gap-3 py-3.5 text-left active:opacity-70"
    >
      <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[11px] bg-accent-50">
        <img src={icon} alt="" className="size-[22px]" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-px">
        <span className="font-sans text-[15px] font-medium leading-[1.4] text-ink">{title}</span>
        <span className="font-sans text-[13px] leading-[1.36] text-ink-500">{sub}</span>
      </span>
      <img src={chevronRight} alt="" className="size-5 shrink-0" />
    </button>
  )

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <TopBar title="My Health Vault" subtitle="Stored privately on your device" />
      <div className="app-scroll flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3.5 px-5 pb-6">
          <div className="flex w-full items-center gap-2 rounded-xl bg-accent-50 p-3">
            <img src={lockBlue} alt="" className="size-4 shrink-0" />
            <p className="flex-1 font-sans text-[13px] leading-[1.36] text-accent">
              From your care team, your devices, and what you log. Always private.
            </p>
          </div>

          <p className="font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-ink-500">
            You track
          </p>
          <div className="flex flex-col rounded-2xl border border-accent-100 bg-card px-3.5 py-1">
            {row({
              icon: monitorHeartBlue,
              title: 'Biometrics & logs',
              sub: 'Steps, sleep, water, mood, and your logs',
              to: '/vault/today',
            })}
          </div>

          <p className="font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-ink-500">
            Your medical record
          </p>
          <div className="flex flex-col rounded-2xl border border-accent-100 bg-card px-3.5 py-1">
            {recordRows.map((r, i) => (
              <div key={r.title}>
                {i > 0 && <div className="h-px w-full bg-accent-100" />}
                {row(r)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
