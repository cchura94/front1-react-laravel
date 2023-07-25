import { Outlet } from "react-router-dom"
import Categoria from "../views/admin/Categoria"
import Producto from "../views/admin/Producto"
import AdminLayout from "../layouts/AdminLayout"

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
        }
    ]
}

export default AdminRoutes