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
        <NavLink
          className="links-header"
          style={{ color: "#fcfaff" }}
          to="/about"
        >
          Conócenos
        </NavLink>{" "}
        <NavLink
          className="links-header"
          style={{ color: "#fcfaff" }}
          to="/services"
        >
          Servicios
        </NavLink>{" "}
        {!isAuthenticated && (
          <NavLink
            className="links-header"
            style={{ color: "#fcfaff" }}
            to="/signup"
          >
            Regístrate
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink
            className="links-header"
            style={{ color: "#fcfaff" }}
            to="/users"
          >
            Usuarios
          </NavLink>
        )}
        {!isAuthenticated && (
          <NavLink
            className="links-header"
            style={{ color: "#fcfaff" }}
            to="/login"
          >
            Inicia sesión
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink
            className="links-header"
            style={{ color: "#fcfaff" }}
            to="/logout"
          >
            Cerrar sesión
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink
            className="links-header"
            style={{ color: "#fcfaff" }}
            to={{ pathname: `/profile/${user.user.user.nickname}` }}
            state={{ from: `${user.user.user.nickname}` }}
          >
            Perfil
          </NavLink>
        )}
        {isAuthenticated && <Avatar user={`${user.user.user.nickname}`} />}
      </nav>
    </div>
  );
}

export default NavBar;
