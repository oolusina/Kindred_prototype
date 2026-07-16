import type { RouteObject } from 'react-router-dom'
import Placeholder from '../../components/Placeholder'

export const onboardingRoutes: RouteObject[] = [
  { path: '/onboarding/landing', element: <Placeholder title="Landing Page" /> },
  { path: '/onboarding/intro', element: <Placeholder title="Onboarding 01 Intro" /> },
  { path: '/onboarding/video', element: <Placeholder title="Video walkthrough" /> },
  { path: '/onboarding/conditions', element: <Placeholder title="Your conditions" /> },
  { path: '/onboarding/intro-community', element: <Placeholder title="Intro Community" /> },
  { path: '/onboarding/intro-vault', element: <Placeholder title="Intro Health Vault" /> },
  { path: '/onboarding/intro-ai', element: <Placeholder title="Intro Medically Trained AI" /> },
  { path: '/onboarding/tour-welcome', element: <Placeholder title="Home Tour welcome" /> },
  { path: '/onboarding/tour-verify', element: <Placeholder title="Tour Verify diagnosis" /> },
  { path: '/onboarding/tour-add', element: <Placeholder title="Tour Tap + to add proof" /> },
  { path: '/onboarding/verify-later', element: <Placeholder title="Verify later" /> },
  { path: '/onboarding/verify-add-menu', element: <Placeholder title="Verify Add menu" /> },
  { path: '/onboarding/find-portal', element: <Placeholder title="Find your portal" /> },
  { path: '/onboarding/authorize', element: <Placeholder title="Authorize (browser)" /> },
  { path: '/onboarding/upload-document', element: <Placeholder title="Upload a document" /> },
  { path: '/onboarding/review-confirm', element: <Placeholder title="Review & confirm" /> },
  { path: '/onboarding/verified', element: <Placeholder title="Diagnosis verified" /> },
  { path: '/onboarding/all-set', element: <Placeholder title="You're all set" /> },
  { path: '/onboarding/choose-syncs', element: <Placeholder title="Choose what syncs" /> },
  { path: '/onboarding/ask-locked', element: <Placeholder title="Ask AI Locked" /> },
]
