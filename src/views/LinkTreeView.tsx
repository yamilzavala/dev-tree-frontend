import {useState, useEffect} from 'react'
import { social } from '../data/social'
import DevTreeInput from '../components/DevTreeInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateLinks } from '../api/DevTree'
import { toast } from 'sonner'
import type { SocialNetwork, User } from '../types'

const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social)
  const queryClient = useQueryClient()
  const user: User = queryClient.getQueryData(['user'])!

  const updateLinksMutation = useMutation({
    mutationFn: updateLinks,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data?.msg)
      queryClient.invalidateQueries({queryKey: ['user']})
    }
  })

  const handleSaveLinks = () => {
    updateLinksMutation.mutate(JSON.stringify(devTreeLinks))
  }

  useEffect(() => {
    const userLinks = JSON.parse(user.links);
    const updatedLink = devTreeLinks.map(item => {
      const userLink = userLinks.find((link: SocialNetwork) => link.name === item.name)
      if(userLink) {
        return {
          ...item,
          url: userLink.url,
          enabled: userLink.enabled
        }
      }
      return item
    })
    setDevTreeLinks(updatedLink)
  }, [])

  return (
    <div className="w-full py-4 sm:py-7 border rounded-lg shadow-xl overflow-hidden">
      {devTreeLinks.map(item => (
        <DevTreeInput key={item.name} item={item} setItem={setDevTreeLinks} items={devTreeLinks}/>
      ))}

      {/* button */}
       <button 
       type="button"
       className="w-[90%] max-w-md my-4 sm:my-5 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white py-2.5 text-sm font-medium shadow-md hover:opacity-90 transition flex items-center justify-center content-center mx-auto gap-2"
       onClick={() => handleSaveLinks()}
       >
          Save Changes
          <span className="text-xs">▶</span>
      </button>
    </div>
  )
}

export default LinkTreeView