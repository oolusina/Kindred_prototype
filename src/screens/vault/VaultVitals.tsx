import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import TopBar from './TopBar'
import trendingUpWhite from '../../assets/figma/trending-up-white.svg'
import favoriteBlue from '../../assets/figma/favorite-blue.svg'
import monitorHeartBlue from '../../assets/figma/monitor-heart-blue.svg'
import scienceBlue from '../../assets/figma/science-blue.svg'

const others = [
  { icon: favoriteBlue, name: 'Weight', date: 'Jul 2026', value: '168 lb' },
  { icon: monitorHeartBlue, name: 'Heart rate', date: 'Jul 2026', value: '62 bpm' },
  { icon: scienceBlue, name: 'Blood glucose', date: 'today', value: '112 mg/dL' },
]

export default function VaultVitals() {
  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <TopBar fallback="/vault" title="Vitals" subtitle="From visits & devices" />
      <div className="app-scroll flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3.5 px-5 pb-6">
          <div className="flex w-full flex-col gap-2.5 rounded-card bg-accent p-4">
            <div className="flex w-full items-center gap-2">
              <p className="flex-1 font-sans text-[15px] font-medium leading-[1.4] text-card">
                Blood pressure
              </p>
              <span className="flex items-center gap-1">
                <img src={trendingUpWhite} alt="" className="size-3.5" />
                <span className="font-sans text-[12px] leading-[1.3] text-card">steady</span>
              </span>
            </div>
            <div className="flex items-start gap-1.5 text-card">
              <p className="font-serif text-[38px] font-medium leading-[1.1]">129/82</p>
              <div className="font-sans text-[13px] leading-[1.36]">
                <p>mmHg</p>
                <p>in target range</p>
              </div>
            </div>
            <div className="flex w-full items-end justify-center gap-2.5">
              <div className="h-[30px] w-14 rounded-[5px] bg-card opacity-85" />
              <div className="h-9 w-14 rounded-[5px] bg-card opacity-85" />
              <div className="h-8 w-14 rounded-[5px] bg-card opacity-85" />
              <div className="h-[34px] w-14 rounded-[5px] bg-card opacity-85" />
            </div>
            <p className="font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-card">
              Riverside Nephrology · Apr 2026
            </p>
          </div>

          <p className="font-sans text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.66px] text-ink-500">
            Other vitals
          </p>
          <div className="flex flex-col rounded-2xl border border-accent-100 bg-card px-3.5 py-1">
            {others.map((v, i) => (
              <div key={v.name}>
                {i > 0 && <div className="h-px w-full bg-accent-100" />}
                <div className="flex w-full items-center gap-2.5 py-[13px]">
                  <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[17px] bg-accent-50">
                    <img src={v.icon} alt="" className="size-[18px]" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-px">
                    <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                      {v.name}
                    </p>
                    <p className="font-sans text-[13px] leading-[1.36] text-ink-500">{v.date}</p>
                  </div>
                  <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                    {v.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
