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
        <div className="bg-blue-500 min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
            { JSON.stringify(perfil)}
            {
                /*
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
                
                */

            }

            <header className="max-w-lg mx-auto">
        <a href="#">
            <h1 className="text-4xl font-bold text-white text-center">Empresa</h1>
        </a>
    </header>

    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
            <h3 className="font-bold text-2xl">Bienvenido</h3>
            <p className="text-gray-600 pt-2">Ingrese sus credenciales.</p>
        </section>

        <section className="mt-10">
            <form className="flex flex-col" onSubmit={(e)=>funIngresar(e)}>
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">Ingrese Correo</label>
                    <input type="text" id="email" onChange={(e)=> setEmail(e.target.value)} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                </div>
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Contraseña</label>
                    <input type="password" id="password" onChange={(e)=> setPassword(e.target.value)} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                </div>
                <div className="flex justify-end">
                    <a href="#" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Ingresar</button>
            </form>
        </section>
    </main>
            
        
        </div>
    )
}

export default Login;