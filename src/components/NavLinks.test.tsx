import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavLinks from './NavLinks'

// Mock useLocation hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: vi.fn(),
    NavLink: ({ children, to, end, className, ...props }: { children: (props: { isActive: boolean }) => React.ReactNode; to: string; end: boolean; className: string; [key: string]: unknown }) => (
      <a href={to} className={className} data-end={end} {...props}>
        {children({ isActive: false })}
      </a>
    )
  }
})

const mockUseLocation = vi.mocked((await import('react-router-dom')).useLocation)

describe('NavLinks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should render admin links when not on home page', () => {
    mockUseLocation.mockReturnValue({ pathname: '/admin' } as any)

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    )

    expect(screen.getByText('home')).toBeInTheDocument()
    expect(screen.getByText('profile')).toBeInTheDocument()
    expect(screen.queryByText('login')).not.toBeInTheDocument()
    expect(screen.queryByText('register')).not.toBeInTheDocument()
  })

  test('should render home links when on home page', () => {
    mockUseLocation.mockReturnValue({ pathname: '/' } as any)

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    )

    expect(screen.getByText('login')).toBeInTheDocument()
    expect(screen.getByText('register')).toBeInTheDocument()
    expect(screen.queryByText('home')).not.toBeInTheDocument()
    expect(screen.queryByText('profile')).not.toBeInTheDocument()
  })

  test('should render links with correct href attributes', () => {
    mockUseLocation.mockReturnValue({ pathname: '/admin' } as any)

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    )

    const homeLink = screen.getByText('home').closest('a')
    const profileLink = screen.getByText('profile').closest('a')

    expect(homeLink).toHaveAttribute('href', '/admin')
    expect(profileLink).toHaveAttribute('href', '/admin/profile')
  })

  test('should apply correct CSS classes', () => {
    mockUseLocation.mockReturnValue({ pathname: '/admin' } as any)

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    )

    const homeLink = screen.getByText('home').closest('a')
    const profileLink = screen.getByText('profile').closest('a')

    expect(homeLink).toHaveClass('capitalize', 'text-sm', 'text-base-content')
    expect(profileLink).toHaveClass('capitalize', 'text-sm', 'text-base-content')
  })

  test('should render links in list items', () => {
    mockUseLocation.mockReturnValue({ pathname: '/admin' } as any)

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    )

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(2)
  })

  test('should call useLocation hook', () => {
    mockUseLocation.mockReturnValue({ pathname: '/admin' } as any)

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    )

    expect(mockUseLocation).toHaveBeenCalled()
  })

  test('should render home links with correct href attributes', () => {
    mockUseLocation.mockReturnValue({ pathname: '/' } as any)

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    )

    const loginLink = screen.getByText('login').closest('a')
    const registerLink = screen.getByText('register').closest('a')

    expect(loginLink).toHaveAttribute('href', '/auth/login')
    expect(registerLink).toHaveAttribute('href', '/auth/register')
  })

  test('should have correct end prop attributes', () => {
    mockUseLocation.mockReturnValue({ pathname: '/admin' } as any)

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    )

    const homeLink = screen.getByText('home').closest('a')
    const profileLink = screen.getByText('profile').closest('a')

    expect(homeLink).toHaveAttribute('data-end', 'true')
    expect(profileLink).toHaveAttribute('data-end', 'false')
  })

  test('should render links with unique keys', () => {
    mockUseLocation.mockReturnValue({ pathname: '/admin' } as any)

    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    )

    const listItems = screen.getAllByRole('listitem')
    expect(listItems[0]).toBeInTheDocument()
    expect(listItems[1]).toBeInTheDocument()
  })
})
