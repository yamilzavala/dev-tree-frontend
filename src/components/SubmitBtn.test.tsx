import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SubmitBtn from './SubmitBtn'

// Mock react-icons
vi.mock('react-icons/im', () => ({
  ImSpinner11: ({ className }: { className: string }) => <div data-testid="spinner" className={className}>Spinner</div>
}))

describe('SubmitBtn', () => {
  const user = userEvent.setup()

  test('should render children when not submitting', () => {
    render(<SubmitBtn className="btn-primary" isSubmitting={false}>Submit Form</SubmitBtn>)
    
    const buttonText = screen.getByText('Submit Form')
    expect(buttonText).toBeInTheDocument()
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })

  test('should render spinner when submitting', () => {
    render(<SubmitBtn className="btn-primary" isSubmitting={true}>Submit Form</SubmitBtn>)
    
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('animate-spin')
    expect(screen.queryByText('Submit Form')).not.toBeInTheDocument()
  })

  test('should apply custom className', () => {
    render(<SubmitBtn className="custom-btn-class" isSubmitting={false}>Submit</SubmitBtn>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-btn-class')
  })

  test('should have correct button attributes', () => {
    render(<SubmitBtn className="btn-primary" isSubmitting={false}>Submit</SubmitBtn>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).not.toBeDisabled()
  })

  test('should be disabled when submitting', () => {
    render(<SubmitBtn className="btn-primary" isSubmitting={true}>Submit</SubmitBtn>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  test('should not be disabled when not submitting', () => {
    render(<SubmitBtn className="btn-primary" isSubmitting={false}>Submit</SubmitBtn>)
    
    const button = screen.getByRole('button')
    expect(button).not.toBeDisabled()
  })

  test('should render complex children', () => {
    render(
      <SubmitBtn className="btn-primary" isSubmitting={false}>
        <span data-testid="icon">🚀</span>
        <span>Submit Now</span>
      </SubmitBtn>
    )
    
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('Submit Now')).toBeInTheDocument()
  })

  test('should not render complex children when submitting', () => {
    render(
      <SubmitBtn className="btn-primary" isSubmitting={true}>
        <span data-testid="icon">🚀</span>
        <span>Submit Now</span>
      </SubmitBtn>
    )
    
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
    expect(screen.queryByText('Submit Now')).not.toBeInTheDocument()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  test('should handle click events when not submitting', async () => {
    const handleClick = vi.fn()
    
    render(
      <div onClick={handleClick}>
        <SubmitBtn className="btn-primary" isSubmitting={false}>Submit</SubmitBtn>
      </div>
    )
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalled()
  })

  test('should not handle click events when submitting', async () => {
    const handleClick = vi.fn()
    
    render(
      <div onClick={handleClick}>
        <SubmitBtn className="btn-primary" isSubmitting={true}>Submit</SubmitBtn>
      </div>
    )
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('should render with default text prop', () => {
    render(<SubmitBtn className="btn-primary" isSubmitting={false}>Default Text</SubmitBtn>)
    
    expect(screen.getByText('Default Text')).toBeInTheDocument()
  })

  test('should have correct accessibility role', () => {
    render(<SubmitBtn className="btn-primary" isSubmitting={false}>Submit</SubmitBtn>)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})
