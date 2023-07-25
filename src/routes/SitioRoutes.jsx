import { Outlet } from "react-router-dom"
import Inicio from "../views/Inicio"
import Login from "../Login"
import SitioLayout from "../layouts/SitioLayout"

const SitioRoutes = {
    path: '/',
    element: <SitioLayout />,
    children: [
        {
            path: '',
            element:<Inicio></Inicio>
        },
        {
            path: 'login',
            element: <Login></Login>
        }
    ]
}

export default SitioRoutes