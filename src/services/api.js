import axios from "axios"

// const url = "http://127.0.0.1:8000/api";
const url = "http://54.165.232.7/backend_laravel-react/public/api";
const api = axios.create({
    baseURL: url,
    timeout: 30000
})

// interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if(token){
            config.headers["Authorization"] = "Bearer "+token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)
// captura de errores 401, 403
api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        // 401 o 403
        if(error.response.status === 401){
            window.location.href = "/login"
        }

        return Promise.reject(error)
    }
)

const apiService = {
    get: (url, params) => api.get(url, {params}),
    post: (url, data) => api.post(url, data),
    put: (url, data) => api.put(url, data),
    delete: (url) => api.delete(url),
}

export default apiService