import { useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import NavBar from '../../components/NavBar'
import SideMenu, { ProfileAvatarButton } from '../../components/SideMenu'
import SegmentedTabs from '../../components/SegmentedTabs'
import autoAwesome from '../../assets/figma/home_auto_awesome.svg'
import mic from '../../assets/figma/home_mic.svg'
import menuBookLight from '../../assets/figma/learn-menu-book-light.svg'
import chevronRightLight from '../../assets/figma/learn-chevron-right-light.svg'
import chevronRight from '../../assets/figma/learn-chevron-right.svg'
import checkLight from '../../assets/figma/learn-check-light.svg'
import menuBookBlue from '../../assets/figma/learn-menu-book-blue.svg'
import bookmarkBlue from '../../assets/figma/learn-bookmark-blue.svg'
import { markTourSeen, tourSeen, TOUR_LEARN } from '../timeline/tour'
import { usePrototypeState } from '../../state/PrototypeState'
import {
  SpotlightRing,
  TourCaret,
  coachStyleBelow,
  useSpotlightBox,
} from '../../components/featureTour'
import {
  LearnTourCoach,
  LearnTourScrim,
  LearnTourWelcome,
  type LearnTourStep,
} from './LearnTour'

type Mod = { title: string; status: string; done?: boolean; to?: string }

const SECTIONS: { title: string; done: string; progress: number; modules: Mod[] }[] = [
  {
    title: 'Kidney disease',
    done: '2 of 5 done',
    progress: 40,
    modules: [
      { title: 'What is kidney disease?', status: 'Done', done: true },
      { title: 'Your stage, explained', status: 'In progress', to: '/learn/module' },
      { title: 'Kidney-friendly eating', status: '4 min' },
      { title: 'Protecting your kidneys', status: '6 min' },
      { title: 'Planning ahead', status: '5 min' },
    ],
  },
  {
    title: 'Type 2 Diabetes',
    done: '1 of 4 done',
    progress: 25,
    modules: [
      { title: 'Understanding blood sugar', status: 'Done', done: true },
      { title: 'Carbs and your plate', status: '5 min' },
      { title: 'Your medications, explained', status: '4 min' },
      { title: 'Spotting highs and lows', status: '3 min' },
    ],
  },
  {
    title: 'Good to know',
    done: '0 of 3 done',
    progress: 0,
    modules: [
      { title: 'Reading your lab results', status: '4 min' },
      { title: 'Working with your care team', status: '3 min' },
      { title: 'How we keep your data safe', status: '3 min' },
    ],
  },
]

const SAVED = [
  { title: 'Your stage, explained', sub: 'Kidney disease · In progress', to: '/learn/module' },
  { title: 'Your stage in 3 minutes', sub: 'Explainer video', to: '/learn/video' },
  { title: 'Understanding blood sugar', sub: 'Type 2 Diabetes · Done' },
]

/** Figma 3139:8265 — welcome + step 1. */
export default function LearnHub() {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const resumeStep = (location.state as { tourStep?: LearnTourStep } | null)?.tourStep
  const { savedSources } = usePrototypeState()
  const rootRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const [tab, setTab] = useState<'modules' | 'saved'>(() =>
    params.get('tab') === 'saved' ? 'saved' : 'modules',
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [tourStep, setTourStep] = useState<LearnTourStep | -1>(() => {
    if (tourSeen(TOUR_LEARN)) return -1
    if (resumeStep === 1) return 1
    return 0
  })

  const tabsBox = useSpotlightBox(rootRef, tabsRef, tourStep === 1, 4)
  const touring = tourStep >= 0

  const dismissTour = () => {
    markTourSeen(TOUR_LEARN)
    setTourStep(-1)
  }

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col bg-canvas">
      <div className="shrink-0 rounded-b-header bg-accent">
        <SystemBar variant="light" />
        <div className="flex flex-col gap-2.5 px-5 pb-6 pt-1">
          <div className="flex items-center justify-between">
            <p className="font-serif text-[38px] font-medium leading-[1.1] text-canvas">Learning</p>
            <ProfileAvatarButton onClick={() => !touring && setMenuOpen(true)} />
          </div>
          <div className="h-px w-full bg-accent-subtle" />
          <button
            type="button"
            onClick={() => !touring && navigate('/ask')}
            className="flex w-full cursor-pointer items-center gap-2 rounded-full border border-accent-200 bg-white py-1.5 pr-1.5 pl-4"
          >
            <img src={autoAwesome} alt="" className="size-[18px]" />
            <span className="flex-1 text-left font-sans text-[15px] text-ink-500">
              Ask about your health
            </span>
            <span
              role="link"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation()
                if (touring) return
                navigate('/ask/voice')
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.stopPropagation()
                  if (touring) return
                  navigate('/ask/voice')
                }
              }}
              className="flex size-9 cursor-pointer items-center justify-center rounded-[18px] bg-accent"
            >
              <img src={mic} alt="" className="size-[18px]" />
            </span>
          </button>
        </div>
      </div>

      <div
        ref={tabsRef}
        className={`mx-5 mt-3.5 shrink-0 ${tourStep === 1 ? 'relative z-[60]' : ''}`}
      >
        <SegmentedTabs
          value={tab}
          onChange={(next) => {
            if (!touring) setTab(next)
          }}
          options={[
            { value: 'modules', label: 'Modules' },
            { value: 'saved', label: 'Saved' },
          ]}
        />
      </div>

      <div className="app-scroll flex-1 overflow-y-auto px-5 pt-5 pb-28">
        <div key={tab} className="animate-[tabSlide_280ms_ease-out]">
          {tab === 'modules' ? (
            <div className="flex flex-col gap-5">
              <button
                type="button"
                onClick={() => !touring && navigate('/learn/module')}
                className="flex cursor-pointer flex-col gap-2.5 rounded-[18px] bg-accent px-4 pt-3.5 pb-4 text-left"
              >
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-white">
                  Pick up where you left off
                </p>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent-subtle">
                    <img src={menuBookLight} alt="" className="size-[22px]" />
                  </span>
                  <span className="flex-1 text-white">
                    <span className="block font-sans text-[15px] font-medium">
                      Your stage, explained
                    </span>
                    <span className="block font-sans text-[13px]">
                      Kidney disease · section 2 of 3
                    </span>
                  </span>
                  <img src={chevronRightLight} alt="" className="size-5" />
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-[3px] bg-white/35">
                  <div className="h-full w-[55%] rounded-[3px] bg-canvas" />
                </div>
              </button>

              {SECTIONS.map((sec) => (
                <div key={sec.title} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="flex-1 font-serif text-[17px] font-semibold leading-[1.28] text-ink">
                      {sec.title}
                    </p>
                    <p className="font-sans text-[13px] text-ink-500">{sec.done}</p>
                  </div>
                  <div className="mb-1 h-1.5 w-full overflow-hidden rounded-[3px] bg-accent-100">
                    <div
                      className="h-full rounded-[3px] bg-accent"
                      style={{ width: `${sec.progress}%` }}
                    />
                  </div>
                  <div className="rounded-2xl border border-accent-100 bg-card px-3.5 py-0.5">
                    {sec.modules.map((mod, i) => (
                      <div key={mod.title}>
                        {i > 0 && <div className="h-px w-full bg-accent-100" />}
                        <button
                          type="button"
                          onClick={() => !touring && navigate(mod.to ?? '/learn/module')}
                          className="flex w-full cursor-pointer items-center gap-3 py-[13px] text-left"
                        >
                          <span
                            className={`flex size-[26px] shrink-0 items-center justify-center rounded-[13px] ${
                              mod.done ? 'bg-accent' : 'bg-accent-50'
                            }`}
                          >
                            <img
                              src={mod.done ? checkLight : menuBookBlue}
                              alt=""
                              className="size-4"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-sans text-[15px] font-medium text-ink">
                              {mod.title}
                            </span>
                            <span className="block font-sans text-[13px] text-ink-500">
                              {mod.status}
                            </span>
                          </span>
                          <img src={chevronRight} alt="" className="size-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-accent-100 bg-card px-3.5">
                {SAVED.map((s, i) => (
                  <div key={s.title}>
                    {i > 0 && <div className="h-px w-full bg-accent-100" />}
                    <button
                      type="button"
                      onClick={() => !touring && s.to && navigate(s.to)}
                      className="flex w-full cursor-pointer items-center gap-3 py-3.5 text-left"
                    >
                      <span className="flex size-[34px] items-center justify-center rounded-[11px] bg-accent-50">
                        <img src={bookmarkBlue} alt="" className="size-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-sans text-[15px] font-medium text-ink">
                          {s.title}
                        </span>
                        <span className="block font-sans text-[13px] text-ink-500">{s.sub}</span>
                      </span>
                      <img src={chevronRight} alt="" className="size-5" />
                    </button>
                  </div>
                ))}
              </div>

              {savedSources.length > 0 && (
                <div>
                  <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
                    Saved sources
                  </p>
                  <div className="rounded-2xl border border-accent-100 bg-card px-3.5">
                    {savedSources.map((s, i) => (
                      <div key={s.id}>
                        {i > 0 && <div className="h-px w-full bg-accent-100" />}
                        <div className="flex items-center gap-3 py-3.5">
                          <span
                            className="flex size-[34px] shrink-0 items-center justify-center rounded-[11px] text-[13px] font-medium text-white"
                            style={{ background: s.color }}
                          >
                            {s.letter}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-1.5">
                              <span className="font-sans text-[15px] font-medium text-ink">
                                {s.name}
                              </span>
                              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
                                Saved
                              </span>
                            </span>
                            <span className="block font-sans text-[13px] text-ink-500">{s.sub}</span>
                          </span>
                          <img src={bookmarkBlue} alt="" className="size-5 shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <NavBar tab="learn" />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {tourStep >= 0 && (
        <div className="pointer-events-none absolute inset-0 z-50">
          <div className="pointer-events-auto absolute inset-0">
            <LearnTourScrim onDismiss={dismissTour} />
          </div>
          {tourStep === 0 && (
            <div className="pointer-events-auto">
              <LearnTourWelcome onStart={() => setTourStep(1)} onSkip={dismissTour} />
            </div>
          )}
          {tourStep === 1 && tabsBox && (
            <>
              <SpotlightRing box={tabsBox} className="rounded-full" />
              <div className="pointer-events-auto">
                <LearnTourCoach
                  step={1}
                  style={coachStyleBelow(tabsBox)}
                  onPrimary={() =>
                    navigate('/learn/module', {
                      state: { tourStep: 2 },
                      replace: true,
                    })
                  }
                  onSecondary={dismissTour}
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
