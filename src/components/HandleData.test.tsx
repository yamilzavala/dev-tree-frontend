import { render, screen } from '@testing-library/react'
import type { SocialNetwork, UserHandle } from '../types'
import HandleData from './HandleData'

// Mock child components
vi.mock('./DevTreeLink', () => ({
  default: ({ link, color, bgColor }: { link: SocialNetwork; color?: string; bgColor?: string }) => (
    <div data-testid={`dev-tree-link-${link.name}`} data-color={color} data-bg-color={bgColor}>
      {link.name}
    </div>
  )
}))

vi.mock('./HandleDataHeader', () => ({
  default: ({ image, handle, description }: { image: string; handle: string; description: string }) => (
    <div data-testid="handle-data-header" data-image={image} data-handle={handle}>
      {description}
    </div>
  )
}))

describe('HandleData', () => {
  const mockUser: UserHandle = {
    handle: 'testuser',
    name: 'Test User',
    description: 'This is a test user description',
    image: 'test-image.jpg',
    links: JSON.stringify([
      { id: 1, name: 'twitter', url: 'https://twitter.com/test', enabled: true, icon: () => null },
      { id: 2, name: 'github', url: 'https://github.com/test', enabled: false, icon: () => null }
    ])
  }

  const mockData = {
    user: mockUser
  }

  test('should render user description', () => {
    render(<HandleData data={mockData} />)
    
    const description = screen.getByText('This is a test user description')
    expect(description).toBeInTheDocument()
  })

  test('should render HandleDataHeader with correct props', () => {
    render(<HandleData data={mockData} />)
    
    const header = screen.getByTestId('handle-data-header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveAttribute('data-image', 'test-image.jpg')
    expect(header).toHaveAttribute('data-handle', 'testuser')
    expect(header).toHaveTextContent('Social Media Links')
  })

  test('should render enabled links', () => {
    render(<HandleData data={mockData} />)
    
    const enabledLink = screen.getByTestId('dev-tree-link-twitter')
    expect(enabledLink).toBeInTheDocument()
    expect(enabledLink).toHaveTextContent('twitter')
    expect(enabledLink).toHaveAttribute('data-color', 'text-white')
    expect(enabledLink).toHaveAttribute('data-bg-color', 'bg-black')
  })

  test('should not render disabled links', () => {
    render(<HandleData data={mockData} />)
    
    const disabledLink = screen.queryByTestId('dev-tree-link-github')
    expect(disabledLink).not.toBeInTheDocument()
  })

  test('should render default avatar when user has no image', () => {
    const userWithoutImage = {
      ...mockUser,
      image: ''
    }
    
    render(<HandleData data={{ user: userWithoutImage }} />)
    
    const header = screen.getByTestId('handle-data-header')
    expect(header).toHaveAttribute('data-image', '/bg-media-9.png')
  })

  test('should show no links message when links array is empty', () => {
    const userWithNoLinks = {
      ...mockUser,
      links: '[]'
    }
    
    render(<HandleData data={{ user: userWithNoLinks }} />)
    
    const description = screen.getByText('This is a test user description')
    expect(description).toBeInTheDocument()
  })

  test('should apply correct styling classes', () => {
    render(<HandleData data={mockData} />)
    
    const container = screen.getByText('This is a test user description').closest('div')
    expect(container).toHaveClass('bg-white', 'rounded-b-md', 'h-1/2', 'px-6', 'pt-8', 'pb-8', 'space-y-6', 'text-center', 'flex', 'flex-col', 'justify-start')
  })

  test('should filter enabled links correctly', () => {
    const userWithMixedLinks = {
      ...mockUser,
      links: JSON.stringify([
        { id: 1, name: 'twitter', url: 'https://twitter.com/test', enabled: true, icon: () => null },
        { id: 2, name: 'github', url: 'https://github.com/test', enabled: false, icon: () => null },
        { id: 3, name: 'linkedin', url: 'https://linkedin.com/test', enabled: true, icon: () => null }
      ])
    }
    
    render(<HandleData data={{ user: userWithMixedLinks }} />)
    
    expect(screen.getByTestId('dev-tree-link-twitter')).toBeInTheDocument()
    expect(screen.getByTestId('dev-tree-link-linkedin')).toBeInTheDocument()
    expect(screen.queryByTestId('dev-tree-link-github')).not.toBeInTheDocument()
  })
})
