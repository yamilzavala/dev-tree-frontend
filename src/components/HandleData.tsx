import type { SocialNetwork, UserHandle } from '../types'
import DevTreeLink from './DevTreeLink'
import HandleDataHeader from './HandleDataHeader'

type HandleDataProps = {
    data: {
        user: UserHandle
    }
}

const avatarImg = '/bg-media-9.png'

const HandleData = ({ data }: HandleDataProps) => {
    const enabledLinks: SocialNetwork[] = JSON.parse(data.user.links).filter((item: SocialNetwork) => item.enabled)
    const { user } = data;
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <section className="relative z-10 align-element h-full max-w-[500px]">
                <div className="w-full  flex flex-col rounded-lg border shadow-xl backdrop-blur-sm text-base-300">
                    {/* Card Header with Background Image */}
                    <HandleDataHeader image={user.image || avatarImg} handle={user.handle} description='Social Media Links' />

                    {/* Card Content */}
                    <div className='bg-white rounded-b-md h-1/2 px-6 pt-8 pb-8 space-y-6 text-center flex flex-col justify-start'>
                        <p className='text-sm text-slate-600 max-w-[400px] m-auto text-muted-foreground font-light leading-loose'>{user.description}</p>

                        {!user.links.length && (<p className='text-sm pt-4 text-muted-foreground font-light leading-loose'>There are not links in this profile.</p>)}
                        {user.links && (
                            <div className='flex justify-center gap-2 flex-wrap max-w-[400px] items-center m-auto'>
                                {enabledLinks.map(link => {
                                    return (
                                        <DevTreeLink link={link} key={link.name} color='text-white' bgColor='bg-black' />
                                    )
                                })}
                            </div>)}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HandleData