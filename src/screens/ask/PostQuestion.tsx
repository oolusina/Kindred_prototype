import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSmartBack } from '../../navigation/history'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import SegmentedTabs from '../../components/SegmentedTabs'
import Sheet from '../../components/Sheet'
import closeInk from '../../assets/figma/close-ink.svg'
import toggleOn from '../../assets/figma/toggle-on.svg'
import toggleOff from '../../assets/figma/toggle-off.svg'
import expandMore from '../../assets/figma/expand-more.svg'

type PostAs = 'Question' | 'Tip'

const QUESTION_DEFAULT =
  'What low-sugar snacks are kidney-safe? Diabetic here, recently diagnosed Stage 3. What works for you?'
const TIP_DEFAULT =
  'Roasted chickpeas and cucumber with hummus keep both my potassium and glucose steady. Half a cup does it for me.'

const COMMUNITIES = [
  'Kidney Care · Stage 3',
  'Type 2 Diabetes',
  'Chronic Kidney Disease',
]

const TAGS = ['Diet', 'Snacks', 'CKD Stage 3'] as const

/** Figma 2165:1488 Question + 2923:7314 Tip — Share to community. */
export default function PostQuestion({ initialMode = 'Question' }: { initialMode?: PostAs }) {
  const navigate = useNavigate()
  const goBack = useSmartBack('/ask/results')
  const [mode, setMode] = useState<PostAs>(initialMode)
  const [text, setText] = useState(initialMode === 'Tip' ? TIP_DEFAULT : QUESTION_DEFAULT)
  const [includeAi, setIncludeAi] = useState(initialMode === 'Tip')
  const [community, setCommunity] = useState(COMMUNITIES[0])
  const [communityOpen, setCommunityOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState<Set<string>>(() => new Set(['Diet']))
  const [customTags, setCustomTags] = useState<string[]>([])
  const [addingTag, setAddingTag] = useState(false)
  const [draftTag, setDraftTag] = useState('')

  const switchMode = (next: PostAs) => {
    if (next === mode) return
    const prevDefault = mode === 'Tip' ? TIP_DEFAULT : QUESTION_DEFAULT
    const nextDefault = next === 'Tip' ? TIP_DEFAULT : QUESTION_DEFAULT
    if (text.trim() === prevDefault || text.trim() === '') setText(nextDefault)
    setIncludeAi(next === 'Tip')
    setMode(next)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  const onPost = () => {
    navigate('/community/posted', { state: { kind: mode } })
  }

  const allTags = [...TAGS, ...customTags]

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
    setSelectedTags((prev) => new Set(prev).add(next))
    setDraftTag('')
    setAddingTag(false)
  }

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <div className="flex shrink-0 items-center gap-3 px-6 pt-2.5 pb-1.5">
        <button
          type="button"
          aria-label="Close"
          onClick={goBack}
          className="cursor-pointer"
        >
          <img src={closeInk} alt="" className="size-[22px]" />
        </button>
        <p className="font-serif text-[20px] font-medium text-ink">Share to community</p>
      </div>

      <div className="app-scroll flex flex-1 flex-col gap-[18px] overflow-y-auto px-6 pt-3 pb-4">
        <div className="flex flex-col gap-2">
          <p className="font-sans text-[11px] font-semibold tracking-[1px] text-ink-600">POST AS</p>
          <SegmentedTabs
            value={mode}
            onChange={switchMode}
            options={[
              { value: 'Question', label: 'Question' },
              { value: 'Tip', label: 'Tip' },
            ]}
          />
          <p className="font-sans text-[12px] leading-4 text-ink-600">
            A question asks members for their experience. A tip shares what worked for you.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-sans text-[11px] font-semibold tracking-[1px] text-ink-600">
            POSTING TO
          </p>
          <button
            type="button"
            onClick={() => setCommunityOpen(true)}
            className="flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-accent bg-accent-50 py-[9px] pr-2.5 pl-3"
          >
            <span className="font-sans text-[15px] font-medium text-ink">{community}</span>
            <img src={expandMore} alt="" className="size-3.5" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-sans text-[11px] font-semibold tracking-[1px] text-ink-600">
            {mode === 'Tip' ? 'YOUR TIP' : 'YOUR QUESTION'}
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-2xl border border-accent-100 bg-white p-4 font-sans text-[15px] leading-[21px] font-medium text-ink outline-none focus:border-accent-200"
          />
        </div>

        <button
          type="button"
          onClick={() => setIncludeAi((v) => !v)}
          className="flex w-full cursor-pointer items-center gap-2.5 text-left"
        >
          <div className="min-w-0 flex-1">
            <p className="font-sans text-[14px] font-medium text-ink">
              {mode === 'Tip' ? 'Include AI answer summary' : 'Include the AI answer'}
            </p>
            <p className="font-sans text-[12px] leading-4 text-ink-600">
              {mode === 'Tip'
                ? 'Adds a short summary with source labels.'
                : 'Off by default. People reply in their own words.'}
            </p>
          </div>
          <img
            src={includeAi ? toggleOn : toggleOff}
            alt=""
            className="h-[26px] w-11 shrink-0"
          />
        </button>

        <div className="flex flex-col gap-2">
          <p className="font-sans text-[11px] font-semibold tracking-[1px] text-ink-600">ADD TAGS</p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const on = selectedTags.has(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`cursor-pointer rounded-full px-3.5 py-[7px] font-sans text-[13px] ${
                    on
                      ? 'bg-accent text-white'
                      : 'border border-accent bg-accent-50 text-[#001d61]'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
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
                className="h-[30px] min-w-[96px] rounded-full border border-accent bg-white px-3 font-sans text-[13px] text-ink outline-none"
              />
            ) : (
              <button
                type="button"
                aria-label="Add tag"
                onClick={() => setAddingTag(true)}
                className="cursor-pointer rounded-full border border-accent bg-accent-50 px-3.5 py-[7px] font-sans text-[13px] text-[#001d61]"
              >
                +
              </button>
            )}
          </div>
        </div>

        <p className="font-sans text-[12.5px] leading-[17px] text-ink-600">
          {mode === 'Tip'
            ? "Tips are visible to your community. Always anonymous. You'll post as QuietFinch."
            : "Always anonymous. You'll post as QuietFinch. Members-only."}
        </p>
      </div>

      <div className="shrink-0 px-6 pt-2 pb-3.5">
        <button
          type="button"
          onClick={onPost}
          className="w-full cursor-pointer rounded-[14px] bg-accent py-3.5 font-sans text-[15px] font-semibold text-canvas"
        >
          {mode === 'Tip' ? 'Post tip' : 'Post question'}
        </button>
      </div>
      <HomeIndicator />

      <Sheet open={communityOpen} onClose={() => setCommunityOpen(false)}>
        <div className="px-5 pb-10">
          <p className="mb-3 font-serif text-[17px] font-semibold text-ink">Posting to</p>
          {COMMUNITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCommunity(c)
                setCommunityOpen(false)
              }}
              className={`mb-2 w-full cursor-pointer rounded-[14px] px-4 py-3.5 text-left font-sans text-[15px] ${
                community === c ? 'bg-accent text-white' : 'bg-accent-50 text-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Sheet>
    </div>
  )
}
