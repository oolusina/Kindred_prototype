import type { RouteObject } from 'react-router-dom'
import PrepBefore from './PrepBefore'
import PrepQuestions from './PrepQuestions'
import PrepSent from './PrepSent'
import PrepDuring from './PrepDuring'
import PrepTranscribe from './PrepTranscribe'
import PrepSaved from './PrepSaved'
import PrepEmpty from './PrepEmpty'
import PrepBrief from './PrepBrief'

export const prepRoutes: RouteObject[] = [
  { path: '/prep', element: <PrepBefore /> },
  { path: '/prep/questions', element: <PrepQuestions /> },
  { path: '/prep/sent', element: <PrepSent /> },
  { path: '/prep/during', element: <PrepDuring /> },
  { path: '/prep/transcribe', element: <PrepTranscribe /> },
  { path: '/prep/saved', element: <PrepSaved /> },
  { path: '/prep/empty', element: <PrepEmpty /> },
  { path: '/prep/brief', element: <PrepBrief /> },
]
