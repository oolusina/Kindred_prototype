import { useShellMode } from '../navigation/shell'

/**
 * Fake iOS home indicator — shown in the web framed demo only.
 */
export default function HomeIndicator({ light = false }: { light?: boolean }) {
  const mode = useShellMode()
  if (mode === 'mobile') return null

  return (
    <div className="pointer-events-none flex h-[18px] w-full shrink-0 items-center justify-center py-[2px]">
      <div
        className={`h-[5px] w-[136px] rounded-[3px] ${
          light ? 'bg-[rgba(249,242,228,0.9)]' : 'bg-[rgba(23,23,26,0.85)]'
        }`}
      />
    </div>
  )
}
