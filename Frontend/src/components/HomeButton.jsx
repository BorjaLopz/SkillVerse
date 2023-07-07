import { NavLink } from "react-router-dom";

function HomeButton() {
  return (
    <nav className="inline-block">
      <NavLink to="/">
        <img src="/IconoWHITE1.png" width={80} />
      </NavLink>
    </nav>
  );
}

export default HomeButton;
