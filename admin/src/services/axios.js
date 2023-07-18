import axios from "axios";
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'Content-Type',
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.response.use(
    response => response,
    (error) => {        
        if (error.response) {
            const apiError = error.response.data
            return Promise.reject(apiError)
        }
        return Promise.reject(error)
    }
)

export default axiosInstance;