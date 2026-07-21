import { useNavigate } from 'react-router-dom'
import { useSmartBack } from '../../navigation/history'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBack from '../../assets/figma/arrow-back.svg'
import eventBlue from '../../assets/figma/event-blue.svg'

export default function PrepEmpty() {
  const navigate = useNavigate()
  const goBack = useSmartBack('/home')

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <div className="flex shrink-0 items-center gap-3 px-6 pb-2 pt-2.5">
        <button
          type="button"
          aria-label="Back"
          onClick={goBack}
          className="cursor-pointer"
        >
          <img src={arrowBack} alt="" className="size-6" />
        </button>
        <p className="font-serif text-[22px] font-medium text-ink">Appointment prep</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 pb-24">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-accent-50">
          <img src={eventBlue} alt="" className="size-8" />
        </div>
        <p className="text-center font-serif text-[26px] font-medium leading-[1.18] text-ink">
          No upcoming visit
        </p>
        <p className="max-w-[280px] text-center font-sans text-[15px] leading-[1.42] text-ink-600">
          When you have an appointment, Kindred will help you collect questions and share a brief
          with your care team.
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-6 pb-8">
        <button
          type="button"
          onClick={() => navigate('/prep')}
          className="w-full cursor-pointer rounded-xl bg-accent py-[15px] font-sans text-[15px] font-semibold text-canvas"
        >
          Start a practice prep
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
