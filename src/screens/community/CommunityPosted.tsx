import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import checkCircle from '../../assets/figma/check-circle.svg'

export default function CommunityPosted() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 pb-24">
        <img src={checkCircle} alt="" className="size-14" />
        <p className="text-center font-serif text-[26px] font-medium leading-[1.18] text-ink">
          Question posted
        </p>
        <p className="max-w-[280px] text-center font-sans text-[15px] leading-[1.42] text-ink-600">
          Members with similar data will see your question. We&apos;ll notify you when answers
          arrive.
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-5 pb-8">
        <button
          type="button"
          onClick={() => navigate('/community/answers')}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-[15px] font-sans text-[15px] font-semibold text-canvas"
        >
          View question
        </button>
        <button
          type="button"
          onClick={() => navigate('/community')}
          className="w-full cursor-pointer py-2 font-sans text-[15px] font-medium text-accent"
        >
          Back to community
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
