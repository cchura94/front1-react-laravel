import apiService from "./api";

const authService = {

    loginConLaravel: (datos) => {
        return apiService.post("/v1/auth/login", datos)
    },
    perfilConLaravel: () => {
        return apiService.get("/v1/auth/perfil")
    },
    registroConLaravel: (datos) => {
        return apiService.post("/v1/auth/registro", datos)
    },
    salirConLaravel: () => {
        return apiService.post("/v1/auth/salir")
    },
    
}

export default authService;