import apiService from "./api";

const pedidoService = {

    listar: (p, limit) => {
        return apiService.get(`/pedido?page=${p}&limit=${limit}`)
    },

    guardar: (datos) => {
        return apiService.post("/pedido", datos)
    },

    mostrar: (id) => {
        return apiService.get(`/pedido/${id}`)
    },
    listarBuscar: (q) => {
        return apiService.get(`/pedido?q=${q}`)
    },

}

export default pedidoService;