import { useCallback } from 'react'
import { useNavigate, type NavigateOptions, type To } from 'react-router-dom'

/** True when React Router has an earlier entry in this tab's history stack. */
export function canGoBack(): boolean {
  const idx = (window.history.state as { idx?: number } | null)?.idx
  return typeof idx === 'number' && idx > 0
}

/**
 * Back via React Router history when possible; otherwise `fallback`.
 * Prefer this over hardcoded parent routes to avoid A↔B loops.
 */
export function useSmartBack(fallback = '/home') {
  const navigate = useNavigate()
  return useCallback(() => {
    if (canGoBack()) {
      navigate(-1)
      return
    }
    navigate(fallback)
  }, [navigate, fallback])
}

/**
 * Navigate with `replace` — use for sibling/tab switches so they don't
 * stack on the history (Home→Community→Home would otherwise trap Back).
 */
export function useReplaceNavigate() {
  const navigate = useNavigate()
  return useCallback(
    (to: To, options?: Omit<NavigateOptions, 'replace'>) => {
      navigate(to, { ...options, replace: true })
    },
    [navigate],
  )
}
