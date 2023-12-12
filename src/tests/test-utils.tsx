import { render, RenderOptions } from '@testing-library/react'
import { AuthContextProvider } from '../context/authorization-store'
import { SearchContextProvider } from '../context/search-store'

function customRender(ui: React.ReactElement, options: RenderOptions = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => (
        <AuthContextProvider>
          <SearchContextProvider>
            {children}
          </SearchContextProvider>
        </AuthContextProvider>
      ),
    ...options,
  })
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }