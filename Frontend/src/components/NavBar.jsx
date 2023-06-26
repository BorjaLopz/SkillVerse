import { NavLink } from "react-router-dom";
import HomeButton from "./HomeButton";
// import HeaderAvatar from "";
import useAuth from "../hooks/useAuth";
import Avatar from "./Avatar";

function NavBar() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="navbar">
      <nav>
        <HomeButton />
        <NavLink to="/about">Sobre nosotr@s</NavLink> {" || "}
        <NavLink to="/services">Servicios</NavLink> {" || "}
        {!isAuthenticated && <NavLink to="/signup">Regístrate</NavLink>}
        {!isAuthenticated && " || "}
        {!isAuthenticated && <NavLink to="/login">Inicia sesión</NavLink>}
        {!isAuthenticated && " || "}
        {isAuthenticated && <NavLink to="/logout">Cerrar sesión</NavLink>}
        {isAuthenticated && " || "}
        {isAuthenticated && <NavLink to="/profile">Perfil</NavLink>}
        {isAuthenticated && " || "}
        {isAuthenticated && <Avatar />}
      </nav>
    </div>
  );
}

export default NavBar;
