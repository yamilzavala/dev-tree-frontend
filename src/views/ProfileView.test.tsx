import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import ProfileView from './ProfileView'

// Mock react-router-dom Form to render as regular form
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Form: (props: React.FormHTMLAttributes<HTMLFormElement>) => <form {...props} />
  }
})

// Mock the api modules
vi.mock('../api/DevTree', () => ({
  updateProfile: vi.fn().mockResolvedValue({ msg: 'Profile updated successfully' }),
  updateImage: vi.fn().mockResolvedValue({ msg: 'Image updated successfully' })
}))

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

// Mock user data
const mockUser = {
  handle: 'johndoe',
  name: 'John Doe',
  email: 'john@example.com',
  _id: '1',
  description: 'Software Developer',
  image: 'https://example.com/image.jpg',
  links: '[]'
}

describe('ProfileView', () => {
  let user: ReturnType<typeof userEvent.setup>
  let queryClient: QueryClient

  beforeEach(() => {
    user = userEvent.setup()
    vi.clearAllMocks()
    
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    })
    
    // Set up mock user data in query cache
    queryClient.setQueryData(['user'], mockUser)
  })

  const getFormElements = () => {
    const allInputs = screen.getAllByRole('button')
    const imageInput = allInputs.find(el => el.getAttribute('type') === 'file')

    return {
      handleInput: screen.getByPlaceholderText('Handle or user name'),
      descriptionTextarea: screen.getByPlaceholderText('Your description'),
      imageInput: imageInput || document.querySelector('input[type="file"]'),
      submitButton: screen.getByRole('button', { name: /save changes/i })
    }
  }

  const renderProfileView = () => {
    return render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <ProfileView />
        </QueryClientProvider>
      </MemoryRouter>
    )
  }

  test('should render profile form with all elements', () => {
    renderProfileView()

    const { handleInput, descriptionTextarea, imageInput, submitButton } = getFormElements()

    expect(screen.getByText('Edit information')).toBeInTheDocument()
    expect(screen.getByText('Complete the profile details!')).toBeInTheDocument()
    expect(handleInput).toBeInTheDocument()
    expect(descriptionTextarea).toBeInTheDocument()
    expect(imageInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  test('should initialize form with user data', () => {
    renderProfileView()

    const { handleInput, descriptionTextarea } = getFormElements()

    expect(handleInput).toHaveValue('johndoe')
    expect(descriptionTextarea).toHaveValue('Software Developer')
  })

  test('should allow typing in handle input', async () => {
    renderProfileView()

    const { handleInput } = getFormElements()

    await user.clear(handleInput)
    await user.type(handleInput, 'newhandle')

    expect(handleInput).toHaveValue('newhandle')
  })

  test('should allow typing in description textarea', async () => {
    renderProfileView()

    const { descriptionTextarea } = getFormElements()

    await user.clear(descriptionTextarea)
    await user.type(descriptionTextarea, 'New description')

    expect(descriptionTextarea).toHaveValue('New description')
  })

  test('should show validation error for required handle field', async () => {
    renderProfileView()

    const { handleInput, submitButton } = getFormElements()

    // Type something and then clear it to trigger validation
    await user.type(handleInput, 'test')
    await user.clear(handleInput)
    await user.click(submitButton)

    expect(await screen.findByText('handle is required')).toBeInTheDocument()
  })

  test('should show validation error for required description field', async () => {
    renderProfileView()

    const { descriptionTextarea, submitButton } = getFormElements()

    // Type something and then clear it to trigger validation
    await user.type(descriptionTextarea, 'test')
    await user.clear(descriptionTextarea)
    await user.click(submitButton)

    expect(await screen.findByText('description is required')).toBeInTheDocument()
  })

  test('should not show validation errors for valid inputs', async () => {
    renderProfileView()

    const { handleInput, descriptionTextarea, submitButton } = getFormElements()

    await user.clear(handleInput)
    await user.type(handleInput, 'validhandle')
    await user.clear(descriptionTextarea)
    await user.type(descriptionTextarea, 'Valid description')
    await user.click(submitButton)

    expect(screen.queryByText('handle is required')).not.toBeInTheDocument()
    expect(screen.queryByText('description is required')).not.toBeInTheDocument()
  })

  test('should have correct input types and attributes', () => {
    renderProfileView()

    const { handleInput, descriptionTextarea, imageInput } = getFormElements()

    expect(handleInput).toHaveAttribute('type', 'text')
    expect(descriptionTextarea).toHaveAttribute('rows', '3')
    expect(imageInput).toHaveAttribute('type', 'file')
    expect(imageInput).toHaveAttribute('accept', 'image')
  })

  test('should have correct placeholders', () => {
    renderProfileView()

    const { handleInput, descriptionTextarea } = getFormElements()

    expect(handleInput).toHaveAttribute('placeholder', 'Handle or user name')
    expect(descriptionTextarea).toHaveAttribute('placeholder', 'Your description')
  })

  test('should have correct styling classes', () => {
    renderProfileView()

    const { handleInput, descriptionTextarea, imageInput, submitButton } = getFormElements()

    expect(handleInput).toHaveClass('text-base-content', 'w-full', 'rounded-lg', 'border-[1px]', 'border-gray-300', 'px-4', 'py-2', 'text-sm', 'focus:outline-none', 'focus:ring-2', 'focus:ring-gray-900', 'focus:border-gray-900', 'transition')
    expect(descriptionTextarea).toHaveClass('bg-base', 'text-base-content', 'w-full', 'rounded-lg', 'border-[1px]', 'border-gray-300', 'px-4', 'py-2', 'text-sm', 'focus:outline-none', 'focus:ring-2', 'focus:ring-gray-900', 'focus:border-gray-900', 'transition')
    expect(imageInput).toHaveClass('bg-base', 'text-base-content', 'w-full', 'rounded-lg', 'border-[1px]', 'border-gray-300', 'px-4', 'py-2', 'text-sm', 'focus:outline-none', 'focus:ring-2', 'focus:ring-gray-900', 'focus:border-gray-900', 'transition')
    expect(submitButton).toHaveClass('w-full', 'mt-2', 'rounded-lg', 'bg-gradient-to-r', 'from-gray-700', 'to-gray-900', 'text-white', 'py-2.5', 'text-sm', 'font-medium', 'shadow-md', 'hover:opacity-90', 'transition', 'flex', 'items-center', 'justify-center', 'gap-2')
  })

  test('should handle file input change', async () => {
    renderProfileView()

    const { imageInput } = getFormElements()
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    if (imageInput) {
      await user.upload(imageInput as HTMLInputElement, file)

      // Note: File upload testing would require more complex mocking
      // This test ensures the file input can be interacted with
      expect(imageInput).toBeInTheDocument()
    }
  })
})
