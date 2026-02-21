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
        <section className="relative z-10 align-element py-20 h-full max-w-[500px]">
            <div className="w-full px-5 py-10 space-y-6 border rounded-lg shadow-xl bg-base-100/80 backdrop-blur-sm text-base-300">
                {/* Content */}
                <div className='text-center space-y-2'>

                    <HandleDataHeader image={user.image} handle={user.handle} description='Software engineer' />

                    <p className='text-sm text-slate-600 pt-4 max-w-[400px] m-auto text-muted-foreground font-light leading-loose items-center w-auto'>{user.description}</p>

                    {!user.links.length && (<p className='text-sm pt-4 text-muted-foreground font-light leading-loose items-center w-auto'>There are not links in this profile.</p>)}
                    {user.links && (
                        <div className='flex justify-center gap-2 flex-wrap max-w-[400px] items-center m-auto flex-wrap'>
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