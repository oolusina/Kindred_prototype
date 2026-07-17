import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import checkWhite from '../../assets/figma/check-white-lg.svg'
import waterDrop from '../../assets/figma/water-drop-blue.svg'
import toggleOn from '../../assets/figma/toggle-on.svg'
import toggleOff from '../../assets/figma/toggle-off.svg'
import { usePrototypeState } from '../../state/PrototypeState'

/**
 * Figma 2703:5840 — Log · Success, with community-insights contribution toggle.
 */
export default function LogSuccess() {
  const navigate = useNavigate()
  const { settings, setSetting } = usePrototypeState()
  const [helpOthers, setHelpOthers] = useState(() => Boolean(settings.logHelpOthers))

  const flip = () => {
    const next = !helpOthers
    setHelpOthers(next)
    setSetting('logHelpOthers', next)
  }

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <div className="app-scroll flex min-h-0 flex-1 flex-col items-center gap-3.5 px-5 pt-[106px] pb-36">
        <div className="flex size-[76px] items-center justify-center rounded-[38px] bg-accent">
          <img src={checkWhite} alt="" className="size-[42px]" />
        </div>
        <p className="text-center font-serif text-[32px] font-medium leading-[1.16] text-ink">
          Logged!
        </p>
        <p className="text-center font-sans text-[15px] leading-[1.42] text-ink">
          500 ml of water added to today.
        </p>

        <div className="flex w-full flex-col gap-2.5 rounded-2xl border border-accent-100 bg-card p-4">
          <div className="flex items-center gap-2">
            <img src={waterDrop} alt="" className="size-[18px]" />
            <p className="flex-1 font-sans text-[15px] font-medium text-ink">Today&apos;s water</p>
            <p className="font-sans text-[15px] font-medium text-accent">1.5 L of 2 L</p>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-[5px] bg-accent-100">
            <div className="h-full w-[75%] rounded-[5px] bg-accent" />
          </div>
          <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
            Nice, you&apos;re 75% to your goal. Only you can see this.
          </p>
        </div>

        <div className="flex w-full items-center gap-3 rounded-[14px] bg-accent-50 px-3.5 py-3">
          <div className="min-w-0 flex-1">
            <p className="font-sans text-[13px] leading-[1.36] text-ink">Also help others like me</p>
            <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
              Shared anonymously via privacy-preserving AI. Apply to all future logs of this kind.
              You can change any tag later in Settings.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={helpOthers}
            aria-label="Contribute this log to community insights"
            onClick={flip}
            className="shrink-0 cursor-pointer"
          >
            <img src={helpOthers ? toggleOn : toggleOff} alt="" className="h-7 w-12" />
          </button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 px-5 pb-8">
        <button
          type="button"
          onClick={() => navigate('/log')}
          className="w-full cursor-pointer rounded-[14px] border border-accent-200 bg-card py-[15px] font-sans text-[15px] font-semibold text-accent"
        >
          Log something else
        </button>
        <button
          type="button"
          onClick={() => navigate('/log/today')}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-[15px] font-sans text-[15px] font-semibold text-white"
        >
          Done
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
