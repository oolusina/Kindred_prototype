import type { RouteObject } from 'react-router-dom'
import Upload from './Upload'
import UploadMethod from './UploadMethod'
import UploadManual from './UploadManual'
import UploadShare from './UploadShare'
import DailyLog from './DailyLog'
import LogWater from './LogWater'
import LogSuccess from './LogSuccess'
import LogToday from './LogToday'
import ConnectHub from './ConnectHub'
import ConnectFind from './ConnectFind'
import ConnectAuthorize from './ConnectAuthorize'
import ConnectConnected from './ConnectConnected'

export const addRoutes: RouteObject[] = [
  { path: '/upload', element: <Upload /> },
  { path: '/upload/method', element: <UploadMethod /> },
  { path: '/upload/manual', element: <UploadManual /> },
  { path: '/upload/share', element: <UploadShare /> },
  { path: '/log', element: <DailyLog /> },
  { path: '/log/water', element: <LogWater /> },
  { path: '/log/success', element: <LogSuccess /> },
  { path: '/log/today', element: <LogToday /> },
  { path: '/connect', element: <ConnectHub /> },
  { path: '/connect/find', element: <ConnectFind /> },
  { path: '/connect/authorize', element: <ConnectAuthorize /> },
  { path: '/connect/connected', element: <ConnectConnected /> },
]
