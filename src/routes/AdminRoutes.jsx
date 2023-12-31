import { Outlet } from "react-router-dom"
import Categoria from "../views/admin/Categoria"
import Producto from "../views/admin/Producto"
import AdminLayout from "../layouts/AdminLayout"
import NuevoPedido from "../views/admin/pedido/NuevoPedido"
import ListaPedido from "../views/admin/pedido/ListaPedido"
import Cliente from "../views/admin/cliente"
import Usuario from "../views/admin/usuario"

const AdminRoutes = {
    path: '/admin',
    element: <AdminLayout />,
    children: [
        {
            path: 'categoria',
            element: <Categoria />
        },
        {
            path: 'producto',
            element: <Producto />
        },
        
        {
            path: 'pedido',
            element: <ListaPedido />
        },
        {
            path: 'pedido/nuevo',
            element: <NuevoPedido />
        },
        {
            path: 'cliente',
            element: <Cliente />
        },
        {
            path: 'usuario',
            element: <Usuario />
        }
    ]
}

export default AdminRoutes