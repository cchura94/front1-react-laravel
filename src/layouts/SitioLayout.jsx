import { Outlet, NavLink } from "react-router-dom"

const SitioLayout = () => {
    return (
        <>
            <NavLink to="/">INICIO</NavLink> |
            <NavLink to="/login">INGRESAR</NavLink>
            <Outlet></Outlet>
        </>
    )
}

export default SitioLayout;