import { useEffect, useState } from "react"
import TablaDatos from "../../../components/TablaDatos"
import usuarioService from "../../../services/usuarioService"

const Usuario = () => {

    const [usuarios, setUsuarios] = useState([])

    useEffect(()=> {
        listaUsuarios()
    }, [])

    const listaUsuarios = async () => {
        const {data} = await usuarioService.listar();
        setUsuarios(data)
    }

    const columnas = [
        {clave: 'id', valor: 'ID'},
        {clave: 'name', valor: 'NOMBRE'},
        {clave: 'email', valor: 'CORREO ELECTRONICO'},
        {clave: 'created_at', valor: 'CREADO EN'},
    ]

    return (
        <>
            <TablaDatos columnas={columnas} datos={usuarios}></TablaDatos>
        </>
    )
}

export default Usuario;