import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance = axios.create({
    baseURL: baseURL
})

axiosInstance.interceptors.request.use(function (config){
    const accessToken = localStorage.getItem('accessToken')
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
}, function (error){
    return Promise.reject(error)
})

axiosInstance.interceptors.response.use(
    function(response){
        return response
    },
   async function(error){
        const originalRequest = error.config
        if(error.response.status === 401 && !originalRequest.retry){
            originalRequest.retry = true
            const refeshToken = localStorage.getItem('refreshToken')
            try{
                const response = await axiosInstance.post('token/refresh/', {refresh: refeshToken})
                // console.log('NewAccessToken', response.data.access)
                localStorage.setItem('accessToken',response.data.access)
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
                return axiosInstance(originalRequest)
            }
            catch(error){
               localStorage.removeItem('accessToken')
               localStorage.removeItem('refreshToken')
               return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance