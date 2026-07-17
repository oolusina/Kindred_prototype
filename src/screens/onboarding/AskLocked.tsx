import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import { PrimaryButton } from './shared'
import autoAwesome from '../../assets/figma/auto-awesome.svg'
import menuLock from '../../assets/figma/menu_lock.svg'

export default function AskLocked() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="relative flex size-16 items-center justify-center rounded-full bg-accent-50">
          <img src={autoAwesome} alt="" className="size-7" />
          <img
            src={menuLock}
            alt=""
            className="absolute -right-0.5 -bottom-0.5 size-5 rounded-full bg-canvas p-0.5"
          />
        </div>
        <h1 className="font-serif text-[26px] font-medium leading-[1.18] text-ink">
          Ask AI is locked
        </h1>
        <p className="font-sans text-[15px] leading-[1.42] text-ink-600">
          Verify your diagnosis to unlock Ask AI — answers grounded in your records and trusted
          sources.
        </p>
        <PrimaryButton
          label="Verify my diagnosis"
          onClick={() => navigate('/onboarding/verify-add-menu')}
        />
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="cursor-pointer font-sans text-[15px] font-semibold text-accent"
        >
          Not now
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
