import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import TopBar from './TopBar'
import waterDropWhite from '../../assets/figma/water-drop-white.svg'
import chevronRight from '../../assets/figma/chevron-right-gray.svg'
import checkWhite from '../../assets/figma/check-white.svg'
import toggleOn from '../../assets/figma/toggle-on.svg'
import toggleOff from '../../assets/figma/toggle-off.svg'
import { usePrototypeState } from '../../state/PrototypeState'

const AMOUNTS = ['250 ml', '500 ml', '750 ml', '1 L']

export default function LogWater() {
  const navigate = useNavigate()
  const { settings, setSetting } = usePrototypeState()
  const [amount, setAmount] = useState('500 ml')
  const [helpOthers, setHelpOthers] = useState(() => Boolean(settings.logHelpOthers))

  const flipHelp = () => {
    const next = !helpOthers
    setHelpOthers(next)
    setSetting('logHelpOthers', next)
  }

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <TopBar fallback="/log" title="Log water" subtitle="Health Vault" />
      <div className="app-scroll flex min-h-0 flex-1 flex-col gap-3.5 px-5 pb-28">
        <div className="flex flex-col items-center gap-1.5 rounded-[20px] bg-accent-50 py-6">
          <div className="flex size-14 items-center justify-center rounded-full bg-accent">
            <img src={waterDropWhite} alt="" className="size-[30px]" />
          </div>
          <p className="font-serif text-[38px] font-medium leading-[1.1] text-ink">{amount}</p>
          <p className="font-sans text-[13px] text-ink-500">about one glass</p>
        </div>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Quick amounts
        </p>
        <div className="flex gap-2">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmount(a)}
              className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl py-3 font-sans text-[15px] font-semibold ${
                amount === a
                  ? 'bg-accent text-white'
                  : 'border border-accent-200 bg-card text-ink'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-accent-100 bg-card px-3.5 py-3"
        >
          <span className="flex-1 text-left font-sans text-[15px] text-ink-500">When</span>
          <span className="font-sans text-[15px] font-medium text-ink">Now</span>
          <img src={chevronRight} alt="" className="size-[18px]" />
        </button>

        <div className="flex w-full items-center gap-3 rounded-[14px] bg-accent-50 px-3.5 py-3">
          <div className="min-w-0 flex-1">
            <p className="font-sans text-[13px] leading-[1.36] text-ink">Also help others like me</p>
            <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
              Shared anonymously via privacy-preserving AI. Apply to all future logs of this kind.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={helpOthers}
            aria-label="Contribute this log to community insights"
            onClick={flipHelp}
            className="shrink-0 cursor-pointer"
          >
            <img src={helpOthers ? toggleOn : toggleOff} alt="" className="h-7 w-12" />
          </button>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-5 pb-8">
        <button
          type="button"
          onClick={() => navigate('/log/success')}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-accent py-[15px]"
        >
          <img src={checkWhite} alt="" className="size-[18px]" />
          <span className="font-sans text-[15px] font-semibold text-white">Log water</span>
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
