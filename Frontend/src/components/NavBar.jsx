import { NavLink } from "react-router-dom";
import HomeButton from "./HomeButton";
// import HeaderAvatar from "";
import useAuth from "../hooks/useAuth";
import Avatar from "./Avatar";

function NavBar() {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  return (
    <div className="navbar">
      <nav>
        <HomeButton />
        <NavLink to="/about">Sobre nosotr@s</NavLink> {" || "}
        <NavLink to="/services">Servicios</NavLink> {" || "}
        <NavLink to="/contact">Contacto</NavLink> {" || "}
        {!isAuthenticated && <NavLink to="/signup">Regístrate</NavLink>}
        {!isAuthenticated && " || "}
        {!isAuthenticated && <NavLink to="/login">Inicia sesión</NavLink>}
        {!isAuthenticated && " || "}
        {isAuthenticated && <NavLink to="/logout">Cerrar sesión</NavLink>}
        {isAuthenticated && " || "}
        {/* LogOut cuando el user esté logueado en vez de SignUp*/}
        {isAuthenticated && <NavLink to="/profile">Perfil</NavLink>}
        {isAuthenticated && " || "}
        {isAuthenticated && <NavLink to="/shopping">Tienda</NavLink>}
        {isAuthenticated && " || "}
        {isAuthenticated && <Avatar />}
        {/* <HeaderAvatar /> cuando el user esté logueado, le lleva al Profile, sino es un Login */}
      </nav>
    </div>
  );
}

export default NavBar;
