import type { RouteObject } from 'react-router-dom'
import HomeScreen from './HomeScreen'
import HomeCustomize from './HomeCustomize'

export const homeRoutes: RouteObject[] = [
  { path: '/home', element: <HomeScreen /> },
  { path: '/home/customize', element: <HomeCustomize /> },
]
