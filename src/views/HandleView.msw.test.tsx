import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import HandleView from './HandleView'
import server from '../mocks/server'
import { getUserByHandleErrorHandler } from '../mocks/handlers'
import { http, HttpResponse } from 'msw'

// Mock Loading component
vi.mock('../components/Loading', () => ({
  default: () => <div data-testid="loading">Loading...</div>
}))

// Mock NotFoundView component
vi.mock('./NotFoundView', () => ({
  default: () => <div data-testid="not-found">User Not Found</div>
}))

// Mock HandleData component
vi.mock('../components/HandleData', () => ({
  default: ({ data }: { data: { user: { name: string; handle: string; description: string } } }) => (
    <div data-testid="handle-data">
      <h1>{data.user.name}</h1>
      <p>{data.user.handle}</p>
      <p>{data.user.description}</p>
    </div>
  )
}))

describe('HandleView with MSW', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    
    vi.clearAllMocks()
    server.resetHandlers()
  })

  const renderHandleView = (handle: string) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/${handle}`]}>
          <Routes>
            <Route path="/:handle" element={<HandleView />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )
  }

  test('should display loading state initially', () => {
    renderHandleView('johndoe')
    
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  test('should display user data when handle exists', async () => {
    renderHandleView('johndoe')

    // Wait for data to load and HandleData to be rendered
    await screen.findByTestId('handle-data')
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('johndoe')).toBeInTheDocument()
    expect(screen.getByText('Full stack developer passionate about React and Node.js')).toBeInTheDocument()
  })

  test('should display not found page when handle does not exist', async () => {
    server.use(...getUserByHandleErrorHandler)

    renderHandleView('nonexistent')

    // Wait for error state and NotFoundView to be rendered
    await screen.findByTestId('not-found', {}, { timeout: 5000 })
    
    expect(screen.getByText('User Not Found')).toBeInTheDocument()
  }, 10000)

  test('should handle different handles correctly', async () => {
    renderHandleView('johndoe')

    await screen.findByTestId('handle-data')
    
    expect(screen.getByText('johndoe')).toBeInTheDocument()
  })

  test('should retry failed request once', async () => {
    let callCount = 0
    
    server.use(
      http.get('http://localhost:4000/api/:handle', () => {
        callCount++
        if (callCount <= 1) {
          return new Response(null, { status: 500 })
        }
        return HttpResponse.json({
          user: {
            handle: 'johndoe',
            name: 'John Doe',
            description: 'Developer',
            links: '[]',
            image: 'https://example.com/image.jpg'
          }
        })
      })
    )

    renderHandleView('johndoe')

    // Should eventually succeed after retry
    await screen.findByTestId('handle-data', {}, { timeout: 5000 })
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    
    // Should have been called twice (initial + retry)
    expect(callCount).toBe(2)
  }, 10000)
})
