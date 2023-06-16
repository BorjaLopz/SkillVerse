import { NavLink } from "react-router-dom";

function HomeButton() {
  return (
    <nav>
      <NavLink className="home_button" to="/">
        Home
      </NavLink>{" "}
      {" | "}
    </nav>
  );
}

export default HomeButton;
