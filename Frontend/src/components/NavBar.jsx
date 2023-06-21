import { NavLink } from "react-router-dom";
import HomeButton from "./HomeButton";
// import HeaderAvatar from "";

function NavBar() {
  return (
    <div className="navbar">
      <nav>
        <HomeButton />
        <NavLink to="/about">Sobre nosotr@s</NavLink> {" || "}
        <NavLink to="/services">Servicios</NavLink> {" || "}
        <NavLink to="/contact">Contacto</NavLink> {" || "}
        <NavLink to="/signup">Regístrate</NavLink> {" || "}
        {/* LogOut cuando el user esté logueado en vez de SignUp*/}
        <NavLink to="/login">Inicia sesión</NavLink> {" || "}
        <NavLink to="/profile">Perfil</NavLink> {" || "}
        <NavLink to="/shopping">Tienda</NavLink> {"||"}
        {/* <HeaderAvatar /> cuando el user esté logueado, le lleva al Profile, sino es un Login */}
      </nav>
    </div>
  );
}

export default NavBar;
