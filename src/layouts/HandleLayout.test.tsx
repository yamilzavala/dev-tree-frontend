import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HandleLayout from './HandleLayout'

// Mock BackgroundAnimation component
vi.mock('../components/BackgroundAnimation', () => ({
  default: () => <div data-testid="background-animation">Background Animation</div>
}))

// Mock Outlet
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Outlet Content</div>
  }
})

describe('HandleLayout', () => {
  test('should render BackgroundAnimation component', () => {
    render(
      <MemoryRouter>
        <HandleLayout />
      </MemoryRouter>
    )

    expect(screen.getByTestId('background-animation')).toBeInTheDocument()
    expect(screen.getByTestId('background-animation')).toHaveTextContent('Background Animation')
  })

  test('should render Outlet component', () => {
    render(
      <MemoryRouter>
        <HandleLayout />
      </MemoryRouter>
    )

    expect(screen.getByTestId('outlet')).toBeInTheDocument()
    expect(screen.getByTestId('outlet')).toHaveTextContent('Outlet Content')
  })

  test('should render both components in correct order', () => {
    render(
      <MemoryRouter>
        <HandleLayout />
      </MemoryRouter>
    )

    const backgroundAnimation = screen.getByTestId('background-animation')
    const outlet = screen.getByTestId('outlet')

    // BackgroundAnimation should come before Outlet
    expect(backgroundAnimation.compareDocumentPosition(outlet) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  test('should render within a fragment', () => {
    const { container } = render(
      <MemoryRouter>
        <HandleLayout />
      </MemoryRouter>
    )

    // Should render both components without wrapper div
    expect(container.firstChild).toBe(screen.getByTestId('background-animation'))
    expect(container.children).toHaveLength(2)
  })

  test('should have both components present in DOM', () => {
    render(
      <MemoryRouter>
        <HandleLayout />
      </MemoryRouter>
    )

    expect(screen.getByTestId('background-animation')).toBeInTheDocument()
    expect(screen.getByTestId('outlet')).toBeInTheDocument()
  })

  test('should render layout structure correctly', () => {
    render(
      <MemoryRouter>
        <HandleLayout />
      </MemoryRouter>
    )

    const container = screen.getByTestId('background-animation').parentElement
    expect(container).toBeInTheDocument()
    expect(container?.children).toHaveLength(2)
  })
})
