import { useNavigate } from 'react-router-dom'
import { useSmartBack } from '../../navigation/history'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBack from '../../assets/figma/arrow-back.svg'
import verified from '../../assets/figma/verified-blue.svg'
import sendWhite from '../../assets/figma/send-white.svg'

const BARS = [
  { label: 'Lower readings', pct: 62, width: '62%' },
  { label: 'No change', pct: 26, width: '26%' },
  { label: 'Higher / unsure', pct: 12, width: '12%' },
]

export default function CommunityEvidence() {
  const navigate = useNavigate()
  const goBack = useSmartBack('/community/response')

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <div className="flex items-center gap-2.5 px-5 pt-2">
        <button
          type="button"
          aria-label="Back"
          onClick={goBack}
          className="cursor-pointer"
        >
          <img src={arrowBack} alt="" className="size-[26px]" />
        </button>
        <p className="font-serif text-[20px] font-medium text-ink">Community data</p>
      </div>
      <div className="app-scroll flex flex-1 flex-col gap-3.5 px-5 pb-28 pt-4">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Claim
        </p>
        <p className="font-serif text-[17px] font-semibold leading-[1.28] text-ink">
          Reducing breakfast carbs lowers morning readings
        </p>
        <div className="flex items-center gap-1.5">
          <img src={verified} alt="" className="size-4" />
          <p className="font-sans text-[15px] font-medium text-accent">
            Verified by 254 members&apos; vault data
          </p>
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-accent-100 bg-card p-4">
          {BARS.map((b) => (
            <div key={b.label} className="flex items-center gap-2.5">
              <span className="w-32 shrink-0 font-sans text-[13px] text-ink">{b.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded bg-accent-100">
                <div className="h-2 rounded bg-accent" style={{ width: b.width }} />
              </div>
              <span className="w-8 text-right font-sans text-[12px] text-ink">{b.pct}%</span>
            </div>
          ))}
          <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
            Of 254 members who tried this · similar diagnosis, A1c range and kidney stage.
          </p>
        </div>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Matched on
        </p>
        <div className="flex flex-wrap gap-2">
          {['Diagnosis', 'A1c range', 'Kidney stage'].map((t) => (
            <span
              key={t}
              className="rounded-full border border-accent-200 bg-card px-3 py-1.5 font-sans text-[12px] text-accent"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="px-3 py-2.5 text-center font-sans text-[13px] text-ink-500">
          Aggregated & de-identified. No individual data shown.
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-5 pb-8">
        <button
          type="button"
          onClick={() => navigate('/ask')}
          className="flex h-12 w-full cursor-pointer items-center gap-2 rounded-full border border-accent-200 bg-card pl-4 pr-1.5"
        >
          <span className="flex-1 text-left font-sans text-[15px] text-ink-500">
            Ask about this evidence
          </span>
          <span className="flex size-9 items-center justify-center rounded-[18px] bg-accent">
            <img src={sendWhite} alt="" className="size-[18px]" />
          </span>
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
