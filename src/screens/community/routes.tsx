import type { RouteObject } from 'react-router-dom'
import Placeholder from '../../components/Placeholder'

export const communityRoutes: RouteObject[] = [
  { path: '/community', element: <Placeholder title="Community Feed" /> },
  { path: '/community/browse', element: <Placeholder title="Browse communities" /> },
  { path: '/community/t2d', element: <Placeholder title="Type 2 Diabetes" /> },
  { path: '/community/answers', element: <Placeholder title="Answers" /> },
  { path: '/community/new', element: <Placeholder title="New post" /> },
  { path: '/community/posted', element: <Placeholder title="Question posted" /> },
  { path: '/community/response', element: <Placeholder title="Response detail" /> },
  { path: '/community/tip', element: <Placeholder title="Tip detail" /> },
  { path: '/community/evidence', element: <Placeholder title="Evidence" /> },
  { path: '/community/explore', element: <Placeholder title="Explore" /> },
]
