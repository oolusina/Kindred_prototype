import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import NavBar from '../../components/NavBar'
import SideMenu, { ProfileAvatarButton } from '../../components/SideMenu'
import Sheet from '../../components/Sheet'
import autoAwesome from '../../assets/figma/home_auto_awesome.svg'
import mic from '../../assets/figma/home_mic.svg'
import iosShare from '../../assets/figma/ios-share-white.svg'
import eventBlue from '../../assets/figma/event-blue.svg'
import closeBlue from '../../assets/figma/close-blue.svg'
import chevronRight from '../../assets/figma/chevron-right-gray.svg'
import chevronRightLight from '../../assets/figma/learn-chevron-right-light.svg'
import filterSort from '../../assets/figma/filter-sort.svg'
import exploreGray from '../../assets/figma/explore-gray.svg'
import scienceGray from '../../assets/figma/science-gray.svg'
import eventGray from '../../assets/figma/event-gray.svg'
import scienceWhite from '../../assets/figma/science-white.svg'
import medicationBlue from '../../assets/figma/medication-blue.svg'
import diagnosisDiamond from '../../assets/figma/diagnosis-diamond.svg'
import pictureAsPdf from '../../assets/figma/picture-as-pdf.svg'
import linkIcon from '../../assets/figma/link.svg'
import medicalServices from '../../assets/figma/medical-services-blue.svg'
import closeInk from '../../assets/figma/close-ink.svg'
import { markTourSeen, tourSeen, TOUR_TIMELINE } from './tour'
import {
  TimelineTourCoach,
  TimelineTourScrim,
  TimelineTourWelcome,
  SpotlightRing,
  TourCaret,
  coachStyleAbove,
  coachStyleBelow,
  useSpotlightBox,
  type TimelineTourStep,
} from './TimelineTour'

export type TimelineLens = 'you' | 'kidney' | 'metformin'

type FeedItem =
  | { kind: 'ahead'; date: string; title: string; sub: string; to?: string; icon?: string }
  | { kind: 'year'; label: string }
  | {
      kind: 'event'
      day: string
      month: string
      title: string
      sub: string
      to?: string
      icon?: 'science' | 'med' | 'diag' | 'event' | 'learn'
      highlight?: boolean
    }

const YOU_FEED: FeedItem[] = [
  {
    kind: 'ahead',
    date: 'AHEAD',
    title: 'Looking ahead',
    sub: 'a gentle view of what may come',
    to: '/timeline/ahead',
    icon: exploreGray,
  },
  { kind: 'ahead', date: 'AUG', title: 'Next eGFR test', sub: 'due 2026', icon: scienceGray },
  {
    kind: 'ahead',
    date: 'SEP',
    title: 'Nephrology follow-up',
    sub: 'scheduled',
    to: '/timeline/moment/appointment',
    icon: eventGray,
  },
  { kind: 'year', label: '2026' },
  {
    kind: 'event',
    day: '09',
    month: 'JUL',
    title: 'eGFR holding steady at 48',
    sub: 'synced from your labs',
    to: '/timeline/moment/labs',
    icon: 'science',
    highlight: true,
  },
  {
    kind: 'event',
    day: '18',
    month: 'JUN',
    title: 'A1C improved to 7.3%',
    sub: 'your best in a year',
    to: '/timeline/moment/labs',
    icon: 'science',
  },
  {
    kind: 'event',
    day: '12',
    month: 'APR',
    title: 'Started Lisinopril 10mg',
    sub: 'protects your kidneys',
    to: '/timeline/moment/medication',
    icon: 'med',
  },
  {
    kind: 'event',
    day: '12',
    month: 'APR',
    title: 'Confirmed CKD Stage 3',
    sub: 'nephrology visit',
    to: '/timeline/moment/diagnosis',
    icon: 'diag',
  },
  {
    kind: 'event',
    day: '12',
    month: 'APR',
    title: 'Nephrology check-up',
    sub: 'reviewed labs & meds',
    to: '/timeline/moment/appointment',
    icon: 'event',
  },
  {
    kind: 'event',
    day: '20',
    month: 'JAN',
    title: 'Metformin increased to 1000mg',
    sub: 'for blood sugar',
    to: '/timeline/moment/medication',
    icon: 'med',
  },
  { kind: 'year', label: '2025' },
  {
    kind: 'event',
    day: '14',
    month: 'OCT',
    title: 'Blood pressure 138/86',
    sub: 'logged at home',
    icon: 'science',
  },
  {
    kind: 'event',
    day: '03',
    month: 'MAR',
    title: 'Diagnosed with kidney disease',
    sub: 'confirmed by your team',
    to: '/timeline/moment/diagnosis',
    icon: 'diag',
  },
  {
    kind: 'event',
    day: '28',
    month: 'FEB',
    title: 'Started Metformin 500mg',
    sub: 'after diagnosis',
    to: '/timeline/moment/medication',
    icon: 'med',
  },
  {
    kind: 'event',
    day: '12',
    month: 'JAN',
    title: 'Diagnosed with Type 2 Diabetes',
    sub: 'confirmed by your team',
    to: '/timeline/moment/diagnosis',
    icon: 'diag',
  },
  {
    kind: 'event',
    day: '05',
    month: 'JAN',
    title: 'Started learning module',
    sub: 'Understanding your kidneys',
    to: '/learn/module',
    icon: 'learn',
  },
]

