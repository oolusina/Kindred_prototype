import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import autoAwesome from '../../assets/figma/auto-awesome.svg'

export default function AskThinking() {
  const navigate = useNavigate()
  const location = useLocation()
  const q =
    (location.state as { q?: string } | null)?.q ?? 'What low-sugar snacks are kidney-safe?'

  useEffect(() => {
    const t = setTimeout(() => navigate('/ask/results', { state: { q }, replace: true }), 2000)
    return () => clearTimeout(t)
  }, [navigate, q])

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <span className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent-50">
          <img src={autoAwesome} alt="" className="size-8 animate-pulse" />
        </span>
        <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-accent">
          Thinking
        </p>
        <p className="mb-4 font-serif text-[22px] leading-[1.3] text-ink">{q}</p>
        <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
          Checking medical sources, community insights, and your data…
        </p>
        <div className="mt-8 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-2 animate-pulse rounded-full bg-accent"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
