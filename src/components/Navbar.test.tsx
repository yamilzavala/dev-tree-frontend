import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'
import type { User } from '../types'

// Mock child components
vi.mock('./NavLinks', () => ({
  default: () => <div data-testid="nav-links">NavLinks</div>
}))

vi.mock('./Toggle', () => ({
  default: () => <div data-testid="toggle">Toggle</div>
}))

// Mock react-query
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    invalidateQueries: vi.fn()
  })
}))

// Mock react-icons
vi.mock('react-icons/fa6', () => ({
  FaBarsStaggered: () => <div data-testid="bars-icon">Bars</div>
}))

vi.mock('react-icons/fa', () => ({
  FaCodepen: () => <div data-testid="codepen-icon">Codepen</div>
}))

// Mock localStorage
const localStorageMock = {
  removeItem: vi.fn(),
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('Navbar', () => {
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

  test('should render navbar with correct structure', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const navbar = screen.getByRole('navigation')
    const navLinksElements = screen.getAllByTestId('nav-links')
    expect(navbar).toBeInTheDocument()
    expect(navLinksElements.length).toBeGreaterThan(0)
    expect(screen.getByTestId('toggle')).toBeInTheDocument()
  })

  test('should render home link with icon on large screens', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const homeLink = screen.getByRole('link')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
    expect(homeLink).toHaveClass('hidden', 'lg:flex', 'text-3xl', 'items-center')
    expect(screen.getByTestId('codepen-icon')).toBeInTheDocument()
  })

  test('should render dropdown menu on mobile', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const dropdown = screen.getByTestId('bars-icon').closest('label')
    expect(dropdown).toHaveClass('btn', 'btn-ghost', 'lg:hidden')
    expect(screen.getByTestId('bars-icon')).toBeInTheDocument()
  })

  test('should show sign out button when user is logged in', () => {
    render(
      <MemoryRouter>
        <Navbar data={mockUser} />
      </MemoryRouter>
    )

    const signOutButton = screen.getByText('Sign Out')
    expect(signOutButton).toBeInTheDocument()
    expect(signOutButton).toHaveClass('text-base-content', 'px-2', 'py-1.5', 'sm:p-2', 'rounded-md', 'bg-pink-300', 'whitespace-nowrap')
  })

  test('should not show sign out button when user is not logged in', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument()
  })

  test('should call logout function when sign out is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar data={mockUser} />
      </MemoryRouter>
    )

    const signOutLink = screen.getByText('Sign Out').closest('a')
    fireEvent.click(signOutLink!)

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('AUTH_TOKEN')
  })

  test('should apply correct navbar styling', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const navbar = screen.getByRole('navigation')
    expect(navbar).toHaveClass('bg-base-200/80', 'backdrop-blur-md', 'relative')
  })

  test('should render navbar container with correct classes', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const container = screen.getByRole('navigation').querySelector('.navbar')
    expect(container).toHaveClass('navbar', 'align-element')
  })

  test('should render links section on large screens', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const linksSection = screen.getByRole('navigation').querySelector('.navbar-center.hidden.lg\\:flex')
    expect(linksSection).toBeInTheDocument()
  })

  test('should render end section with toggle and sign out', () => {
    render(
      <MemoryRouter>
        <Navbar data={mockUser} />
      </MemoryRouter>
    )

    const endSection = screen.getByRole('navigation').querySelector('.navbar-end')
    expect(endSection).toBeInTheDocument()
    expect(endSection).toHaveClass('navbar-end', 'flex', 'gap-2', 'sm:gap-5')
  })

  test('should have correct sign out link href', () => {
    render(
      <MemoryRouter>
        <Navbar data={mockUser} />
      </MemoryRouter>
    )

    const signOutLink = screen.getByText('Sign Out').closest('a')
    expect(signOutLink).toHaveAttribute('href', '/auth/login')
  })
})
