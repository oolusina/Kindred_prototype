import { useNavigate } from 'react-router-dom'
import SystemBar from '../../components/SystemBar'
import HomeIndicator from '../../components/HomeIndicator'
import { IntroSlide } from './shared'
import forum from '../../assets/figma/forum.svg'

function MatchCard({
  initial,
  name,
  meta,
  chips,
  width,
  shadow = true,
}: {
  initial: string
  name: string
  meta: string
  chips: { label: string; solid?: boolean }[]
  width: number
  shadow?: boolean
}) {
  return (
    <div
      className={`flex flex-col gap-3 overflow-hidden rounded-[16px] bg-white p-4 ${
        shadow ? 'shadow-[0px_8px_24px_0px_rgba(10,23,71,0.1)]' : ''
      }`}
      style={{ width }}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[20px] bg-accent-100">
          <span className="font-sans text-[15px] font-medium leading-[1.4] text-accent">
            {initial}
          </span>
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="font-sans text-[15px] font-medium leading-[1.4] text-ink">{name}</span>
          <span className="font-sans text-[13px] leading-[1.36] text-ink-500">{meta}</span>
        </div>
      </div>
      <div className="flex gap-1.5">
        {chips.map((chip) => (
          <span
            key={chip.label}
            className={`rounded-full px-2.5 py-[5px] font-sans text-[12px] leading-[1.3] ${
              chip.solid ? 'bg-accent text-white' : 'bg-accent-50 text-accent'
            }`}
          >
            {chip.label}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Figma 2759:6491 — Onboarding · Intro 1 — Community. Nav unchanged. */
export default function IntroCommunity() {
  const navigate = useNavigate()
  return (
    <div className="relative flex h-full w-full flex-col bg-canvas">
      <SystemBar />
      <IntroSlide
        overline="COMMUNITY"
        title={
          <>
            A community
            <br />
            that gets it
          </>
        }
        body="We match you with people who share your condition, age, and biometrics, so every answer comes from someone like you."
        active={0}
        onNext={() => navigate('/onboarding/intro-vault')}
      >
        {/* Hero stack — positions from Figma 2918:7350 */}
        <div className="absolute inset-x-0 top-2 bottom-0 overflow-hidden">
          <div className="relative mx-auto h-full w-full max-w-[390px]">
            <div className="absolute left-[66px] top-[4px] flex -rotate-4">
              <MatchCard
                initial="Q"
                name="QuietHeron"
                meta="Type 2 Diabetes · Diagnosed 2021"
                chips={[{ label: 'Same meds' }, { label: 'Similar A1C' }]}
                width={290}
                shadow={false}
              />
            </div>
            <div className="absolute left-[22px] top-[128px] flex rotate-3">
              <MatchCard
                initial="S"
                name="SwiftWren"
                meta="Type 2 Diabetes · Diagnosed 2019"
                chips={[
                  { label: '98% profile match', solid: true },
                  { label: 'Similar biometrics' },
                ]}
                width={310}
              />
            </div>
            <div className="absolute left-[62px] top-[272px] flex -rotate-2">
              <div className="flex w-[290px] flex-col gap-2 overflow-hidden rounded-[16px] bg-white p-3.5 shadow-[0px_8px_24px_0px_rgba(10,23,71,0.1)]">
                <div className="flex items-start gap-2">
                  <img src={forum} alt="" className="size-[18px] shrink-0" />
                  <p className="w-[230px] font-sans text-[15px] font-medium leading-[1.4] text-ink">
                    Has anyone managed morning highs with diet alone?
                  </p>
                </div>
                <p className="font-sans text-[12px] leading-[1.3] text-ink-500">
                  12 answers · 3 from your matches
                </p>
              </div>
            </div>
          </div>
        </div>
      </IntroSlide>
      <HomeIndicator />
    </div>
  )
}
