import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import SubmitBtn from '../components/SubmitBtn';
import { useForm } from 'react-hook-form'
import type { LoginForm } from '../types';
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import api from '../config/axios';
import BackgroundAnimation from '../components/BackgroundAnimation';

const LoginView = () => {
  const navigate = useNavigate()

  const initialValues: LoginForm = {
    email: '',
    password: '',
  }

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data: { msg, token } } = await api.post('/api/auth/login', formData)
      localStorage.setItem('AUTH_TOKEN', token)
      toast.success(msg)
      navigate('/')
      reset()
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.msg)
      }
    }
  }

  return (
    <>
      {/* Video Background */}
      <BackgroundAnimation />

      <section className="relative z-10 min-h-screen  flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col gap-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              Sign in to My Application
            </h1>
            <p className="text-sm text-gray-500">
              Welcome back! Please sign in to continue
            </p>
          </div>

          {/* Input */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <FormInput
                type="email"
                placeholder="Enter your email address"
                errors={errors}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Not valid E-mail",
                  },
                })}
              />
            </div>
          </div>

          {/* Input */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <FormInput
                type="password"
                placeholder="Enter your password"
                errors={errors}
                {...register('password', {
                  required: 'Password is required'
                })}
              />
            </div>
          </div>

          {/* Button */}
          <SubmitBtn
            isSubmitting={isSubmitting}
            className="w-full mt-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white py-2.5 text-sm font-medium shadow-md hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            Continue
            <span className="text-xs">▶</span>
          </SubmitBtn>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200 text-center space-y-3">
            <p className="text-sm text-gray-500">
              Don’t have an account?{' '}
              <Link
                to="/auth/register"
                className="text-gray-900 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default LoginView;
