import apiService from "./api";

const productoService = {

    listar: () => {
        return apiService.get("/producto")
    },

    guardar: (datos) => {
        return apiService.post("/producto", datos)
    },

    mostrar: (id) => {
        return apiService.get(`/producto/${id}`)
    },

    modificar: (id, datos) => {
        return apiService.put(`/producto/${id}`, datos)
    },

    eliminar: (id) => {
        return apiService.delete(`/producto/${id}`)
    },

}

export default productoService;