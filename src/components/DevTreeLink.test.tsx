import { render, screen } from '@testing-library/react'
import type { SocialNetwork } from '../types'
import DevTreeLinkComponent from './DevTreeLink'
import { FaFacebook, FaGithub } from 'react-icons/fa'

vi.mock('../data/social', () => ({
  social: [
    { name: 'facebook', url: '', enabled: false, icon: (props: any) => <svg data-testid="facebook-icon" {...props} /> },
    { name: 'github', url: '', enabled: false, icon: (props: any) => <svg data-testid="github-icon" {...props} /> },
  ]
}))

describe('DevTreeLink', () => {
  const mockLink: SocialNetwork = {
    id: 1,
    name: 'facebook',
    url: 'https://facebook.com/test',
    enabled: true,
    icon: FaFacebook
  }

  test('should render link with correct href', () => {
    render(<DevTreeLinkComponent link={mockLink} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://facebook.com/test')
    expect(link).toHaveAttribute('target', '_blank_break-test')
    expect(link).toHaveAttribute('rel', 'noreferrer noopener')
  })

  test('should render link name with capitalization', () => {
    render(<DevTreeLinkComponent link={mockLink} />)
    
    const linkText = screen.getByText('facebook')
    expect(linkText).toBeInTheDocument()
    expect(linkText).toHaveClass('capitalize')
  })

  test('should render icon', () => {
    render(<DevTreeLinkComponent link={mockLink} />)
    
    const icon = screen.getByTestId('facebook-icon')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('w-4', 'h-4')
  })

  test('should apply default styling when no custom colors provided', () => {
    render(<DevTreeLinkComponent link={mockLink} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveClass('bg-base-content', 'text-base-300')
  })

  test('should apply custom styling when colors provided', () => {
    render(<DevTreeLinkComponent link={mockLink} color="text-white" bgColor="bg-blue-500" />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveClass('text-white', 'bg-blue-500')
    expect(link).not.toHaveClass('bg-base-content', 'text-base-300')
  })

  test('should find correct icon from social data', () => {
    const githubLink: SocialNetwork = {
      id: 2,
      name: 'github',
      url: 'https://github.com/test',
      enabled: true,
      icon: FaGithub
    }
    
    render(<DevTreeLinkComponent link={githubLink} />)
    
    const linkText = screen.getByText('github')
    expect(linkText).toBeInTheDocument()
    expect(linkText).toHaveClass('capitalize')
  })

  test('should have correct accessibility attributes', () => {
    render(<DevTreeLinkComponent link={mockLink} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer noopener')
  })
})
