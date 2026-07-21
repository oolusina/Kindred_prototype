import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import NavBar from '../../components/NavBar'
import SideMenu, { ProfileAvatarButton } from '../../components/SideMenu'
import Sheet from '../../components/Sheet'
import autoAwesome from '../../assets/figma/home_auto_awesome.svg'
import mic from '../../assets/figma/home_mic.svg'
import groupsWhite from '../../assets/figma/groups-white.svg'
import groupsBlue from '../../assets/figma/groups-blue-sm.svg'
import searchBlue from '../../assets/figma/search-blue.svg'
import sort from '../../assets/figma/sort.svg'
import expandMore from '../../assets/figma/expand-more.svg'
import forum from '../../assets/figma/forum.svg'
import addComment from '../../assets/figma/add-comment-white.svg'
import chevronRight from '../../assets/figma/chevron-right-gray.svg'
import tips from '../../assets/figma/tips-and-updates.svg'
import autoAwesomeLight from '../../assets/figma/auto-awesome-light.svg'
import comment from '../../assets/figma/comment.svg'
import { markTourSeen, tourSeen, TOUR_COMMUNITY } from '../timeline/tour'
import {
  SpotlightRing,
  TourCaret,
  coachStyleBelow,
  useSpotlightBox,
} from '../../components/featureTour'
import {
  CommunityTourCoach,
  CommunityTourScrim,
  CommunityTourWelcome,
  type CommunityTourStep,
} from './CommunityTour'

type FeedItem =
  | {
      type: 'question'
      community: string
      age: string
      text: string
      answers: string
      to: string
    }
  | {
      type: 'tip'
      community: string
      age: string
      text: string
      comments: string
      to: string
    }

const FEED: FeedItem[] = [
  {
    type: 'question',
    community: 'Type 2 Diabetes',
    age: '3d',
    text: 'Has anyone managed morning highs with diet alone?',
    answers: '8 answers',
    to: '/community/answers',
  },
  {
    type: 'tip',
    community: 'Kidney Disease',
    age: '1d',
    text: 'Batch-cooking low-sodium meals helps with lower blood pressure',
    comments: '3 comments',
    to: '/community/tip',
  },
  {
    type: 'question',
    community: 'Kidney Disease',
    age: '1w',
    text: 'How fast did your eGFR change on an SGLT2?',
    answers: '14 answers',
    to: '/community/answers',
  },
  {
    type: 'question',
    community: 'Type 2 Diabetes',
    age: '4d',
    text: 'Is a CGM worth it for type 2?',
    answers: '12 answers',
    to: '/community/answers',
  },
]

