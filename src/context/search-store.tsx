import { useState, useMemo, createContext } from 'react'
import type { PropsWithChildren, Context, Dispatch, SetStateAction } from 'react'
import { Nullable } from '../types'


interface ISearchContext {
    search: Nullable<string>
    hasResult: boolean
    setSearch: Dispatch<SetStateAction<Nullable<string>>>
    setHasResult: Dispatch<SetStateAction<boolean>>
}

export const SearchContext: Context<ISearchContext> = createContext<ISearchContext>({
  search: null,
  hasResult: false,
  setSearch: () => {},
  setHasResult: () => {}
})

export function SearchContextProvider({ children }: PropsWithChildren) {
  const [search, setSearch] = useState<Nullable<string>>(null)
  const [hasResult, setHasResult] = useState<boolean>(false)

  const searchContextValue: ISearchContext = useMemo(
    () => ({ search, setSearch, hasResult, setHasResult}),
    [search, hasResult]
  )

  return (
    <SearchContext.Provider value={searchContextValue}>{children}</SearchContext.Provider>
  )
}