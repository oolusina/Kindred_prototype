import { useNavigate } from 'react-router-dom'
import TourHomeBackdrop from './TourHomeBackdrop'
import NavBar from '../../components/NavBar'
import closeWhite from '../../assets/figma/close-white.svg'
import closeInk from '../../assets/figma/close-ink.svg'
import shieldBlue from '../../assets/figma/shield-blue.svg'
import medication from '../../assets/figma/medication.svg'
import eventBlue from '../../assets/figma/event-blue.svg'
import editBlue from '../../assets/figma/edit-blue.svg'
import medicalInformation from '../../assets/figma/medical-information.svg'
import link from '../../assets/figma/link.svg'
import history from '../../assets/figma/history.svg'

function Tile({
  icon,
  label,
  disabled = false,
  onClick,
}: {
  icon: string
  label: string
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-[92px] min-w-0 flex-1 flex-col items-center justify-center gap-2 rounded-card py-3.5 ${
        disabled
          ? 'border border-[#d1cbc0] bg-[#fcf8f1] opacity-30'
          : 'cursor-pointer border border-[#fffefd] bg-[#fcf8f1] drop-shadow-[0px_0px_3.8px_rgba(255,255,255,0.51)]'
      }`}
    >
      <div className="flex size-[38px] items-center justify-center rounded-full bg-accent-50">
        <img src={icon} alt="" className="size-[22px]" />
      </div>
      <span className="text-center font-sans text-[12px] leading-[1.3] text-ink">{label}</span>
    </button>
  )
}

/** Figma 2655:6043 — coach says "Pick one to verify"; no Next. Forward = Upload or Connect. */
export default function VerifyAddMenu() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-canvas">
      <TourHomeBackdrop />
      <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.45)]" />

      <div className="absolute left-1/2 top-[225px] z-[60] flex w-[320px] -translate-x-1/2 flex-col gap-2 rounded-[16px] bg-white px-4 pb-3.5 pt-4 drop-shadow-[0px_6px_12px_rgba(0,0,0,0.18)]">
        <p className="font-sans text-[17px] font-semibold text-ink">Pick one to verify</p>
        <p className="font-sans text-[13px] leading-[1.36] text-ink-600">
          This is also where you connect sources like your portal or wearables, and add
          medications, appointments, and daily logs. More sources lead to deeper insights!
        </p>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: 6 }, (_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full ${
                  i === 1 ? 'w-[14px] bg-accent' : 'w-1.5 bg-ink-300'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => navigate('/onboarding/verify-later')}
            className="cursor-pointer font-sans text-[13px] font-semibold text-ink-600"
          >
            Skip
          </button>
        </div>
        <span className="absolute -bottom-[11px] left-6 h-0 w-0 border-x-[9px] border-t-[12px] border-x-transparent border-t-white" />
      </div>

      <div className="absolute left-1/2 top-[410px] z-[60] flex w-[350px] -translate-x-1/2 flex-col gap-3.5 rounded-[24px] bg-canvas px-4 pb-5 pt-4 drop-shadow-[0px_8px_15px_rgba(0,0,0,0.2)]">
        <div className="flex w-full items-center gap-2">
          <p className="flex-1 font-serif text-[17px] font-semibold leading-[1.28] text-ink">
            Add to your health vault
          </p>
          <button
            type="button"
            aria-label="Close"
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          >
            <img src={closeInk} alt="" className="size-[22px]" />
          </button>
        </div>
        <div className="flex w-full items-center gap-2 rounded-[16px] bg-accent-50 py-2 pl-2.5 pr-3">
          <img src={shieldBlue} alt="" className="size-[15px] shrink-0" />
          <p className="flex-1 font-sans text-[12px] leading-[1.3] text-accent">
            Everything in your vault stays on your device - never seen, never moved, never sold
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="flex w-full gap-3">
            <Tile icon={medication} label="Medication" disabled />
            <Tile icon={eventBlue} label="Appointment" disabled />
            <Tile icon={editBlue} label="Daily log" disabled />
          </div>
          <div className="flex w-full gap-3">
            <Tile
              icon={medicalInformation}
              label="Upload a diagnosis"
              onClick={() => navigate('/onboarding/upload-document')}
            />
            <Tile
              icon={link}
              label="Connect a source"
              onClick={() => navigate('/onboarding/source-hub')}
            />
            <Tile icon={history} label="Past entries" disabled />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-50">
        <NavBar tab="home" locked />
        <button
          type="button"
          aria-label="Close"
          onClick={() => navigate(-1)}
          className="pointer-events-auto absolute bottom-[53px] left-1/2 flex size-[67px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-[5px] border-canvas bg-accent drop-shadow-[0px_6px_7px_rgba(0,43,143,0.35)]"
        >
          <img src={closeWhite} alt="" className="size-7" />
        </button>
      </div>
    </div>
  )
}
