import { render } from '@testing-library/react'
import Loading from './Loading'

describe('Loading', () => {
  test('should render loading container', () => {
    const { container } = render(<Loading />)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('h-screen', 'flex', 'items-center', 'justify-center')
  })

  test('should render loading spinner', () => {
    const { container } = render(<Loading />)
    const span = container.querySelector('span')
    expect(span).toHaveClass('loading', 'loading-ring', 'loading-xl', 'text-pink-400')
  })

  test('should have correct accessibility role', () => {
    const { container } = render(<Loading />)
    const span = container.querySelector('span')
    expect(span).toBeInTheDocument()
  })

  test('should apply full screen height', () => {
    const { container } = render(<Loading />)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('h-screen')
  })

  test('should center content both horizontally and vertically', () => {
    const { container } = render(<Loading />)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('flex', 'items-center', 'justify-center')
  })

  test('should use pink color for loading indicator', () => {
    const { container } = render(<Loading />)
    const span = container.querySelector('span')
    expect(span).toHaveClass('text-pink-400')
  })

  test('should use extra large size for loading indicator', () => {
    const { container } = render(<Loading />)
    const span = container.querySelector('span')
    expect(span).toHaveClass('loading-xl')
  })

  test('should use ring style for loading indicator', () => {
    const { container } = render(<Loading />)
    const span = container.querySelector('span')
    expect(span).toHaveClass('loading-ring')
  })
})
