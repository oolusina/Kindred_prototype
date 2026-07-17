import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import { TopBar, PrimaryButton } from './shared'
import checkBlue from '../../assets/figma/home_check.svg'
import pictureAsPdf from '../../assets/figma/picture-as-pdf.svg'

const FIELDS = [
  { label: 'Condition', value: 'Chronic kidney disease · Stage 3' },
  { label: 'Diagnosed', value: 'March 2024' },
  { label: 'Provider', value: 'Dr. Chen · UPMC' },
]

export default function ReviewConfirm() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <TopBar
        title="Does this look right?"
        subtitle="Edit or add anything you think is important"
      />
      <div className="app-scroll flex flex-1 flex-col gap-3 px-5 pb-4">
        <div className="flex items-center gap-3 rounded-[14px] bg-accent-50 px-3.5 py-3">
          <img src={pictureAsPdf} alt="" className="size-5 shrink-0" />
          <p className="min-w-0 flex-1 truncate font-sans text-[14px] font-medium text-ink">
            diagnosis-letter_riverside.pdf
          </p>
          <button
            type="button"
            onClick={() => navigate('/onboarding/upload-document')}
            className="cursor-pointer font-sans text-[13px] font-semibold text-accent"
          >
            Change
          </button>
        </div>
        <p className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-wide text-ink-600">
          What we found
        </p>
        <div className="overflow-hidden rounded-2xl border border-accent-100 bg-card">
          {FIELDS.map((field, i) => (
            <div
              key={field.label}
              className={`flex items-center gap-3 px-3.5 py-3.5 ${
                i > 0 ? 'border-t border-accent-100' : ''
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[12px] text-ink-600">{field.label}</p>
                <p className="font-sans text-[15px] font-medium text-ink">{field.value}</p>
              </div>
              <img src={checkBlue} alt="" className="size-[18px]" />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {}}
          className="cursor-pointer py-2 text-center font-sans text-[14px] font-semibold text-accent"
        >
          Edit details
        </button>
      </div>
      <div className="flex shrink-0 flex-col items-center gap-3.5 px-5 pb-4">
        <PrimaryButton
          label="Confirm my diagnosis"
          onClick={() => navigate('/onboarding/all-set')}
        />
        <button
          type="button"
          onClick={() => navigate('/onboarding/verify-add-menu')}
          className="cursor-pointer font-sans text-[15px] font-semibold text-accent"
        >
          Use a different document
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
