import type { RouteObject } from 'react-router-dom'
import VaultHub from './VaultHub'
import BiometricsDay from './BiometricsDay'
import VaultLabs from './VaultLabs'
import VaultMedications from './VaultMedications'
import VaultVitals from './VaultVitals'
import Settings from './Settings'

export const vaultRoutes: RouteObject[] = [
  { path: '/vault', element: <VaultHub /> },
  { path: '/vault/today', element: <BiometricsDay day="today" /> },
  { path: '/vault/jul-13', element: <BiometricsDay day="jul13" /> },
  { path: '/vault/labs', element: <VaultLabs /> },
  { path: '/vault/medications', element: <VaultMedications /> },
  { path: '/vault/vitals', element: <VaultVitals /> },
  { path: '/settings', element: <Settings /> },
]
