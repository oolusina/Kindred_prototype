import type { RouteObject } from 'react-router-dom'
import Landing from './Landing'
import Intro from './Intro'
import Video from './Video'
import Conditions from './Conditions'
import IntroCommunity from './IntroCommunity'
import IntroVault from './IntroVault'
import IntroAi from './IntroAi'
import TourWelcome from './TourWelcome'
import TourVerify from './TourVerify'
import TourAdd from './TourAdd'
import VerifyLater from './VerifyLater'
import VerifyAddMenu from './VerifyAddMenu'
import SourceHub from './SourceHub'
import FindPortal from './FindPortal'
import Authorize from './Authorize'
import UploadDocument from './UploadDocument'
import ReviewConfirm from './ReviewConfirm'
import Verified from './Verified'
import TourPrep from './TourPrep'
import TourCommunityQa from './TourCommunityQa'
import TourTimeline from './TourTimeline'
import TourControl from './TourControl'
import AllSet from './AllSet'
import ShareInsights from './ShareInsights'
import AskLocked from './AskLocked'

export const onboardingRoutes: RouteObject[] = [
  { path: '/onboarding/landing', element: <Landing /> },
  { path: '/onboarding/intro', element: <Intro /> },
  { path: '/onboarding/intro-community', element: <IntroCommunity /> },
  { path: '/onboarding/intro-vault', element: <IntroVault /> },
  { path: '/onboarding/intro-ai', element: <IntroAi /> },
  { path: '/onboarding/video', element: <Video /> },
  { path: '/onboarding/conditions', element: <Conditions /> },
  { path: '/onboarding/tour-welcome', element: <TourWelcome /> },
  { path: '/onboarding/tour-verify', element: <TourVerify /> },
  { path: '/onboarding/tour-add', element: <TourAdd /> },
  { path: '/onboarding/verify-later', element: <VerifyLater /> },
  { path: '/onboarding/verify-add-menu', element: <VerifyAddMenu /> },
  { path: '/onboarding/source-hub', element: <SourceHub /> },
  { path: '/onboarding/find-portal', element: <FindPortal /> },
  { path: '/onboarding/authorize', element: <Authorize /> },
  { path: '/onboarding/upload-document', element: <UploadDocument /> },
  { path: '/onboarding/review-confirm', element: <ReviewConfirm /> },
  { path: '/onboarding/all-set', element: <AllSet /> },
  { path: '/onboarding/share-insights', element: <ShareInsights /> },
  { path: '/onboarding/verified', element: <Verified /> },
  { path: '/onboarding/tour-prep', element: <TourPrep /> },
  { path: '/onboarding/tour-community', element: <TourCommunityQa /> },
  { path: '/onboarding/tour-timeline', element: <TourTimeline /> },
  { path: '/onboarding/tour-control', element: <TourControl /> },
  { path: '/onboarding/ask-locked', element: <AskLocked /> },
]
