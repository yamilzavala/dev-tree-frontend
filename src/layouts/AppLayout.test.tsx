import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppLayout from './AppLayout'
import type { User } from '../types'

// Mock child components
vi.mock('../components/Loading', () => ({
  default: () => <div data-testid="loading-component">Loading...</div>
}))

vi.mock('../components/DevTree', () => ({
  default: ({ data, isLoading }: { data: User; isLoading: boolean }) => (
    <div data-testid="dev-tree-component" data-is-loading={isLoading}>
      DevTree for {data.handle}
    </div>
  )
}))

// Mock API
vi.mock('../api/DevTree', () => ({
  getUser: vi.fn()
}))

// Mock react-query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn()
}))

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => <div data-testid="navigate" data-to={to}>Navigate to {to}</div>
  }
})

const mockUseQuery = vi.mocked((await import('@tanstack/react-query')).useQuery)
const mockGetUser = vi.mocked((await import('../api/DevTree')).getUser)

describe('AppLayout', () => {
  const mockUser: User = {
    _id: '123',
    handle: 'testuser',
    name: 'Test User',
    email: 'test@example.com',
    description: 'Test description',
    image: 'test.jpg',
    links: '[]'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should render Loading component when isLoading is true', () => {
    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false
    } as any)

    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    )

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByTestId('dev-tree-component')).not.toBeInTheDocument()
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument()
  })

  test('should render Navigate component when isError is true', () => {
    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true
    } as any)

    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    )

    const navigate = screen.getByTestId('navigate')
    expect(navigate).toBeInTheDocument()
    expect(navigate).toHaveAttribute('data-to', '/auth/login')
    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByTestId('dev-tree-component')).not.toBeInTheDocument()
  })

  test('should render DevTree component when data is available', () => {
    mockUseQuery.mockReturnValue({
      data: mockUser,
      isLoading: false,
      isError: false
    } as any)

    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    )

    const devTree = screen.getByTestId('dev-tree-component')
    expect(devTree).toBeInTheDocument()
    expect(devTree).toHaveTextContent('DevTree for testuser')
    expect(devTree).toHaveAttribute('data-is-loading', 'false')
    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument()
  })

  test('should pass correct props to useQuery', () => {
    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false
    } as any)

    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    )

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryFn: mockGetUser,
      queryKey: ['user'],
      retry: 2,
      refetchOnWindowFocus: false
    })
  })

  test('should pass isLoading prop to DevTree', () => {
    mockUseQuery.mockReturnValue({
      data: mockUser,
      isLoading: true,
      isError: false
    } as any)

    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    )

    // When isLoading is true, it should show Loading component
    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByTestId('dev-tree-component')).not.toBeInTheDocument()
  })

  test('should not render anything when no data, not loading, and no error', () => {
    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false
    } as any)

    const { container } = render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    )

    expect(container.firstChild).toBeNull()
  })

  test('should pass data prop to DevTree component', () => {
    mockUseQuery.mockReturnValue({
      data: mockUser,
      isLoading: false,
      isError: false
    } as any)

    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    )

    const devTree = screen.getByTestId('dev-tree-component')
    expect(devTree).toHaveTextContent('DevTree for testuser')
  })
})
