import type { User } from '../types'
import Navbar from './Navbar'
import { Link, Outlet } from 'react-router-dom'

const DevTree = ({data}:{data: User}) => {
  return (
      <>
            <Navbar />
            {
                <section className='align-element py-20 h-[43vh] '>
                    <div className="flex flex-col md:flex-row gap-5 mt-10">                        
                        <div className="flex-1">
                            <Outlet />
                        </div>

                        <div className="w-full md:w-96 px-5 py-10 space-y-6 border rounded-lg shadow-xl">
                            {/* Header */}
                            <div className="text-center space-y-2 ">
                                <Link className="text-2xl font-semibold text-base-content"
                                    to={''}
                                    target="_blank"
                                    rel="noreferrer noopener">
                                    Visit My Profile: <span className='text-blue-600'>/{data.handle}</span>
                                </Link>
                                <p className="text-sm text-base-content/70">
                                    Welcome back! Check out my social media links
                                </p>
                            </div>

                        </div>
                    </div>
                </section>
            }
        </>
  )
}

export default DevTree