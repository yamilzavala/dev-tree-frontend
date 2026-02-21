import type { SocialNetwork, UserHandle } from '../types'
import DevTreeLink from './DevTreeLink'
import HandleDataHeader from './HandleDataHeader'


type HandleDataProps = {
    data: {
        user: UserHandle
    }
}

const HandleData = ({ data }: HandleDataProps) => {
    const enabledLinks: SocialNetwork[] = JSON.parse(data.user.links).filter((item: SocialNetwork) => item.enabled)
    const { user } = data;
    return (
        <section className="relative z-10 align-element py-10 h-full max-w-[500px]">
            <div className="w-full min-h-[600px] flex flex-col rounded-lg border shadow-xl bg-base-100/80 backdrop-blur-sm text-base-300">
                {/* Card Header with Background Image */}
                <HandleDataHeader image={user.image} handle={user.handle} description='Software engineer' />

                {/* Card Content */}
                <div className='h-1/2 px-6 pt-8 pb-8 space-y-6 text-center flex flex-col justify-start'>
                    <p className='text-sm text-slate-600 max-w-[400px] m-auto text-muted-foreground font-light leading-loose'>{user.description}</p>

                    {!user.links.length && (<p className='text-sm pt-4 text-muted-foreground font-light leading-loose'>There are not links in this profile.</p>)}
                    {user.links && (
                        <div className='flex justify-center gap-2 flex-wrap max-w-[400px] items-center m-auto'>
                            {enabledLinks.map(link => {
                                return (
                                    <DevTreeLink link={link} key={link.name} />
                                )
                            })}
                        </div>)}
                </div>
            </div>
        </section>
    )
}

export default HandleData