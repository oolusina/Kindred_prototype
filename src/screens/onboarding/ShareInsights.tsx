import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import { PrimaryButton, TopBar, SYNC_OPTIONS } from './shared'
import shieldBlue from '../../assets/figma/shield-blue.svg'
import chevronRight from '../../assets/figma/chevron-right-ink.svg'
import { usePrototypeState, type SyncKey } from '../../state/PrototypeState'

/** Figma 2940:8140 — chips = all-set sync toggles that are on. */
export default function ShareInsights() {
  const navigate = useNavigate()
  const { syncs } = usePrototypeState()
  const [contribute, setContribute] = useState(false)
  const [selected, setSelected] = useState<Partial<Record<SyncKey, boolean>>>({})

  const chips = SYNC_OPTIONS.filter((opt) => syncs[opt.key])

  function chipOn(key: SyncKey) {
    return selected[key] ?? true
  }

  function toggleChip(key: SyncKey) {
    if (!contribute) setContribute(true)
    setSelected((s) => ({ ...s, [key]: !chipOn(key) }))
  }

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <TopBar
        title="Will you help others like you?"
        subtitle="Your information can inform insights for you and your community of verified peers"
      />
      <div className="app-scroll flex flex-1 flex-col gap-3.5 px-5 pb-4">
        <p className="font-sans text-[15px] leading-[1.42] text-ink">
          Your data can help answer questions for people with your condition, through
          privacy-preserving AI. Your files never leave your device and are never tied to you.
        </p>
        <div
          className={`flex w-full flex-col gap-3 rounded-2xl border-2 bg-card p-4 ${
            contribute ? 'border-accent' : 'border-accent-100'
          }`}
        >
          <button
            type="button"
            onClick={() => setContribute(true)}
            className="flex w-full cursor-pointer items-start gap-3 text-left"
          >
            <div
              className={`mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-full border-2 ${
                contribute ? 'border-accent' : 'border-accent-200'
              }`}
            >
              {contribute && <div className="size-[11px] rounded-full bg-accent" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
                Yes, contribute anonymously
              </p>
              <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
                Aggregated with others like you to improve insights for everyone.
              </p>
            </div>
          </button>
          {chips.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {chips.map((chip) => {
                const on = chipOn(chip.key)
                return (
                  <button
                    key={chip.key}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleChip(chip.key)}
                    className={`cursor-pointer rounded-full px-3.5 py-2 font-sans text-[12px] leading-[1.3] ${
                      on
                        ? 'bg-accent text-white'
                        : 'border border-accent bg-canvas text-accent'
                    }`}
                  >
                    {chip.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setContribute(false)}
          className={`flex w-full cursor-pointer items-start gap-3 rounded-2xl border bg-card p-4 text-left ${
            contribute ? 'border-accent-100' : 'border-2 border-accent'
          }`}
        >
          <div
            className={`mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-full border-2 ${
              contribute ? 'border-accent-200' : 'border-accent'
            }`}
          >
            {!contribute && <div className="size-[11px] rounded-full bg-accent" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
              No, keep it private
            </p>
            <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
              Only you and your care team learn from what you upload.
            </p>
          </div>
        </button>
        <a
          href="https://www.openmined.org/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl bg-accent-50 px-3.5 py-3"
        >
          <img src={shieldBlue} alt="" className="size-[18px] shrink-0" />
          <p className="flex-1 font-sans text-[12px] leading-[1.3] text-accent">
            How privacy-preserving AI works
          </p>
          <img src={chevronRight} alt="" className="size-[18px] opacity-60" />
        </a>
      </div>
      <div className="px-5 pb-4">
        <PrimaryButton label="Confirm" onClick={() => navigate('/onboarding/verified')} />
      </div>
      <HomeIndicator />
    </div>
  )
}
