import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type AddMenuState = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const AddMenuCtx = createContext<AddMenuState>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
})

export function AddMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((v) => !v), [])
  const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle])
  return <AddMenuCtx.Provider value={value}>{children}</AddMenuCtx.Provider>
}

export function useAddMenu() {
  return useContext(AddMenuCtx)
}
