import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import { PrimaryButton, PrivacyFooter } from './shared'
import logoKBlue from '../../assets/figma/onboarding-logo-k-blue.svg'
import openMined from '../../assets/figma/onboarding-openmined.svg'
import medicalServices from '../../assets/figma/medical-services.svg'
import forum from '../../assets/figma/forum.svg'
import autoAwesome from '../../assets/figma/auto-awesome.svg'

const rows = [
  { icon: medicalServices, label: 'Your records, one clear timeline' },
  { icon: forum, label: 'A community that gets it' },
  { icon: autoAwesome, label: 'Answers grounded in your data' },
]

export default function Intro() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="app-scroll flex flex-1 flex-col items-center gap-5 overflow-y-auto px-5 pt-[126px]">
        <div className="flex items-center gap-1">
          <img src={logoKBlue} alt="Kindred" className="h-[53px] w-[33px]" />
          <span className="font-serif text-[69px] leading-[1.2] text-accent">indred</span>
        </div>
        <p className="text-center font-sans text-[15px] leading-[1.42] text-ink-600">
          Private data. Public wisdom.
        </p>
        <div className="flex w-full flex-col rounded-[16px] border border-accent-100 bg-card px-3.5 py-1">
          {rows.map((row, i) => (
            <div key={row.label}>
              {i > 0 && <div className="h-px w-full bg-accent-100" />}
              <div className="flex w-full items-center gap-3 py-3">
                <img src={row.icon} alt="" className="size-5" />
                <p className="flex-1 font-sans text-[15px] leading-[1.42] text-ink">{row.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <img src={openMined} alt="" className="size-[31px]" />
          <span className="font-sans text-[16px] text-ink-600">Powered by OpenMined</span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-center gap-3.5 px-5 pb-4">
        <PrimaryButton label="Connect securely" onClick={() => navigate('/onboarding/video')} />
        <PrivacyFooter />
      </div>
      <HomeIndicator />
    </div>
  )
}
