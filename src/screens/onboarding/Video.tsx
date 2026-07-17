import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import { PrimaryButton, TopBar } from './shared'
import videoPoster from '../../assets/figma/onboarding-video-poster.png'
import onboardingVideo from '../../assets/OnboardingVideo.mp4'
import playTriangle from '../../assets/figma/play-triangle.svg'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** Figma 2969:8199 — Onboarding · 02 Video walkthrough. Nav unchanged. */
export default function Video() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const onTime = () => setCurrent(el.currentTime)
    const onMeta = () => setDuration(el.duration || 0)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => setPlaying(false)

    el.addEventListener('timeupdate', onTime)
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('ended', onEnded)
    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onEnded)
    }
  }, [])

  function togglePlay() {
    const el = videoRef.current
    if (!el) return
    if (el.paused) void el.play()
    else el.pause()
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <TopBar
        title="Your vault data never leaves your device"
        subtitle="Never seen, never moved, never sold"
      />
      <div className="app-scroll flex flex-1 flex-col overflow-y-auto px-5">
        <div className="relative h-[485px] w-full shrink-0 overflow-hidden rounded-[20px] border border-accent-100 bg-accent-50">
          <video
            ref={videoRef}
            src={onboardingVideo}
            poster={videoPoster}
            playsInline
            preload="metadata"
            className="absolute inset-0 size-full rounded-[18px] object-cover"
            onClick={togglePlay}
          />
          {!playing && (
            <button
              type="button"
              aria-label="Play video"
              onClick={togglePlay}
              className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center"
            >
              <span className="flex size-[72px] items-center justify-center rounded-full bg-accent drop-shadow-[0px_6px_12px_rgba(0,43,143,0.35)]">
                <img src={playTriangle} alt="" className="ml-1 h-[26px] w-[24px] rotate-90" />
              </span>
            </button>
          )}
          {!playing && (
            <div className="pointer-events-none absolute left-[15px] top-[15px] z-20 rounded-full bg-accent-50 px-3 py-1.5">
              <span className="font-sans text-[11px] font-semibold text-accent">
                SEE HOW IT WORKS · {duration > 0 ? formatTime(duration) : '1:30'}
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-[15px] bottom-4 z-20 flex flex-col gap-2">
            <div className="relative h-1 w-full rounded-[2px] bg-accent-100">
              <div
                className="absolute inset-y-0 left-0 rounded-[2px] bg-accent transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between font-sans text-[11px] text-ink-600">
              <span>{formatTime(current)}</span>
              <span>{duration > 0 ? formatTime(duration) : '1:30'}</span>
            </div>
          </div>
        </div>
        <p className="pt-3.5 text-center font-sans text-[13px] text-ink-600">
          You can rewatch this anytime from the Learning tab.
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-center gap-3 px-5 pb-4 pt-2">
        <PrimaryButton label="Continue" onClick={() => navigate('/onboarding/conditions')} />
        <button
          type="button"
          onClick={() => navigate('/onboarding/conditions')}
          className="cursor-pointer font-sans text-[15px] font-semibold text-accent"
        >
          Watch later
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
