import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSmartBack } from '../../navigation/history'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import Sheet from '../../components/Sheet'
import arrowBack from '../../assets/figma/arrow-back.svg'
import bookmark from '../../assets/figma/bookmark-border-blue.svg'
import chevronRight from '../../assets/figma/chevron-right-accent.svg'
import autoAwesome from '../../assets/figma/home_auto_awesome.svg'
import info from '../../assets/figma/info.svg'
import checkCircle from '../../assets/figma/check-circle.svg'
import MatchExplainModal from './MatchExplainModal'

const REPLIES = [
  {
    initials: 'SW',
    name: 'SwiftWren',
    age: '2d',
    color: 'bg-[#30a66f]',
    text: 'Same here — I dropped from the 160s to the 120s over about a month. Slow changes stuck better.',
  },
  {
    initials: 'BS',
    name: 'BlueSiskin',
    age: '1d',
    color: 'bg-accent',
    text: 'Did you change anything at dinner too, or just breakfast?',
  },
  {
    initials: 'GF',
    name: 'GoldFinch',
    age: '22h',
    color: 'bg-[#30a66f]',
    text: 'Only breakfast for me and it still helped. Worth trying.',
  },
]

/** Figma 2347:3323 — Community · Response detail */
export default function CommunityResponse() {
  const navigate = useNavigate()
  const goBack = useSmartBack('/community/answers')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [matchOpen, setMatchOpen] = useState(false)

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-canvas">
      <SystemBar variant="dark" />

      <div className="flex shrink-0 items-center justify-between px-5 pt-2 pb-1">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Back"
            onClick={goBack}
            className="cursor-pointer"
          >
            <img src={arrowBack} alt="" className="size-[26px]" />
          </button>
          <p className="font-serif text-[20px] font-medium leading-[1.24] text-ink">Answer</p>
        </div>
        <button
          type="button"
          aria-label="Save"
          onClick={() => setSheetOpen(true)}
          className="cursor-pointer"
        >
          <img src={bookmark} alt="" className="size-6" />
        </button>
      </div>

      <div className="app-scroll min-h-0 flex-1 space-y-3.5 overflow-y-auto px-5 pt-3 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-[18px] bg-accent">
            <span className="font-sans text-[12px] text-white">QH</span>
          </div>
          <div className="flex min-w-0 flex-col gap-[3px]">
            <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">QuietHeron</p>
            <button
              type="button"
              onClick={() => setMatchOpen(true)}
              className="flex w-fit cursor-pointer items-center gap-[3px] rounded-full border border-accent bg-accent-50 py-0.5 pr-1.5 pl-2"
            >
              <span className="font-sans text-[12px] leading-[1.3] text-accent">92% match</span>
              <img src={chevronRight} alt="" className="size-[13px]" />
            </button>
          </div>
        </div>

        <p className="font-sans text-[15px] leading-[1.42] text-ink">
          I cut my breakfast carbs to about 20g and my morning readings dropped from the 160s into
          the 120s over three weeks. Slow, steady changes worked better than big ones.
        </p>

        {/* How this applies to me — Figma 2767:7040 */}
        <div className="flex overflow-hidden rounded-[18px] border border-[#f0c519] bg-[#fefaed]">
          <div className="w-1 shrink-0 bg-[#f0c519]" />
          <div className="flex flex-1 flex-col gap-2.5 px-4 py-2.5">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-[#564709]">
              How this applies to me
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-start gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#564709]" />
                <p className="font-sans text-[15px] leading-[1.42] text-ink">
                  Your A1c (7.1%) sits where responders saw the biggest morning drop.
                </p>
              </div>
              <p className="pl-3.5 font-sans text-[13px] leading-[1.36] text-ink-500">
                A1c = your average blood sugar over ~3 months.
              </p>
              <div className="flex items-start gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#564709]" />
                <p className="font-sans text-[15px] leading-[1.42] text-ink">
                  Gradual changes fit your Stage 2 CKD better than big swings.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#564709]" />
                <p className="font-sans text-[15px] leading-[1.42] text-ink">
                  You already log breakfast, so it&apos;s easy to try and track.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verified */}
        <button
          type="button"
          onClick={() => navigate('/community/evidence')}
          className="flex w-full cursor-pointer flex-col gap-1.5 rounded-[14px] border-[1.5px] border-accent bg-accent-50 px-3.5 py-3 text-left"
        >
          <div className="flex items-center gap-1.5">
            <img src={autoAwesome} alt="" className="size-4 shrink-0" />
            <span className="font-sans text-[15px] font-medium leading-[1.4] text-accent">
              Verified by 254 members&apos; vault data
            </span>
          </div>
          <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
            6 in 10 who reduced breakfast carbs reported lower morning readings.
          </p>
          <span className="flex items-center gap-[3px]">
            <span className="font-sans text-[12px] leading-[1.3] text-accent">See the evidence</span>
            <img src={chevronRight} alt="" className="size-[13px]" />
          </span>
        </button>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 rounded-xl border border-accent-200 bg-white px-3 py-2.5">
          <img src={info} alt="" className="mt-px size-4 shrink-0" />
          <p className="font-sans text-[13px] leading-[1.36] text-ink">
            Matched on your diabetes. Because you also have kidney disease, check big diet changes
            with your care team.
          </p>
        </div>

        <div className="h-px w-full bg-[#817e77]" />

        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Replies · 3
        </p>

        {REPLIES.map((r, i) => (
          <div key={r.name} className="flex flex-col gap-3.5">
            {i > 0 && <div className="h-px w-[318px] max-w-full bg-accent-100" />}
            <div className="flex items-start gap-2.5">
              <div
                className={`flex size-7 shrink-0 items-center justify-center rounded-[14px] ${r.color}`}
              >
                <span className="font-sans text-[12px] text-white">{r.initials}</span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span className="font-sans text-[12px] leading-[1.3] text-ink">{r.name}</span>
                  <span className="font-sans text-[13px] leading-[1.36] text-ink-500">· {r.age}</span>
                </div>
                <p className="font-sans text-[15px] leading-[1.42] text-ink">{r.text}</p>
                <button
                  type="button"
                  className="cursor-pointer self-start font-sans text-[13px] leading-[1.36] text-ink-500"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex shrink-0 flex-col gap-3 px-5 pt-2 pb-2">
        <button
          type="button"
          className="w-full cursor-pointer rounded-[14px] border border-accent-200 bg-white py-3.5 font-sans text-[15px] font-semibold text-accent"
        >
          Reply to this post
        </button>
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
        >
          Add to appointment prep
        </button>
        <HomeIndicator />
      </div>

      <MatchExplainModal
        open={matchOpen}
        onClose={() => setMatchOpen(false)}
        onSeeAnswer={() => setMatchOpen(false)}
      />

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <div className="flex flex-col items-center gap-3.5 px-6 pt-1 pb-8">
          <img src={checkCircle} alt="" className="size-11" />
          <p className="text-center font-serif text-[20px] font-medium text-ink">
            Added to Appointment Prep List
          </p>
          <button
            type="button"
            onClick={() => setSheetOpen(false)}
            className="mt-1 w-full cursor-pointer rounded-xl bg-accent py-3.5 font-sans text-[15px] font-semibold text-canvas"
          >
            Done
          </button>
          <button
            type="button"
            onClick={() => navigate('/prep')}
            className="cursor-pointer font-sans text-[12.5px] font-medium text-accent"
          >
            See Appointment Prep
          </button>
        </div>
      </Sheet>
    </div>
  )
}
