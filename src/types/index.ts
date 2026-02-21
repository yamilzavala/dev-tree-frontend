import type { IconType } from 'react-icons';

export type User = {
    handle: string
    name: string
    email: string
    _id: string
    description: string
    image: string
    links: string
}

export type RegisterForm = Pick<User, 'name' | 'email' | 'handle'> & {
    password: string
    password_confirmation: string
}

export type LoginForm = Pick<User, 'email'> & {
    password: string
}

export type ProfileForm = Pick<User, 'handle' | 'description'>

export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled: boolean
    icon: IconType
}

export type DevTreeLink = Pick<SocialNetwork, 'enabled' | 'name' | 'url' | 'icon'>

export type UserHandle = Pick<User, 'description' | 'name' | 'handle' | 'links' | 'image'>