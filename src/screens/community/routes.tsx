import type { RouteObject } from 'react-router-dom'
import CommunityFeed from './CommunityFeed'
import CommunityBrowse from './CommunityBrowse'
import CommunityT2D from './CommunityT2D'
import CommunityAnswers from './CommunityAnswers'
import CommunityNew from './CommunityNew'
import CommunityPosted from './CommunityPosted'
import CommunityResponse from './CommunityResponse'
import CommunityTip from './CommunityTip'
import CommunityEvidence from './CommunityEvidence'
import CommunityExplore from './CommunityExplore'

export const communityRoutes: RouteObject[] = [
  { path: '/community', element: <CommunityFeed /> },
  { path: '/community/browse', element: <CommunityBrowse /> },
  { path: '/community/t2d', element: <CommunityT2D /> },
  { path: '/community/answers', element: <CommunityAnswers /> },
  { path: '/community/new', element: <CommunityNew /> },
  { path: '/community/posted', element: <CommunityPosted /> },
  { path: '/community/response', element: <CommunityResponse /> },
  { path: '/community/tip', element: <CommunityTip /> },
  { path: '/community/evidence', element: <CommunityEvidence /> },
  { path: '/community/explore', element: <CommunityExplore /> },
]
