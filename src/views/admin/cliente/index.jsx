import { useEffect, useState } from "react"
import TablaDatos from "../../../components/TablaDatos"
import clienteService from "../../../services/clienteService"

const Cliente = () => {

    const [clientes, setClientes] = useState([])

    useEffect(()=> {
        listaClientes()
    }, [])

    const listaClientes = async () => {
        const {data} = await clienteService.listar();
        setClientes(data)
    }
    const columnas = [
        {clave: 'nombre_completo', valor: 'NOMBRE COMPLETO'},
        {clave: 'direccion', valor: 'DIRECCIÓN'},
        {clave: 'telefono', valor: 'TELEFONO'},
        {clave: 'ci_nit', valor: 'CI/NIT'},
    ]

    return (
        <>
            <TablaDatos columnas={columnas} datos={clientes}></TablaDatos>
        </>
    )
}

export default Cliente;