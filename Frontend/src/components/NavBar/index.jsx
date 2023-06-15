import { NavLink } from "react-router-dom";
import HomeButton from "../HomeButton";
// import HeaderAvatar from "";

function NavBar() {
  return (
    <nav>
      <HomeButton />
      <NavLink to="/about">About</NavLink> {" | "}
      <NavLink to="/services">Services</NavLink> {" | "}
      <NavLink to="/contact">Contact</NavLink> {" | "}
      <NavLink to="/signup">Sing Up</NavLink> {" | "}
      {/* LogOut cuando el user esté logueado en vez de SignUp*/}
      <NavLink to="/login">Login</NavLink> {" | "}
      <NavLink to="/profile">Profile</NavLink> {" | "}
      {/* <HeaderAvatar /> cuando el user esté logueado, le lleva al Profile, sino es un Login */}
    </nav>
  );
}

export default NavBar;
