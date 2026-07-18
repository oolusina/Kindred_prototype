import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  type ReactNode,
} from 'react'
import {
  UNSAFE_NavigationContext as NavigationContext,
  useLocation,
  type Navigator,
  type To,
} from 'react-router-dom'

export type ShellMode = 'web' | 'mobile'

const ShellContext = createContext<ShellMode>('web')

export function useShellMode(): ShellMode {
  return useContext(ShellContext)
}

export function isMobileShellPath(pathname: string) {
  return pathname === '/mobile' || pathname.startsWith('/mobile/')
}

/** Strip `/mobile` prefix for comparisons (prep tabs, etc.). */
export function stripShellPrefix(pathname: string) {
  if (pathname === '/mobile') return '/'
  if (pathname.startsWith('/mobile/')) return pathname.slice('/mobile'.length) || '/'
  return pathname
}

function prefixTo(to: To, mobile: boolean): To {
  if (!mobile || typeof to === 'number') return to

  if (typeof to === 'string') {
    if (!to.startsWith('/') || to === '/mobile' || to.startsWith('/mobile/')) return to
    return `/mobile${to}`
  }

  const pathname = to.pathname
  if (!pathname || !pathname.startsWith('/') || pathname.startsWith('/mobile')) return to
  return { ...to, pathname: `/mobile${pathname}` }
}

/**
 * Ensures navigate()/Link/`<Navigate>` stay under `/mobile` while that shell is active.
 * This is what keeps mobile flows equivalent to web end-to-end.
 */
export function ShellNavigationBridge({ children }: { children: ReactNode }) {
  const navigation = useContext(NavigationContext)
  const { pathname } = useLocation()
  const mobile = isMobileShellPath(pathname)

  const value = useMemo(() => {
    const navigator = navigation.navigator
    const bridged: Navigator = {
      ...navigator,
      createHref(to) {
        return navigator.createHref(prefixTo(to, mobile))
      },
      push(to, state) {
        navigator.push(prefixTo(to, mobile), state)
      },
      replace(to, state) {
        navigator.replace(prefixTo(to, mobile), state)
      },
    }
    return { ...navigation, navigator: bridged }
  }, [navigation, mobile])

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}

/** Backup: rewrite hash history writes if anything bypasses the navigator bridge. */
export function ShellHistoryGuard({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const { pushState, replaceState } = window.history

    const rewrite = (url: string | URL | null | undefined) => {
      if (url == null) return url
      const raw = typeof url === 'string' ? url : url.toString()
      const hashIndex = raw.indexOf('#')
      if (hashIndex < 0) return url

      const before = raw.slice(0, hashIndex)
      let hash = raw.slice(hashIndex + 1)
      if (!hash.startsWith('/')) hash = `/${hash}`

      const currentlyMobile = window.location.hash.startsWith('#/mobile')
      if (
        currentlyMobile &&
        hash.startsWith('/') &&
        hash !== '/mobile' &&
        !hash.startsWith('/mobile/')
      ) {
        return `${before}#/mobile${hash}`
      }
      return url
    }

    window.history.pushState = function (data, unused, url) {
      return pushState.call(this, data, unused, rewrite(url))
    }
    window.history.replaceState = function (data, unused, url) {
      return replaceState.call(this, data, unused, rewrite(url))
    }

    return () => {
      window.history.pushState = pushState
      window.history.replaceState = replaceState
    }
  }, [])

  return <>{children}</>
}

export function ShellProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const mode: ShellMode = isMobileShellPath(pathname) ? 'mobile' : 'web'
  return <ShellContext.Provider value={mode}>{children}</ShellContext.Provider>
}
