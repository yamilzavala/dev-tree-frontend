import { Switch } from "@headlessui/react"
import type { DevTreeLink } from "../types"
import { classNames, isValidUrl } from "../utils"
import { toast } from "sonner"

type DevTreeInputProps = {
    item: DevTreeLink
    setItem :React.Dispatch<React.SetStateAction<DevTreeLink[]>>,
    items: DevTreeLink[]
    isLast: boolean
}

const DevTreeInput = ({ item, setItem, items, isLast }: DevTreeInputProps) => {

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        const newItems = items.map((currItem) => {
            if(currItem.name === name ) {
                return {...currItem, url: value}
            }
            return currItem
        }) 
        setItem(newItems)
    }

    const handleEnabledLink = () => {
        const name =item.name;
        const newItems = items.map(currItem => {
            if(currItem.name === name) {
                if(isValidUrl(currItem.url)){
                    return {...currItem, enabled: !item.enabled}
                } else {
                    toast.error('Invalid Url')
                }
            }
            return currItem}
        )
        setItem(newItems)
    }

    return (
        <div className={`w-full grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] items-center px-2 sm:px-3 py-2 md:py-0 hover:bg-base-200 ${!isLast ? 'sm:mb-0 border-b' : ''}`}>
            {/* icon and description */}
            <article
                className={`p-2 sm:p-3 flex gap-1 sm:gap-2 items-center cursor-pointer duration-300 hover:text-primary`}
            >
                <item.icon className='w-4 h-4 flex-shrink-0' />
                <p className='capitalize text-xs sm:text-sm truncate'>{item.name}</p>
            </article>

            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                {/* input */}
                <input
                    type="text"
                    className='text-base-content w-full min-w-0 rounded-lg bg-base-200 px-2 sm:px-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition'
                    placeholder={`Enter your ${item.name}`}
                    onChange={handleUrlChange}
                    name={item.name}
                    value={item.url}
                />

                {/* switch */}
                <Switch
                    checked={item.enabled}
                    onChange={handleEnabledLink}
                    className={classNames(
                        item.enabled ? 'bg-primary' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
                    )}
                >
                    <span
                        aria-hidden="true"
                        className={classNames(
                            item.enabled ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        )}
                    />
                </Switch>
            </div>
        </div>
    )
}

export default DevTreeInput