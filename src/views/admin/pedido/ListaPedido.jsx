import { useEffect, useState } from "react";
import pedidoService from "../../../services/pedidoService";

const ListaPedido = () => {
    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        listaPedido()
    }, [])

    const listaPedido = async () => {
        const {data} = await pedidoService.listar(1, 5);
        setPedidos(data.data)
    }

    return (
        <>
        <h1>Lista Pedido</h1>
        
            {/* JSON.stringify(pedidos)*/ }

            <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">ID</th>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">FECHA PEDIDO</th>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">CLIENTE</th>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">USUARIO</th>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">ESTADO</th>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">Gestión</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.map((ped) => (
          <tr key={ped.id}>
            <td className="border px-4 py-2">{ped.id}</td>
            <td className="border px-4 py-2">{ped.fecha}</td>
            <td className="border px-4 py-2">{ped.cliente.nombre_completo}</td>
            <td className="border px-4 py-2">{ped.user.email}</td>
            <td className="border px-4 py-2">{ped.estado==2?'COMPLETADO':'PENDIENTE'} </td>
            <td className="border px-4 py-2">

              <button className="bg-blue-300 hover:bg-blue-400 text-gray-800 rounded px-2 py-1 mt-2 mr-2" onClick={() => generarReportePDF(prod)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>

              </button>

              <button className="bg-orange-300 hover:bg-orange-400 text-gray-800 rounded px-2 py-1 mt-2 mr-2" onClick={() => abrirModalImagen(prod)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>

       
        </>
    )   


}

export default ListaPedido;