import { useNavigate } from 'react-router-dom'
import { useAddMenu } from './AddMenuContext'
import HomeIndicator from './HomeIndicator'
import homeActive from '../assets/figma/navbar_home_active.svg'
import homeInactive from '../assets/figma/navbar_home_inactive.svg'
import groupsActive from '../assets/figma/navbar_groups_active.svg'
import groupsInactive from '../assets/figma/navbar_groups_inactive.svg'
import dateRangeActive from '../assets/figma/navbar_date_range_active.svg'
import dateRangeInactive from '../assets/figma/navbar_date_range_inactive.svg'
import menuBookOuter from '../assets/figma/navbar_menu_book_inactive.svg'
import menuBookInnerActive from '../assets/figma/navbar_menu_book_inner_active.svg'
import menuBookInnerInactive from '../assets/figma/navbar_menu_book_inner_inactive.svg'
import addIcon from '../assets/figma/navbar_add.svg'

export type NavTab = 'home' | 'community' | 'timeline' | 'learn'

const activeText = 'text-[#fcf8f1]'
const inactiveText = 'text-canvas-700'

function TabButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-full w-14 cursor-pointer flex-col items-center justify-center gap-[5px]"
    >
      {icon}
      <span
        className={`text-center font-sans text-[10px] font-medium leading-[1.25] ${
          active ? activeText : inactiveText
        }`}
      >
        {label}
      </span>
    </button>
  )
}

/** Bottom navigation: dark pill with 4 tabs and the raised blue "+" button. */
export default function NavBar({ tab }: { tab: NavTab }) {
  const navigate = useNavigate()
  const { open } = useAddMenu()

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-2">
      <div className="pointer-events-auto mx-3 flex h-16 w-[366px] max-w-[calc(100%-24px)] items-center justify-between rounded-nav bg-ink px-5 drop-shadow-[0px_8px_11px_rgba(0,0,0,0.22)]">
        <div className="flex h-full w-[116px] items-center justify-between">
          <TabButton
            label="Home"
            active={tab === 'home'}
            onClick={() => navigate('/home')}
            icon={<img src={tab === 'home' ? homeActive : homeInactive} alt="" className="size-6" />}
          />
          <TabButton
            label="Community"
            active={tab === 'community'}
            onClick={() => navigate('/community')}
            icon={
              <img
                src={tab === 'community' ? groupsActive : groupsInactive}
                alt=""
                className="size-6"
              />
            }
          />
        </div>
        <div className="relative h-16 w-[68px]">
          <button
            type="button"
            onClick={open}
            aria-label="Add"
            className="absolute -top-[30px] left-0 flex size-[67px] cursor-pointer items-center justify-center rounded-full border-[5px] border-canvas bg-accent drop-shadow-[0px_6px_7px_rgba(0,43,143,0.35)]"
          >
            <img src={addIcon} alt="" className="size-7" />
          </button>
        </div>
        <div className="flex h-full w-[116px] items-center justify-between">
          <TabButton
            label="Timeline"
            active={tab === 'timeline'}
            onClick={() => navigate('/timeline')}
            icon={
              <img
                src={tab === 'timeline' ? dateRangeActive : dateRangeInactive}
                alt=""
                className="size-6"
              />
            }
          />
          <TabButton
            label="Learn"
            active={tab === 'learn'}
            onClick={() => navigate('/learn')}
            icon={
              <span className="relative block size-6 overflow-clip">
                <img src={menuBookOuter} alt="" className="absolute inset-0 size-full" />
                <img
                  src={tab === 'learn' ? menuBookInnerActive : menuBookInnerInactive}
                  alt=""
                  className="absolute inset-[18.75%_4.21%_11.9%_4.17%] h-auto w-[91.62%]"
                />
              </span>
            }
          />
        </div>
      </div>
      <HomeIndicator />
    </div>
  )
}
