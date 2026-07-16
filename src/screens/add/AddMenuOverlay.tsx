import { useNavigate } from 'react-router-dom'
import Sheet from '../../components/Sheet'
import { useAddMenu } from '../../components/AddMenuContext'

/**
 * Global "+" menu (Figma: Upload · Add menu, node 2441:3890).
 * Placeholder content — replaced by the add-flow implementation.
 */
export default function AddMenuOverlay() {
  const { isOpen, close } = useAddMenu()
  const navigate = useNavigate()

  const go = (path: string) => {
    close()
    navigate(path)
  }

  return (
    <Sheet open={isOpen} onClose={close}>
      <div className="flex flex-col gap-2 px-6 pb-10 pt-2">
        <p className="font-serif text-[26px] leading-[1.18] text-ink">Add to your vault</p>
        {[
          ['Daily log', '/log'],
          ['Upload a document', '/upload'],
          ['Manual entry', '/upload/manual'],
          ['Connect a provider', '/connect'],
        ].map(([label, path]) => (
          <button
            key={path}
            type="button"
            onClick={() => go(path)}
            className="cursor-pointer rounded-card bg-accent-50 px-4 py-4 text-left font-sans text-[15px] text-accent"
          >
            {label}
          </button>
        ))}
      </div>
    </Sheet>
  )
}
