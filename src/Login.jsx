import { useState } from "react";
import authService from "./services/authService";
import messageService from "./services/messageService";
import { useNavigate } from "react-router-dom";
// import axios from "axios";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [perfil, setPerfil] = useState({})

    const navigate = useNavigate()

    const funIngresar = async (e) => {
        e.preventDefault()

        const datos = {
            email: email,
            password: password
        }
        
        try {
            // const res = await axios.post("http://127.0.0.1:8000/api/v1/auth/login", datos)
            const res = await authService.loginConLaravel(datos)
            console.log(res.data);
            localStorage.setItem("access_token", res.data.access_token)

            navigate("/admin/producto")
            
        } catch (error) {
            console.log(error.response.data)
        }

    }

    const enviarMensaje = async () => {
        await messageService.enviarMensajeWhatsapp("Otro mensaje de React")
    }

    
    const obtenerPerfil = async () => {
        const {data} = await authService.perfilConLaravel()
        setPerfil(data)

    }

    const salir = async () => {
        const {data} = await authService.salirConLaravel()
        setPerfil({})
        localStorage.removeItem("access_token")

    }

    
    return (
        <>
            <h5>Email: { email }</h5>
            <h5>Contraseña: { password }</h5>
            <h1>Ingresar</h1>
            <form onSubmit={(e)=>funIngresar(e)}>
                <label htmlFor="">Ingrese Correo</label>
                <input type="email" onChange={(e)=> setEmail(e.target.value)} />
                <br />
                <label htmlFor="">Ingrese Contraseña</label>
                <input type="password" onChange={(e)=> setPassword(e.target.value)} />
                <br />
                <input type="submit" value="Ingresar" />
                <input type="reset" />
            </form>
            
            <button onClick={() => enviarMensaje()}>Enviar Mensaje de Whatsapp</button>
            <button onClick={() => obtenerPerfil()}>Mi Perfil</button>
            <button onClick={() => salir()}>SALIR</button>
            <hr />
            { JSON.stringify(perfil)}
            
        
        </>
    )
}

export default Login;