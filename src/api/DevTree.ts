import { isAxiosError } from "axios"
import api from "../config/axios"
import type { ProfileForm, User } from "../types"

export async function getUser() {
    try {
        const { data } = await api<User>('/api/user')
        console.log(data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
           throw new Error(error.response.data.error)
        }
    }
} 
export async function updateProfile(formData: ProfileForm) {
    try {
        const { data } = await api.patch<{msg: string}>('/api/user', formData)
        console.log(data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
           throw new Error(error.response.data.msg)
        }
    }
} 