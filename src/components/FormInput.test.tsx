import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormInput } from './FormInput'
import type { FieldErrors } from 'react-hook-form'

describe('FormInput', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  const getFormElements = () => {
    return {
      labelElement: screen.getByText(/test label/i),
      inputElement: screen.getByRole('textbox'),
      inputElementByName: screen.getByDisplayValue(''),
    }
  }

  test('should render input with label', () => {
    const mockErrors: FieldErrors = {}
    
    render(
      <FormInput
        type="text"
        name="testInput"
        label="Test Label"
        placeholder="Test placeholder"
        errors={mockErrors}
      />
    )

    const { labelElement, inputElement } = getFormElements()

    expect(labelElement).toBeInTheDocument()
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('placeholder', 'Test placeholder')
    expect(inputElement).toHaveAttribute('name', 'testInput')
    expect(inputElement).toHaveAttribute('type', 'text')
  })

  test('should allow typing in input', async () => {
    const mockErrors: FieldErrors = {}
    
    render(
      <FormInput
        type="text"
        name="testInput"
        label="Test Label"
        errors={mockErrors}
      />
    )

    const { inputElement } = getFormElements()

    expect(inputElement).toHaveValue('')

    await user.type(inputElement, 'test value')

    expect(inputElement).toHaveValue('test value')
  })

  test('should display error message when error exists', () => {
    const mockErrors: FieldErrors = {
      testInput: {
        message: 'Test error message',
        type: 'required'
      }
    }
    
    render(
      <FormInput
        type="text"
        name="testInput"
        label="Test Label"
        errors={mockErrors}
      />
    )

    const errorMessage = screen.getByText('Test error message')
    expect(errorMessage).toBeInTheDocument()
  })

  test('should not display error message when no error exists', () => {
    const mockErrors: FieldErrors = {}
    
    render(
      <FormInput
        type="text"
        name="testInput"
        label="Test Label"
        errors={mockErrors}
      />
    )

    const errorMessage = screen.queryByText(/test error message/i)
    expect(errorMessage).not.toBeInTheDocument()
  })

  test('should apply custom className', () => {
    const mockErrors: FieldErrors = {}
    
    render(
      <FormInput
        type="text"
        name="testInput"
        label="Test Label"
        errors={mockErrors}
        className="custom-class"
      />
    )

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveClass('custom-class')
  })

  test('should render with default value', () => {
    const mockErrors: FieldErrors = {}
    
    render(
      <FormInput
        type="text"
        name="testInput"
        label="Test Label"
        defaultValue="default value"
        errors={mockErrors}
      />
    )

    const inputElement = screen.getByDisplayValue('default value')
    expect(inputElement).toBeInTheDocument()
  })

  test('should render password input type', () => {
    const mockErrors: FieldErrors = {}
    
    render(
      <FormInput
        type="password"
        name="password"
        label="Password"
        placeholder="Enter your password"
        errors={mockErrors}
      />
    )

    const inputElement = screen.getByPlaceholderText('Enter your password')
    expect(inputElement).toHaveAttribute('type', 'password')
  })

  test('should render email input type', () => {
    const mockErrors: FieldErrors = {}
    
    render(
      <FormInput
        type="email"
        name="email"
        label="Email address"
        placeholder="Enter your email address"
        errors={mockErrors}
      />
    )

    const inputElement = screen.getByPlaceholderText('Enter your email address')
    expect(inputElement).toHaveAttribute('type', 'email')
  })
})
