import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import launchBlue from '../../assets/figma/launch-blue.svg'
import shieldBlue from '../../assets/figma/shield-blue.svg'

export default function ConnectAuthorize() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <div className="app-scroll flex flex-1 flex-col items-center gap-4 px-6 pb-28 pt-16">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-accent-50">
          <img src={launchBlue} alt="" className="size-8" />
        </div>
        <p className="text-center font-serif text-[26px] font-medium leading-[1.18] text-ink">
          Authorize MyChart
        </p>
        <p className="max-w-[300px] text-center font-sans text-[15px] leading-[1.42] text-ink-600">
          You&apos;ll sign in on your provider&apos;s site. Kindred only receives the records you
          approve.
        </p>
        <div className="mt-2 w-full rounded-2xl border border-accent-100 bg-card p-4">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
            This browser session
          </p>
          <p className="mt-2 font-sans text-[15px] text-ink">mychart.example.com</p>
          <p className="mt-1 font-sans text-[13px] text-ink-500">Secure · HTTPS</p>
        </div>
        <div className="flex w-full items-start gap-2 rounded-xl bg-accent-50 p-3">
          <img src={shieldBlue} alt="" className="mt-0.5 size-4 shrink-0" />
          <p className="font-sans text-[13px] text-accent">
            Your password stays with MyChart. Kindred never sees it.
          </p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-5 pb-8">
        <button
          type="button"
          onClick={() => navigate('/connect/connected')}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-[15px] font-sans text-[15px] font-semibold text-canvas"
        >
          Continue to MyChart
        </button>
        <button
          type="button"
          onClick={() => navigate('/connect/find')}
          className="w-full cursor-pointer py-2 font-sans text-[15px] font-medium text-ink-500"
        >
          Cancel
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
