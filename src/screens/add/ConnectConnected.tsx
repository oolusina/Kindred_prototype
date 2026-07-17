import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import checkCircle from '../../assets/figma/check-circle.svg'
import medicalServices from '../../assets/figma/medical-services-blue.svg'

export default function ConnectConnected() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 pb-24">
        <img src={checkCircle} alt="" className="size-14" />
        <p className="text-center font-serif text-[26px] font-medium leading-[1.18] text-ink">
          Connected
        </p>
        <div className="flex w-full max-w-[320px] items-center gap-3 rounded-2xl border border-accent-100 bg-card p-4">
          <div className="flex size-11 items-center justify-center rounded-xl bg-accent-50">
            <img src={medicalServices} alt="" className="size-6" />
          </div>
          <div>
            <p className="font-sans text-[15px] font-medium text-ink">MyChart · Riverside Health</p>
            <p className="font-sans text-[13px] text-ink-500">Labs, meds, and visits syncing</p>
          </div>
        </div>
        <p className="max-w-[280px] text-center font-sans text-[13px] leading-[1.36] text-ink-500">
          New records appear in your vault as they arrive. You can disconnect anytime in Settings.
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-5 pb-8">
        <button
          type="button"
          onClick={() => navigate('/vault')}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-[15px] font-sans text-[15px] font-semibold text-canvas"
        >
          Go to Health Vault
        </button>
        <button
          type="button"
          onClick={() => navigate('/connect')}
          className="w-full cursor-pointer py-2 font-sans text-[15px] font-medium text-accent"
        >
          Connect another source
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
