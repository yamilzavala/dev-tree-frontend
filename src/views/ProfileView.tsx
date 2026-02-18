import { Form, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import SubmitBtn from '../components/SubmitBtn';
import { useForm } from 'react-hook-form'
import type { ProfileForm, User } from '../types';
import ErrorMessage from '../components/ErrorMessage';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateProfile } from '../api/DevTree';
import { toast } from 'sonner'

const ProfileView = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const data: User = queryClient.getQueryData(['user'])!

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ProfileForm>({ defaultValues: {
    handle: data.handle,
    description: data.description
  } });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      console.log(error)
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data?.msg)
      queryClient.invalidateQueries({queryKey: ['user']})
    }
  })

  const handleuserProfileForm = (formData: ProfileForm) => {
    updateProfileMutation.mutate(formData)
  }

  return (
    <section className="flex items-center justify-center rounded-lg">
      <Form
        onSubmit={handleSubmit(handleuserProfileForm)}
        className="w-auto rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col gap-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-base-content">
            Edit information
          </h1>
          <p className="text-sm text-base-content/70">
            Complete the profile details!
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              Handle
            </label>
            <FormInput
              type="text"
              placeholder="Handle or user name"
              errors={errors}
              {...register('handle', {
                required: 'handle is required'
              })}
            />
          </div>
        </div>

        {/* Text area */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Your description"
              {...register('description', {
                required: 'description is required'
              })}
              className='bg-base text-base-content w-full rounded-lg border-[1px] border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition'
            />
            {errors.description && (
              <ErrorMessage>
                <span className='capitalize'>{errors.description?.message as string}</span>
              </ErrorMessage>
            )}
          </div>
        </div>

        {/* File */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              Image
            </label>
            <FormInput
              type="file"
              placeholder="Select file"
              errors={errors}
              {...register('image')}
            />
          </div>
        </div>

        {/* Button */}
        <SubmitBtn
          isSubmitting={isSubmitting}
          className="w-full mt-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white py-2.5 text-sm font-medium shadow-md hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          Save changes
          <span className="text-xs">▶</span>
        </SubmitBtn>
      </Form>
    </section>
  );
};

export default ProfileView;