const KIDNEY_FEED: FeedItem[] = YOU_FEED.filter(
  (i) =>
    i.kind === 'year' ||
    i.kind === 'ahead' ||
    (i.kind === 'event' &&
      (i.title.includes('eGFR') ||
        i.title.includes('CKD') ||
        i.title.includes('kidney') ||
        i.title.includes('Nephrology') ||
        i.title.includes('Lisinopril') ||
        i.title.includes('Blood pressure'))),
)

const METFORMIN_FEED: FeedItem[] = YOU_FEED.filter(
  (i) =>
    i.kind === 'year' ||
    (i.kind === 'event' &&
      (i.title.includes('Metformin') || i.title.includes('A1C') || i.title.includes('Diabetes'))),
)

const LENS_META: Record<
  TimelineLens,
  { path: string; chip: string; feed: FeedItem[]; filters: string[] }
> = {
  you: {
    path: '/timeline',
    chip: 'All health',
    feed: YOU_FEED,
    filters: ['All health', 'Key moments', 'Labs', 'Medications', 'Appointments'],
  },
  kidney: {
    path: '/timeline/kidney',
    chip: 'Kidney disease',
    feed: KIDNEY_FEED,
    filters: ['Kidney disease', 'Key moments', 'Labs', 'Medications', 'Appointments'],
  },
  metformin: {
    path: '/timeline/metformin',
    chip: 'Metformin',
    feed: METFORMIN_FEED,
    filters: ['Metformin', 'Key moments', 'Labs', 'Medications', 'Dose changes'],
  },
}

const TOUR_DEMO_MOMENT = 'eGFR holding steady at 48'

function NodeIcon({ type }: { type?: 'science' | 'med' | 'diag' | 'event' | 'learn' }) {
  if (type === 'science')
    return (
      <span className="flex size-[30px] items-center justify-center rounded-[15px] border border-accent-100 bg-accent-50">
        <img src={scienceGray} alt="" className="size-4" />
      </span>
    )
  if (type === 'med')
    return (
      <span className="flex size-[30px] items-center justify-center rounded-[15px] border border-accent-100 bg-accent-50">
        <img src={medicationBlue} alt="" className="size-4" />
      </span>
    )
  if (type === 'event')
    return (
      <span className="flex size-[30px] items-center justify-center rounded-[15px] border border-accent-100 bg-accent-50">
        <img src={eventBlue} alt="" className="size-4" />
      </span>
    )
  if (type === 'learn')
    return (
      <span className="flex size-[30px] items-center justify-center rounded-[15px] border border-accent-100 bg-accent-50">
        <img src={exploreGray} alt="" className="size-4" />
      </span>
    )
  if (type === 'diag')
    return (
      <span className="flex size-[30px] items-center justify-center">
        <img src={diagnosisDiamond} alt="" className="size-[19px]" />
      </span>
    )
  return <span className="size-[30px]" />
}

