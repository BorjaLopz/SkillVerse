import { NavLink } from "react-router-dom";
import "./style.css";

function HomeButton() {
  return (
    <NavLink to="/">
      <img src="/IconoWHITE1.png" className="home-button" />
    </NavLink>
  );
}

export default HomeButton;
