import axios from 'axios';


let accessToken: string | null = null

export const setAccessToken = (token: string | null) => {
    accessToken = token
}

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },    
})

apiClient.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

apiClient.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true

            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, {
                    withCredentials: true
                })

                accessToken = response.data.access_token

                originalRequest.headers.Authorization = `Bearer ${accessToken}`

                return apiClient(originalRequest)
            } catch(refreshError) {
                accessToken = null
                
                const currentPath = window.location.pathname;
                if (currentPath !== '/login' && currentPath !== '/register') {
                    window.location.href = '/login';
                }

                return Promise.reject(refreshError)
            }
        } 

        return Promise.reject(error)
    } 
)