/** Figma 2910:7360 — welcome + steps 1–3. */
export default function CommunityFeed() {
  const navigate = useNavigate()
  const location = useLocation()
  const resumeStep = (location.state as { tourStep?: CommunityTourStep } | null)?.tourStep
  const rootRef = useRef<HTMLDivElement>(null)
  const spacesRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLButtonElement>(null)
  const questionRef = useRef<HTMLButtonElement>(null)
  const [sortOpen, setSortOpen] = useState(false)
  const [sortBy, setSortBy] = useState('Recent')
  const [menuOpen, setMenuOpen] = useState(false)
  const [tourStep, setTourStep] = useState<CommunityTourStep | -1>(() => {
    if (tourSeen(TOUR_COMMUNITY)) return -1
    if (resumeStep === 1 || resumeStep === 2 || resumeStep === 3) return resumeStep
    return 0
  })

  const spacesBox = useSpotlightBox(rootRef, spacesRef, tourStep === 1, 0)
  const searchBox = useSpotlightBox(rootRef, searchRef, tourStep === 2, 4)
  const questionBox = useSpotlightBox(rootRef, questionRef, tourStep === 3)
  const touring = tourStep >= 0

  useEffect(() => {
    if (tourStep === 3) questionRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [tourStep])

  const dismissTour = () => {
    markTourSeen(TOUR_COMMUNITY)
    setTourStep(-1)
  }

  const goAnswersTour = () =>
    navigate('/community/answers', { state: { tourStep: 4 }, replace: true })

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col bg-canvas">
      <div className="shrink-0 rounded-b-header bg-accent">
        <SystemBar variant="light" />
        <div className="flex flex-col gap-2.5 px-5 pb-6 pt-5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 flex-col">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-[#b8c7eb]">
                Your communities
              </p>
              <p className="font-serif text-[32px] font-medium leading-[1.16] text-white">
                Community
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                aria-label="Ask a question"
                onClick={() => !touring && navigate('/community/new')}
                className="flex size-[42px] cursor-pointer items-center justify-center rounded-[23px] bg-accent-subtle"
              >
                <img src={addComment} alt="" className="size-[22px]" />
              </button>
              <ProfileAvatarButton onClick={() => !touring && setMenuOpen(true)} />
            </div>
          </div>
          <div className="h-px w-full bg-accent-subtle" />
          <button
            ref={searchRef}
            type="button"
            onClick={() => !touring && navigate('/ask')}
            className={`flex h-12 w-full cursor-pointer items-center gap-2 rounded-full border border-accent-200 bg-white pl-4 pr-1.5 ${
              tourStep === 2 ? 'relative z-[60]' : ''
            }`}
          >
            <img src={autoAwesome} alt="" className="size-[18px]" />
            <span className="flex-1 text-left font-sans text-[15px] text-ink-500">
              Ask about your health
            </span>
            <span className="flex size-9 items-center justify-center rounded-[18px] bg-accent">
              <img src={mic} alt="" className="size-[18px]" />
            </span>
          </button>
        </div>
      </div>

      <div className="app-scroll flex-1 pb-28">
        <div className="flex flex-col gap-4 px-5 pt-4">
          <div
            ref={spacesRef}
            className={`-mx-5 flex shrink-0 flex-col gap-3 px-5 ${
              tourStep === 1 ? 'relative z-[60] bg-canvas py-3' : ''
            }`}
          >
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
              Your communities
            </p>
            <div className="flex items-stretch gap-2.5">
              <button
                type="button"
                onClick={() => !touring && navigate('/community/t2d')}
                className="flex min-w-0 flex-1 cursor-pointer flex-col items-start gap-2 rounded-2xl bg-accent p-3.5 text-left"
              >
                <p className="font-sans text-[15px] font-medium leading-[1.4] text-white">
                  Type 2 Diabetes
                </p>
                <div className="flex items-center gap-1">
                  <img src={groupsWhite} alt="" className="size-3" />
                  <p className="font-sans text-[13px] text-[#b8c7eb]">12,480 members</p>
                </div>
                <span className="rounded-full bg-white px-2 py-0.5 font-sans text-[12px] text-accent">
                  3 new posts
                </span>
              </button>
              <button
                type="button"
                onClick={() => !touring && navigate('/community/t2d')}
                className="flex min-w-0 flex-1 cursor-pointer flex-col items-start gap-2 rounded-2xl bg-accent-100 p-3.5 text-left"
              >
                <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                  Kidney Disease
                </p>
                <div className="flex items-center gap-1">
                  <img src={groupsBlue} alt="" className="size-3" />
                  <p className="font-sans text-[13px] text-ink-500">9,400 members</p>
                </div>
                <span className="rounded-full bg-accent px-2 py-0.5 font-sans text-[12px] text-white">
                  1 new posts
                </span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => !touring && navigate('/community/browse')}
              className="flex w-full cursor-pointer items-center gap-2 rounded-2xl border border-dashed border-accent-200 bg-card px-3.5 py-3 text-left"
            >
              <img src={searchBlue} alt="" className="size-4" />
              <p className="font-sans text-[13px] font-medium leading-[1.3] text-accent">
                Browse other communities
              </p>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
              Recent activity
            </p>
            <button
              type="button"
              onClick={() => !touring && setSortOpen(true)}
              className="flex cursor-pointer items-center gap-1 rounded-full border border-accent-200 bg-card py-2 pl-3 pr-2.5"
            >
              <img src={sort} alt="" className="size-[15px]" />
              <span className="font-sans text-[12px] text-accent">{sortBy}</span>
              <img src={expandMore} alt="" className="size-3.5" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {FEED.map((item, i) =>
              item.type === 'question' ? (
                <button
                  key={item.text}
                  ref={i === 0 ? questionRef : undefined}
                  type="button"
                  onClick={() => {
                    if (touring) return
                    navigate(item.to)
                  }}
                  className={`flex w-full shrink-0 cursor-pointer flex-col gap-2 rounded-2xl border border-accent-100 bg-card px-4 py-3.5 text-left ${
                    tourStep === 3 && i === 0 ? 'relative z-[60]' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-accent px-2.5 py-0.5 font-sans text-[12px] text-white">
                      {item.community}
                    </span>
                    <span className="flex items-center gap-1">
                      <img src={forum} alt="" className="size-3.5" />
                      <span className="font-sans text-[12px] text-accent">Question</span>
                    </span>
                    <span className="font-sans text-[13px] text-ink-500">{item.age}</span>
                  </div>
                  <p className="font-sans text-[15px] leading-[1.42] text-ink">{item.text}</p>
                  <div className="flex items-center gap-1.5">
                    <img src={forum} alt="" className="size-[15px]" />
                    <span className="font-sans text-[13px] text-ink-500">{item.answers}</span>
                    <img src={chevronRight} alt="" className="ml-auto size-[18px]" />
                  </div>
                </button>
              ) : (
                <button
                  key={item.text}
                  type="button"
                  onClick={() => !touring && navigate(item.to)}
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
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-accent-100 px-2.5 py-0.5 font-sans text-[12px] text-accent">
                        {item.community}
                      </span>
                      <span className="font-sans text-[13px] text-ink-500">{item.age}</span>
                    </div>
                    <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                      {item.text}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <img src={comment} alt="" className="size-[15px]" />
                      <span className="font-sans text-[13px] text-ink-500">{item.comments}</span>
                      <img src={chevronRight} alt="" className="ml-auto size-[18px]" />
                    </div>
                  </div>
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      <NavBar tab="community" />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <Sheet open={sortOpen} onClose={() => setSortOpen(false)}>
        <div className="flex flex-col gap-3 px-6 pb-8 pt-1">
          <p className="font-serif text-[17px] font-semibold text-ink">Sort by</p>
          {['Recent', 'Most answered', 'Tips first'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setSortBy(opt)
                setSortOpen(false)
              }}
              className="flex w-full cursor-pointer items-center gap-3 py-2.5 text-left"
            >
              <span
                className={`flex size-[22px] items-center justify-center rounded-full border-2 ${
                  sortBy === opt ? 'border-accent bg-accent' : 'border-ink-300'
                }`}
              >
                {sortBy === opt && <span className="size-2 rounded-full bg-white" />}
              </span>
              <span className="font-sans text-[15px] text-ink">{opt}</span>
            </button>
          ))}
        </div>
      </Sheet>

      {tourStep >= 0 && (
        <div className="pointer-events-none absolute inset-0 z-50">
          <div className="pointer-events-auto absolute inset-0">
            <CommunityTourScrim onDismiss={dismissTour} />
          </div>
          {tourStep === 0 && (
            <div className="pointer-events-auto">
              <CommunityTourWelcome onStart={() => setTourStep(1)} onSkip={dismissTour} />
            </div>
          )}
          {tourStep === 1 && spacesBox && (
            <>
              <SpotlightRing box={spacesBox} className="rounded-[20px]" />
              <div className="pointer-events-auto">
                <CommunityTourCoach
                  step={1}
                  style={coachStyleBelow(spacesBox)}
                  onPrimary={() => setTourStep(2)}
                  onSecondary={dismissTour}
                  caret={<TourCaret />}
                />
              </div>
            </>
          )}
          {tourStep === 2 && searchBox && (
            <>
              <SpotlightRing box={searchBox} className="rounded-full" />
              <div className="pointer-events-auto">
                <CommunityTourCoach
                  step={2}
                  style={coachStyleBelow(searchBox)}
                  onPrimary={() => setTourStep(3)}
                  onSecondary={() => setTourStep(1)}
                  caret={<TourCaret />}
                />
              </div>
            </>
          )}
          {tourStep === 3 && questionBox && (
            <div className="pointer-events-auto">
              <CommunityTourCoach
                step={3}
                style={coachStyleBelow(questionBox)}
                onPrimary={goAnswersTour}
                onSecondary={() => setTourStep(2)}
                caret={<TourCaret />}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
