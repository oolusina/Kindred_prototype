import { useNavigate } from 'react-router-dom'
import { useSmartBack } from '../../navigation/history'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBackWhite from '../../assets/figma/arrow-back-white.svg'
import lockHeader from '../../assets/figma/lock-header-light.svg'
import lockOnYellow from '../../assets/figma/lock-on-yellow.svg'
import lockCaution from '../../assets/figma/lock-caution.svg'
import groupsMuted from '../../assets/figma/groups-muted.svg'
import forum from '../../assets/figma/forum.svg'
import forumMuted from '../../assets/figma/forum-muted.svg'
import chevronAccent from '../../assets/figma/chevron-right-accent.svg'
import chevronGray from '../../assets/figma/chevron-right-gray.svg'
import medicalWhite from '../../assets/figma/medical-services-white.svg'

const QUESTIONS = [
  {
    text: 'Best time of day to take blood pressure meds?',
    answers: '8 answers',
    when: '3d',
  },
  {
    text: 'Does cutting salt really move the numbers?',
    answers: '2 answers',
    when: '3d',
  },
]

/** Figma 2356:3491 — Community · Explore (read-only) */
export default function CommunityExplore() {
  const navigate = useNavigate()
  const goBack = useSmartBack('/community/browse')

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <div className="shrink-0 rounded-b-[28px] bg-accent pb-5">
        <SystemBar variant="light" />
        <div className="flex flex-col gap-2.5 px-5 pt-2">
          <button
            type="button"
            aria-label="Back"
            onClick={goBack}
            className="cursor-pointer self-start"
          >
            <img src={arrowBackWhite} alt="" className="size-[26px]" />
          </button>
          <div className="flex items-center gap-[5px]">
            <img src={lockHeader} alt="" className="size-[14px]" />
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-[#b8c7eb]">
              Exploring · Read-only
            </p>
          </div>
          <p className="font-serif text-[32px] font-medium leading-[1.16] text-white">
            Hypertension
          </p>
        </div>
      </div>

      <div className="app-scroll flex flex-1 flex-col gap-3.5 px-5 pb-8 pt-4">
        <div className="flex flex-col gap-2.5 rounded-2xl border-[1.5px] border-[#f7e187] bg-[#fefaed] p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f0c519]">
              <img src={lockOnYellow} alt="" className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                You&apos;re exploring, not a member
              </p>
              <p className="font-sans text-[13px] leading-[1.36] text-[#a38611]">
                Read-only community
              </p>
            </div>
          </div>
          <p className="font-sans text-[13px] leading-[1.36] text-ink">
            You can read everything here, but you can&apos;t post, answer or react — you&apos;re not
            a member. You join a community automatically when a diagnosis matches your records.
          </p>
          <button
            type="button"
            className="flex w-fit cursor-pointer items-center gap-[3px]"
          >
            <span className="font-sans text-[15px] font-semibold leading-[1.2] text-accent">
              How communities work
            </span>
            <img src={chevronAccent} alt="" className="size-4" />
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <img src={groupsMuted} alt="" className="size-[18px]" />
          <p className="font-sans text-[13px] leading-[1.36] text-ink-500">8,200 members</p>
        </div>

        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          What people are asking
        </p>

        {QUESTIONS.map((q) => (
          <button
            key={q.text}
            type="button"
            onClick={() => navigate('/community/answers')}
            className="flex w-full cursor-pointer flex-col gap-2.5 rounded-2xl border border-accent-100 bg-card px-4 py-3.5 text-left"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-accent-50 py-[3px] pl-2 pr-2.5">
                <img src={forum} alt="" className="size-3" />
                <span className="font-sans text-[12px] leading-[1.3] text-accent">Question</span>
              </span>
              <span className="flex items-center gap-1 rounded-full bg-[#fdf6dc] py-[3px] pl-2 pr-2.5">
                <img src={lockCaution} alt="" className="size-3" />
                <span className="font-sans text-[12px] leading-[1.3] text-[#a38611]">Read Only</span>
              </span>
              <span className="font-sans text-[13px] leading-[1.36] text-ink-500">{q.when}</span>
            </div>
            <p className="font-sans text-[15px] leading-[1.42] text-ink">{q.text}</p>
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-[5px]">
                <img src={forumMuted} alt="" className="size-[15px]" />
                <span className="font-sans text-[13px] leading-[1.36] text-ink-500">{q.answers}</span>
              </span>
              <img src={chevronGray} alt="" className="ml-auto size-[18px]" />
            </div>
          </button>
        ))}

        <div className="flex flex-col gap-2.5 rounded-2xl border-[1.5px] border-accent bg-accent-50 p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-accent">
              <img src={medicalWhite} alt="" className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                Want to take part?
              </p>
              <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
                Only if you have this diagnosis
              </p>
            </div>
          </div>
          <p className="font-sans text-[13px] leading-[1.36] text-ink">
            Connect your health portal or add a doctor&apos;s note to confirm you have high blood
            pressure. We only unlock a community that matches a diagnosis on your records.
          </p>
          <button
            type="button"
            onClick={() => navigate('/connect/find')}
            className="w-full cursor-pointer rounded-[10px] bg-accent px-3.5 py-[9px] font-sans text-[12px] text-white"
          >
            Connect portal to confirm
          </button>
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
