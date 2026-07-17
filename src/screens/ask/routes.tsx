import type { RouteObject } from 'react-router-dom'
import AskEntry from './AskEntry'
import AskVoice from './AskVoice'
import AskThinking from './AskThinking'
import AskResults from './AskResults'
import AskChat from './AskChat'
import AskGuide from './AskGuide'
import PostQuestion from './PostQuestion'
import PostTip from './PostTip'

export const askRoutes: RouteObject[] = [
  { path: '/ask', element: <AskEntry /> },
  { path: '/ask/voice', element: <AskVoice /> },
  { path: '/ask/thinking', element: <AskThinking /> },
  { path: '/ask/results', element: <AskResults /> },
  { path: '/ask/chat', element: <AskChat /> },
  { path: '/ask/guide', element: <AskGuide /> },
  { path: '/ask/post-question', element: <PostQuestion /> },
  { path: '/ask/post-tip', element: <PostTip /> },
]
