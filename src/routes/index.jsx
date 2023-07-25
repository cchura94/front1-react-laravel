import { useRoutes, Outlet } from "react-router-dom" 
import SitioRoutes from "./SitioRoutes";
import AdminRoutes from "./AdminRoutes";

const Routes = () => {
    return useRoutes([ SitioRoutes, AdminRoutes ])
}

export default Routes;