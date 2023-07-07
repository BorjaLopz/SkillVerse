import { NavLink } from "react-router-dom";
import HomeButton from "../HomeButton";
import useAuth from "../../hooks/useAuth";
import Avatar from "../Avatar";
import "./style.css";

function NavBar() {
  const { isAuthenticated } = useAuth();

  const user = useAuth();

  return (
    <div className="navbar">
      <nav>
        <HomeButton />
        <NavLink className="animation" to="/about">
          Conócenos
        </NavLink>
        <NavLink className="animation" to="/services">
          Servicios
        </NavLink>
        {!isAuthenticated && (
          <NavLink className="animation" to="/signup">
            Regístrate
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink className="animation" to="/users">
            Usuarios
          </NavLink>
        )}
        {!isAuthenticated && (
          <NavLink className="animation" to="/login">
            Inicia sesión
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink className="animation" to="/logout">
            Cerrar sesión
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink
            className="animation"
            to={{ pathname: `/profile/${user.user.user.nickname}` }}
            state={{ from: `${user.user.user.nickname}` }}
          >
            Perfil
          </NavLink>
        )}
        {isAuthenticated}
        {isAuthenticated && (
          <div className="avatar-nav-container sin_animacion">
            <Avatar
              className="avatar-nav"
              user={`${user.user.user.nickname}`}
            />
          </div>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
