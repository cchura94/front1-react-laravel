import apiService from "./api";

const productoService = {

    listar: (p, limit) => {
        return apiService.get(`/producto?page=${p}&limit=${limit}`)
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
    actualizarImagen: (id, data) => {
        return apiService.post(`/producto/${id}/actualizar-imagen`, data);
    },
    listarBuscar: (q) => {
        return apiService.get(`/producto?q=${q}`)
    },

}

export default productoService;