import { render, screen } from '@testing-library/react'
import HandleDataHeader from './HandleDataHeader'

describe('HandleDataHeader', () => {
  const defaultProps = {
    image: 'test-image.jpg',
    handle: 'testuser',
    description: 'Test description'
  }

  test('should render handle text', () => {
    render(<HandleDataHeader {...defaultProps} />)
    
    const handleElement = screen.getByText('testuser')
    expect(handleElement).toBeInTheDocument()
    expect(handleElement).toHaveClass('text-3xl', 'font-bold')
  })

  test('should render description', () => {
    render(<HandleDataHeader {...defaultProps} />)
    
    const descriptionElement = screen.getByText('Test description')
    expect(descriptionElement).toBeInTheDocument()
    expect(descriptionElement).toHaveClass('mt-2', 'text-sm', 'text-gray-200')
  })

  test('should render image with correct attributes', () => {
    render(<HandleDataHeader {...defaultProps} />)
    
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'test-image.jpg')
    expect(image).toHaveAttribute('alt', 'testuser')
    expect(image).toHaveClass('relative', 'z-20', 'h-[300px]', 'w-full', 'object-cover', 'brightness-60')
  })

  test('should render featured badge', () => {
    render(<HandleDataHeader {...defaultProps} />)
    
    const badge = screen.getByText('Featured')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('rounded-full', 'bg-gray-800/80', 'px-3', 'py-1', 'text-xs', 'font-medium', 'text-gray-200', 'backdrop-blur-sm')
  })

  test('should apply correct container styling', () => {
    render(<HandleDataHeader {...defaultProps} />)
    
    const handleElement = screen.getByText('testuser')
    const container = handleElement.closest('.relative.w-full.h-1\\/2.overflow-hidden.rounded-t-lg.border')
    expect(container).toBeInTheDocument()
  })

  test('should render background overlay', () => {
    const { container } = render(<HandleDataHeader {...defaultProps} />)
    
    const overlay = container.querySelector('.absolute.inset-0.z-30')
    expect(overlay).toBeInTheDocument()
    expect(overlay).toHaveClass('bg-black/15')
  })

  test('should render content overlay with correct positioning', () => {
    render(<HandleDataHeader {...defaultProps} />)
    
    const contentOverlay = screen.getByText('testuser').closest('.absolute.inset-0.z-40')
    expect(contentOverlay).toHaveClass('absolute', 'inset-0', 'z-40', 'flex', 'flex-col', 'justify-end', 'p-6', 'text-white')
  })

  test('should not render image when image prop is empty', () => {
    const propsWithoutImage = {
      image: '',
      handle: 'testuser',
      description: 'Test description'
    }
    
    render(<HandleDataHeader {...propsWithoutImage} />)
    
    const image = screen.queryByRole('img')
    expect(image).not.toBeInTheDocument()
  })

  test('should render image when image prop is provided', () => {
    render(<HandleDataHeader {...defaultProps} />)
    
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
  })

  test('should layout content correctly with flex', () => {
    render(<HandleDataHeader {...defaultProps} />)
    
    const flexContainer = screen.getByText('Featured').parentElement
    expect(flexContainer).toHaveClass('flex', 'items-end', 'justify-between')
  })

  test('should render handle and description in same column', () => {
    render(<HandleDataHeader {...defaultProps} />)
    
    const columnContainer = screen.getByText('testuser').parentElement
    expect(columnContainer).toHaveClass('flex', 'flex-col')
  })
})
