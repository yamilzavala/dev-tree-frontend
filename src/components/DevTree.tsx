import type { SocialNetwork, User } from '../types'
import Navbar from './Navbar'
import { Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DevTreeLink from './DevTreeLink'

const DevTree = ({ data }: { data: User, isLoading: boolean }) => {
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))

    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    }, [data])

    return (
        <>
            <Navbar />
            {
                <section className='align-element py-5 h-full'>
                    <div className="flex flex-col md:flex-row gap-5 mt-10 ">
                        <div className="flex-1">
                            <Outlet />
                        </div>

                        <div className="w-full md:w-1/2 px-5 py-10 space-y-6 border rounded-lg shadow-xl">
                            {/* Header */}
                            <div className="text-center space-y-2">
                                <Link className="text-2xl font-semibold text-base-content"
                                    to={''}
                                    target="_blank"
                                    rel="noreferrer noopener">
                                    Visit My Profile: <span className='text-primary text-md'>/{data.handle}</span>
                                </Link>
                                <p className="text-sm text-base-content/70">
                                    Welcome back! Check out my social media links
                                </p>
                            </div>

                            {/* Content */}
                            <div className='text-center space-y-2'>
                                <p className='text-sm text-muted-foreground font-light leading-loose pb-2'>{data.handle}</p>

                                {data.image && (
                                    <img src={data.image} alt='profile image' className='mx-auto max-w-[300px] max-h-[300px] w-full object-cover rounded-lg' />)}

                                <p className='text-sm pt-4 text-muted-foreground font-light leading-loose items-center w-auto'>{data.description}</p>

                                {enabledLinks && (
                                    <div className='flex justify-center gap-2 flex-wrap'>
                                        {enabledLinks.map(link => {
                                            return (
                                                <DevTreeLink link={link} key={link.name} />
                                            )
                                        })}
                                    </div>)}
                            </div>

                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default DevTree