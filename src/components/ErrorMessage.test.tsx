import { render, screen } from '@testing-library/react'
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage', () => {
  test('should render children content', () => {
    render(<ErrorMessage>This is an error message</ErrorMessage>)
    
    const errorMessage = screen.getByText('This is an error message')
    expect(errorMessage).toBeInTheDocument()
  })

  test('should render with correct styling classes', () => {
    render(<ErrorMessage>Error content</ErrorMessage>)
    
    const container = screen.getByText('Error content')
    expect(container).toHaveClass('mt-1', 'text-sm', 'text-red-600')
  })

  test('should render complex children', () => {
    render(
      <ErrorMessage>
        <span data-testid="error-icon">⚠️</span>
        <span>Complex error message</span>
      </ErrorMessage>
    )
    
    const icon = screen.getByTestId('error-icon')
    const text = screen.getByText('Complex error message')
    
    expect(icon).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  test('should render empty children', () => {
    const { container } = render(<ErrorMessage>{null}</ErrorMessage>)
    
    const div = container.firstChild
    expect(div).toBeInTheDocument()
    expect(div).toBeEmptyDOMElement()
  })

  test('should render string children', () => {
    render(<ErrorMessage>String error</ErrorMessage>)
    
    const errorMessage = screen.getByText('String error')
    expect(errorMessage).toBeInTheDocument()
  })

  test('should render number children', () => {
    render(<ErrorMessage>{404}</ErrorMessage>)
    
    const errorMessage = screen.getByText('404')
    expect(errorMessage).toBeInTheDocument()
  })
})
