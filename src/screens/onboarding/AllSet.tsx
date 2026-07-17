import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import Sheet from '../../components/Sheet'
import { PrimaryButton, SYNC_OPTIONS } from './shared'
import checkWhite from '../../assets/figma/check-white-lg.svg'
import medicalServices from '../../assets/figma/medical-services.svg'
import science from '../../assets/figma/science-blue.svg'
import eventIcon from '../../assets/figma/card_event.svg'
import medication from '../../assets/figma/card_medication.svg'
import checkBlue from '../../assets/figma/home_check.svg'
import shieldSmall from '../../assets/figma/onboarding-shield-small.svg'
import toggleOn from '../../assets/figma/toggle-on.svg'
import toggleOff from '../../assets/figma/toggle-off.svg'
import { usePrototypeState, type SyncKey } from '../../state/PrototypeState'

const SUMMARY = [
  { icon: medicalServices, label: 'Diagnosis verified — CKD · Stage 3' },
  { icon: science, label: 'Records syncing from UPMC' },
  { icon: eventIcon, label: 'Community & Ask AI unlocked' },
  { icon: medication, label: 'Insights tuned to your conditions' },
]

/** Figma 2693:5667 — Onboarding · 16B Choose what syncs (sheet over all-set). */
export default function AllSet() {
  const navigate = useNavigate()
  const { syncs, setSyncs } = usePrototypeState()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(syncs)

  function toggle(key: SyncKey, locked?: boolean) {
    if (locked) return
    setDraft((d) => ({ ...d, [key]: !d[key] }))
  }

  function save() {
    setSyncs(draft)
    setOpen(false)
  }

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <div className="app-scroll flex flex-1 flex-col items-center gap-3.5 px-5 pt-16 pb-4">
        <div className="flex size-[72px] items-center justify-center rounded-[36px] bg-accent">
          <img src={checkWhite} alt="" className="size-10" />
        </div>
        <h1 className="font-serif text-[32px] font-medium text-ink">You&apos;re all set</h1>
        <p className="max-w-[300px] text-center font-sans text-[15px] text-ink-600">
          Your diagnosis is confirmed. You can now connect with a community of your peers.
        </p>
        <div className="w-full overflow-hidden rounded-2xl border border-accent-100 bg-card">
          {SUMMARY.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center gap-3 px-3.5 py-3 ${
                i > 0 ? 'border-t border-accent-100' : ''
              }`}
            >
              <img src={row.icon} alt="" className="size-5" />
              <p className="min-w-0 flex-1 font-sans text-[15px] font-medium text-ink">
                {row.label}
              </p>
              <img src={checkBlue} alt="" className="size-[18px]" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <img src={shieldSmall} alt="" className="size-4" />
          <span className="font-sans text-[13px] text-ink-600">
            Your data never leaves your device
          </span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-3 px-5 pb-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full cursor-pointer items-center justify-center rounded-[14px] border border-accent-200 bg-card px-5 py-3.5 font-sans text-[15px] font-semibold text-accent"
        >
          Choose what syncs
        </button>
        <PrimaryButton
          label="Continue to Privacy Selection"
          onClick={() => {
            setSyncs(draft)
            navigate('/onboarding/share-insights')
          }}
        />
      </div>
      <HomeIndicator />

      <Sheet open={open} onClose={() => setOpen(false)} className="bg-canvas">
        <div className="flex flex-col px-5 pb-8">
          <div className="pb-2.5 pt-3.5">
            <h2 className="font-serif text-[20px] font-medium leading-[1.24] text-ink">
              Choose what syncs to your vault
            </h2>
            <p className="font-sans text-[13px] text-ink-600">
              You can change this anytime in Settings
            </p>
          </div>
          {SYNC_OPTIONS.map((row, i) => (
            <div key={row.key}>
              {i > 0 && <div className="h-px bg-accent-100" />}
              <div
                className={`flex items-center gap-3 py-3.5 ${row.locked ? 'opacity-80' : ''}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-[15px] font-medium text-ink">{row.label}</p>
                  {row.detail && (
                    <p className="font-sans text-[12px] text-ink-600">{row.detail}</p>
                  )}
                </div>
                <button
                  type="button"
                  disabled={row.locked}
                  aria-label={`${row.label} ${draft[row.key] ? 'on' : 'off'}`}
                  onClick={() => toggle(row.key, row.locked)}
                  className={row.locked ? 'cursor-default' : 'cursor-pointer'}
                >
                  <img
                    src={draft[row.key] ? toggleOn : toggleOff}
                    alt=""
                    className="h-7 w-12"
                  />
                </button>
              </div>
            </div>
          ))}
          <div className="pt-3.5">
            <PrimaryButton label="Save choices" onClick={save} />
          </div>
        </div>
      </Sheet>
    </div>
  )
}
