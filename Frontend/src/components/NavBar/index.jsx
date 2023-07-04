import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink> {" | "}
      <NavLink to="/about">About</NavLink> {" | "}
      <NavLink to="/services">Services</NavLink> {" | "}
      <NavLink to="/contact">Contact</NavLink> {" | "}
      <NavLink to="/signup">Sing Up</NavLink>
      <NavLink to="/login">Login</NavLink> {" | "}
      <NavLink to="/profile">Profile</NavLink> {" | "}
    </nav>
  );
}

export default NavBar;
