import { NavLink } from "react-router-dom";

function HomeButton() {
  return (
    <nav>
      <NavLink className="home_button" to="/">
        Inicio
      </NavLink>{" "}
    </nav>
  );
}

export default HomeButton;
