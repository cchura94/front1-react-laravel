import { useState } from "react";
import productoService from "../../services/productoService";
import { useEffect } from "react";
import Modal from "../../components/Modal";

const Producto = () => {

    const [productos, setProductos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(()=>{
      listarProductos()
    }, [])

    const listarProductos = async () => {
      const {data} = await productoService.listar()
      setProductos(data.data);
    }

    const resetData = ()=> {
      setModalOpen(false)
    }

  

    return ( <div className="container mx-auto p-8">

<button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={() => setModalOpen(true)}>Nuevo Producto</button>

    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">Producto</th>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">Precio</th>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">Stock</th>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">Categoria</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((prod) => (
          <tr key={prod.id}>
            <td className="border px-4 py-2">{prod.nombre}</td>
            <td className="border px-4 py-2">{prod.precio}</td>
            <td className="border px-4 py-2">{prod.stock}</td>
            <td className="border px-4 py-2">{prod.categoria_id}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <Modal modalOpen={modalOpen} setModalOpen={resetData}>
          <h1>Nuevo producto</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem officiis, reprehenderit doloremque esse earum, accusantium debitis minus nisi laborum porro consequuntur, rerum quisquam. Veritatis voluptatem asperiores nemo provident consequatur iste?</p>

    </Modal>
  </div>
    )
}
export default Producto