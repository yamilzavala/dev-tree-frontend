import type { SocialNetwork, User } from '../types'
import Navbar from './Navbar'
import { Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DevTreeLink from './DevTreeLink'
import BackgroundAnimation from './BackgroundAnimation'

const DevTree = ({ data }: { data: User, isLoading: boolean }) => {
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))

    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    }, [data])

    return (
        <>
            {/* Video Background */}
            <BackgroundAnimation opacity={45} />
            {/* <div className="fixed inset-0 w-full h-full overflow-hidden z-0 opacity-45">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute min-w-full min-h-full w-auto h-auto object-cover"
                >
                    <source src="/video_animated_1.mp4" type="video/mp4" />
                    Sorry, your browser does not support embedded videos
                </video>
                <div className="absolute inset-0 bg-base-300/20"></div>
            </div> */}

            <div className="relative z-10">
                <Navbar />
                {
                    <section className='align-element py-5 h-full'>
                        <div className="flex flex-col md:flex-row gap-5 mt-10 ">
                            <div className="flex-1">
                                <Outlet />
                            </div>

                            <div className="w-full md:w-1/2 py-10 space-y-6 border rounded-lg shadow-xl bg-base-100/95 backdrop-blur-sm">
                                {/* Header */}
                                <div className="text-center space-y-1 w-full">
                                    <Link className="text-2xl font-semibold text-base-content"
                                        to={`/${data.handle}`}
                                        target="_blank"
                                        rel="noreferrer noopener">
                                        Visit My Profile: <span className='text-pink-400 text-md'>/{data.handle}</span>
                                    </Link>
                                    <p className="text-sm text-base-content/70">
                                        Welcome back! Check out my social media links
                                    </p>
                                </div>

                                {/* Content */}
                                <div className='text-center space-y-3'>
                                    <h2 className="text-2xl font-bold text-base-content">
                                        {data.handle}
                                    </h2>

                                    {data.image && (
                                        <img src={data.image} alt='profile image' className='mx-auto max-w-[300px] max-h-[300px] w-full object-cover rounded-lg' />)}

                                    <p className='m-auto max-w-[300px] text-sm pt-4 text-muted-foreground font-light leading-loose items-center'>{data.description}</p>

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
            </div>
        </>
    )
}

export default DevTree