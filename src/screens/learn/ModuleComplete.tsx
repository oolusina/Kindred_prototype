import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import checkOnCard from '../../assets/figma/learn-check-oncard.svg'
import checkLg from '../../assets/figma/learn-check-light-lg.svg'

export default function ModuleComplete() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <span className="mb-5 flex size-20 items-center justify-center rounded-full bg-accent">
          <img src={checkLg} alt="" className="size-10" />
        </span>
        <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
          Module complete
        </p>
        <h1 className="mb-3 font-serif text-[26px] font-medium leading-[1.18] text-ink">
          Your stage, explained
        </h1>
        <p className="mb-6 font-sans text-[15px] leading-[1.42] text-ink-600">
          Nice work. You&apos;ve finished this module. Keep going with kidney-friendly eating, or
          revisit anytime from Saved.
        </p>
        <div className="mb-8 flex w-full items-center gap-3 rounded-2xl border border-accent-100 bg-card p-4 text-left">
          <img src={checkOnCard} alt="" className="size-6" />
          <div>
            <p className="font-sans text-[15px] font-medium text-ink">Kidney disease</p>
            <p className="font-sans text-[13px] text-ink-500">3 of 5 modules done</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/learn')}
          className="mb-3 w-full cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
        >
          Back to Learning
        </button>
        <button
          type="button"
          onClick={() => navigate('/learn/module')}
          className="w-full cursor-pointer rounded-[14px] border border-accent-200 bg-white py-3.5 font-sans text-[15px] font-semibold text-accent"
        >
          Review module
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
