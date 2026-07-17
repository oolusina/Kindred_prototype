import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBack from '../../assets/figma/arrow-back.svg'
import iosShare from '../../assets/figma/ios-share-white.svg'
import scienceBlue from '../../assets/figma/science-blue.svg'
import checkBlue from '../../assets/figma/check-blue.svg'
import pictureAsPdf from '../../assets/figma/picture-as-pdf.svg'
import menuBook from '../../assets/figma/learn-menu-book-blue.svg'
import chevronRight from '../../assets/figma/chevron-right-gray.svg'

type MomentConfig = {
  badge: string
  when: string
  title: string
  body: string
  stats?: { value: string; label: string }[]
  connected: string
  sourceTitle: string
  sourceSub: string
  learnTitle: string
  learnSub: string
  learnTo: string
}

const MOMENTS: Record<string, MomentConfig> = {
  labs: {
    badge: 'Lab result',
    when: 'today',
    title: 'eGFR holding steady at 48',
    body: 'Your eGFR is 48, within Stage 3 range and stable since April. No action needed now.',
    stats: [
      { value: '48', label: 'eGFR' },
      { value: 'Stage 3', label: 'range' },
      { value: 'Stable', label: 'trend' },
    ],
    connected: 'Kidney disease',
    sourceTitle: 'Quest Labs',
    sourceSub: 'synced automatically',
    learnTitle: 'What eGFR really means',
    learnSub: 'Kidney disease · 3 min module',
    learnTo: '/learn/module',
  },
  medication: {
    badge: 'Medication',
    when: '12 Apr 2026',
    title: 'Started Lisinopril 10mg',
    body: 'An ACE inhibitor that helps protect your kidneys by lowering blood pressure inside the filters.',
    stats: [
      { value: '10mg', label: 'dose' },
      { value: 'Daily', label: 'schedule' },
      { value: 'Ongoing', label: 'status' },
    ],
    connected: 'Kidney disease',
    sourceTitle: 'Riverside Nephrology',
    sourceSub: 'prescribed at visit',
    learnTitle: 'How ACE inhibitors help',
    learnSub: 'Kidney disease · 4 min module',
    learnTo: '/learn/module',
  },
  diagnosis: {
    badge: 'Diagnosis',
    when: '12 Apr 2026',
    title: 'Confirmed CKD Stage 3',
    body: 'Your nephrology visit confirmed Stage 3 chronic kidney disease based on eGFR and urine albumin.',
    stats: [
      { value: '3a', label: 'stage' },
      { value: '48', label: 'eGFR' },
      { value: 'Mild', label: 'albumin' },
    ],
    connected: 'Kidney disease',
    sourceTitle: 'Dr. Patel · Nephrology',
    sourceSub: 'visit note',
    learnTitle: 'Your stage, explained',
    learnSub: 'Kidney disease · module',
    learnTo: '/learn/module',
  },
  appointment: {
    badge: 'Appointment',
    when: '12 Apr 2026',
    title: 'Nephrology check-up',
    body: 'Reviewed labs and medications. Plan: continue Lisinopril, recheck eGFR in 3 months.',
    connected: 'Kidney disease',
    sourceTitle: 'Riverside Nephrology',
    sourceSub: 'visit summary',
    learnTitle: 'Prep for your next visit',
    learnSub: 'Appointment prep',
    learnTo: '/prep',
  },
}

export default function MomentDetail({ type }: { type: keyof typeof MOMENTS }) {
  const navigate = useNavigate()
  const m = MOMENTS[type]
  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex shrink-0 items-center justify-between px-5 pt-2.5">
        <button type="button" aria-label="Back" onClick={() => navigate('/timeline')} className="cursor-pointer">
          <img src={arrowBack} alt="" className="size-[26px]" />
        </button>
        <button
          type="button"
          aria-label="Share"
          onClick={() => navigate('/timeline')}
          className="flex size-[26px] cursor-pointer items-center justify-center"
        >
          <img src={iosShare} alt="" className="size-[22px]" />
        </button>
      </div>
      <div className="app-scroll flex-1 overflow-y-auto px-5 pt-4 pb-6">
        <div className="mb-3.5 flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-accent-50 py-1.5 pr-3 pl-2">
            <img src={scienceBlue} alt="" className="size-3.5" />
            <span className="font-sans text-[12px] text-accent">{m.badge}</span>
          </span>
          <span className="font-sans text-[13px] text-ink-500">{m.when}</span>
        </div>
        <h1 className="mb-3.5 font-serif text-[32px] font-medium leading-[1.16] text-ink">{m.title}</h1>
        <p className="mb-3.5 font-sans text-[15px] leading-[1.42] text-ink">{m.body}</p>
        {m.stats && (
          <div className="mb-3.5">
            <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
              This result
            </p>
            <div className="flex justify-between rounded-2xl border border-accent-100 bg-card p-4">
              {m.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <p className="font-serif text-[20px] font-medium leading-[1.24] text-ink">{s.value}</p>
                  <p className="font-sans text-[13px] text-ink-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mb-3.5">
          <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
            Connected to
          </p>
          <span className="inline-flex rounded-full bg-accent-50 px-3 py-1.5 font-sans text-[12px] text-accent">
            {m.connected}
          </span>
        </div>
        <div className="mb-3.5 flex items-center gap-2.5 rounded-[14px] border border-accent-100 bg-card py-3 pr-3.5 pl-3">
          <span className="flex size-[38px] items-center justify-center rounded-[19px] bg-accent-50">
            <img src={scienceBlue} alt="" className="size-5" />
          </span>
          <div className="flex-1">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
              Source
            </p>
            <p className="font-sans text-[15px] font-medium text-ink">{m.sourceTitle}</p>
            <p className="font-sans text-[13px] text-ink-500">{m.sourceSub}</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-accent-50 py-1 pr-2.5 pl-2">
            <img src={checkBlue} alt="" className="size-[13px]" />
            <span className="font-sans text-[12px] text-accent">Verified</span>
          </span>
        </div>
        <div className="mb-3.5">
          <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
            From your records
          </p>
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-accent-100 bg-card px-3.5 py-3 text-left"
          >
            <span className="flex size-[34px] items-center justify-center rounded-lg bg-accent-50">
              <img src={pictureAsPdf} alt="" className="size-[18px]" />
            </span>
            <span className="flex-1">
              <span className="block font-sans text-[15px] font-medium text-ink">
                Quest lab report.pdf
              </span>
              <span className="block font-sans text-[13px] text-ink-500">PDF · 1 page · Quest Labs</span>
            </span>
            <img src={chevronRight} alt="" className="size-5" />
          </button>
        </div>
        <div>
          <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
            Learn more
          </p>
          <button
            type="button"
            onClick={() => navigate(m.learnTo)}
            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-accent-100 bg-card p-3.5 text-left"
          >
            <span className="flex size-[38px] items-center justify-center rounded-[11px] bg-accent-50">
              <img src={menuBook} alt="" className="size-5" />
            </span>
            <span className="flex-1">
              <span className="block font-sans text-[15px] font-medium text-ink">{m.learnTitle}</span>
              <span className="block font-sans text-[13px] text-ink-500">{m.learnSub}</span>
            </span>
            <img src={chevronRight} alt="" className="size-5" />
          </button>
        </div>
      </div>
      <div className="flex shrink-0 gap-3 px-5 pb-2">
        <button
          type="button"
          onClick={() => navigate('/timeline/ask')}
          className="flex-1 cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
        >
          Ask about this
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-[14px] border border-accent-200 bg-white px-5 py-3.5 font-sans text-[15px] font-semibold text-accent"
        >
          Note
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
