import apiService from "./api";

const usuarioService = {

    listar: () => {
        return apiService.get("/usuario")
    },

    guardar: (datos) => {
        return apiService.post("/usuario", datos)
    },

    mostrar: (id) => {
        return apiService.get(`/usuario/${id}`)
    },

    modificar: (id, datos) => {
        return apiService.put(`/usuario/${id}`, datos)
    },

    eliminar: (id) => {
        return apiService.delete(`/usuario/${id}`)
    },
    buscar: (q) => {
        return apiService.get(`/usuario/buscar-usuario?q=${q}`)
    },

}

export default usuarioService;