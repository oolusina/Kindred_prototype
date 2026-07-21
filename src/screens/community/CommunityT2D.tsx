import { useNavigate } from 'react-router-dom'
import { useSmartBack } from '../../navigation/history'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBackWhite from '../../assets/figma/arrow-back-white.svg'
import checkBlue from '../../assets/figma/check-blue-sm.svg'
import groupsWhite from '../../assets/figma/groups-white.svg'
import searchInk from '../../assets/figma/search-ink.svg'
import sort from '../../assets/figma/sort.svg'
import expandMore from '../../assets/figma/expand-more.svg'
import forum from '../../assets/figma/forum.svg'
import chevronRight from '../../assets/figma/chevron-right-gray.svg'
import tips from '../../assets/figma/tips-and-updates.svg'
import autoAwesomeLight from '../../assets/figma/auto-awesome-light.svg'
import comment from '../../assets/figma/comment.svg'

const QUESTIONS = [
  {
    text: 'Has anyone managed morning highs with diet alone?',
    answers: '8 answers',
    age: '3d',
  },
  {
    text: 'Did an SGLT2 med change your kidney numbers?',
    answers: '14 answers',
    age: '1w',
  },
  {
    text: 'Is a CGM worth it for type 2?',
    answers: '12 answers',
    age: '4d',
  },
  {
    text: 'What helped you stick with metformin when nausea hit?',
    answers: '9 answers',
    age: '5d',
  },
  {
    text: 'Anyone else see fasting glucose spike after a late dinner?',
    answers: '6 answers',
    age: '1w',
  },
]

export default function CommunityT2D() {
  const navigate = useNavigate()
  const goBack = useSmartBack('/community')

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-canvas">
      <div className="shrink-0 rounded-b-[28px] bg-accent pb-5">
        <SystemBar variant="light" />
        <div className="flex flex-col gap-3 px-5 pt-2">
          <button
            type="button"
            aria-label="Back"
            onClick={goBack}
            className="cursor-pointer self-start"
          >
            <img src={arrowBackWhite} alt="" className="size-[26px]" />
          </button>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-[#b8c7eb]">
            Community
          </p>
          <div className="flex items-center gap-2.5">
            <p className="flex-1 font-serif text-[32px] font-medium leading-[1.16] text-white">
              Type 2 Diabetes
            </p>
            <span className="flex items-center gap-1 rounded-full bg-white py-0.5 pl-2 pr-2.5">
              <img src={checkBlue} alt="" className="size-3" />
              <span className="font-sans text-[12px] text-accent">Member</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <img src={groupsWhite} alt="" className="size-[15px]" />
            <span className="font-sans text-[13px] text-[#b8c7eb]">12,480 members</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2.5">
            <img src={searchInk} alt="" className="size-[18px]" />
            <span className="font-sans text-[15px] text-ink-500">Search this community</span>
          </div>
        </div>
      </div>

      <div className="app-scroll flex min-h-0 flex-1 flex-col gap-3.5 px-5 pt-4 pb-28">
        <div className="flex shrink-0 items-center justify-between">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
            Recent activity
          </p>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 rounded-full border border-accent-200 bg-card py-2 pl-3 pr-2.5"
          >
            <img src={sort} alt="" className="size-[15px]" />
            <span className="font-sans text-[12px] text-accent">Recent</span>
            <img src={expandMore} alt="" className="size-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate('/community/answers')}
          className="flex w-full shrink-0 cursor-pointer flex-col gap-2.5 rounded-2xl border border-accent-100 bg-card px-4 py-3.5 text-left"
        >
          <span className="flex w-fit items-center gap-1 rounded-full bg-accent-50 py-0.5 pl-2 pr-2.5">
            <img src={forum} alt="" className="size-3" />
            <span className="font-sans text-[12px] text-accent">Question</span>
          </span>
          <p className="font-sans text-[15px] leading-[1.42] text-ink">{QUESTIONS[0].text}</p>
          <div className="flex items-center gap-2.5">
            <img src={forum} alt="" className="size-[15px]" />
            <span className="font-sans text-[13px] text-ink-500">{QUESTIONS[0].answers}</span>
            <span className="font-sans text-[13px] text-ink-500">{QUESTIONS[0].age}</span>
            <img src={chevronRight} alt="" className="ml-auto size-[18px]" />
          </div>
        </button>

        <button
          type="button"
          onClick={() => navigate('/community/tip')}
          className="flex w-full shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-accent-200 bg-accent-50 text-left"
        >
          <div className="flex items-center justify-between bg-accent-subtle px-4 py-2">
            <span className="flex items-center gap-1.5">
              <img src={tips} alt="" className="size-[15px]" />
              <span className="font-sans text-[12px] text-white">TIP</span>
            </span>
            <span className="flex items-center gap-1.5">
              <img src={autoAwesomeLight} alt="" className="size-[13px]" />
              <span className="font-sans text-[12px] text-[#b8c7eb]">from AI Search</span>
            </span>
          </div>
          <div className="flex flex-col gap-2.5 px-4 pb-3.5 pt-3">
            <p className="font-sans text-[15px] leading-[1.42] text-ink">
              Cutting breakfast carbs to ~20g dropped my morning readings within three weeks.
            </p>
            <div className="flex items-center gap-2.5">
              <img src={comment} alt="" className="size-[15px]" />
              <span className="font-sans text-[13px] text-ink-500">2 comments</span>
              <span className="font-sans text-[13px] text-ink-500">1d</span>
              <img src={chevronRight} alt="" className="ml-auto size-[18px]" />
            </div>
          </div>
        </button>

        {QUESTIONS.slice(1).map((q) => (
          <button
            key={q.text}
            type="button"
            onClick={() => navigate('/community/answers')}
            className="flex w-full shrink-0 cursor-pointer flex-col gap-2.5 rounded-2xl border border-accent-100 bg-card px-4 py-3.5 text-left"
          >
            <span className="flex w-fit items-center gap-1 rounded-full bg-accent-50 py-0.5 pl-2 pr-2.5">
              <img src={forum} alt="" className="size-3" />
              <span className="font-sans text-[12px] text-accent">Question</span>
            </span>
            <p className="font-sans text-[15px] leading-[1.42] text-ink">{q.text}</p>
            <div className="flex items-center gap-2.5">
              <img src={forum} alt="" className="size-[15px]" />
              <span className="font-sans text-[13px] text-ink-500">{q.answers}</span>
              <span className="font-sans text-[13px] text-ink-500">{q.age}</span>
              <img src={chevronRight} alt="" className="ml-auto size-[18px]" />
            </div>
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-5 pb-2">
        <button
          type="button"
          onClick={() => navigate('/community/new')}
          className="pointer-events-auto w-full cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white shadow-[0px_8px_18px_0px_rgba(0,43,143,0.22)]"
        >
          Ask a question
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
