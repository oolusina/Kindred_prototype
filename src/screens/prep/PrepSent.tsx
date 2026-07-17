import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import checkCircle from '../../assets/figma/check-circle.svg'

export default function PrepSent() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 pb-24">
        <img src={checkCircle} alt="" className="size-14" />
        <p className="text-center font-serif text-[26px] font-medium leading-[1.18] text-ink">
          Sent to portal
        </p>
        <p className="max-w-[300px] text-center font-sans text-[15px] leading-[1.42] text-ink-600">
          Your visit brief was shared with Nephrology via MyChart. Only this prep — never your
          full record.
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-6 pb-8">
        <button
          type="button"
          onClick={() => navigate('/prep')}
          className="w-full cursor-pointer rounded-xl bg-accent py-[15px] font-sans text-[15px] font-semibold text-canvas"
        >
          Back to prep
        </button>
        <button
          type="button"
          onClick={() => navigate('/prep/brief')}
          className="w-full cursor-pointer py-2 font-sans text-[15px] font-medium text-accent"
        >
          Preview what they see
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
