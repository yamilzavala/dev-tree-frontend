import axios from "axios";
import { getTokenFromLocalStorage } from "../utils";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
    const token = getTokenFromLocalStorage();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api;