export default function TimelineScreen({ lens }: { lens: TimelineLens }) {
  const navigate = useNavigate()
  const meta = LENS_META[lens]
  const rootRef = useRef<HTMLDivElement>(null)
  const lensesRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLButtonElement>(null)
  const momentRef = useRef<HTMLButtonElement>(null)
  const [filter, setFilter] = useState(meta.filters[0])
  const [logDismissed, setLogDismissed] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortNewest, setSortNewest] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [tourStep, setTourStep] = useState<TimelineTourStep | -1>(() =>
    tourSeen(TOUR_TIMELINE) ? -1 : 0,
  )

  const lensesBox = useSpotlightBox(rootRef, lensesRef, tourStep === 1, 4)
  const momentBox = useSpotlightBox(rootRef, momentRef, tourStep === 2)
  const searchBox = useSpotlightBox(rootRef, searchRef, tourStep === 3, 4)
  const touring = tourStep >= 0

  // Reset category chip only when the lens route changes
  useEffect(() => {
    setFilter(meta.chip)
  }, [lens, meta.chip])

  useEffect(() => {
    if (tourStep === 2) momentRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [tourStep])

  const dismissTour = () => {
    markTourSeen(TOUR_TIMELINE)
    setTourStep(-1)
  }

  const rootChip = meta.chip

  const matchesFilter = (item: FeedItem): boolean => {
    if (filter === rootChip) return true
    if (item.kind === 'year' || item.kind === 'ahead') return true
    if (item.kind !== 'event') return true
    switch (filter) {
      case 'Key moments':
        return Boolean(item.highlight) || item.icon === 'diag'
      case 'Labs':
        return item.icon === 'science'
      case 'Medications':
      case 'Dose changes':
        return item.icon === 'med'
      case 'Appointments':
        return item.icon === 'event'
      case 'eGFR':
        return item.title.toLowerCase().includes('egfr')
      case 'Visits':
        return item.icon === 'event' || item.icon === 'diag'
      default:
        return true
    }
  }

  const filtered = meta.feed.filter(matchesFilter)
  const feed = sortNewest ? filtered : [...filtered].reverse()

  const selectChip = (f: string) => {
    if (touring) return
    // Clicking the already-active category chip returns to the root lens view
    if (f === filter && f !== rootChip) {
      setFilter(rootChip)
      return
    }

    if (f === 'All health') {
      setFilter('All health')
      if (lens !== 'you') navigate('/timeline')
      return
    }
    if (f === 'Kidney disease') {
      setFilter('Kidney disease')
      if (lens !== 'kidney') navigate('/timeline/kidney')
      return
    }
    if (f === 'Metformin') {
      setFilter('Metformin')
      if (lens !== 'metformin') navigate('/timeline/metformin')
      return
    }
    setFilter(f)
  }

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col bg-canvas">
      <div className="shrink-0 rounded-b-header bg-accent">
        <SystemBar variant="light" />
        <div className="flex flex-col gap-2.5 px-5 pb-6 pt-1">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent-300">
                Your health wallet
              </p>
              <p className="font-serif text-[38px] font-medium leading-[1.1] text-canvas">
                Your timeline
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Share"
                onClick={() => !touring && setShareOpen(true)}
                className="flex size-[42px] cursor-pointer items-center justify-center rounded-[23px] bg-accent-subtle"
              >
                <img src={iosShare} alt="" className="size-[22px]" />
              </button>
              <ProfileAvatarButton onClick={() => !touring && setMenuOpen(true)} />
            </div>
          </div>
          <div className="h-px w-full bg-accent-subtle" />
          <button
            ref={searchRef}
            type="button"
            onClick={() => !touring && navigate('/timeline/ask-entry')}
            className={`flex h-12 w-full cursor-pointer items-center gap-2 rounded-full border border-accent-200 bg-white py-1.5 pr-1.5 pl-4 ${
              tourStep === 3 ? 'relative z-[60]' : ''
            }`}
          >
            <img src={autoAwesome} alt="" className="size-[18px]" />
            <span className="flex-1 text-left font-sans text-[15px] leading-[1.42] text-ink-500">
              Ask about your timeline
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
        ref={lensesRef}
        className={`flex shrink-0 items-center justify-between gap-2 px-5 pt-3.5 pb-1 ${
          tourStep === 1 ? 'relative z-[60] bg-canvas' : ''
        }`}
      >
        <div className="app-scroll-x flex flex-1 gap-2">
          {meta.filters.map((f) => {
            const active = f === filter
            return (
              <button
                key={f}
                type="button"
                onClick={() => selectChip(f)}
                className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 font-sans text-[12px] leading-[1.3] whitespace-nowrap ${
                  active
                    ? 'bg-accent text-white'
                    : 'border border-accent-200 bg-white text-accent'
                }`}
              >
                {f}
              </button>
            )
          })}
        </div>
        <button
          type="button"
          aria-label="Filter and sort"
          onClick={() => !touring && setFilterOpen(true)}
          className="shrink-0 cursor-pointer"
        >
          <img src={filterSort} alt="" className="size-6" />
        </button>
      </div>

      <div className="app-scroll flex-1 overflow-y-auto px-5 pt-3 pb-28">
        {!logDismissed && (
          <div className="mb-4 flex flex-col gap-1.5 rounded-[18px] bg-accent-50 px-3.5 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={eventBlue} alt="" className="size-[18px]" />
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
                  Daily log
                </p>
              </div>
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => setLogDismissed(true)}
                className="cursor-pointer"
              >
                <img src={closeBlue} alt="" className="size-4" />
              </button>
            </div>
            <p className="font-sans text-[15px] leading-[1.42] text-ink">
              You&apos;ve logged 3 things today — water, food and sleep.
            </p>
            <button
              type="button"
              onClick={() => navigate('/log')}
              className="flex cursor-pointer items-center gap-1.5 pt-0.5"
            >
              <span className="font-sans text-[15px] font-medium text-accent">
                View and add more to your log
              </span>
              <img src={chevronRight} alt="" className="size-[18px]" style={{ filter: 'none' }} />
            </button>
          </div>
        )}

        <div className="relative flex flex-col">
          <div className="pointer-events-none absolute top-2 bottom-2 left-[52px] w-px bg-accent-100" />
          {feed.map((item, idx) => {
            if (item.kind === 'year') {
              return (
                <div key={`y-${item.label}-${idx}`} className="relative flex items-center gap-2.5 py-2.5 pl-20">
                  <p className="font-sans text-[12px] leading-[1.3] text-ink-500">{item.label}</p>
                  <div className="h-px flex-1 bg-accent-100" />
                </div>
              )
            }
            if (item.kind === 'ahead') {
              return (
                <button
                  key={`a-${item.title}-${idx}`}
                  type="button"
                  onClick={() => {
                    if (touring) return
                    if (item.to) navigate(item.to)
                  }}
                  className="relative flex w-full cursor-pointer items-center pb-4 pt-2 text-left"
                >
                  <div className="flex w-10 shrink-0 flex-col items-end">
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
                      {item.date}
                    </p>
                  </div>
                  <div className="relative z-10 flex w-10 shrink-0 justify-center">
                    {item.icon ? (
                      <span className="flex size-[30px] items-center justify-center rounded-[15px] border border-dashed border-ink-300 bg-canvas">
                        <img src={item.icon} alt="" className="size-4 opacity-70" />
                      </span>
                    ) : (
                      <span className="size-[30px]" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-ink-500">
                    <p className="font-sans text-[15px] leading-[1.42]">{item.title}</p>
                    <p className="font-sans text-[13px] leading-[1.36]">{item.sub}</p>
                  </div>
                  <img src={chevronRight} alt="" className="size-[18px] shrink-0 opacity-50" />
                </button>
              )
            }
            return (
              <button
                key={`e-${item.title}-${idx}`}
                ref={item.title === TOUR_DEMO_MOMENT ? momentRef : undefined}
                type="button"
                onClick={() => {
                  if (touring) return
                  if (item.to) navigate(item.to)
                }}
                className={`relative flex w-full cursor-pointer items-center pb-4 pt-2 text-left ${
                  tourStep === 2 && item.title === TOUR_DEMO_MOMENT
                    ? 'z-[60] rounded-[16px] bg-canvas'
                    : ''
                }`}
              >
                <div className="flex w-10 shrink-0 flex-col items-end gap-px">
                  <p
                    className={`font-sans text-[14px] font-medium ${
                      item.highlight ? 'text-accent' : 'text-ink'
                    }`}
                  >
                    {item.day}
                  </p>
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
                    {item.month}
                  </p>
                </div>
                <div className="relative z-10 flex w-10 shrink-0 justify-center">
                  {item.highlight ? (
                    <span className="flex size-[30px] items-center justify-center rounded-[15px] bg-accent">
                      <img src={scienceWhite} alt="" className="size-4" />
                    </span>
                  ) : (
                    <NodeIcon type={item.icon} />
                  )}
                </div>
                {item.highlight ? (
                  <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[14px] bg-accent py-3 pr-3 pl-3.5">
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-white">
                      <p className="font-sans text-[15px] font-medium leading-[1.4]">{item.title}</p>
                      <p className="font-sans text-[13px] leading-[1.36]">{item.sub}</p>
                    </div>
                    <img src={chevronRightLight} alt="" className="size-5 shrink-0" />
                  </div>
                ) : (
                  <>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                        {item.title}
                      </p>
                      <p className="font-sans text-[13px] leading-[1.36] text-ink-500">{item.sub}</p>
                    </div>
                    <img src={chevronRight} alt="" className="size-[18px] shrink-0" />
                  </>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <NavBar tab="timeline" />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <Sheet open={shareOpen} onClose={() => setShareOpen(false)}>
        <div className="flex flex-col gap-1.5 px-5 pb-10">
          <div className="flex items-center gap-2 pb-1 pt-1.5">
            <p className="flex-1 font-serif text-[17px] font-semibold leading-[1.28] text-ink">
              Share timeline
            </p>
            <button type="button" aria-label="Close" onClick={() => setShareOpen(false)}>
              <img src={closeInk} alt="" className="size-[22px]" />
            </button>
          </div>
          {[
            {
              icon: pictureAsPdf,
              title: 'Export as PDF',
              sub: 'a clean summary to print or send',
            },
            { icon: linkIcon, title: 'Copy link', sub: 'view-only, expires in 7 days' },
            {
              icon: medicalServices,
              title: 'Add to Appointment Prep',
              sub: 'bring it to your next visit',
              to: '/prep',
            },
          ].map((row) => (
            <button
              key={row.title}
              type="button"
              onClick={() => {
                setShareOpen(false)
                if (row.to) navigate(row.to)
              }}
              className="flex w-full cursor-pointer items-center gap-3 py-3 text-left"
            >
              <span className="flex size-[38px] items-center justify-center rounded-[19px] bg-accent-50">
                <img src={row.icon} alt="" className="size-5" />
              </span>
              <span className="flex flex-1 flex-col gap-px">
                <span className="font-sans text-[15px] font-medium text-ink">{row.title}</span>
                <span className="font-sans text-[13px] text-ink-500">{row.sub}</span>
              </span>
            </button>
          ))}
          <div className="mt-1 h-px w-full bg-accent-100" />
          <p className="pt-2.5 text-center font-sans text-[13px] leading-[1.36] text-ink-500">
            You choose what to share. Nothing leaves your device without you.
          </p>
        </div>
      </Sheet>

      <Sheet open={filterOpen} onClose={() => setFilterOpen(false)}>
        <div className="flex flex-col gap-4 px-5 pb-10">
          <div className="flex items-center gap-2 pt-1">
            <p className="flex-1 font-serif text-[17px] font-semibold text-ink">Filter &amp; sort</p>
            <button type="button" aria-label="Close" onClick={() => setFilterOpen(false)}>
              <img src={closeInk} alt="" className="size-[22px]" />
            </button>
          </div>
          <div>
            <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
              Timeline lens
            </p>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ['you', 'You', '/timeline'],
                  ['kidney', 'Kidney disease', '/timeline/kidney'],
                  ['metformin', 'Metformin', '/timeline/metformin'],
                ] as const
              ).map(([key, label, path]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setFilterOpen(false)
                    navigate(path)
                  }}
                  className={`cursor-pointer rounded-full px-3.5 py-1.5 font-sans text-[12px] ${
                    lens === key
                      ? 'bg-accent text-white'
                      : 'border border-accent-200 bg-white text-accent'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
              Sort
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSortNewest(true)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 font-sans text-[12px] ${
                  sortNewest ? 'bg-accent text-white' : 'border border-accent-200 bg-white text-accent'
                }`}
              >
                Newest first
              </button>
              <button
                type="button"
                onClick={() => setSortNewest(false)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 font-sans text-[12px] ${
                  !sortNewest
                    ? 'bg-accent text-white'
                    : 'border border-accent-200 bg-white text-accent'
                }`}
              >
                Oldest first
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFilterOpen(false)}
            className="mt-2 w-full cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
          >
            Apply
          </button>
        </div>
      </Sheet>

      {tourStep >= 0 && (
        <div className="pointer-events-none absolute inset-0 z-50">
          <div className="pointer-events-auto absolute inset-0">
            <TimelineTourScrim onDismiss={dismissTour} />
          </div>
          {tourStep === 0 && (
            <div className="pointer-events-auto">
              <TimelineTourWelcome onStart={() => setTourStep(1)} onSkip={dismissTour} />
            </div>
          )}
          {tourStep === 1 && lensesBox && (
            <>
              <SpotlightRing box={lensesBox} className="rounded-full" />
              <div className="pointer-events-auto">
                <TimelineTourCoach
                  step={1}
                  style={coachStyleBelow(lensesBox)}
                  onPrimary={() => setTourStep(2)}
                  onSecondary={dismissTour}
                  caret={<TourCaret />}
                />
              </div>
            </>
          )}
          {tourStep === 2 && momentBox && (
            <>
              <SpotlightRing box={momentBox} className="rounded-[20px]" />
              <div className="pointer-events-auto">
                <TimelineTourCoach
                  step={2}
                  style={coachStyleAbove(momentBox)}
                  onPrimary={() => setTourStep(3)}
                  onSecondary={() => setTourStep(1)}
                  caret={<TourCaret direction="down" />}
                />
              </div>
            </>
          )}
          {tourStep === 3 && searchBox && (
            <>
              <SpotlightRing box={searchBox} className="rounded-full" />
              <div className="pointer-events-auto">
                <TimelineTourCoach
                  step={3}
                  style={coachStyleBelow(searchBox)}
                  onPrimary={dismissTour}
                  onSecondary={() => setTourStep(2)}
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
