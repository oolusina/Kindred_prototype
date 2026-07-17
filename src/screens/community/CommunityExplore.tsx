import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBack from '../../assets/figma/arrow-back.svg'
import lockGray from '../../assets/figma/lock-gray.svg'
import forum from '../../assets/figma/forum.svg'
import chevronRight from '../../assets/figma/chevron-right-gray.svg'

export default function CommunityExplore() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <div className="flex items-center gap-2.5 px-5 pt-2">
        <button
          type="button"
          aria-label="Back"
          onClick={() => navigate('/community/browse')}
          className="cursor-pointer"
        >
          <img src={arrowBack} alt="" className="size-[26px]" />
        </button>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="font-serif text-[20px] font-medium text-ink">Hypertension</p>
          <p className="font-sans text-[13px] text-ink-500">8,200 members · read-only</p>
        </div>
        <span className="flex items-center gap-1 rounded-full border border-ink-300 py-1 pl-2 pr-2.5">
          <img src={lockGray} alt="" className="size-3" />
          <span className="font-sans text-[12px] text-ink-500">Read-only</span>
        </span>
      </div>
      <div className="app-scroll flex flex-1 flex-col gap-3 px-5 pb-28 pt-4">
        <div className="rounded-xl bg-accent-50 p-3">
          <p className="font-sans text-[13px] leading-[1.36] text-accent">
            You can browse posts here. To ask questions or reply, confirm a matching diagnosis in
            your vault.
          </p>
        </div>
        {[
          'What home BP cuff do you trust?',
          'Did cutting evening salt change your numbers?',
          'Anyone combine lisinopril with low-sodium meal kits?',
        ].map((q, i) => (
          <div
            key={q}
            className="flex flex-col gap-2 rounded-2xl border border-accent-100 bg-card px-4 py-3.5 opacity-90"
          >
            <span className="flex w-fit items-center gap-1 rounded-full bg-accent-50 py-0.5 pl-2 pr-2.5">
              <img src={forum} alt="" className="size-3" />
              <span className="font-sans text-[12px] text-accent">Question</span>
            </span>
            <p className="font-sans text-[15px] leading-[1.42] text-ink">{q}</p>
            <div className="flex items-center gap-2">
              <span className="font-sans text-[13px] text-ink-500">{6 + i * 3} answers</span>
              <img src={chevronRight} alt="" className="ml-auto size-[18px]" />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 px-5 pb-8">
        <button
          type="button"
          onClick={() => navigate('/connect')}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
        >
          Confirm diagnosis to join
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
