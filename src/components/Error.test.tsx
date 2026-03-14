import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Error from './Error'

// Mock react-router-dom hooks and functions
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useRouteError: vi.fn(),
    isRouteErrorResponse: vi.fn(),
    Link: ({ children, to, ...props }: { children: React.ReactNode; to: string; [key: string]: unknown }) => <a href={to} {...props}>{children}</a>
  }
})

const mockUseRouteError = vi.mocked((await import('react-router-dom')).useRouteError)
const mockIsRouteErrorResponse = vi.mocked((await import('react-router-dom')).isRouteErrorResponse)

describe('Error', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should render 404 error page when error status is 404', () => {
    const mockError = { status: 404, statusText: 'Not Found' }
    mockIsRouteErrorResponse.mockReturnValue(true)
    mockUseRouteError.mockReturnValue(mockError)

    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    )

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page not found')).toBeInTheDocument()
    expect(screen.getByText(/sorry, we couldn’t find the page you’re looking for/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /go back home/i })).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/admin')
  })

  test('should render generic error page for non-404 errors', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' }
    mockUseRouteError.mockReturnValue(mockError)
    mockIsRouteErrorResponse.mockReturnValue(true)

    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    )

    expect(screen.queryByText('404')).not.toBeInTheDocument()
    expect(screen.getByText(/there was an error/i)).toBeInTheDocument()
  })

  test('should render generic error page when error is not a route response', () => {
    const mockError = { message: 'Something went wrong' }
    mockUseRouteError.mockReturnValue(mockError)
    mockIsRouteErrorResponse.mockReturnValue(false)

    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    )

    expect(screen.queryByText('404')).not.toBeInTheDocument()
    expect(screen.getByText(/there was an error/i)).toBeInTheDocument()
  })

  test('should apply correct styling classes to 404 page', () => {
    const mockError = { status: 404, statusText: 'Not Found' }
    mockUseRouteError.mockReturnValue(mockError)
    mockIsRouteErrorResponse.mockReturnValue(true)

    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    )

    const mainElement = screen.getByRole('main')
    expect(mainElement).toHaveClass('grid', 'min-h-[100vh]', 'place-items-center', 'px-8')

    const errorNumber = screen.getByText('404')
    expect(errorNumber).toHaveClass('text-9xl', 'font-semibold', 'text-pink-400')

    const title = screen.getByText('Page not found')
    expect(title).toHaveClass('mt-4', 'text-3xl', 'font-bold', 'tracking-tight', 'sm:text-5xl')
  })

  test('should call useRouteError hook', () => {
    const mockError = { status: 404, statusText: 'Not Found' }
    mockUseRouteError.mockReturnValue(mockError)
    mockIsRouteErrorResponse.mockReturnValue(true)

    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    )

    expect(mockUseRouteError).toHaveBeenCalled()
    expect(mockIsRouteErrorResponse).toHaveBeenCalledWith(mockError)
  })
})
