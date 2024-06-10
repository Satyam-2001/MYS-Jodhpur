import axios from 'axios'
import { BASE_URL } from './constant'

const instance = axios.create({
    baseURL: BASE_URL,
})

instance.interceptors.request.use((request) => {
    const authToken = localStorage.getItem('token')
    request.headers.Authorization = authToken ? `Bearer ${authToken}` : ``
    return request
})

instance.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    if (error?.response.status === 401) {
        window.location.pathname = `/register`
    }
    throw error
})

export default instance