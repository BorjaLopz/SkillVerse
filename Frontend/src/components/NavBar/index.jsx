import { NavLink } from "react-router-dom";
import HomeButton from "../HomeButton";
import useAuth from "../../hooks/useAuth";
import "./style.css";
import AvatarHeader from "../AvatarHeader";
import HamburguerMenuComponent from "../HamburguerMenuComponent/HamburguerMenuComponent";

function NavBar() {
  const { isAuthenticated } = useAuth();

  const user = useAuth();

  return (
    <section className="navbar">
      <div className="highResolution">
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
          {/* {isAuthenticated && (
          <NavLink
            className="animation"
            to={{ pathname: `/profile/${user.user.user.nickname}` }}
            state={{ from: `${user.user.user.nickname}` }}
          >
            Perfil
          </NavLink>
        )} */}
          {isAuthenticated && (
            <NavLink
              to={{ pathname: `/profile/${user.user.user.nickname}` }} // Ruta deseada
              className="avatar-nav-container sin_animacion"
            >
              <AvatarHeader
                className="avatar-nav"
                user={`${user.user.user.nickname}`}
              />
            </NavLink>
          )}
        </nav>
      </div>

      <div className="lowResolution">
        <HamburguerMenuComponent />
      </div>
    </section>
  );
}

export default NavBar;
