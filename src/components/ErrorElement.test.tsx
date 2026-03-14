import { render, screen } from '@testing-library/react'
import ErrorElement from './ErrorElement'

describe('ErrorElement', () => {
  test('should render error message', () => {
    render(<ErrorElement />)
    
    const errorMessage = screen.getByText(/there was an error/i)
    expect(errorMessage).toBeInTheDocument()
  })

  test('should render as heading element', () => {
    render(<ErrorElement />)
    
    const heading = screen.getByRole('heading', { level: 4 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/there was an error/i)
  })

  test('should apply correct styling classes', () => {
    render(<ErrorElement />)
    
    const heading = screen.getByRole('heading', { level: 4 })
    expect(heading).toHaveClass('font-bold', 'text-4xl')
  })
})
