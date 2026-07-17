import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import TopBar from './TopBar'
import photoCamera from '../../assets/figma/photo-camera.svg'
import descriptionBlue from '../../assets/figma/description-blue.svg'
import editBlue from '../../assets/figma/edit-blue.svg'
import chevronRight from '../../assets/figma/chevron-right-ink.svg'
import shieldBlue from '../../assets/figma/shield-blue.svg'

const OPTIONS = [
  {
    icon: photoCamera,
    title: 'Take a photo',
    detail: 'Snap a label, bottle, or document',
    to: '/upload/share',
  },
  {
    icon: descriptionBlue,
    title: 'Upload a file',
    detail: 'A PDF or image from your files',
    to: '/upload/share',
  },
  {
    icon: editBlue,
    title: 'Enter it myself',
    detail: 'Type the details in',
    to: '/upload/manual',
  },
]

export default function UploadMethod() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <TopBar fallback="/upload" title="Add medication" subtitle="Health Vault" />
      <div className="app-scroll flex flex-1 flex-col gap-3.5 px-5 pb-6">
        {OPTIONS.map((opt) => (
          <button
            key={opt.title}
            type="button"
            onClick={() => navigate(opt.to)}
            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-accent-100 bg-card px-3.5 py-4 text-left"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-50">
              <img src={opt.icon} alt="" className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">{opt.title}</p>
              <p className="font-sans text-[13px] leading-[1.36] text-ink-500">{opt.detail}</p>
            </div>
            <img src={chevronRight} alt="" className="size-5 shrink-0" />
          </button>
        ))}
        <div className="flex items-start gap-2 rounded-xl bg-accent-50 p-3">
          <img src={shieldBlue} alt="" className="mt-0.5 size-4 shrink-0" />
          <p className="font-sans text-[13px] leading-[1.36] text-accent">
            However you add it, it&apos;s read on your device first. You confirm before anything is
            saved.
          </p>
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
