import type { RouteObject } from 'react-router-dom'
import Placeholder from '../../components/Placeholder'

export const homeRoutes: RouteObject[] = [
  { path: '/home', element: <Placeholder title="Home" /> },
  { path: '/home/customize', element: <Placeholder title="Home Customize" /> },
]
