import type { RouteObject } from 'react-router-dom'
import LearnHub from './LearnHub'
import LearnModule from './LearnModule'
import LearnStep from './LearnStep'
import ModuleComplete from './ModuleComplete'
import ExplainerVideo from './ExplainerVideo'

export const learnRoutes: RouteObject[] = [
  { path: '/learn', element: <LearnHub /> },
  { path: '/learn/module', element: <LearnModule /> },
  { path: '/learn/module/step-1', element: <LearnStep step={1} /> },
  { path: '/learn/module/step-2', element: <LearnStep step={2} /> },
  { path: '/learn/module/step-3', element: <LearnStep step={3} /> },
  { path: '/learn/module/complete', element: <ModuleComplete /> },
  { path: '/learn/video', element: <ExplainerVideo /> },
]
