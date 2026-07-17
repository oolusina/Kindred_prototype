import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import Sheet from '../../components/Sheet'
import arrowBackWhite from '../../assets/figma/arrow-back-white.svg'
import groupsWhite from '../../assets/figma/groups-white.svg'
import sort from '../../assets/figma/sort.svg'
import expandMore from '../../assets/figma/expand-more.svg'
import chevronRight from '../../assets/figma/chevron-right-ink.svg'
import autoAwesome from '../../assets/figma/home_auto_awesome.svg'
import thumbUp from '../../assets/figma/thumb-up.svg'
import radioOn from '../../assets/figma/radio-on.svg'
import { markTourSeen, tourSeen, TOUR_COMMUNITY } from '../timeline/tour'
import {
  CommunityTourCoach,
  CommunityTourScrim,
  SpotlightRing,
  TourCaret,
  coachStyleBelow,
  coachStyleCentered,
  useSpotlightBox,
  type CommunityTourStep,
} from './CommunityTour'

const RESPONSES = [
  {
    initials: 'QH',
    name: 'QuietHeron',
    match: '92% match',
    text: 'I cut carbs to about 20g and my morning numbers dropped within three weeks.',
    verify: "Verified by 254 members' vault data",
    helpful: '24 found helpful',
    color: 'bg-accent',
  },
  {
    initials: 'SW',
    name: 'SwiftWren',
    match: '78% match',
    text: "Cinnamon every morning seemed to help my highs, but it's hard to say.",
    verify: 'Not enough community vault data to verify',
    helpful: '8 found helpful',
    color: 'bg-[#30a66f]',
  },
]

