import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type AddMenuState = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const AddMenuCtx = createContext<AddMenuState>({ isOpen: false, open: () => {}, close: () => {} })

export function AddMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])
  return <AddMenuCtx.Provider value={value}>{children}</AddMenuCtx.Provider>
}

export function useAddMenu() {
  return useContext(AddMenuCtx)
}
