
type ErrorMessageProps = {
    children: React.ReactNode;
}

const ErrorMessage = ({children}: ErrorMessageProps) => {
  return (
    <div className="mt-1 text-sm text-red-600">{children}</div>
  )
}

export default ErrorMessage