import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import menuPersonAvatar from '../assets/figma/menu_person_avatar.svg'
import menuShield from '../assets/figma/menu_shield.svg'
import menuChevronRight from '../assets/figma/menu_chevron_right.svg'
import menuLock from '../assets/figma/menu_lock.svg'
import menuDateRange from '../assets/figma/menu_date_range.svg'
import menuPerson from '../assets/figma/menu_person.svg'
import menuBookmark from '../assets/figma/menu_bookmark.svg'
import menuTune from '../assets/figma/menu_tune.svg'
import menuLogout from '../assets/figma/menu_logout.svg'

/**
 * Profile drawer — slides over the full phone frame including the bottom nav (z-60).
 */
export default function SideMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
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
  }, [open])

  if (!mounted) return null

  const go = (to: string) => {
    onClose()
    navigate(to)
  }

  const item = (icon: string, label: string, to: string, muted = false) => (
    <button
      type="button"
      onClick={() => go(to)}
      className="flex w-full cursor-pointer items-center gap-3.5 rounded-xl px-2 py-3.5 text-left active:bg-accent-50"
    >
      <img src={icon} alt="" className="size-[22px]" />
      <span
        className={`flex-1 font-sans text-[15px] font-medium leading-[1.4] ${
          muted ? 'text-ink-500' : 'text-ink'
        }`}
      >
        {label}
      </span>
    </button>
  )

  return (
    <div className="absolute inset-0 z-[60] overflow-hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-[rgba(20,20,25,0.45)] transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute inset-y-0 right-0 flex w-[312px] flex-col bg-canvas px-5 pt-[60px] pb-8 shadow-[-2px_0px_24px_0px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-1">
          <div className="flex size-14 items-center justify-center rounded-full bg-accent">
            <img src={menuPersonAvatar} alt="" className="size-[30px]" />
          </div>
          <div className="flex items-center gap-1.5 pt-2.5">
            <p className="font-serif text-[20px] font-medium leading-[1.24] text-ink">Shania</p>
            <img src={menuShield} alt="" className="size-[18px]" />
          </div>
          <p className="font-sans text-[13px] leading-[1.36] text-ink-500">
            Chronic Kidney Disease · Stage 3
          </p>
          <button
            type="button"
            onClick={() => go('/settings')}
            className="flex cursor-pointer items-center gap-1 pt-1.5"
          >
            <span className="font-sans text-[15px] font-semibold leading-[1.2] text-accent">
              View profile
            </span>
            <img src={menuChevronRight} alt="" className="size-4" />
          </button>
        </div>
        <div className="mt-[18px] h-px w-full bg-accent-100" />
        <div className="-mx-2 mt-3 flex flex-col gap-0.5">
          {item(menuLock, 'My Health Vault', '/vault')}
          {item(menuDateRange, 'Timeline', '/timeline')}
          {item(menuPerson, 'Your Community Posts', '/community')}
          {item(menuBookmark, 'Saved', '/learn?tab=saved')}
        </div>
        <div className="flex-1" />
        <div className="h-px w-full bg-accent-100" />
        <div className="-mx-2 mt-3 flex flex-col gap-0.5">
          {item(menuTune, 'Settings', '/settings')}
          {item(menuLogout, 'Log out', '/onboarding/landing', true)}
        </div>
      </div>
    </div>
  )
}

/** Avatar chip that opens the profile side menu — use on every main tab header. */
export function ProfileAvatarButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Open menu"
      onClick={onClick}
      className="flex size-[42px] shrink-0 cursor-pointer items-center justify-center rounded-[23px] bg-accent-subtle"
    >
      <span className="font-serif text-[26px] font-medium leading-[1.18] text-canvas">S</span>
    </button>
  )
}
