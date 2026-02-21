import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../components/FormInput';
import { useForm } from 'react-hook-form'
import SubmitBtn from '../components/SubmitBtn';
import type { RegisterForm } from '../types';
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import api from '../config/axios';
import BackgroundAnimation from '../components/BackgroundAnimation';

const Register = () => {
    const navigate = useNavigate()
    const initialValues: RegisterForm = {
        name: '',
        email: '',
        handle: '',
        password: '',
        password_confirmation: '',
    }

    const { register, watch, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ defaultValues: initialValues });

    const password = watch('password')

    const handleRegister = async (formData: RegisterForm) => {
        try {
            const { data } = await api.post('/api/auth/register', formData)
            toast.success(data.msg)
            navigate('/auth/login')
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

            <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <form
                    className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col gap-6"
                    onSubmit={handleSubmit(handleRegister)}
                >
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Create your account
                        </h1>
                        <p className="text-sm text-gray-500">
                            Welcome! Please fill in the details to get started.
                        </p>
                    </div>

                    {/* Inputs */}
                    <div className="flex flex-col gap-4">
                        <FormInput
                            type='text'
                            label="name"
                            placeholder="Enter your name"
                            errors={errors}
                            {...register('name', {
                                required: 'Name is required'
                            })}
                        />

                        <FormInput
                            type="email"
                            label="Email address"
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

                        <FormInput
                            type="text"
                            label="Handle"
                            placeholder="Enter your handle"
                            errors={errors}
                            {...register('handle', {
                                required: 'Handle is required'
                            })}
                        />

                        <FormInput
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            errors={errors}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'The password must be at least 8 characters long'
                                }
                            })}
                        />

                        <FormInput
                            type="password"
                            label="Repeat Password"
                            placeholder="Enter your password"
                            errors={errors}
                            {...register('password_confirmation', {
                                required: 'Confirmation Password is required',
                                validate: (value) => value === password || 'The passwords are not the same'
                            })}
                        />
                    </div>

                    {/* Button */}
                    <SubmitBtn
                        isSubmitting={isSubmitting}
                        className="w-full mt-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white py-2.5 text-sm font-medium shadow-md hover:opacity-90 transition flex items-center justify-center gap-2"
                    >
                        Continue
                        <span className="text-xs">▶</span>
                    </SubmitBtn>

                    {/* Footer link */}
                    <div className="pt-4 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link
                                to="/auth/login"
                                className="text-gray-900 font-medium hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;
