import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import TopBar from './TopBar'
import trendingUpWhite from '../../assets/figma/trending-up-white.svg'
import warningAmberBlue from '../../assets/figma/warning-amber-blue.svg'
import descriptionBlue from '../../assets/figma/description-blue.svg'

const results = [
  { name: 'A1C', date: 'Apr 2026', value: '7.8%', status: 'Above range', warning: true },
  { name: 'Creatinine', date: 'Jul 2026', value: '1.4 mg/dL', status: 'Elevated', warning: true },
  { name: 'Potassium', date: 'Jul 2026', value: '4.8 mEq/L', status: 'In range', warning: false },
  { name: 'Hemoglobin', date: 'Jul 2026', value: '11.2 g/dL', status: 'Low', warning: true },
]

export default function VaultLabs() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <TopBar fallback="/vault"
        title="Lab results"
        subtitle="A record of all your results, including data you entered manually and records imported from your health portal."
      />
      <div className="app-scroll flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3.5 px-5 pb-6">
          <div className="flex w-full flex-col gap-2.5 rounded-card bg-accent p-4">
            <div className="flex w-full items-center gap-2">
              <p className="flex-1 font-sans text-[15px] font-medium leading-[1.4] text-card">
                eGFR
              </p>
              <span className="flex items-center gap-1">
                <img src={trendingUpWhite} alt="" className="size-3.5" />
                <span className="font-sans text-[12px] leading-[1.3] text-card">52 to 48</span>
              </span>
            </div>
            <div className="flex items-start gap-1.5 text-card">
              <p className="font-serif text-[38px] font-medium leading-[1.1]">48</p>
              <div className="font-sans text-[13px] leading-[1.36]">
                <p>mL/min</p>
                <p>Stage 3 range</p>
              </div>
            </div>
            <div className="flex w-full items-end justify-center gap-2.5">
              <div className="h-10 w-14 rounded-[5px] bg-card opacity-85" />
              <div className="h-[34px] w-14 rounded-[5px] bg-card opacity-85" />
              <div className="h-[30px] w-14 rounded-[5px] bg-card opacity-85" />
              <div className="h-[26px] w-14 rounded-[5px] bg-card opacity-85" />
            </div>
            <p className="font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-card">
              Quest Labs · Jul 9
            </p>
          </div>

          <p className="font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-ink-500">
            Recent results
          </p>
          <div className="flex flex-col rounded-2xl border border-accent-100 bg-card px-3.5 py-1">
            {results.map((r, i) => (
              <div key={r.name}>
                {i > 0 && <div className="h-px w-full bg-accent-100" />}
                <div className="flex w-full items-center gap-2.5 py-[13px]">
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                      {r.name}
                    </p>
                    <p className="font-sans text-[13px] leading-[1.36] text-ink-500">{r.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-[3px]">
                    <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                      {r.value}
                    </p>
                    <span className="flex items-center gap-[3px] rounded-full bg-accent-50 px-2 py-[3px]">
                      {r.warning && (
                        <img src={warningAmberBlue} alt="" className="size-[11px]" />
                      )}
                      <span className="font-sans text-[12px] leading-[1.3] text-accent">
                        {r.status}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate('/upload/share')}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-accent-200 bg-card py-3.5"
          >
            <img src={descriptionBlue} alt="" className="size-[18px]" />
            <span className="font-sans text-[15px] font-semibold leading-[1.2] text-accent">
              Download or share results
            </span>
          </button>
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
