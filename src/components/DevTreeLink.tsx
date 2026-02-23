import type { SocialNetwork } from '../types'
import { social } from '../data/social'



const DevTreeLink = ({link, color, bgColor}: {link: SocialNetwork, color?: string, bgColor?: string}) => {
  const linkWithIcon = {
    ...link,
    icon: social.filter(item => item.name === link.name)[0].icon
    }
    return (
        <a 
        href={linkWithIcon.url} 
        className={`mt-2 p-2 rounded-lg ${bgColor ? bgColor : 'bg-base-content'} ${color ? color : 'text-base-300'} py-2.5 text-sm font-medium shadow-md hover:text-indigo-500 opacity-80 cursor-pointer transition flex items-center justify-center gap-2`}
        target='_blank'
        rel='noreferrer noopener'
        >
            <linkWithIcon.icon className='w-4 h-4' />
            <p className='capitalize text-sm'>{linkWithIcon.name}</p>
        </a>
    )
}

export default DevTreeLink