import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import LoginView from './LoginView'

// Mock the BackgroundAnimation component
vi.mock('../components/BackgroundAnimation', () => ({
  default: () => <div data-testid="background-animation">Background</div>
}))

// Mock the api module
vi.mock('../config/axios', () => ({
  default: {
    post: vi.fn().mockResolvedValue({ data: { msg: 'Success', token: 'test-token' } })
  }
}))

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

describe('LoginView', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    vi.clearAllMocks()
  })

  const getFormElements = () => {
    return {
      emailInput: screen.getByPlaceholderText('Enter your email address'),
      passwordInput: screen.getByPlaceholderText('Enter your password'),
      submitButton: screen.getByRole('button', { name: /continue/i })
    }
  }

  const renderLoginView = () => {
    return render(
      <MemoryRouter>
        <LoginView />
      </MemoryRouter>
    )
  }

  test('should render login form with all elements', () => {
    renderLoginView()

    const { emailInput, passwordInput, submitButton } = getFormElements()

    expect(screen.getByText('Sign in to My Application')).toBeInTheDocument()
    expect(screen.getByText('Welcome back! Please sign in to continue')).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    const signUpLink = screen.getByRole('link', { name: /sign up/i })
    expect(signUpLink).toBeInTheDocument()
    expect(signUpLink.parentElement?.textContent).toMatch(/have an account/)
  })

  test('inputs should be initially empty', () => {
    renderLoginView()

    const { emailInput, passwordInput } = getFormElements()

    expect(emailInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')
  })

  test('should allow typing in email input', async () => {
    renderLoginView()

    const { emailInput } = getFormElements()

    await user.type(emailInput, 'test@example.com')

    expect(emailInput).toHaveValue('test@example.com')
  })

  test('should allow typing in password input', async () => {
    renderLoginView()

    const { passwordInput } = getFormElements()

    await user.type(passwordInput, 'password123')

    expect(passwordInput).toHaveValue('password123')
  })

  test('should show validation error for required email field', async () => {
    renderLoginView()

    const { emailInput, submitButton } = getFormElements()

    // Type something and then clear it to trigger validation
    await user.type(emailInput, 'test@example.com')
    await user.clear(emailInput)
    await user.click(submitButton)

    expect(await screen.findByText('Email is required')).toBeInTheDocument()
  })


  test('should show validation error for required password field', async () => {
    renderLoginView()

    const { passwordInput, submitButton } = getFormElements()

    // Type something and then clear it to trigger validation
    await user.type(passwordInput, 'test')
    await user.clear(passwordInput)
    await user.click(submitButton)

    expect(await screen.findByText('Password is required')).toBeInTheDocument()
  })

  test('should not show validation errors for valid inputs', async () => {
    renderLoginView()

    const { emailInput, passwordInput, submitButton } = getFormElements()

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
    expect(screen.queryByText('Not valid E-mail')).not.toBeInTheDocument()
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument()
  })

  test('should have correct input types', () => {
    renderLoginView()

    const { emailInput, passwordInput } = getFormElements()

    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('should have correct placeholders', () => {
    renderLoginView()

    const { emailInput, passwordInput } = getFormElements()

    expect(emailInput).toHaveAttribute('placeholder', 'Enter your email address')
    expect(passwordInput).toHaveAttribute('placeholder', 'Enter your password')
  })

  test('should have link to registration page', () => {
    renderLoginView()

    const signUpLink = screen.getByRole('link', { name: /sign up/i })

    expect(signUpLink).toBeInTheDocument()
    expect(signUpLink).toHaveAttribute('href', '/auth/register')
  })
})
