import { useState, useMemo, createContext, PropsWithChildren, Context } from 'react'
import { AuthLevel } from '../types'


interface IAuthorizationContext {
    authLevel: AuthLevel
    setAuthLevel: (level: AuthLevel) => void
}

export const AuthContext: Context<IAuthorizationContext> = createContext<IAuthorizationContext>({
  authLevel: 1,
  setAuthLevel: () => {},
})

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [authLevel, setAuthLevel] = useState<AuthLevel>(3)

  const authContextValue: IAuthorizationContext = useMemo(
    () => ({ authLevel, setAuthLevel}),
    [authLevel]
  )

  return (
    <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
  )
}