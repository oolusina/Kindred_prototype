import type { RouteObject } from 'react-router-dom'
import Placeholder from '../../components/Placeholder'

export const addRoutes: RouteObject[] = [
  { path: '/upload', element: <Placeholder title="Upload" /> },
  { path: '/upload/method', element: <Placeholder title="Choose method" /> },
  { path: '/upload/manual', element: <Placeholder title="Manual entry" /> },
  { path: '/upload/share', element: <Placeholder title="Share for insights" /> },
  { path: '/log', element: <Placeholder title="Daily log" /> },
  { path: '/log/water', element: <Placeholder title="Log Water" /> },
  { path: '/log/success', element: <Placeholder title="Log Success" /> },
  { path: '/log/today', element: <Placeholder title="Log Today" /> },
  { path: '/connect', element: <Placeholder title="Connect Hub" /> },
  { path: '/connect/find', element: <Placeholder title="Find provider" /> },
  { path: '/connect/authorize', element: <Placeholder title="Authorize" /> },
  { path: '/connect/connected', element: <Placeholder title="Connected" /> },
]
