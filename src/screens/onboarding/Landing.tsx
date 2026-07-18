import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import logoK from '../../assets/figma/onboarding-logo-k.svg'
import openMined from '../../assets/figma/onboarding-openmined.svg'
import shieldSmall from '../../assets/figma/onboarding-shield-small.svg'

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col bg-[#002478]">
      <SystemBar variant="light" />
      <div className="flex flex-1 flex-col items-center justify-center gap-[26px] px-5">
        <div className="flex w-full flex-col items-center gap-1.5">
          <div className="flex items-end">
            <img src={logoK} alt="Kindred" className="h-[118px] w-[78px]" />
            <span className="font-sans text-[63px] leading-[1.2] text-accent-200">indred</span>
          </div>
          <p className="text-center font-sans text-[15px] leading-[1.42] text-canvas">
            Private Health. Public Wisdom.
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <img src={openMined} alt="" className="size-[23px]" />
          <span className="font-sans text-[14px] text-canvas">Powered by OpenMined</span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-center gap-3 px-5 pb-4">
        <button
          type="button"
          onClick={() => navigate('/onboarding/intro-community')}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-accent-200 bg-white px-5 py-3.5 font-sans text-[15px] font-semibold leading-[1.2] text-accent"
        >
          Get started
        </button>
        <div className="flex items-center gap-1.5">
          <img src={shieldSmall} alt="" className="size-4" />
          <span className="font-sans text-[13px] text-canvas">
            Your data stays private, on your device
          </span>
        </div>
      </div>
      <HomeIndicator light />
    </div>
  )
}
