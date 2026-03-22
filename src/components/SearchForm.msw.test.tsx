import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SearchForm from './SearchForm'
import server from '../mocks/server'
import { searchByHandleErrorHandler } from '../mocks/handlers'

// Mock slugify
vi.mock('react-slugify', () => ({
  default: (text: string) => text.toLowerCase().replace(/\s+/g, '')
}))

// Mock navigation
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('SearchForm with MSW', () => {
  let user: ReturnType<typeof userEvent.setup>
  let queryClient: QueryClient

  beforeEach(() => {
    user = userEvent.setup()
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })

    vi.clearAllMocks()
    server.resetHandlers()
  })

  const renderSearchForm = () => {
    return render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <SearchForm />
        </QueryClientProvider>
      </MemoryRouter>
    )
  }

  const getFormElements = () => ({
    handleInput: screen.getByPlaceholderText('elonmusk, zuck, jeffbezos'),
    submitButton: screen.getByRole('button', { name: /get my devtree/i })
  })

  test('should search for handle successfully', async () => {
    renderSearchForm()

    const { handleInput, submitButton } = getFormElements()

    await user.type(handleInput, 'johndoe')
    await user.click(submitButton)

    expect(await screen.findByText(/johndoe, go to/)).toBeInTheDocument()
  })

  test('should show error when search fails', async () => {
    server.use(...searchByHandleErrorHandler)

    renderSearchForm()

    const { handleInput, submitButton } = getFormElements()

    await user.type(handleInput, 'nonexistent')
    await user.click(submitButton)

    expect(await screen.findByText('Search failed')).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  test('should show validation error for empty handle', async () => {
    renderSearchForm()

    const { submitButton } = getFormElements()

    await user.click(submitButton)

    expect(await screen.findByText('User name is required')).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  test('should clear error when user starts typing', async () => {
    renderSearchForm()

    const { handleInput, submitButton } = getFormElements()

    await user.click(submitButton)

    expect(await screen.findByText('User name is required')).toBeInTheDocument()

    await user.type(handleInput, 'test')

    await waitFor(() => {
      expect(screen.queryByText('User name is required')).not.toBeInTheDocument()
    })
  })

  test('should not search if handle is just spaces', async () => {
    renderSearchForm()

    const { handleInput, submitButton } = getFormElements()

    await user.type(handleInput, '   ')
    await user.click(submitButton)

    expect(await screen.findByText('User not found')).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  // 🔥 Caso REAL de special characters (no duplicado)
  test('should handle special characters in handle', async () => {
    renderSearchForm()

    const { handleInput, submitButton } = getFormElements()

    await user.type(handleInput, 'John Doe')
    await user.click(submitButton)

    // slugify mock → "johndoe"
    expect(await screen.findByText(/johndoe, go to/)).toBeInTheDocument()
  })
})