import apiService from "./api";

const clienteService = {

    listar: () => {
        return apiService.get("/cliente")
    },

    guardar: (datos) => {
        return apiService.post("/cliente", datos)
    },

    mostrar: (id) => {
        return apiService.get(`/cliente/${id}`)
    },

    modificar: (id, datos) => {
        return apiService.put(`/cliente/${id}`, datos)
    },

    eliminar: (id) => {
        return apiService.delete(`/cliente/${id}`)
    },
    buscar: (q) => {
        return apiService.get(`/cliente/buscar-cliente?q=${q}`)
    },

}

export default clienteService;