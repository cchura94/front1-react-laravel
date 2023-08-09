import { useEffect, useState } from "react";
import productoService from "../../../services/productoService";
import Modal from "../../../components/Modal";
import clienteService from "../../../services/clienteService";
import pedidoService from "../../../services/pedidoService";

const NuevoPedido = () => {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0)
    const [itemPerPage, setitemPerPage] = useState(5)
    const [page, setPage] = useState(1)
    const [buscar, setBuscar] = useState('')
    // cliente
    const [modalOpenCliente, setModalOpenCliente] = useState(false);
    const [cliente, setCliente] = useState({ nombre_completo: "", direccion: "", telefono: "", ci_nit: "" })
    const [cliente_seleccionado, setClienteSeleccionado] = useState({ nombre_completo: "", direccion: "", telefono: "", ci_nit: "" })
    const [buscarCliente, setBuscarCliente] = useState('')

    useEffect(() => {
        listarProductos()
    }, [])

    const listarProductos = async (p = 1, lim = 5) => {
        const { data } = await productoService.listar(p, lim);
        setProductos(data.data);
        setTotal(data.total)
        setPage(p)

    }

    const funBuscar = async () => {
        const { data } = await productoService.listarBuscar(buscar)
        setProductos(data.data);
        setTotal(data.total)
        setPage(p)
    }

    const funBuscarCliente = async (val) => {
        const { data } = await clienteService.buscar(val)
        setClienteSeleccionado(data);
    }

    const addCarrito = (prod) => {
        let obj = { producto_id: prod.id, cantidad: 1, precio: prod.precio, nombre: prod.nombre }
        setCarrito([...carrito, obj])
    }

    const resetDataCliente = () => {
        setModalOpenCliente(false)
    }

    const abrirModalCliente = () => {
        setModalOpenCliente(true)
    }

    const funGuardarCliente = async (e) => {
        e.preventDefault()
    
          const { data } = await clienteService.guardar(cliente)
          setClienteSeleccionado(data)
          resetDataCliente()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
    
        setCliente((prevState => ({
          ...prevState,
          [name]: value
        })))
    
      }
    
      const guardarPedido = async () => {
        if(confirm("¿Está seguro de Guardar el pedido?")){
            let datos = {
                cliente_id: cliente_seleccionado.id,
                productos: carrito
            }

            const {data} = await pedidoService.guardar(datos);
            console.log(data);
            setCarrito([])
            setClienteSeleccionado({ nombre_completo: "", direccion: "", telefono: "", ci_nit: "" })

        }
      }


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="bg-white p-4 rounded shadow">
                        <div className="overflow-x-auto">

                            <input type="text" className="right" onChange={(e) => setBuscar(e.target.value)} />
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={() => funBuscar()}>Buscar Producto</button>


                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-4 bg-blue-600 text-white text-left">Producto</th>
                                        <th className="px-4 py-4 bg-blue-600 text-white text-left">Precio</th>
                                        <th className="px-4 py-4 bg-blue-600 text-white text-left">Stock</th>
                                        <th className="px-4 py-4 bg-blue-600 text-white text-left">Categoria</th>
                                        <th className="px-4 py-4 bg-blue-600 text-white text-left"></th>
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

                                                <button className="bg-green-500 hover:bg-green-600 text-gray-800 rounded px-2 py-1 mt-2 mr-2" onClick={() => addCarrito(prod)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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
                                            {Array.from({ length: Math.ceil(total / itemPerPage) }).map((_, index) => (
                                                <button key={index} className={`${page == index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} py-2 px-4 mx-1 rounded-md focus:outline-none`}
                                                    onClick={() => listarProductos(index + 1)}>{index + 1}
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
                        </div>
                    </div>
                </div>
                <div className="md:col-span-1 grid gap-4">
                    <div className="bg-white p-4 rounded shadow">
                        <table className="table-auto w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NOM</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">C</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PRECIO</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {carrito.map((prod => (

                                    <tr>
                                        <td className="px-6 py-3">{prod.nombre}</td>
                                        <td className="px-6 py-3">{prod.cantidad}</td>
                                        <td className="px-6 py-3">{prod.precio}</td>
                                        <td className="px-6 py-3"></td>
                                    </tr>
                                )))}
                            </tbody>

                        </table>

                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h1>Cliente</h1>

                        <input type="text" className="right" onChange={(e) => funBuscarCliente(e.target.value)} />
                        {cliente_seleccionado.id &&
                        <div className="bg-white p-4 rounded shadow">
                            { /*JSON.stringify(cliente_seleccionado)*/ }
                            <h1>NOMBRE: {cliente_seleccionado.nombre_completo} </h1>
                            <h1>CI/NIT: {cliente_seleccionado.ci_nit} </h1>
                            <h1>DIRECCIÓN: {cliente_seleccionado.direccion} </h1>
                            <h1>TELEFONO: {cliente_seleccionado.telefono} </h1>
                        </div>}

                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={() => abrirModalCliente()}>Nuevo Cliente</button>

                        <Modal modalOpen={modalOpenCliente} setModalOpen={resetDataCliente}>
                            <form onSubmit={(e) => { funGuardarCliente(e) }}>
                                <label className="mb-2 block">Ingrese Nombre</label>
                                <input type="text" className="border border-gray-300 rounded px-2 py-2 mb-2 w-full" name="nombre_completo" value={cliente.nombre_completo} onChange={handleChange} />
                                <label className="mb-2 block">Ingrese direccion</label>
                                <input type="text" className="border border-gray-300 rounded px-2 py-2 mb-2 w-full" name="direccion" value={cliente.direccion} onChange={handleChange} />
                                <label className="mb-2 block"> Telefono</label>
                                <input type="text" className="border border-gray-300 rounded px-2 py-2 mb-2 w-full" name="telefono" value={cliente.telefono} onChange={handleChange} />
                                

                                <label className="mb-2 block"> CI/NIT</label>
                                <input type="text" className="border border-gray-300 rounded px-2 py-2 mb-2 w-full" name="ci_nit" value={cliente.descripcion} onChange={handleChange} />

                                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">Guardar Cliente</button>

                            </form>
                        </Modal>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={() => guardarPedido()}>Generar Pedido</button>

                    </div>

                </div>

            </div>

        </>
    )


}

export default NuevoPedido;