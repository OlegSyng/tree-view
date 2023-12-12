import { render, waitFor } from '@testing-library/react'
import { screen, userEvent } from '../tests/test-utils'
import App from '../App';

describe("SearchBar", () => {
  // check if search finds element on level 2 of the tree view
  it("should render `components` on level 2 while search query is `com`", async () => {
    const { getByTestId } = render(<App/>);

    // select the input and button elements with data-testids
    const inputElement = getByTestId("search-input") as HTMLInputElement
    const buttonElement = getByTestId("submit-search-button") as HTMLButtonElement
    expect(inputElement).toBeDefined()
    expect(buttonElement).toBeDefined()

    // checks that initial screen renders Loading... while data is being fetched
    expect(screen.getByText('Loading...')).toBeDefined()
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).toBeNull()
    });

    // checks that initial screen renders node_modules and not components
    expect(screen.getByText(/node_modules/i)).toBeDefined()
    expect(screen.queryByText(/components/i)).toBeNull()

    // change the input value to 'com'
    expect(inputElement.value).toBe('')
    await userEvent.type(inputElement, 'com')
    expect(inputElement.value).toBe('com')
    
    // click the search button and check if `components` is rendered
    await  userEvent.click(buttonElement)
    expect(screen.getByText(/components/i)).toBeDefined()
  })

  // check if search finds element on level 3 of the tree view
  it("should render `Header.tsx` on level 3 while search query is `header`", async () => {
    const { getByTestId } = render(<App/>);

    // select the input and button elements with data-testids
    const inputElement = getByTestId("search-input") as HTMLInputElement
    const buttonElement = getByTestId("submit-search-button") as HTMLButtonElement
    expect(inputElement).toBeDefined()
    expect(buttonElement).toBeDefined()

    // checks that initial screen renders Loading... while data is being fetched
    expect(screen.getByText('Loading...')).toBeDefined()
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).toBeNull()
    });

    // change the input value to 'header'
    expect(inputElement.value).toBe('')
    await userEvent.type(inputElement, 'header')
    expect(inputElement.value).toBe('header')

    // click the search button and check if `Header.tsx` is rendered
    await userEvent.click(buttonElement)
    expect(screen.getByText(/Header.tsx/i)).toBeDefined()
  })

  // check if search component renders notification message for unssuccessful search
  it("should render notification message for `mmmm` search and reset search", async () => {
    const { getByTestId } = render(<App/>);

    // select the input and button elements with data-testids
    const inputElement = getByTestId("search-input") as HTMLInputElement
    const submitButtonElement = getByTestId("submit-search-button") as HTMLButtonElement
    const cancelButtonElement = getByTestId("cancel-search-button") as HTMLButtonElement
    expect(inputElement).toBeDefined()
    expect(submitButtonElement).toBeDefined()
    // checks that cancel button is rendered as hidden
    expect(cancelButtonElement).toBeDefined()
    expect(cancelButtonElement.classList.contains('hidden')).toBe(true)

    // checks that initial screen renders Loading... while data is being fetched
    expect(screen.getByText('Loading...')).toBeDefined()
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).toBeNull()
    });


    expect(screen.getByText(/node_modules/i)).toBeDefined()
    expect(screen.queryByText(/No item found!/i)).toBeNull()
    expect(screen.queryByText(/mmmm/i)).toBeNull()

    // change the input value to 'mmmm'
    expect(inputElement.value).toBe('')
    await userEvent.type(inputElement, 'mmmm')
    expect(inputElement.value).toBe('mmmm')

    // click the search button and check if notification message is rendered
    await userEvent.click(submitButtonElement)
    expect(screen.getByText(/No item found!/i)).toBeDefined()
    // checks that notification message is rendered and cancel button is visible
    expect(cancelButtonElement.classList.contains('hidden')).toBe(false)

    // click the cancel button and check if notification message is removed
    await userEvent.click(cancelButtonElement)
    expect(inputElement.value).toBe('')
    expect(cancelButtonElement.classList.contains('hidden')).toBe(true)
    expect(screen.queryByText(/No item found!/i)).toBeNull()
  })
});
