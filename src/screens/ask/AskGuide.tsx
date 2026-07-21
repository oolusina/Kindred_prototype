import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSmartBack } from '../../navigation/history'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBack from '../../assets/figma/arrow-back.svg'
import playDark from '../../assets/figma/learn-play-circle-dark.svg'
import bulletDot from '../../assets/figma/bullet-dot.svg'

const SLIDES = [
  {
    title: 'Start with produce',
    body: 'Peppers, cucumbers, and celery are low potassium and easy to pack.',
  },
  {
    title: 'Add a protein',
    body: 'Hummus or Greek yogurt slows glucose rises after fruit.',
  },
  {
    title: 'Watch the potassium',
    body: 'Keep bananas and oranges smaller when your labs sit near 4.9.',
  },
]

export default function AskGuide() {
  const navigate = useNavigate()
  const goBack = useSmartBack('/ask/results')
  const [i, setI] = useState(0)
  const slide = SLIDES[i]

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex shrink-0 items-center justify-between px-5 pt-2.5">
        <button type="button" aria-label="Back" onClick={goBack} className="cursor-pointer">
          <img src={arrowBack} alt="" className="size-[26px]" />
        </button>
        <p className="font-sans text-[13px] text-ink-500">
          {i + 1} of {SLIDES.length}
        </p>
        <span className="w-[26px]" />
      </div>
      <div className="relative mx-5 mt-4 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl bg-accent">
        <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-subtle" />
        <img src={playDark} alt="" className="relative z-10 size-14 brightness-0 invert" />
      </div>
      <div className="flex flex-1 flex-col px-5 pt-5">
        <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
          Visual guide
        </p>
        <h1 className="mb-3 font-serif text-[26px] font-medium leading-[1.18] text-ink">
          {slide.title}
        </h1>
        <p className="mb-6 font-sans text-[15px] leading-[1.42] text-ink">{slide.body}</p>
        <div className="mb-auto flex flex-col gap-2.5">
          {SLIDES.map((s, idx) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setI(idx)}
              className={`flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left ${
                idx === i ? 'bg-accent-50' : ''
              }`}
            >
              <img src={bulletDot} alt="" className="size-2" />
              <span className="font-sans text-[14px] text-ink">{s.title}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-3 pb-2">
          <button
            type="button"
            disabled={i === 0}
            onClick={() => setI((v) => Math.max(0, v - 1))}
            className="flex-1 cursor-pointer rounded-[14px] border border-accent-200 bg-white py-3.5 font-sans text-[15px] font-semibold text-accent disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => {
              if (i < SLIDES.length - 1) setI(i + 1)
              else navigate('/ask/results')
            }}
            className="flex-1 cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
          >
            {i < SLIDES.length - 1 ? 'Next' : 'Done'}
          </button>
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
