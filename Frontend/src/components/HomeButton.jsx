import { NavLink } from "react-router-dom";

function HomeButton() {
  return (
    <NavLink to="/">
      <img
        src="/IconoWHITE1.png"
        width={400}
        style={{ alignItems: "center" }}
        className="sin_animacion"
      />
    </NavLink>
  );
}

export default HomeButton;
