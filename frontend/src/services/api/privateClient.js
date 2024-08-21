import axios from 'axios'
import { BASE_URL } from './constant'

const instance = axios.create({
    baseURL: BASE_URL,
})

instance.interceptors.request.use((request) => {
    const authToken = localStorage.getItem('token')
    request.headers['Content-Type'] = "application/json"
    request.headers.Authorization = `Bearer ${authToken}`
    return request
})

instance.interceptors.response.use((response) => {
    return response.data
}, (err) => {
    if (err.response.status === 401) {
        // window.location.pathname = `/register`
    }
    throw err
})

export default instance