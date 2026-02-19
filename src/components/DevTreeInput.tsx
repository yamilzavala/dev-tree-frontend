import { Switch } from "@headlessui/react"
import type { DevTreeLink } from "../types"
import { classNames, isValidUrl } from "../utils"
import { toast } from "sonner"

type DevTreeInputProps = {
    item: DevTreeLink
    setItem :React.Dispatch<React.SetStateAction<DevTreeLink[]>>,
    items: DevTreeLink[]
}

const DevTreeInput = ({ item, setItem, items }: DevTreeInputProps) => {

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

    const handleEnabledLink = (e: boolean) => {
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
        <div className="w-full grid grid-cols-[120px_1fr] items-center border-b last:border-b-0 px-3 hover:bg-base-200">
            {/* icon and description */}
            <article
                className={`p-3 flex gap-2 items-center cursor-pointer duration-300  hover:text-primary`}
            >
                <item.icon className='w-4 h-4' />
                <p className='capitalize text-sm'>{item.name}</p>
            </article>

            <div className="grid grid-cols-[1fr_auto] items-center">
                {/* input */}
                <input
                    type="text"
                    className='text-base-content w-auto rounded-lg  bg-base-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition mr-2'
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