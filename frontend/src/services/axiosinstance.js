import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
    // baseURL: 'https://mys-jodhpur.onrender.com',
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