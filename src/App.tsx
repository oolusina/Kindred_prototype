import { Navigate, useRoutes, type RouteObject } from 'react-router-dom'
import PhoneFrame from './components/PhoneFrame'
import { AddMenuProvider } from './components/AddMenuContext'
import { PrototypeStateProvider } from './state/PrototypeState'
import { PrepShellHistoryTracker } from './navigation/history'
import { ShellHistoryGuard, ShellNavigationBridge, ShellProvider } from './navigation/shell'
import AddMenuOverlay from './screens/add/AddMenuOverlay'
import { onboardingRoutes } from './screens/onboarding/routes'
import { homeRoutes } from './screens/home/routes'
import { vaultRoutes } from './screens/vault/routes'
import { timelineRoutes } from './screens/timeline/routes'
import { learnRoutes } from './screens/learn/routes'
import { communityRoutes } from './screens/community/routes'
import { addRoutes } from './screens/add/routes'
import { askRoutes } from './screens/ask/routes'
import { prepRoutes } from './screens/prep/routes'

const coreRoutes: RouteObject[] = [
  ...onboardingRoutes,
  ...homeRoutes,
  ...vaultRoutes,
  ...timelineRoutes,
  ...learnRoutes,
  ...communityRoutes,
  ...addRoutes,
  ...askRoutes,
  ...prepRoutes,
]

function withMobilePrefix(routes: RouteObject[]): RouteObject[] {
  return routes.map((route) => {
    if (!route.path || route.path === '*') return route
    const path = route.path.startsWith('/') ? route.path : `/${route.path}`
    return { ...route, path: `/mobile${path}` }
  })
}

const routes: RouteObject[] = [
  { path: '/', element: <Navigate to="/onboarding/landing" replace /> },
  { path: '/mobile', element: <Navigate to="/mobile/onboarding/landing" replace /> },
  ...coreRoutes,
  ...withMobilePrefix(coreRoutes),
  { path: '/mobile/*', element: <Navigate to="/mobile/home" replace /> },
  { path: '*', element: <Navigate to="/home" replace /> },
]

export default function App() {
  const element = useRoutes(routes)
  return (
    <PrototypeStateProvider>
      <ShellHistoryGuard>
        <ShellNavigationBridge>
          <ShellProvider>
            <AddMenuProvider>
              <PhoneFrame>
                <PrepShellHistoryTracker />
                <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
                  {element}
                </div>
                <AddMenuOverlay />
              </PhoneFrame>
            </AddMenuProvider>
          </ShellProvider>
        </ShellNavigationBridge>
      </ShellHistoryGuard>
    </PrototypeStateProvider>
  )
}
