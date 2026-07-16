import type { RouteObject } from 'react-router-dom'
import Placeholder from '../../components/Placeholder'

export const timelineRoutes: RouteObject[] = [
  { path: '/timeline', element: <Placeholder title="Timeline You" /> },
  { path: '/timeline/kidney', element: <Placeholder title="Timeline Kidney disease" /> },
  { path: '/timeline/metformin', element: <Placeholder title="Timeline Metformin" /> },
  { path: '/timeline/ahead', element: <Placeholder title="Looking ahead" /> },
  { path: '/timeline/ask-entry', element: <Placeholder title="Ask your timeline" /> },
  { path: '/timeline/ask', element: <Placeholder title="Timeline Ask answer" /> },
  { path: '/timeline/ask/chat', element: <Placeholder title="Refine in chat" /> },
  { path: '/timeline/moment/medication', element: <Placeholder title="Moment Medication" /> },
  { path: '/timeline/moment/diagnosis', element: <Placeholder title="Moment Diagnosis" /> },
  { path: '/timeline/moment/appointment', element: <Placeholder title="Moment Appointment" /> },
  { path: '/timeline/moment/labs', element: <Placeholder title="Moment Labs" /> },
]
