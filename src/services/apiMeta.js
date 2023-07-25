import axios from "axios"

const url = "https://graph.facebook.com/v17.0/106430075725576"

const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    },  
    timeout: 30000
})

// interceptor
api.interceptors.request.use(
    (config) => {
        const token = "EAADemvoRiI4BAOi5XZCfKgogjsG8EVaBoHfGX2XPmY15ZAoNdKWfxUKn2wmSacU7ddqtkINiiHKZCXeqdTQe3JFfEUjH8bwZBylp49neXdFDDSnkFA9Es131vgN08hCzBJ2C9qpjLZBiiSCKZAsojrYmfy8yyA770NSIZCfmujju8v4ZBdckA7PjFdW9EXJlm9QoNZA0nHSYsDwZDZD";
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

const apiServiceMeta = {
    get: (url, params) => api.get(url, {params}),
    post: (url, data) => api.post(url, data),
    put: (url, data) => api.put(url, data),
    delete: (url) => api.delete(url),
}

export default apiServiceMeta