import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'kindred.prototype.state.v1'

export type SyncKey =
  | 'diagnoses'
  | 'medications'
  | 'labs'
  | 'appointments'
  | 'notes'
  | 'immunizations'

export type SavedSource = {
  id: string
  letter: string
  color: string
  name: string
  sub: string
}

type PrototypeState = {
  syncs: Record<SyncKey, boolean>
  homeWidgets: Record<string, boolean>
  settings: Record<string, boolean>
  sharing: Record<string, boolean>
  savedSources: SavedSource[]
  setSync: (key: SyncKey, value: boolean) => void
  setSyncs: (next: Record<SyncKey, boolean>) => void
  setHomeWidget: (key: string, value: boolean) => void
  setSetting: (key: string, value: boolean) => void
  setSharingItem: (key: string, value: boolean) => void
  toggleSavedSource: (source: SavedSource) => void
  isSourceSaved: (id: string) => boolean
}

const DEFAULTS: Omit<
  PrototypeState,
  | 'setSync'
  | 'setSyncs'
  | 'setHomeWidget'
  | 'setSetting'
  | 'setSharingItem'
  | 'toggleSavedSource'
  | 'isSourceSaved'
> = {
  syncs: {
    diagnoses: true,
    medications: true,
    labs: true,
    appointments: true,
    notes: false,
    immunizations: false,
  },
  homeWidgets: {
    appointments: true,
    learning: true,
    snapshot: true,
    sharing: true,
  },
  settings: {
    pauseSharing: false,
    medicationReminders: true,
    appointmentReminders: true,
    communityReplies: false,
    learningNudges: true,
    /** Contribute logs to anonymous community insights (default off per Figma). */
    logHelpOthers: false,
  },
  sharing: {
    meds: true,
    labs: true,
    vitals: false,
    logs: false,
  },
  savedSources: [
    {
      id: 'mayo',
      letter: 'M',
      color: '#1c4fd9',
      name: 'Mayo Clinic',
      sub: 'mayoclinic.org · Chronic kidney disease',
    },
  ],
}

function load(): typeof DEFAULTS {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULTS
    const parsed = JSON.parse(raw) as Partial<typeof DEFAULTS>
    return {
      syncs: { ...DEFAULTS.syncs, ...parsed.syncs },
      homeWidgets: { ...DEFAULTS.homeWidgets, ...parsed.homeWidgets },
      settings: { ...DEFAULTS.settings, ...parsed.settings },
      sharing: { ...DEFAULTS.sharing, ...parsed.sharing },
      savedSources: parsed.savedSources ?? DEFAULTS.savedSources,
    }
  } catch {
    return DEFAULTS
  }
}

const Ctx = createContext<PrototypeState | null>(null)

export function PrototypeStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const setSync = useCallback((key: SyncKey, value: boolean) => {
    setState((s) => ({ ...s, syncs: { ...s.syncs, [key]: value } }))
  }, [])

  const setSyncs = useCallback((next: Record<SyncKey, boolean>) => {
    setState((s) => ({ ...s, syncs: next }))
  }, [])

  const setHomeWidget = useCallback((key: string, value: boolean) => {
    setState((s) => ({ ...s, homeWidgets: { ...s.homeWidgets, [key]: value } }))
  }, [])

  const setSetting = useCallback((key: string, value: boolean) => {
    setState((s) => ({ ...s, settings: { ...s.settings, [key]: value } }))
  }, [])

  const setSharingItem = useCallback((key: string, value: boolean) => {
    setState((s) => ({ ...s, sharing: { ...s.sharing, [key]: value } }))
  }, [])

  const toggleSavedSource = useCallback((source: SavedSource) => {
    setState((s) => {
      const exists = s.savedSources.some((x) => x.id === source.id)
      return {
        ...s,
        savedSources: exists
          ? s.savedSources.filter((x) => x.id !== source.id)
          : [...s.savedSources, source],
      }
    })
  }, [])

  const isSourceSaved = useCallback(
    (id: string) => state.savedSources.some((x) => x.id === id),
    [state.savedSources],
  )

  const value = useMemo(
    () => ({
      ...state,
      setSync,
      setSyncs,
      setHomeWidget,
      setSetting,
      setSharingItem,
      toggleSavedSource,
      isSourceSaved,
    }),
    [
      state,
      setSync,
      setSyncs,
      setHomeWidget,
      setSetting,
      setSharingItem,
      toggleSavedSource,
      isSourceSaved,
    ],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function usePrototypeState() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('usePrototypeState must be used within PrototypeStateProvider')
  return ctx
}
