import { useMutation } from '@tanstack/react-query'
import ErrorMessage from '../components/ErrorMessage'
import { useForm } from 'react-hook-form'
import slugify from 'react-slugify'
import { searchByHandle } from '../api/DevTree'
import { Link } from 'react-router-dom'

const SearchForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            handle: ''
        }
    })

    const mutation = useMutation({
        mutationFn: searchByHandle
    })

    const handle = watch('handle')

    const handleSearch = () => {
        const slug = slugify(handle)
        mutation.mutate(slug)
    }

    return (
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-5">
            <div className="relative flex items-center  bg-white  px-2 rounded-md">
                <label
                    htmlFor="handle"
                    className='text-gray-600'
                >devtree.com/</label>
                <input
                    type="text"
                    id="handle"
                    className="border-none bg-transparent p-2 focus:ring-0 focus:outline-none flex-1 text-pink-400"
                    placeholder="elonmusk, zuck, jeffbezos"
                    {...register("handle", {
                        required: "User name is required",
                    })}
                />

            </div>
            {errors.handle && (
                <ErrorMessage>{errors.handle.message}</ErrorMessage>
            )}

            <div className="mt-10">
                {mutation.isPending && <p className='text-center text-base-content'>Loading...</p>}
                {mutation.error && (<ErrorMessage>
                    <span className='capitalize text-lg'>{mutation.error.message}</span>
                </ErrorMessage>)}
                {mutation.data && <p className='text-base-content italic'>
                    {mutation.data}, go to <Link to={'/auth/register'} state={{handle: slugify(handle)}}><span className='text-pink-400'>Register</span></Link>
                </p>}
            </div>

            <input
                type="submit"
                className="bg-pink-400 p-3 text-lg w-full uppercase text-base-content rounded-lg font-bold cursor-pointer"
                value='Get my DevTree'
            />
        </form>
    )
}

export default SearchForm