import { useEffect, useState, type ReactNode } from 'react'

/**
 * Bottom sheet with scrim, scoped to the phone frame (absolute within it).
 * Animates in on mount and out before unmounting via the `open` prop.
 */
export default function Sheet({
  open,
  onClose,
  children,
  className = '',
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}) {
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const t = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(t)
    }
    setVisible(false)
    const t = setTimeout(() => setMounted(false), 250)
    return () => clearTimeout(t)
  }, [open])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`absolute inset-0 bg-[rgba(20,20,25,0.45)] transition-opacity duration-250 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`relative max-h-[85%] overflow-hidden rounded-t-[24px] bg-card transition-transform duration-250 ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        } ${className}`}
      >
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="h-1 w-9 rounded-full bg-ink-300" />
        </div>
        {children}
      </div>
    </div>
  )
}
