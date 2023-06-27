import { NavLink } from "react-router-dom";

function HomeButton() {
  return (
    <nav>
      <NavLink className="home-button" to="/">
        Inicio
      </NavLink>{" "}
    </nav>
  );
}

export default HomeButton;
