import type { RouteObject } from 'react-router-dom'
import Placeholder from '../../components/Placeholder'

export const prepRoutes: RouteObject[] = [
  { path: '/prep', element: <Placeholder title="Prep Before visit" /> },
  { path: '/prep/questions', element: <Placeholder title="Edit questions" /> },
  { path: '/prep/sent', element: <Placeholder title="Sent to portal" /> },
  { path: '/prep/during', element: <Placeholder title="During visit" /> },
  { path: '/prep/transcribe', element: <Placeholder title="Transcription on" /> },
  { path: '/prep/saved', element: <Placeholder title="Saved to timeline" /> },
  { path: '/prep/empty', element: <Placeholder title="Empty state" /> },
  { path: '/prep/brief', element: <Placeholder title="Visit brief" /> },
]
