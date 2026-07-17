import { useEffect, useState } from 'react'

/** Cycles placeholder copy with a short fade — shown only when the field is empty. */
export default function RollingGhostPrompt({
  prompts,
  className = '',
  intervalMs = 2800,
}: {
  prompts: string[]
  className?: string
  intervalMs?: number
}) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (prompts.length < 2) return
    const id = window.setInterval(() => {
      setVisible(false)
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % prompts.length)
        setVisible(true)
      }, 220)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [prompts, intervalMs])

  return (
    <span
      className={`truncate transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {prompts[index] ?? ''}
    </span>
  )
}
