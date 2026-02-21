import { Link } from "react-router-dom"


const NotFoundView = () => {
  return (

        <main className='relative z-10 text-base-300 grid min-h-[90vh] place-items-center px-8 '>
                <div className='text-center'>
                    <p className='text-9xl font-semibold text-pink-400'>404</p>
                    <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>
                        Page not found
                    </h1>
                    <p className='mt-6 text-lg leading-7 '>
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className='mt-10'>
                        <button className='btn btn-secondary text-pink-400 flex items-center p-5 bg-blackmy-5 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 py-2.5 text-sm font-medium shadow-md hover:opacity-90 transition flex items-center justify-center content-center mx-auto gap-2'>
                            <Link to='/' >
                                Go back home
                            </Link>
                        </button>
                    </div>
                </div>           
            </main>

  )
}

export default NotFoundView