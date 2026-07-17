import type { RouteObject } from 'react-router-dom'
import TimelineYou from './TimelineYou'
import TimelineKidney from './TimelineKidney'
import TimelineMetformin from './TimelineMetformin'
import LookingAhead from './LookingAhead'
import TimelineAskEntry from './TimelineAskEntry'
import TimelineAskAnswer from './TimelineAskAnswer'
import TimelineAskChat from './TimelineAskChat'
import MomentDetail from './MomentDetail'

export const timelineRoutes: RouteObject[] = [
  { path: '/timeline', element: <TimelineYou /> },
  { path: '/timeline/kidney', element: <TimelineKidney /> },
  { path: '/timeline/metformin', element: <TimelineMetformin /> },
  { path: '/timeline/ahead', element: <LookingAhead /> },
  { path: '/timeline/ask-entry', element: <TimelineAskEntry /> },
  { path: '/timeline/ask', element: <TimelineAskAnswer /> },
  { path: '/timeline/ask/chat', element: <TimelineAskChat /> },
  { path: '/timeline/moment/medication', element: <MomentDetail type="medication" /> },
  { path: '/timeline/moment/diagnosis', element: <MomentDetail type="diagnosis" /> },
  { path: '/timeline/moment/appointment', element: <MomentDetail type="appointment" /> },
  { path: '/timeline/moment/labs', element: <MomentDetail type="labs" /> },
]
