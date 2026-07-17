import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import TopBar from './TopBar'
import insightsBlue from '../../assets/figma/insights-blue.svg'
import shieldBlue from '../../assets/figma/shield-blue.svg'
import { usePrototypeState } from '../../state/PrototypeState'

const ITEMS = [
  { id: 'meds', label: 'Medications & doses' },
  { id: 'labs', label: 'Lab trends (eGFR, A1C)' },
  { id: 'vitals', label: 'Blood pressure & weight' },
  { id: 'logs', label: 'Daily logs (water, food, mood)' },
]

export default function UploadShare() {
  const navigate = useNavigate()
  const { sharing, setSharingItem } = usePrototypeState()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <TopBar fallback="/home" title="Share for insights" subtitle="You choose what leaves your device" />
      <div className="app-scroll flex flex-1 flex-col gap-3.5 px-5 pb-6">
        <div className="flex items-start gap-2.5 rounded-2xl bg-accent-50 p-3.5">
          <img src={insightsBlue} alt="" className="mt-0.5 size-5 shrink-0" />
          <p className="font-sans text-[13px] leading-[1.36] text-accent">
            Sharing lets Kindred personalize community answers and Ask AI — still private by
            default.
          </p>
        </div>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Currently sharing
        </p>
        <div className="overflow-hidden rounded-2xl border border-accent-100 bg-card">
          {ITEMS.map((item, i) => {
            const on = Boolean(sharing[item.id])
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSharingItem(item.id, !on)}
                className={`flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left ${
                  i > 0 ? 'border-t border-accent-100' : ''
                }`}
              >
                <span className="font-sans text-[15px] font-medium text-ink">{item.label}</span>
                <span
                  className={`relative h-[26px] w-11 rounded-full transition-colors ${
                    on ? 'bg-accent' : 'bg-ink-300'
                  }`}
                >
                  <span
                    className={`absolute top-[3px] size-5 rounded-full bg-white transition-transform ${
                      on ? 'left-[22px]' : 'left-[3px]'
                    }`}
                  />
                </span>
              </button>
            )
          })}
        </div>
        <div className="flex items-start gap-2 rounded-xl bg-accent-50 p-3">
          <img src={shieldBlue} alt="" className="mt-0.5 size-4 shrink-0" />
          <p className="font-sans text-[13px] text-accent">
            Raw files stay on your device. Only the fields you enable are used for insights.
          </p>
        </div>
      </div>
      <div className="shrink-0 px-5 pb-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('/vault')}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-[15px] font-sans text-[15px] font-semibold text-canvas"
        >
          Save to my vault
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
