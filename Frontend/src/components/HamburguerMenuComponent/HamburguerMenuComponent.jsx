import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import HomeButton from "../HomeButton";
import useAuth from "../../hooks/useAuth";
import AvatarHeader from "../AvatarHeader";
// import SearchBar from "../SearchBar/SearchBar";

function HamburguerMenuComponent({ handleFilter }) {
  const location = useLocation();
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  //Comprobamos si estamos registrados
  const { isAuthenticated } = useAuth();

  //obtenemos el usuario
  const user = useAuth();

  const beerPage = location.pathname.includes("services");

  useEffect(() => {
    setIsMenuClicked(false);
  }, [location]);

  const menuClass = isMenuClicked
    ? "menuBurguer visible"
    : "menuBurguer closed";

  const newMenuClass = beerPage ? menuClass + " gap" : menuClass;
  const burguerItem = isMenuClicked
    ? "burguerBar clicked"
    : "burguerBar unclicked";

  const updateMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };
  return (
    <div id="containerBurguerMenu">
      <nav className="switchMenuButton">
        <div className="burguerMenu" onClick={updateMenu}>
          <div className={burguerItem}></div>
          <div className={burguerItem}></div>
          <div className={burguerItem}></div>
        </div>
      </nav>

      <div className={newMenuClass}>
        <div id="searchRoutes">
          <HomeButton />
          <Link className="animation" to="/about">
            Conócenos
          </Link>
          <Link className="animation" to="/services">
            Servicios
          </Link>
          {!isAuthenticated && (
            <Link className="animation" to="/signup">
              Regístrate
            </Link>
          )}
          {isAuthenticated && (
            <Link className="animation" to="/users">
              Usuarios
            </Link>
          )}
          {!isAuthenticated && (
            <Link className="animation" to="/login">
              Inicia sesión
            </Link>
          )}
          {isAuthenticated && (
            <Link className="animation" to="/logout">
              Cerrar sesión
            </Link>
          )}

          {isAuthenticated && (
            <Link
              to={{ pathname: `/profile/${user.user.user.nickname}` }} // Ruta deseada
              className="avatar-nav-container sin_animacion"
            >
              <AvatarHeader
                className="avatar-nav"
                user={`${user.user.user.nickname}`}
              />
            </Link>
          )}
          {/* <div id="searchHamburguer">
          {beerPage && <SearchBar handleFilter={handleFilter} />}
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default HamburguerMenuComponent;
