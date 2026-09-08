import { useCallback, useSyncExternalStore } from 'react'

export type RouteType = 'home' | 'work' | 'project'

export interface RouteState {
  type: RouteType
  slug?: string
  path: string
}

export interface HistoryStateData {
  portfolioIndex: number
  fromPortfolio: boolean
  railScroll?: number
  windowScroll?: number
}

// Global router store
let currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
const listeners = new Set<() => void>()

function parseRoute(path: string): RouteState {
  // Normalize path (strip trailing slash except for root)
  const cleanPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path

  if (cleanPath === '' || cleanPath === '/') {
    return { type: 'home', path: '/' }
  }

  if (cleanPath === '/work') {
    return { type: 'work', path: '/work' }
  }

  const match = cleanPath.match(/^\/work\/([^/]+)$/)
  if (match) {
    return { type: 'project', slug: match[1], path: cleanPath }
  }

  // Fallback for unknown paths
  return { type: 'home', path: cleanPath }
}

function getSnapshot(): string {
  return currentPath
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

function notify() {
  if (typeof window !== 'undefined') {
    currentPath = window.location.pathname
  }
  listeners.forEach((listener) => listener())
}

// Initialize history state if not already set
if (typeof window !== 'undefined') {
  const state = window.history.state as HistoryStateData | null
  if (!state || typeof state.portfolioIndex !== 'number') {
    window.history.replaceState(
      {
        portfolioIndex: 0,
        fromPortfolio: true,
      } satisfies HistoryStateData,
      '',
      window.location.href,
    )
  }

  window.addEventListener('popstate', () => {
    notify()
  })
}

export function usePortfolioRouter() {
  const path = useSyncExternalStore(subscribe, getSnapshot, () => '/')
  const route = parseRoute(path)

  const navigate = useCallback(
    (
      to: string,
      options?: {
        replace?: boolean
        railScroll?: number
        windowScroll?: number
      },
    ) => {
      if (typeof window === 'undefined') return

      const cleanTo = to.length > 1 && to.endsWith('/') ? to.slice(0, -1) : to
      const currentClean = window.location.pathname.length > 1 && window.location.pathname.endsWith('/')
        ? window.location.pathname.slice(0, -1)
        : window.location.pathname

      const currentState = (window.history.state as HistoryStateData | null) || {
        portfolioIndex: 0,
        fromPortfolio: true,
      }

      // Update current history entry with scroll before leaving if provided
      if (options?.railScroll !== undefined || options?.windowScroll !== undefined) {
        window.history.replaceState(
          {
            ...currentState,
            railScroll: options?.railScroll ?? currentState.railScroll,
            windowScroll: options?.windowScroll ?? currentState.windowScroll,
          } satisfies HistoryStateData,
          '',
          window.location.href,
        )
      }

      // If already on the exact target path, do not create duplicate history entries
      if (currentClean === cleanTo) {
        return
      }

      if (options?.replace) {
        window.history.replaceState(
          {
            ...currentState,
            portfolioIndex: currentState.portfolioIndex,
            fromPortfolio: true,
          } satisfies HistoryStateData,
          '',
          cleanTo,
        )
      } else {
        const nextIndex = (currentState.portfolioIndex ?? 0) + 1
        window.history.pushState(
          {
            portfolioIndex: nextIndex,
            fromPortfolio: true,
          } satisfies HistoryStateData,
          '',
          cleanTo,
        )
      }

      notify()
    },
    [],
  )

  const goBack = useCallback(
    (fallbackPath: string = '/work') => {
      if (typeof window === 'undefined') return

      const state = window.history.state as HistoryStateData | null
      // Check if user has an internal navigation history entry inside this portfolio session
      if (state && typeof state.portfolioIndex === 'number' && state.portfolioIndex > 0) {
        window.history.back()
      } else {
        // Direct arrival from external or new tab: fallback cleanly without leaving the site
        navigate(fallbackPath, { replace: true })
      }
    },
    [navigate],
  )

  const getSavedScroll = useCallback((): { railScroll?: number; windowScroll?: number } => {
    if (typeof window === 'undefined') return {}
    const state = window.history.state as HistoryStateData | null
    return {
      railScroll: state?.railScroll,
      windowScroll: state?.windowScroll,
    }
  }, [])

  return {
    path,
    route,
    navigate,
    goBack,
    getSavedScroll,
  }
}
