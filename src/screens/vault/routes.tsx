import type { RouteObject } from 'react-router-dom'
import Placeholder from '../../components/Placeholder'

export const vaultRoutes: RouteObject[] = [
  { path: '/vault', element: <Placeholder title="Health Vault Hub" /> },
  { path: '/vault/today', element: <Placeholder title="Vault Today" /> },
  { path: '/vault/jul-13', element: <Placeholder title="Vault Jul 13" /> },
  { path: '/vault/labs', element: <Placeholder title="Lab results" /> },
  { path: '/vault/medications', element: <Placeholder title="Medications" /> },
  { path: '/vault/vitals', element: <Placeholder title="Vitals" /> },
  { path: '/settings', element: <Placeholder title="Settings" /> },
]
