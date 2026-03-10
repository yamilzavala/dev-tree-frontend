# MSW (Mock Service Worker) Testing Setup

This directory contains the MSW configuration for testing API endpoints in the DevTree frontend application.

## Files Overview

### `handlers.ts`
Contains all the request handlers for mocking API endpoints:

**Success Handlers:**
- `GET /api/user` - Returns mock user data
- `PATCH /api/user` - Updates user profile
- `POST /api/user/image` - Updates profile image
- `PATCH /api/user/links` - Updates user links
- `GET /api/:handle` - Gets user by handle
- `POST /api/search` - Searches for user by handle

**Error Handlers:**
- `getUserErrorHandler` - Simulates user fetch failure
- `updateProfileErrorHandler` - Simulates profile update failure
- `updateImageErrorHandler` - Simulates image upload failure
- `updateLinksErrorHandler` - Simulates links update failure
- `getUserByHandleErrorHandler` - Simulates user not found
- `searchByHandleErrorHandler` - Simulates search failure

### `server.ts`
Sets up the MSW server with all handlers for Node.js testing environment.

### Mock Data Structure

```typescript
export let mockUser: User = {
  _id: '1',
  handle: 'johndoe',
  name: 'John Doe',
  email: 'john@example.com',
  description: 'Full stack developer passionate about React and Node.js',
  image: 'https://example.com/image.jpg',
  links: JSON.stringify([
    {
      id: 1,
      name: 'GitHub',
      url: 'https://github.com/johndoe',
      enabled: true,
      icon: 'github'
    },
    {
      id: 2,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/johndoe',
      enabled: true,
      icon: 'linkedin'
    }
  ])
}
```

## Usage in Tests

### Basic Setup

```typescript
import server from '../mocks/server'

// Start server before all tests
beforeAll(() => {
  server.listen()
})

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers()
})

// Close server after all tests
afterAll(() => {
  server.close()
})
```

### Testing Success Scenarios

```typescript
test('should fetch user data successfully', async () => {
  // MSW automatically uses the default handlers
  const result = await getUser()
  
  expect(result).toEqual({
    _id: '1',
    handle: 'johndoe',
    name: 'John Doe',
    // ... rest of user data
  })
})
```

### Testing Error Scenarios

```typescript
import { updateProfileErrorHandler } from '../mocks/handlers'

test('should show error when profile update fails', async () => {
  // Override default handlers with error handlers
  server.use(...updateProfileErrorHandler)
  
  await expect(updateProfile(profileData)).rejects.toThrow('Failed to update profile')
})
```

### Testing with React Components

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

test('should handle API calls in component', async () => {
  const user = userEvent.setup()
  render(
    <QueryClientProvider client={queryClient}>
      <MyComponent />
    </QueryClientProvider>
  )
  
  // Wait for API call to complete
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
  
  // Test user interaction
  await user.click(screen.getByRole('button', { name: 'Update' }))
  
  // Verify success state
  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith('Profile updated successfully')
  })
})
```

## Available Test Files

### API Tests
- `src/api/DevTree.test.ts` - Tests for all API functions

### Component Tests with MSW
- `src/views/ProfileView.msw.test.tsx` - Profile management tests
- `src/components/SearchForm.msw.test.tsx` - Search functionality tests
- `src/views/LinkTreeView.msw.test.tsx` - Links management tests
- `src/views/HandleView.msw.test.tsx` - Public profile view tests

### Integration Tests
- `src/integration/DevTreeFlow.test.tsx` - End-to-end user flow tests

## Test Categories

### 1. Unit Tests for API Functions
- Test each API function in isolation
- Verify correct request/response handling
- Test error scenarios

### 2. Component Tests
- Test React components with real API calls
- Verify UI states (loading, success, error)
- Test user interactions

### 3. Integration Tests
- Test complete user flows
- Verify data persistence across navigation
- Test concurrent request handling

## Best Practices

### 1. Test Isolation
- Always reset handlers after each test
- Use `resetMockData()` to restore initial state
- Avoid sharing state between tests

### 2. Error Testing
- Test both success and error scenarios
- Verify error messages are displayed correctly
- Test retry logic if applicable

### 3. Loading States
- Test loading states are shown
- Verify loading states are hidden after completion
- Test loading states during errors

### 4. Data Validation
- Test form validation before API calls
- Verify data transformation
- Test edge cases (empty data, special characters)

## Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test src/api/DevTree.test.ts
```

## Migration from vi.mock

Previously, tests used `vi.mock` to mock API functions. With MSW:

**Before:**
```typescript
vi.mock('../api/DevTree', () => ({
  getUser: vi.fn().mockResolvedValue(mockUser)
}))
```

**After:**
```typescript
import server from '../mocks/server'
// MSW automatically intercepts the real API call
// No mocking needed!
```

Benefits of MSW:
- Tests use real API functions
- More realistic testing environment
- Better test coverage
- Easier to test error scenarios
- No need to maintain mock implementations

## Troubleshooting

### Common Issues

1. **Server not starting**: Make sure `server.listen()` is called in `beforeAll`
2. **Handlers not resetting**: Ensure `server.resetHandlers()` is called in `afterEach`
3. **Tests timing out**: Check if API endpoints match the mocked routes
4. **State leaking**: Use `resetMockData()` to clean up between tests

### Debug Tips

- Add `console.log` in handlers to verify they're being called
- Check network tab in browser tests to see intercepted requests
- Use `server.printHandlers()` to see active handlers
- Verify mock data structure matches expected types
