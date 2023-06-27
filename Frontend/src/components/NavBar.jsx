import { NavLink } from "react-router-dom";
import HomeButton from "./HomeButton";
// import HeaderAvatar from "";
import useAuth from "../hooks/useAuth";
import Avatar from "./Avatar";

function NavBar() {
  const { isAuthenticated } = useAuth();
  
  const user = useAuth();

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
        {isAuthenticated && (
          <NavLink
            to={{ pathname: `/profile/${user.user.user.nickname}` }}
            state={{ from: `${user.user.user.nickname}` }}
          >
            Perfil
          </NavLink>
        )}
        {isAuthenticated && " || "}
        {isAuthenticated && <Avatar />}
      </nav>
    </div>
  );
}

export default NavBar;
