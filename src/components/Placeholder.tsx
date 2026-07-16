import { useNavigate } from 'react-router-dom'

/** Temporary stand-in while a screen is being built. */
export default function Placeholder({ title }: { title: string }) {
  const navigate = useNavigate()
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-canvas px-8 text-center">
      <p className="font-serif text-[26px] leading-[1.18] text-ink">{title}</p>
      <p className="font-sans text-[13px] text-ink-500">This screen is under construction.</p>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="cursor-pointer rounded-full bg-accent px-5 py-3 font-sans text-[15px] font-semibold text-canvas"
      >
        Go back
      </button>
    </div>
  )
}
