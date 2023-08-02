import { useState } from "react";
import productoService from "../../services/productoService";
import { useEffect } from "react";
import Modal from "../../components/Modal";
import categoriaService from "../../services/categoriaService";
import { jsPDF } from "jspdf";

const Producto = () => {

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenImagen, setModalOpenImagen] = useState(false);
  const [producto, setProducto] = useState({ nombre: "", precio: 0, stock: 0, descripcion: "", categoria_id: "" })
  const [imagen, setImagen] = useState(null)

  const [total, setTotal] = useState(0)
  const [itemPerPage, setitemPerPage] = useState(5)
  const [page, setPage] = useState(1)
  const [buscar, setBuscar] = useState('')

  useEffect(() => {
    listarProductos();
    listarCategorias()
  }, [])

  const listarProductos = async (p=1, lim=5) => {
    const { data } = await productoService.listar(p, lim);
    setProductos(data.data);
    setTotal(data.total)
    setPage(p)

  }

  

  const listarCategorias = async () => {
    const { data } = await categoriaService.listarCategorias()
    setCategorias(data);
  }

  const resetData = () => {
    setModalOpen(false)
  }

  const resetDataImagen = () => {
    setModalOpenImagen(false)
  }

  const cerrarModal = () => {
    setProducto({ nombre: "", precio: 0, stock: 0, descripcion: "", categoria_id: "" })
    resetData()
  }

  const funGuardarProducto = async (e) => {
    e.preventDefault()

    if (producto.id) {
      const { data } = await productoService.modificar(producto.id, producto)
    } else {

      const { data } = await productoService.guardar(producto)

    }

    cerrarModal()
    listarProductos()

  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setProducto((prevState => ({
      ...prevState,
      [name]: value
    })))

  }

  const funBuscar = async () => {
     const {data}= await productoService.listarBuscar(buscar)
     setProductos(data.data);
    setTotal(data.total)
    setPage(p)
  }

  const abrirModalImagen = (prod) => {
    setProducto(prod)
    setModalOpenImagen(true)
  }
  const abrirModalEditar = (prod) => {
    setProducto(prod)
    setModalOpen(true)
  }

  const eliminar = async (prod) => {
    if (confirm("¿Está seguro de eliminar el Producto?")) {
      await productoService.eliminar(prod.id)
      listarProductos()
    }
  }

  const handleChangeImagen = (event) => {
    const file = event.target.files[0]
    setImagen(file)
    console.log(file)

  }

  const actualizarImagen = async () => {
    const formdata = new FormData();
    formdata.append("imagen", imagen)

    await productoService.actualizarImagen(producto.id, formdata)

    setProducto({ nombre: "", precio: 0, stock: 0, descripcion: "", categoria_id: "" })
    setModalOpenImagen(false)
    listarProductos()
  }

  const generarReportePDF = (prod) => {

    console.log(JSON.stringify(prod))

    const data = prod
    

    const doc = new jsPDF();


    doc.setFontSize(18);
    doc.text('Reporte del Producto', 10, 10);

    doc.setFontSize(12);
    doc.text(`Nombre: ${data.nombre}`, 10, 20);
    doc.text(`Precio: ${data.precio}`, 10, 30);
    doc.text(`Stock: ${data.stock}`, 10, 40);
    doc.text(`Descripción: ${data.descripcion}`, 10, 50);
    doc.text(`Categoría: ${data.categoria.nombre}`, 10, 60);

    const imgData = "http://127.0.0.1:8000" + data.imagen; // Reemplaza con la URL de la imagen o ruta de la imagen en tu servidor.
    doc.addImage(imgData, 'JPEG', 10, 70, 50, 50); // Ajusta las coordenadas y dimensiones según tus necesidades.

    doc.save('reporte_producto.pdf');

  }
  

  return (<div className="container mx-auto p-8">

    <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={() => setModalOpen(true)}>Nuevo Producto</button>
  <input type="text" className="right" onChange={(e)=> setBuscar(e.target.value)} /> 
  <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={() => funBuscar()}>Buscar Producto</button>
  
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">Producto</th>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">Precio</th>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">Stock</th>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">Categoria</th>
          <th className="px-4 py-4 bg-blue-600 text-white text-left">Gestión</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((prod) => (
          <tr key={prod.id}>
            <td className="border px-4 py-2">{prod.nombre}</td>
            <td className="border px-4 py-2">{prod.precio}</td>
            <td className="border px-4 py-2">{prod.stock}</td>
            <td className="border px-4 py-2">{prod.categoria.nombre}</td>
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

              <button className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 rounded px-2 py-1 mt-2 mr-2" onClick={() => abrirModalEditar(prod)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>

              </button>
              <button className="bg-red-300 hover:bg-red-400 text-gray-800 rounded px-2 py-1 mt-2 mr-2" onClick={() => eliminar(prod)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="flex justify-center mt-4">
      <nav className="inline-flex rouded-md shadow">
          <button className="py-2 px-4 bg-gray-200 text-gray-500 rounded-l-md hover:bg-gray-300"
                  onClick={() => listarProductos(page - 1)}
                  disabled={page == 1}>
            anterior
          </button>
          {total > itemPerPage && (
            <div className="flex">
              {Array.from({length: Math.ceil(total / itemPerPage)}).map((_, index) => (
                <button key={index} className={`${page == index + 1 ? 'bg-blue-500 text-white':'bg-gray-200 text-gray-700'} py-2 px-4 mx-1 rounded-md focus:outline-none`}
                        onClick={() => listarProductos(index+1)}>{index + 1}
                </button>
              ))}
            </div>

          )}

          <button className="py-2 px-4 bg-gray-200 text-gray-500 rounded-r-md hover:bg-gray-300"
                  onClick={() => listarProductos(page + 1)}
                  disabled={page == Math.ceil(total / itemPerPage)}>
            siguiente
          </button>
      </nav>
    </div>

    <Modal modalOpen={modalOpen} setModalOpen={resetData}>
      <form onSubmit={(e) => { funGuardarProducto(e) }}>
        <label className="mb-2 block">Ingrese Nombre</label>
        <input type="text" className="border border-gray-300 rounded px-2 py-2 mb-2 w-full" name="nombre" value={producto.nombre} onChange={handleChange} />
        <label className="mb-2 block">Ingrese Precio</label>
        <input type="text" className="border border-gray-300 rounded px-2 py-2 mb-2 w-full" name="precio" value={producto.precio} onChange={handleChange} />
        <label className="mb-2 block"> Stock</label>
        <input type="text" className="border border-gray-300 rounded px-2 py-2 mb-2 w-full" name="stock" value={producto.stock} onChange={handleChange} />
        <label className="mb-2 block"> Categoria:</label>
        <select name="categoria_id" onChange={handleChange} required className="border border-gray-300 rounded px-2 py-1 mb-2 w-full">
          <option value="-1">Seleccione una Categoria</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id} selected={categoria.id == producto.categoria_id ? true : false}>{categoria.nombre}</option>
          ))}
        </select>

        <label className="mb-2 block"> Descripción</label>
        <input type="text" className="border border-gray-300 rounded px-2 py-2 mb-2 w-full" name="descripcion" value={producto.descripcion} onChange={handleChange} />

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">Guardar producto</button>

      </form>
    </Modal>

    <Modal modalOpen={modalOpenImagen} setModalOpen={resetDataImagen}>

      <img src={`http://127.0.0.1:8000/${producto.imagen}`} alt="" />

      <input type="file" accept="image/*" onChange={handleChangeImagen} />
      <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={() => actualizarImagen()}>Actualizar Imagen</button>

    </Modal>
  </div>
  )
}
export default Producto