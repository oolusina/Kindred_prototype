import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBack from '../../assets/figma/arrow-back.svg'
import micWhite from '../../assets/figma/mic-white.svg'
import autoAwesome from '../../assets/figma/auto-awesome.svg'
import chevronRight from '../../assets/figma/chevron-right-gray.svg'
import voiceOuter from '../../assets/figma/voice-ring-outer.svg'
import voiceInner from '../../assets/figma/voice-ring-inner.svg'

const BARS = [10, 18, 30, 14, 26, 34, 16, 24, 12]

export default function AskVoice() {
  const navigate = useNavigate()
  const [listening, setListening] = useState(true)

  useEffect(() => {
    if (!listening) return
    const t = setTimeout(() => setListening(false), 2800)
    return () => clearTimeout(t)
  }, [listening])

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex shrink-0 items-center gap-3.5 px-5 pt-2.5">
        <button type="button" aria-label="Back" onClick={() => navigate('/ask')} className="cursor-pointer">
          <img src={arrowBack} alt="" className="size-[26px]" />
        </button>
        <p className="font-sans text-[15px] font-medium text-ink">Voice</p>
      </div>
      <div className="flex flex-col items-center pt-8">
        <div className="relative size-40">
          <img src={voiceOuter} alt="" className="absolute inset-0 size-full" />
          <img src={voiceInner} alt="" className="absolute inset-[22px] size-[116px]" />
          <div className="absolute inset-[44px] flex size-[72px] items-center justify-center rounded-[36px] bg-accent">
            <img src={micWhite} alt="" className="size-8" />
          </div>
        </div>
        <div className="mt-6 flex items-end justify-center gap-[5px]">
          {BARS.map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-[2px] bg-accent ${listening ? 'animate-pulse' : ''}`}
              style={{ height: h, animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
        <p className="mt-4 font-sans text-[15px] font-medium text-accent">
          {listening ? 'Listening…' : 'Got it'}
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-3 px-5">
        <div className="rounded-2xl bg-accent-50 px-4 py-3.5">
          <p className="mb-1 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
            You
          </p>
          <p className="font-sans text-[15px] leading-[1.42] text-ink">
            What snacks are low in sugar but good for my brain?
          </p>
        </div>
        {!listening && (
          <button
            type="button"
            onClick={() => navigate('/ask/thinking')}
            className="cursor-pointer rounded-2xl border border-accent-100 bg-card px-4 py-3.5 text-left"
          >
            <div className="mb-1.5 flex items-center gap-1.5">
              <img src={autoAwesome} alt="" className="size-[15px]" />
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
                Assistant
              </p>
            </div>
            <p className="mb-1.5 font-sans text-[15px] leading-[1.42] text-ink">
              Apple slices, blueberries, and unsalted popcorn — low in sugar and easy on your kidneys.
            </p>
            <span className="flex items-center gap-0.5 font-sans text-[12px] text-accent">
              Tap for full answer &amp; sources
              <img src={chevronRight} alt="" className="size-3.5" />
            </span>
          </button>
        )}
        <p className="px-3 py-2.5 text-center font-sans text-[13px] leading-[1.36] text-ink-500">
          You control what&apos;s shared. AI organizes your records, it never diagnoses.
        </p>
      </div>
      <div className="mt-auto flex gap-3 px-5 pb-2">
        <button
          type="button"
          onClick={() => navigate('/ask')}
          className="flex-1 cursor-pointer rounded-[14px] border border-accent-200 bg-white py-3.5 font-sans text-[15px] font-semibold text-accent"
        >
          Type Instead
        </button>
        <button
          type="button"
          onClick={() => (listening ? setListening(false) : navigate('/ask/thinking'))}
          className="flex-1 cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
        >
          {listening ? 'Stop' : 'See answer'}
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
