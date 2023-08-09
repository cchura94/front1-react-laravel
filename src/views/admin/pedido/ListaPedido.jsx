import { useEffect, useState } from "react";
import pedidoService from "../../../services/pedidoService";
import Modal from "../../../components/Modal";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const ListaPedido = () => {
  const [pedidos, setPedidos] = useState([])
  const [pedido, setPedido] = useState({})

  const [modalOpenProductos, setModalOpenProductos] = useState(false);


  useEffect(() => {
    listaPedido()
  }, [])

  const resetDataProductos = () => {
    setModalOpenProductos(false)
  }
  const abrirModalProductos = (ped) => {
    setPedido(ped)
    setModalOpenProductos(true)
  }
  const listaPedido = async () => {
    const { data } = await pedidoService.listar(1, 5);
    setPedidos(data.data)
  }

  const calcularTotal = (ped) => {
    return ped.productos.reduce(
      (total, producto) => total + producto.precio * producto.pivot.cantidad,
      0
    );
  };

  const generarReportePDF = (pedido) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Recibo de Pedido', 105, 15, 'center');
    doc.setFontSize(12);
    doc.text(`# ${pedido.id}`, 10, 30);
    doc.text(`Fecha: ${pedido.fecha}`, 10, 40);
    doc.text(`Cliente: ${pedido.cliente.nombre_completo}`, 10, 50);
    doc.text(`Dirección: ${pedido.cliente.direccion}`, 10, 60);
    doc.text(`Teléfono: ${pedido.cliente.telefono}`, 10, 70);

    const columns = ['#', 'Producto', 'Precio Unitario', 'Cantidad', 'Total'];
    const rows = pedido.productos.map((producto, index) => [
      index + 1,
      producto.nombre,
      `$ ${producto.precio}`,
      producto.pivot.cantidad,
      `$ ${(producto.precio * producto.pivot.cantidad).toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 90,
      theme: 'striped',
      styles: {
        fontSize: 10,
        cellPadding: 5,
        halign: 'center',
        valign: 'middle',
        minCellWidth: 30,
      },
    });

    const totalY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total: $ ${calcularTotal(pedido).toFixed(2)}`, 10, totalY);

    doc.setFontSize(8);
    doc.text(
      'Gracias por su compra. ¡Vuelva pronto!',
      105,
      totalY + 10,
      'center'
    );

    doc.save(`Recibo_Pedido_${pedido.id}.pdf`);
  };

  return (
    <>
      <h1>Lista Pedido</h1>

      {/* JSON.stringify(pedidos)*/}

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
              <td className="border px-4 py-2">{ped.estado == 2 ? 'COMPLETADO' : 'PENDIENTE'} </td>
              <td className="border px-4 py-2">

                <button className="bg-blue-300 hover:bg-blue-400 text-gray-800 rounded px-2 py-1 mt-2 mr-2" onClick={() => generarReportePDF(ped)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                  </svg>

                </button>

                <button className="bg-orange-300 hover:bg-orange-400 text-gray-800 rounded px-2 py-1 mt-2 mr-2" onClick={() => abrirModalProductos(ped)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                  </svg>

                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal modalOpen={modalOpenProductos} setModalOpen={resetDataProductos}>
        {pedido.id && 
        
        <div className="bg-white p-6 shadow-md rounded-lg">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold">Recibo de Pedido</h1>
            <p className="text-gray-600">#{pedido.id}</p>
          </div>
          <div className="mb-4">
            <p>
              <span className="font-semibold">Fecha:</span> {pedido.fecha}
            </p>
            <p>
              <span className="font-semibold">Cliente:</span>{' '}
              {pedido.cliente?.nombre_completo}
            </p>
            <p>
              <span className="font-semibold">Dirección:</span>{' '}
              {pedido.cliente?.direccion}
            </p>
            <p>
              <span className="font-semibold">Teléfono:</span>{' '}
              {pedido.cliente?.telefono}
            </p>
          </div>
          <table className="w-full mb-4 border-collapse">
            <thead>
              <tr>
                <th className="py-2 text-left">#</th>
                <th className="py-2 text-left">Producto</th>
                <th className="py-2 text-left">Precio Unitario</th>
                <th className="py-2 text-left">Cantidad</th>
                <th className="py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {pedido.productos.map((producto, index) => (
                <tr key={producto.id}>
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{producto.nombre}</td>
                  <td className="py-2">{producto.precio}</td>
                  <td className="py-2">{producto.pivot.cantidad}</td>
                  <td className="py-2">
                    {(producto.precio * producto.pivot.cantidad).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right">
            <p className="font-semibold">Total: {calcularTotal(pedido).toFixed(2)}</p>
          </div>
        </div>
        }
      </Modal>


    </>
  )


}

export default ListaPedido;