import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import { PrimaryButton, TopBar } from './shared'
import searchIcon from '../../assets/figma/search.svg'
import checkWhite from '../../assets/figma/check-white.svg'
import descriptionBlue from '../../assets/figma/description-blue.svg'

export default function Conditions() {
  const navigate = useNavigate()
  const [conditions, setConditions] = useState<{ name: string; selected: boolean }[]>([])
  const [query, setQuery] = useState('')

  const toggle = (name: string) =>
    setConditions((cs) =>
      cs.map((c) => (c.name === name ? { ...c, selected: !c.selected } : c)),
    )

  const addFromQuery = () => {
    const name = query.trim()
    if (!name) return
    setConditions((cs) =>
      cs.some((c) => c.name.toLowerCase() === name.toLowerCase())
        ? cs.map((c) =>
            c.name.toLowerCase() === name.toLowerCase() ? { ...c, selected: true } : c,
          )
        : [...cs, { name, selected: true }],
    )
    setQuery('')
  }

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <TopBar
        title="What are you dealing with?"
        subtitle="Add what you're managing — change this anytime"
      />
      <div className="app-scroll flex flex-1 flex-col overflow-y-auto px-5">
        <form
          className="flex h-12 w-full shrink-0 items-center gap-2 rounded-full border border-accent-200 bg-white py-1.5 pl-4 pr-1.5"
          onSubmit={(e) => {
            e.preventDefault()
            addFromQuery()
          }}
        >
          <img src={searchIcon} alt="" className="size-[18px]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for conditions"
            className="min-w-0 flex-1 bg-transparent font-sans text-[15px] leading-[1.42] text-ink outline-none placeholder:text-ink-500"
          />
        </form>
        <div className="flex flex-wrap gap-2 pt-5">
          {conditions.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => toggle(c.name)}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2.5 font-sans text-[14px] font-semibold ${
                c.selected
                  ? 'bg-accent text-white'
                  : 'border border-accent-200 bg-white text-accent'
              }`}
            >
              {c.selected && <img src={checkWhite} alt="" className="size-3.5" />}
              {c.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-4 px-5 pb-4">
        <div className="flex w-full items-center gap-2 rounded-[12px] bg-accent-50 p-3">
          <img src={descriptionBlue} alt="" className="size-4 shrink-0" />
          <p className="flex-1 font-sans text-[13px] leading-[1.36] text-accent">
            Heads up — you&apos;ll be asked for documentation to support these conditions later in
            onboarding.
          </p>
        </div>
        <PrimaryButton
          label="Continue"
          onClick={() => navigate('/onboarding/tour-welcome')}
        />
      </div>
      <HomeIndicator />
    </div>
  )
}
