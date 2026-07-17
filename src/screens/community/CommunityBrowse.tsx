import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import arrowBackWhite from '../../assets/figma/arrow-back-white.svg'
import searchInk from '../../assets/figma/search-ink.svg'
import groupsWhite from '../../assets/figma/groups-white.svg'
import groupsBlue from '../../assets/figma/groups-blue-sm.svg'
import checkBlue from '../../assets/figma/check-blue-sm.svg'
import lockGray from '../../assets/figma/lock-gray.svg'
import medicalWhite from '../../assets/figma/medical-services-white-sm.svg'

export default function CommunityBrowse() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <div className="shrink-0 rounded-b-[28px] bg-accent pb-5">
        <SystemBar variant="light" />
        <div className="flex flex-col gap-3 px-5 pt-2">
          <button
            type="button"
            aria-label="Back"
            onClick={() => navigate('/community')}
            className="cursor-pointer self-start"
          >
            <img src={arrowBackWhite} alt="" className="size-[26px]" />
          </button>
          <p className="font-serif text-[32px] font-medium leading-[1.16] text-white">
            Communities
          </p>
          <label className="flex items-center gap-2 rounded-full bg-white px-3.5 py-3">
            <img src={searchInk} alt="" className="size-[18px]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a community"
              className="w-full bg-transparent font-sans text-[15px] text-ink outline-none placeholder:text-ink-500"
            />
          </label>
        </div>
      </div>
      <div className="app-scroll flex flex-1 flex-col gap-3 px-5 pb-8 pt-4">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Your communities
        </p>
        {[
          { name: 'Type 2 Diabetes', members: '12,480 members', to: '/community/t2d' },
          { name: 'Chronic Kidney Disease', members: '9,400 members', to: '/community/t2d' },
        ].map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => navigate(c.to)}
            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-accent-100 bg-card p-3.5 text-left"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-accent">
              <img src={groupsWhite} alt="" className="size-[22px]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[15px] font-medium text-ink">{c.name}</p>
              <p className="font-sans text-[13px] text-ink-500">{c.members}</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-accent-50 py-1 pl-2 pr-2.5">
              <img src={checkBlue} alt="" className="size-[13px]" />
              <span className="font-sans text-[12px] text-accent">Member</span>
            </span>
          </button>
        ))}
        <p className="pt-1 font-sans text-[11px] font-semibold uppercase tracking-[0.66px] text-ink-500">
          Explore — read-only
        </p>
        {[
          { name: 'Hypertension', members: '8,200 members' },
          { name: 'Prediabetes', members: '5,100 members' },
          { name: 'Heart health', members: '14,900 members' },
        ]
          .filter((c) => !query || c.name.toLowerCase().includes(query.toLowerCase()))
          .map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => navigate('/community/explore')}
              className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-accent-100 bg-card p-3.5 text-left"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-accent-50">
                <img src={groupsBlue} alt="" className="size-[22px]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[15px] font-medium text-ink">{c.name}</p>
                <p className="font-sans text-[13px] text-ink-500">{c.members}</p>
              </div>
              <span className="flex items-center gap-1 rounded-full border border-ink-300 py-1 pl-2 pr-2.5">
                <img src={lockGray} alt="" className="size-3" />
                <span className="font-sans text-[12px] text-ink-500">Read-only</span>
              </span>
            </button>
          ))}
        <p className="py-2 font-sans text-[13px] leading-[1.36] text-ink-500">
          You&apos;re a member of communities matched to your diagnoses. Explore others read-only,
          or confirm a diagnosis to join.
        </p>
        <div className="flex flex-col gap-2.5 rounded-2xl border-[1.5px] border-accent bg-accent-50 px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-[38px] items-center justify-center rounded-full bg-accent">
              <img src={medicalWhite} alt="" className="size-5" />
            </div>
            <div>
              <p className="font-sans text-[15px] font-medium text-ink">Have another diagnosis?</p>
              <p className="font-sans text-[13px] text-ink-500">
                Confirm it to join that community
              </p>
            </div>
          </div>
          <p className="font-sans text-[13px] leading-[1.36] text-ink">
            Connect your health portal or add a doctor&apos;s note. We only unlock a community that
            matches a diagnosis on your records.
          </p>
          <button
            type="button"
            onClick={() => navigate('/connect')}
            className="w-full cursor-pointer rounded-[10px] bg-accent py-2.5 font-sans text-[12px] text-white"
          >
            Connect portal to confirm
          </button>
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
