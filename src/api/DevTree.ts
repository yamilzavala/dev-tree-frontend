import { isAxiosError } from "axios"
import api from "../config/axios"
import type { ProfileForm, User, UserHandle } from "../types"

export async function getUser() {
    try {
        const { data } = await api<User>('/api/user')
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
export async function updateProfile(formData: ProfileForm) {
    try {
        const { data } = await api.patch<{ msg: string }>('/api/user', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
}

export async function updateImage(file: File) {
    let formData = new FormData()
    formData.append('file', file)
    try {
        const { data } = await api.post<{ msg: string, image: string }>('/api/user/image', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
}

export async function updateLinks(links: string) {
    try {
        const { data } = await api.patch<{ msg: string }>('/api/user/links', { links })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
}

export async function getUserByHandle(handle: string) {
    try {
        const { data } = await api<{user: UserHandle}>(`/api/${handle}`)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
}

