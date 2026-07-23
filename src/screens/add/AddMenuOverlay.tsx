import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAddMenu } from '../../components/AddMenuContext'
import closeInk from '../../assets/figma/close-ink.svg'
import shieldBlue from '../../assets/figma/shield-blue.svg'
import medication from '../../assets/figma/medication.svg'
import eventBlue from '../../assets/figma/event-blue.svg'
import editBlue from '../../assets/figma/edit-blue.svg'
import medicalServices from '../../assets/figma/medical-services-blue.svg'
import link from '../../assets/figma/link.svg'
import history from '../../assets/figma/history.svg'

function Tile({
  icon,
  label,
  onClick,
}: {
  icon: string
  label: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[92px] min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-[18px] border border-[#d1cbc0] bg-[#fcf8f1] py-3.5 active:bg-accent-50"
    >
      <div className="flex size-[38px] items-center justify-center rounded-full bg-accent-50">
        <img src={icon} alt="" className="size-[22px]" />
      </div>
      <span className="px-1 text-center font-sans text-[12px] leading-[1.3] text-ink">{label}</span>
    </button>
  )
}

/**
 * Centered "Add to your health vault" popover (Figma 2470:4136).
 * Opens from the navbar + ; plus morphs to X while open.
 */
export default function AddMenuOverlay() {
  const { isOpen, close } = useAddMenu()
  const navigate = useNavigate()
  const location = useLocation()
  const [mounted, setMounted] = useState(isOpen)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    close()
  }, [location.pathname, close])

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      let raf2 = 0
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true))
      })
      return () => {
        cancelAnimationFrame(raf1)
        cancelAnimationFrame(raf2)
      }
    }
    setVisible(false)
    const t = setTimeout(() => setMounted(false), 300)
    return () => clearTimeout(t)
  }, [isOpen])

  const go = (path: string) => {
    close()
    navigate(path)
  }

  if (!mounted) return null

  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center px-5 pb-[128px]">
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className={`absolute inset-0 bg-[rgba(0,0,0,0.45)] transition-opacity duration-300 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`relative z-10 flex w-full max-w-[350px] flex-col gap-3.5 rounded-[24px] bg-canvas px-4 pb-5 pt-4 shadow-[0px_8px_15px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
        }`}
      >
        <div className="flex w-full items-center gap-2">
          <p className="flex-1 font-serif text-[17px] font-semibold leading-[1.28] text-ink">
            Add to your health vault
          </p>
          <button type="button" aria-label="Close" onClick={close} className="cursor-pointer">
            <img src={closeInk} alt="" className="size-[22px]" />
          </button>
        </div>
        <div className="flex w-full items-center gap-2 rounded-2xl bg-accent-50 py-2 pl-2.5 pr-3">
          <img src={shieldBlue} alt="" className="size-[15px] shrink-0" />
          <p className="flex-1 font-sans text-[12px] leading-[1.3] text-accent">
            Everything in your vault stays on your device - never seen, never moved, never sold
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="flex w-full gap-3">
            <Tile icon={medication} label="Medication" onClick={() => go('/upload/method')} />
            <Tile icon={eventBlue} label="Appointment" onClick={() => go('/prep')} />
            <Tile icon={editBlue} label="Daily log" onClick={() => go('/log')} />
          </div>
          <div className="flex w-full gap-3">
            <Tile icon={medicalServices} label="Upload a document" onClick={() => go('/upload')}/>
            <Tile icon={link} label="Connect a source" onClick={() => go('/connect')} />
            <Tile icon={history} label="Past entries" onClick={() => go('/log/today')} />
          </div>
        </div>
      </div>
    </div>
  )
}
