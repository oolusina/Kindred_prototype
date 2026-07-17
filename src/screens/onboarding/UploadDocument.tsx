import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import { TopBar } from './shared'
import descriptionBlue from '../../assets/figma/description-blue.svg'
import photoCamera from '../../assets/figma/photo-camera.svg'
import chevronRight from '../../assets/figma/chevron-right-ink.svg'
import shieldSmall from '../../assets/figma/onboarding-shield-small.svg'

export default function UploadDocument() {
  const navigate = useNavigate()
  const goReview = () => navigate('/onboarding/review-confirm')

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <TopBar
        title="Add your diagnosis"
        subtitle="a letter, lab result, or visit summary works"
      />
      <div className="app-scroll flex flex-1 flex-col gap-3 px-5 pb-6">
        <button
          type="button"
          onClick={goReview}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-card border-[1.5px] border-dashed border-accent-200 bg-white/60 px-4 py-9"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-accent-50">
            <img src={descriptionBlue} alt="" className="size-6" />
          </div>
          <p className="font-sans text-[15px] font-medium text-ink">Snap a photo or choose a file</p>
          <p className="max-w-[228px] text-center font-sans text-[13px] text-ink-600">
            PDF, photo, or screenshot. We will read the details for you.
          </p>
        </button>
        {[
          {
            icon: photoCamera,
            title: 'Take a photo',
            detail: 'Point at a letter or after-visit summary',
          },
          {
            icon: descriptionBlue,
            title: 'Choose a file',
            detail: 'PDF, image, or screenshot from your phone',
          },
        ].map((opt) => (
          <button
            key={opt.title}
            type="button"
            onClick={goReview}
            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-accent-100 bg-card p-3.5 text-left"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-accent-50">
              <img src={opt.icon} alt="" className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[15px] font-medium text-ink">{opt.title}</p>
              <p className="font-sans text-[13px] text-ink-600">{opt.detail}</p>
            </div>
            <img src={chevronRight} alt="" className="size-5" />
          </button>
        ))}
        <div className="mt-2 flex items-start gap-2 rounded-xl bg-accent-50 p-3">
          <img src={shieldSmall} alt="" className="mt-0.5 size-4 shrink-0" />
          <p className="font-sans text-[13px] text-accent">
            Your document is read on your device. Nothing is uploaded without your say-so.
          </p>
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
