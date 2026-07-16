import type { RouteObject } from 'react-router-dom'
import Placeholder from '../../components/Placeholder'

export const learnRoutes: RouteObject[] = [
  { path: '/learn', element: <Placeholder title="Learning Hub" /> },
  { path: '/learn/module', element: <Placeholder title="Module (Simple)" /> },
  { path: '/learn/module/step-1', element: <Placeholder title="Module Step 1" /> },
  { path: '/learn/module/step-2', element: <Placeholder title="Module Step 2" /> },
  { path: '/learn/module/step-3', element: <Placeholder title="Module Step 3" /> },
  { path: '/learn/module/complete', element: <Placeholder title="Module complete" /> },
  { path: '/learn/video', element: <Placeholder title="Explainer video" /> },
]
