import { render, screen, fireEvent } from '@testing-library/react'
import Toggle from './Toggle'
import { getThemeFromLocalStorage } from '../utils'

// Mock react-icons
vi.mock('react-icons/bs', () => ({
  BsMoonFill: ({ className }: { className: string }) => <div data-testid="moon-icon" className={className}>Moon</div>,
  BsSunFill: ({ className }: { className: string }) => <div data-testid="sun-icon" className={className}>Sun</div>
}))

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock document.documentElement
const mockSetAttribute = vi.fn()
Object.defineProperty(document, 'documentElement', {
  value: {
    setAttribute: mockSetAttribute
  },
  writable: true
})

// Mock utils
vi.mock('../utils', () => ({
  themes: {
    light: 'light',
    dark: 'dark'
  },
  getThemeFromLocalStorage: vi.fn()
}))

const mockGetThemeFromLocalStorage = vi.mocked(getThemeFromLocalStorage)

describe('Toggle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue('dark')
  })

  test('should render toggle component', () => {
    mockGetThemeFromLocalStorage.mockReturnValue('dark')
    
    render(<Toggle />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
  })

  test('should initialize with theme from localStorage', () => {
    mockGetThemeFromLocalStorage.mockReturnValue('light')
    
    render(<Toggle />)
    
    expect(mockGetThemeFromLocalStorage).toHaveBeenCalled()
    expect(mockSetAttribute).toHaveBeenCalledWith('data-theme', 'light')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
  })

  test('should toggle theme when checkbox is changed', () => {
    mockGetThemeFromLocalStorage.mockReturnValue('light')
    
    render(<Toggle />)
    
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    expect(mockSetAttribute).toHaveBeenCalledWith('data-theme', 'dark')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  test('should toggle from dark to light', () => {
    mockGetThemeFromLocalStorage.mockReturnValue('dark')
    
    render(<Toggle />)
    
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    expect(mockSetAttribute).toHaveBeenCalledWith('data-theme', 'light')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
  })

  test('should apply correct classes to icons', () => {
    mockGetThemeFromLocalStorage.mockReturnValue('dark')
    
    render(<Toggle />)
    
    const sunIcon = screen.getByTestId('sun-icon')
    const moonIcon = screen.getByTestId('moon-icon')
    
    expect(sunIcon).toHaveClass('swap-on', 'h-4', 'w-4', 'text-gray-950')
    expect(moonIcon).toHaveClass('swap-off', 'h-4', 'w-4', 'text-gray-950')
  })

  test('should render with correct container styling', () => {
    mockGetThemeFromLocalStorage.mockReturnValue('dark')
    
    render(<Toggle />)
    
    const container = screen.getByRole('checkbox').parentElement?.parentElement
    expect(container).toHaveClass('navbar-end')
  })

  test('should render label with correct classes', () => {
    mockGetThemeFromLocalStorage.mockReturnValue('dark')
    
    render(<Toggle />)
    
    const label = screen.getByRole('checkbox').parentElement
    expect(label).toHaveClass('swap', 'swap-rotate')
  })

  test('should have checkbox with correct type', () => {
    mockGetThemeFromLocalStorage.mockReturnValue('dark')
    
    render(<Toggle />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('type', 'checkbox')
  })

  test('should update theme when initial theme is light', () => {
    mockGetThemeFromLocalStorage.mockReturnValue('light')
    
    render(<Toggle />)
    
    expect(mockSetAttribute).toHaveBeenCalledWith('data-theme', 'light')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
  })

  test('should handle multiple theme changes', () => {
    mockGetThemeFromLocalStorage.mockReturnValue('dark')
    
    render(<Toggle />)
    
    const checkbox = screen.getByRole('checkbox')
    
    // First toggle: dark -> light
    fireEvent.click(checkbox)
    expect(mockSetAttribute).toHaveBeenLastCalledWith('data-theme', 'light')
    
    // Second toggle: light -> dark
    fireEvent.click(checkbox)
    expect(mockSetAttribute).toHaveBeenLastCalledWith('data-theme', 'dark')
    
    // Third toggle: dark -> light again
    fireEvent.click(checkbox)
    expect(mockSetAttribute).toHaveBeenLastCalledWith('data-theme', 'light')
  })
})
