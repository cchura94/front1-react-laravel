import apiService from "./api";

const categoriaService = {

    listarCategorias: () => {
        return apiService.get("/categoria")
    },

    guardarCategorias: (datos) => {
        return apiService.post("/categoria", datos)
    },

    mostrarCategoria: (id) => {
        return apiService.get(`/categoria/${id}`)
    },

    modificarCategoria: (id, datos) => {
        return apiService.put(`/categoria/${id}`, datos)
    },

    eliminarCategoria: (id) => {
        return apiService.delete(`/categoria/${id}`)
    },

}

export default categoriaService;