/** Figma 2910:7360 — steps 4–5 on Answers. */
export default function CommunityAnswers() {
  const navigate = useNavigate()
  const location = useLocation()
  const resumeStep = (location.state as { tourStep?: CommunityTourStep } | null)?.tourStep
  const rootRef = useRef<HTMLDivElement>(null)
  const matchRef = useRef<HTMLSpanElement>(null)
  const verifyRef = useRef<HTMLDivElement>(null)
  const [sortOpen, setSortOpen] = useState(false)
  const [sortBy, setSortBy] = useState('Most similar to you')
  const [tourStep, setTourStep] = useState<CommunityTourStep | -1>(() => {
    if (tourSeen(TOUR_COMMUNITY)) return -1
    if (resumeStep === 4 || resumeStep === 5) return resumeStep
    return -1
  })

  const matchBox = useSpotlightBox(rootRef, matchRef, tourStep === 4, 4)
  const verifyBox = useSpotlightBox(rootRef, verifyRef, tourStep === 5, 4)
  const touring = tourStep >= 4

  useEffect(() => {
    if (tourStep === 4) matchRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    if (tourStep === 5) verifyRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [tourStep])

  const dismissTour = () => {
    markTourSeen(TOUR_COMMUNITY)
    setTourStep(-1)
    navigate('/community', { replace: true })
  }

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col bg-canvas">
      <div className="shrink-0 rounded-b-[28px] bg-accent pb-5">
        <SystemBar variant="light" />
        <div className="flex flex-col gap-3 px-5 pt-2">
          <button
            type="button"
            aria-label="Back"
            onClick={() =>
              touring
                ? dismissTour()
                : navigate('/community/t2d')
            }
            className="cursor-pointer self-start"
          >
            <img src={arrowBackWhite} alt="" className="size-[26px]" />
          </button>
          <span className="flex w-fit items-center gap-1 rounded-full border border-canvas px-2 py-1.5">
            <img src={groupsWhite} alt="" className="size-3.5" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-canvas">
              Diabetes
            </span>
          </span>
          <p className="font-serif text-[20px] font-medium leading-[1.24] text-white">
            Did changing breakfast carbs lower your morning readings?
          </p>
          <p className="font-sans text-[13px] text-accent-300">Asked by you · 2h ago</p>
        </div>
      </div>
      <div className="app-scroll flex flex-1 flex-col gap-3.5 px-5 pb-8 pt-4">
        <div className="flex items-center justify-between">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
            Responses
          </p>
          <button
            type="button"
            onClick={() => !touring && setSortOpen(true)}
            className="flex max-w-[200px] cursor-pointer items-center gap-1 rounded-full border border-accent-200 bg-card py-2 pl-3 pr-2.5"
          >
            <img src={sort} alt="" className="size-[15px] shrink-0" />
            <span className="truncate font-sans text-[12px] text-accent">{sortBy}</span>
            <img src={expandMore} alt="" className="size-3.5 shrink-0" />
          </button>
        </div>
        {RESPONSES.map((r, i) => (
          <button
            key={r.name + r.text.slice(0, 12)}
            type="button"
            onClick={() => !touring && navigate('/community/response')}
            className="flex w-full cursor-pointer flex-col gap-2.5 rounded-2xl border border-accent-100 bg-card px-4 py-3.5 text-left"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`flex size-[34px] items-center justify-center rounded-full ${r.color}`}
              >
                <span className="font-sans text-[12px] text-white">{r.initials}</span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="font-sans text-[15px] font-medium text-ink">{r.name}</p>
                <span
                  ref={i === 0 ? matchRef : undefined}
                  className={`flex w-fit items-center gap-0.5 rounded-full bg-accent-50 py-0.5 pl-2 pr-1.5 ${
                    tourStep === 4 && i === 0 ? 'relative z-[60]' : ''
                  }`}
                >
                  <span className="font-sans text-[12px] text-accent">{r.match}</span>
                  <img src={chevronRight} alt="" className="size-[13px]" />
                </span>
              </div>
            </div>
            <p className="font-sans text-[15px] leading-[1.42] text-ink">{r.text}</p>
            <div
              ref={i === 0 ? verifyRef : undefined}
              className={`flex items-center gap-1.5 rounded-[10px] bg-accent-50 py-2 pl-2.5 pr-3 ${
                tourStep === 5 && i === 0 ? 'relative z-[60]' : ''
              }`}
            >
              <img src={autoAwesome} alt="" className="size-[15px] shrink-0" />
              <span className="font-sans text-[12px] text-accent">{r.verify}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <img src={thumbUp} alt="" className="size-[15px]" />
                <span className="font-sans text-[13px] text-ink-500">{r.helpful}</span>
              </span>
              <span className="flex items-center gap-0.5">
                <span className="font-sans text-[15px] font-semibold text-accent">
                  View discussion
                </span>
                <img src={chevronRight} alt="" className="size-4" />
              </span>
            </div>
          </button>
        ))}
        <button
          type="button"
          onClick={() => !touring && navigate('/community/response')}
          className="flex cursor-pointer items-center gap-0.5 self-start"
        >
          <span className="font-sans text-[15px] font-semibold text-accent">See all 8 answers</span>
          <img src={chevronRight} alt="" className="size-[18px]" />
        </button>
      </div>
      <HomeIndicator />

      <Sheet open={sortOpen} onClose={() => setSortOpen(false)}>
        <div className="flex flex-col gap-3.5 px-6 pb-8 pt-1">
          <p className="font-serif text-[17px] font-semibold text-ink">Sort By</p>
          {[
            'Most similar to you',
            'Most recent',
            'Most supported by data',
            'Most saved',
          ].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSortBy(opt)}
              className="flex w-full cursor-pointer items-center gap-3 py-2.5 text-left"
            >
              {sortBy === opt ? (
                <img src={radioOn} alt="" className="size-[22px]" />
              ) : (
                <span className="size-[22px] rounded-full border-2 border-ink-300" />
              )}
              <span className="font-sans text-[15px] text-ink">{opt}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSortOpen(false)}
            className="mt-1 w-full cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
          >
            Apply
          </button>
        </div>
      </Sheet>

      {tourStep >= 4 && (
        <div className="pointer-events-none absolute inset-0 z-50">
          <div className="pointer-events-auto absolute inset-0">
            <CommunityTourScrim onDismiss={dismissTour} />
          </div>
          {tourStep === 4 && matchBox && (
            <>
              <SpotlightRing box={matchBox} className="rounded-full" />
              <div className="pointer-events-auto">
                <CommunityTourCoach
                  step={4}
                  style={coachStyleCentered(matchBox)}
                  onPrimary={() => setTourStep(5)}
                  onSecondary={() =>
                    navigate('/community', { state: { tourStep: 3 }, replace: true })
                  }
                  caret={<span className="absolute -top-[11px] left-[82px] h-0 w-0 border-x-[9px] border-b-[12px] border-x-transparent border-b-white" />}
                />
              </div>
            </>
          )}
          {tourStep === 5 && verifyBox && (
            <>
              <SpotlightRing box={verifyBox} className="rounded-[14px]" />
              <div className="pointer-events-auto">
                <CommunityTourCoach
                  step={5}
                  style={coachStyleBelow(verifyBox)}
                  onPrimary={dismissTour}
                  onSecondary={() => setTourStep(4)}
                  caret={<TourCaret />}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
