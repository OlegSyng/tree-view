import { useState, useMemo, createContext, PropsWithChildren, Context } from 'react'
import { IFile } from '../types'


interface ISearchContext {
    searchItem: IFile | null
    setSearchItem: (item: IFile | null) => void
}

export const SearchContext: Context<ISearchContext> = createContext<ISearchContext>({
  searchItem: null,
  setSearchItem: () => {},
})

export function SearchContextProvider({ children }: PropsWithChildren) {
  const [searchItem, setSearchItem] = useState<IFile | null>(null)

  const searchContextValue: ISearchContext = useMemo(
    () => ({ searchItem, setSearchItem}),
    [searchItem]
  )

  return (
    <SearchContext.Provider value={searchContextValue}>{children}</SearchContext.Provider>
  )
}