import { render, screen } from '@testing-library/react'
import BackgroundAnimation from './BackgroundAnimation'

describe('BackgroundAnimation', () => {
  test('should render video element with correct attributes', () => {
    render(<BackgroundAnimation />)
    
    const video = screen.getByText(/sorry, your browser does not support embedded videos/i).closest('video')
    expect(video).toBeInTheDocument()
    expect(video).toHaveProperty('autoplay', true)
    expect(video).toHaveProperty('loop', true)
    expect(video).toHaveProperty('muted', true)
    expect(video).toHaveAttribute('playsinline')
  })

  test('should render video source with correct type', () => {
    render(<BackgroundAnimation />)
    
    const video = screen.getByText(/sorry, your browser does not support embedded videos/i).closest('video')
    const source = video?.querySelector('source')
    expect(source).toHaveAttribute('src', '/video_animated_1.mp4')
    expect(source).toHaveAttribute('type', 'video/mp4')
  })

  test('should render with default opacity when no opacity prop is provided', () => {
    render(<BackgroundAnimation />)
    
    const container = screen.getByText(/sorry, your browser does not support embedded videos/i).closest('div')
    expect(container).toHaveClass('opacity-')
  })

  test('should render with custom opacity when opacity prop is provided', () => {
    render(<BackgroundAnimation opacity={45} />)
    
    const container = screen.getByText(/sorry, your browser does not support embedded videos/i).closest('div')
    expect(container).toHaveClass('opacity-45')
  })

  test('should render overlay divs', () => {
    render(<BackgroundAnimation />)
    
    const container = screen.getByText(/sorry, your browser does not support embedded videos/i).closest('div')
    const overlays = container?.querySelectorAll('.absolute.inset-0')
    expect(overlays?.length).toBeGreaterThan(0)
  })
})
