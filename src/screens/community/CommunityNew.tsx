import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSmartBack } from '../../navigation/history'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import closeInk from '../../assets/figma/close-ink.svg'
import groupsWhite from '../../assets/figma/groups-white.svg'
import expandMore from '../../assets/figma/expand-more.svg'
import addInk from '../../assets/figma/add-ink.svg'

const PRESET_TAGS = ['Diet', 'Medication', 'Symptoms']

export default function CommunityNew() {
  const navigate = useNavigate()
  const goBack = useSmartBack('/community')
  const [question, setQuestion] = useState('')
  const [tags, setTags] = useState(['Diet'])
  const [customTags, setCustomTags] = useState<string[]>([])
  const [addingTag, setAddingTag] = useState(false)
  const [draftTag, setDraftTag] = useState('')
  const [community, setCommunity] = useState('Type 2 Diabetes')

  const allTags = [...PRESET_TAGS, ...customTags]

  const toggleTag = (t: string) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const commitTag = () => {
    const next = draftTag.trim()
    if (!next) {
      setAddingTag(false)
      setDraftTag('')
      return
    }
    if (!allTags.some((t) => t.toLowerCase() === next.toLowerCase())) {
      setCustomTags((prev) => [...prev, next])
    }
    setTags((prev) => (prev.includes(next) ? prev : [...prev, next]))
    setDraftTag('')
    setAddingTag(false)
  }

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar variant="dark" />
      <div className="flex items-center gap-2.5 px-5 pt-2">
        <button
          type="button"
          aria-label="Close"
          onClick={goBack}
          className="cursor-pointer"
        >
          <img src={closeInk} alt="" className="size-[26px]" />
        </button>
        <p className="font-serif text-[20px] font-medium text-ink">Ask a question</p>
      </div>
      <div className="app-scroll flex flex-1 flex-col gap-4 px-5 pb-28 pt-6">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Posting to
        </p>
        <p className="font-sans text-[13px] text-ink-500">
          You can post to any community you&apos;re in.
        </p>
        <button
          type="button"
          onClick={() =>
            setCommunity((c) =>
              c === 'Type 2 Diabetes' ? 'Kidney Disease' : 'Type 2 Diabetes',
            )
          }
          className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-accent bg-accent-50 py-2 pl-2.5 pr-3"
        >
          <span className="flex size-6 items-center justify-center rounded-xl bg-accent">
            <img src={groupsWhite} alt="" className="size-[15px]" />
          </span>
          <span className="font-sans text-[15px] font-medium text-ink">{community}</span>
          <img src={expandMore} alt="" className="size-[18px]" />
        </button>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Your question
        </p>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Add your question"
          rows={4}
          className="w-full resize-none rounded-2xl border-[1.5px] border-accent-200 bg-card p-4 font-sans text-[15px] font-medium text-ink outline-none placeholder:text-ink-500 focus:border-accent"
        />
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Add tags
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleTag(t)}
              className={`cursor-pointer rounded-full px-3.5 py-1.5 font-sans text-[12px] ${
                tags.includes(t)
                  ? 'bg-accent text-white'
                  : 'border border-accent bg-accent-50 text-accent'
              }`}
            >
              {t}
            </button>
          ))}
          {addingTag ? (
            <input
              autoFocus
              value={draftTag}
              onChange={(e) => setDraftTag(e.target.value)}
              onBlur={commitTag}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  commitTag()
                }
                if (e.key === 'Escape') {
                  setDraftTag('')
                  setAddingTag(false)
                }
              }}
              placeholder="Tag name"
              className="h-8 min-w-[96px] rounded-full border border-accent bg-white px-3 font-sans text-[12px] text-ink outline-none"
            />
          ) : (
            <button
              type="button"
              aria-label="Add tag"
              onClick={() => setAddingTag(true)}
              className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-accent-200"
            >
              <img src={addInk} alt="" className="size-4" />
            </button>
          )}
        </div>
        <p className="px-3 py-2.5 text-center font-sans text-[13px] leading-[1.36] text-ink-500">
          Members-only. Answers are checked against community data.
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-5 pb-8">
        <button
          type="button"
          onClick={() => navigate('/community/posted')}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-white"
        >
          Post question
        </button>
        <HomeIndicator />
      </div>
    </div>
  )
}
