import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate, type NavigateOptions, type To } from 'react-router-dom'
import { stripShellPrefix } from './shell'

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

const PREP_SHELL_RETURN_KEY = 'kindred.prepShellReturn'

/** Before-visit / During-visit tabs — one logical prep screen. */
export function isPrepShellPath(path: string) {
  const bare = stripShellPrefix(path)
  return bare === '/prep' || bare === '/prep/during'
}

let lastPathname = '/'

/**
 * Mount once near the router. Remembers the last non-prep route so Back on
 * /prep and /prep/during exits the whole prep shell to the same place.
 */
export function PrepShellHistoryTracker() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    const lastBare = stripShellPrefix(lastPathname)
    if (isPrepShellPath(path) && !lastBare.startsWith('/prep')) {
      sessionStorage.setItem(PREP_SHELL_RETURN_KEY, lastPathname || '/home')
    }
    lastPathname = path
  }, [location.pathname])

  return null
}

/** Back from /prep or /prep/during → the page that opened prep (not the other tab). */
export function usePrepShellBack(fallback = '/home') {
  const navigate = useNavigate()
  return useCallback(() => {
    const returnTo = sessionStorage.getItem(PREP_SHELL_RETURN_KEY) || fallback
    navigate(returnTo)
  }, [navigate, fallback])
}
