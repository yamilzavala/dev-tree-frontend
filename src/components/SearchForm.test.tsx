import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SearchForm from './SearchForm'

// Mock the api module
vi.mock('../api/DevTree', () => ({
  searchByHandle: vi.fn().mockResolvedValue('User found')
}))

// Mock slugify
vi.mock('react-slugify', () => ({
  default: (text: string) => text.toLowerCase().replace(/\s+/g, '-')
}))

describe('SearchForm', () => {
  let user: ReturnType<typeof userEvent.setup>
  let queryClient: QueryClient

  beforeEach(() => {
    user = userEvent.setup()
    queryClient = new QueryClient()
    vi.clearAllMocks()
  })

  const getFormElements = () => {
    return {
      handleInput: screen.getByPlaceholderText('elonmusk, zuck, jeffbezos'),
      submitButton: screen.getByRole('button', { name: /get my devtree/i })
    }
  }

  const renderSearchForm = () => {
    return render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <SearchForm />
        </QueryClientProvider>
      </MemoryRouter>
    )
  }

  test('should render search form with all elements', () => {
    renderSearchForm()

    const { handleInput, submitButton } = getFormElements()

    expect(screen.getByText('devtree.com/')).toBeInTheDocument()
    expect(handleInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(handleInput).toHaveAttribute('id', 'handle')
  })

  test('input should be initially empty', () => {
    renderSearchForm()

    const { handleInput } = getFormElements()

    expect(handleInput).toHaveValue('')
  })

  test('should allow typing in handle input', async () => {
    renderSearchForm()

    const { handleInput } = getFormElements()

    await user.type(handleInput, 'elonmusk')

    expect(handleInput).toHaveValue('elonmusk')
  })

  test('should show validation error for required handle field', async () => {
    renderSearchForm()

    const { handleInput, submitButton } = getFormElements()

    // Type something and then clear it to trigger validation
    await user.type(handleInput, 'test')
    await user.clear(handleInput)
    await user.click(submitButton)

    expect(await screen.findByText('User name is required')).toBeInTheDocument()
  })

  test('should not show validation error when handle is provided', async () => {
    renderSearchForm()

    const { handleInput, submitButton } = getFormElements()

    await user.type(handleInput, 'elonmusk')
    await user.click(submitButton)

    expect(screen.queryByText('User name is required')).not.toBeInTheDocument()
  })

  test('should have correct placeholder', () => {
    renderSearchForm()

    const { handleInput } = getFormElements()

    expect(handleInput).toHaveAttribute('placeholder', 'elonmusk, zuck, jeffbezos')
  })

  test('should have correct input type', () => {
    renderSearchForm()

    const { handleInput } = getFormElements()

    expect(handleInput).toHaveAttribute('type', 'text')
  })

  test('should have correct label association', () => {
    renderSearchForm()

    const { handleInput } = getFormElements()

    expect(handleInput).toHaveAttribute('id', 'handle')
    expect(screen.getByLabelText('devtree.com/')).toBeInTheDocument()
  })

  test('should have correct submit button value', () => {
    renderSearchForm()

    const { submitButton } = getFormElements()

    expect(submitButton).toHaveValue('Get my DevTree')
  })

  test('should have correct styling classes', () => {
    renderSearchForm()

    const { handleInput, submitButton } = getFormElements()

    expect(handleInput).toHaveClass('border-none', 'bg-transparent', 'p-2', 'focus:ring-0', 'focus:outline-none', 'flex-1', 'text-pink-400')
    expect(submitButton).toHaveClass('bg-pink-400', 'p-3', 'text-lg', 'w-full', 'uppercase', 'text-base-content', 'rounded-lg', 'font-bold', 'cursor-pointer')
  })

  test('should clear error when input is cleared', async () => {
    renderSearchForm()

    const { handleInput, submitButton } = getFormElements()

    // First, trigger the error
    await user.click(submitButton)
    expect(screen.getByText('User name is required')).toBeInTheDocument()

    // Then type something to clear validation state
    await user.type(handleInput, 'test')

    // The error should be cleared once the field has a valid value
    await waitFor(() => {
      expect(screen.queryByText('User name is required')).not.toBeInTheDocument()
    }, { timeout: 2000 })
  })
})
