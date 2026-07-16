import type { RouteObject } from 'react-router-dom'
import Placeholder from '../../components/Placeholder'

export const askRoutes: RouteObject[] = [
  { path: '/ask', element: <Placeholder title="Ask Entry" /> },
  { path: '/ask/voice', element: <Placeholder title="Voice search" /> },
  { path: '/ask/thinking', element: <Placeholder title="Thinking" /> },
  { path: '/ask/results', element: <Placeholder title="Results" /> },
  { path: '/ask/chat', element: <Placeholder title="Follow-up chat" /> },
  { path: '/ask/guide', element: <Placeholder title="Visual guide" /> },
  { path: '/ask/post-question', element: <Placeholder title="Post to community (Question)" /> },
  { path: '/ask/post-tip', element: <Placeholder title="Post to community (Tip)" /> },
]
