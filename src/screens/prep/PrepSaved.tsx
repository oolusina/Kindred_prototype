import { useNavigate } from 'react-router-dom'
import Sheet from '../../components/Sheet'
import { PrepHeader } from './shared'
import checkCircle from '../../assets/figma/check-circle.svg'

export default function PrepSaved() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <PrepHeader phase="during" fallback="/prep/during" />
      <div className="app-scroll flex flex-1 flex-col gap-3 px-6 pb-4 pt-3 opacity-40">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
          Snapshot for the doctor
        </p>
        <div className="h-24 rounded-2xl bg-card" />
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-600">
          Questions
        </p>
        <div className="h-40 rounded-2xl bg-card" />
      </div>

      <Sheet open onClose={() => navigate('/prep/during')}>
        <div className="flex flex-col items-center gap-3.5 px-6 pb-8 pt-1">
          <img src={checkCircle} alt="" className="size-11" />
          <p className="font-serif text-[20px] font-medium text-ink">Saved to your timeline</p>
          <p className="text-center font-sans text-[13px] leading-[1.36] text-ink-600">
            Your questions, notes and the doctor&apos;s answers are now on your timeline under
            today&apos;s visit.
          </p>
          <button
            type="button"
            onClick={() => navigate('/timeline')}
            className="mt-1 w-full cursor-pointer rounded-xl bg-accent py-3.5 font-sans text-[15px] font-semibold text-canvas"
          >
            View timeline
          </button>
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="cursor-pointer font-sans text-[12.5px] font-medium text-accent"
          >
            Done
          </button>
        </div>
      </Sheet>
    </div>
  )
}
