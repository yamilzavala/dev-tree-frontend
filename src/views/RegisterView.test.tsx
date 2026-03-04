import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Register from './RegisterView'

// Mock the BackgroundAnimation component
vi.mock('../components/BackgroundAnimation', () => ({
  default: () => <div data-testid="background-animation">Background</div>
}))

// Mock the api module at the top level
vi.mock('../config/axios', () => ({
  default: {
    post: vi.fn().mockResolvedValue({ data: { msg: 'Success' } })
  }
}))

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

describe('RegisterView', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    vi.clearAllMocks()
  })

  const getFormElements = () => {
    const passwordInputs = screen.getAllByPlaceholderText('Enter your password')
    return {
      nameInput: screen.getByPlaceholderText('Enter your name'),
      emailInput: screen.getByPlaceholderText('Enter your email address'),
      handleInput: screen.getByPlaceholderText('Enter your handle'),
      passwordInput: passwordInputs[0],
      confirmPasswordInput: passwordInputs[1],
      submitButton: screen.getByRole('button', { name: /continue/i })
    }
  }

  const renderRegisterView = () => {
    return render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    )
  }

  test('should render registration form with all elements', () => {
    renderRegisterView()

    const { nameInput, emailInput, handleInput, passwordInput, confirmPasswordInput, submitButton } = getFormElements()

    expect(screen.getByText('Create your account')).toBeInTheDocument()
    expect(screen.getByText('Welcome! Please fill in the details to get started.')).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(handleInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(screen.getByText('Already have an account?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
  })

  test('inputs should be initially empty', () => {
    renderRegisterView()

    const { nameInput, emailInput, handleInput, passwordInput, confirmPasswordInput } = getFormElements()

    expect(nameInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
    expect(handleInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')
    expect(confirmPasswordInput).toHaveValue('')
  })

  test('should allow typing in all inputs', async () => {
    renderRegisterView()

    const { nameInput, emailInput, handleInput, passwordInput, confirmPasswordInput } = getFormElements()

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(handleInput, 'johndoe')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')

    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(handleInput).toHaveValue('johndoe')
    expect(passwordInput).toHaveValue('password123')
    expect(confirmPasswordInput).toHaveValue('password123')
  })

  test('should show validation error for required name field', async () => {
    renderRegisterView()

    const { nameInput, submitButton } = getFormElements()

    // Type something and then clear it to trigger validation
    await user.type(nameInput, 'test')
    await user.clear(nameInput)
    await user.click(submitButton)

    expect(await screen.findByText('Name is required')).toBeInTheDocument()
  })

  test('should show validation error for required email field', async () => {
    renderRegisterView()

    const { emailInput, submitButton } = getFormElements()

    // Type something and then clear it to trigger validation
    await user.type(emailInput, 'test@example.com')
    await user.clear(emailInput)
    await user.click(submitButton)

    expect(await screen.findByText('Email is required')).toBeInTheDocument()
  })


  test('should show validation error for required handle field', async () => {
    renderRegisterView()

    const { handleInput, submitButton } = getFormElements()

    // Type something and then clear it to trigger validation
    await user.type(handleInput, 'test')
    await user.clear(handleInput)
    await user.click(submitButton)

    expect(await screen.findByText('Handle is required')).toBeInTheDocument()
  })

  test('should show validation error for required password field', async () => {
    renderRegisterView()

    const { passwordInput, submitButton } = getFormElements()

    // Type something and then clear it to trigger validation
    await user.type(passwordInput, 'test')
    await user.clear(passwordInput)
    await user.click(submitButton)

    expect(await screen.findByText('Password is required')).toBeInTheDocument()
  })

  test('should show validation error for short password', async () => {
    renderRegisterView()

    const { passwordInput, submitButton } = getFormElements()

    await user.type(passwordInput, '123')
    await user.click(submitButton)

    expect(await screen.findByText('The password must be at least 8 characters long')).toBeInTheDocument()
  })

  test('should show validation error for required password confirmation field', async () => {
    renderRegisterView()

    const { confirmPasswordInput, submitButton } = getFormElements()

    // Type something and then clear it to trigger validation
    await user.type(confirmPasswordInput, 'test')
    await user.clear(confirmPasswordInput)
    await user.click(submitButton)

    expect(await screen.findByText('Confirmation Password is required')).toBeInTheDocument()
  })

  test('should show validation error when passwords do not match', async () => {
    renderRegisterView()

    const { passwordInput, confirmPasswordInput, submitButton } = getFormElements()

    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'differentpassword')
    await user.click(submitButton)

    expect(await screen.findByText('The passwords are not the same')).toBeInTheDocument()
  })

  test('should not show validation errors for valid inputs', async () => {
    renderRegisterView()

    const { nameInput, emailInput, handleInput, passwordInput, confirmPasswordInput, submitButton } = getFormElements()

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(handleInput, 'johndoe')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')
    
    await user.click(submitButton)

    // Check that no validation errors are present
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
    expect(screen.queryByText('Not valid E-mail')).not.toBeInTheDocument()
    expect(screen.queryByText('Handle is required')).not.toBeInTheDocument()
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument()
    expect(screen.queryByText('The password must be at least 8 characters long')).not.toBeInTheDocument()
    expect(screen.queryByText('Confirmation Password is required')).not.toBeInTheDocument()
    expect(screen.queryByText('The passwords are not the same')).not.toBeInTheDocument()
  })

  test('should have correct input types', () => {
    renderRegisterView()

    const { nameInput, emailInput, handleInput, passwordInput, confirmPasswordInput } = getFormElements()

    expect(nameInput).toHaveAttribute('type', 'text')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(handleInput).toHaveAttribute('type', 'text')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')
  })

  test('should have correct placeholders', () => {
    renderRegisterView()

    const { nameInput, emailInput, handleInput, passwordInput, confirmPasswordInput } = getFormElements()

    expect(nameInput).toHaveAttribute('placeholder', 'Enter your name')
    expect(emailInput).toHaveAttribute('placeholder', 'Enter your email address')
    expect(handleInput).toHaveAttribute('placeholder', 'Enter your handle')
    expect(passwordInput).toHaveAttribute('placeholder', 'Enter your password')
    expect(confirmPasswordInput).toHaveAttribute('placeholder', 'Enter your password')
  })

  test('should have link to login page', () => {
    renderRegisterView()

    const signInLink = screen.getByRole('link', { name: /sign in/i })

    expect(signInLink).toBeInTheDocument()
    expect(signInLink).toHaveAttribute('href', '/auth/login')
  })
})
