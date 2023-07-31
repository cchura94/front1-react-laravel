import { useState, useEffect } from "react"
import categoriaService from "../../services/categoriaService"

const Categoria = () => {

    const [categorias, setCategorias] = useState([])
    const [categoria, setCategoria] = useState({ nombre: "", detalle: "" })

    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        getCategorias()
    }, [])

    const getCategorias = async () => {
        const { data } = await categoriaService.listarCategorias();
        setCategorias(data)
    }

    const abrirModal = () => {
        setIsModalOpen(true)
    }

    const cerrarModal = () => {
        setCategoria({ nombre: "", detalle: "" })
        setIsModalOpen(false)
    }

    const handleChangeCategoria = (e) => {
        const { name, value } = e.target

        setCategoria((prevState => ({
            ...prevState,
            [name]: value
        })))

    }

    const funGuardarCategoria = async (e) => {
        e.preventDefault();
        if (categoria.id) {
            const { data } = await categoriaService.modificarCategoria(categoria.id, categoria)
        } else {

            const { data } = await categoriaService.guardarCategorias(categoria)
        }

        cerrarModal()
        getCategorias()
    }

    const abrirModalEditarCategoria = (cat) => {
        setCategoria(cat)
        setIsModalOpen(true)
    }

    const eliminarCategoria = async (cat) => {
        if (confirm("¿Está seguro de eliminar la categoria?")) {
            await categoriaService.eliminarCategoria(cat.id)
            getCategorias()
        }

    }


    return (
        <>
            <h1>Gestion Categoria</h1>


            <div className="container mx-auto p-8">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={() => abrirModal()}>Nueva Categoria</button>

                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-4 bg-blue-600 text-white text-left">ID</th>
                            <th className="px-4 py-4 bg-blue-600 text-white text-left">NOMBRE</th>
                            <th className="px-4 py-4 bg-blue-600 text-white text-left">DETALLE</th>
                            <th className="px-4 py-4 bg-blue-600 text-white text-left">GESTIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((cat) => (
                            <tr key={cat.id}>
                                <td className="border px-4 py-2">{cat.id}</td>
                                <td className="border px-4 py-2">{cat.nombre}</td>
                                <td className="border px-4 py-2">{cat.detalle}</td>
                                <td>
                                    <button className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 rounded px-4 py-2 mt-2 mr-2" onClick={() => abrirModalEditarCategoria(cat)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>

                                    </button>
                                    <button className="bg-red-300 hover:bg-red-400 text-gray-800 rounded px-4 py-2 mt-2 mr-2" onClick={() => eliminarCategoria(cat)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                        </svg>


                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen &&
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>

                    <div className="bg-white rounded-lg p-6 w-2/3 md:w-1/2 xl:w-1/3 relative">
                        <h2 className="text-lg font-bold mb-4">Categoria</h2>
                        {JSON.stringify(categoria)}
                        <form onSubmit={(e) => { funGuardarCategoria(e) }}>
                            <label className="mb-2 block">Ingrese Nombre</label>
                            <input type="text" className="border border-gray-300 rounded px-2 py-2 mb-2 w-full" name="nombre" value={categoria.nombre} onChange={handleChangeCategoria} />
                            <label className="mb-2 block">Ingrese Detalle</label>
                            <input type="text" className="border border-gray-300 rounded px-2 py-2 mb-2 w-full" name="detalle" value={categoria.detalle} onChange={handleChangeCategoria} />
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">Guardar Categoria</button>

                        </form>

                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded px-4 py-2 mt-2 mr-2 top-0 right-0 absolute" onClick={cerrarModal}>x</button>

                    </div>
                </div>
            }

        </>
    )
}
export default Categoria