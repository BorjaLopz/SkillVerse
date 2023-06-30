import { NavLink } from "react-router-dom";

function HomeButton() {
  return (
    <nav className="inline-block">
      <NavLink className="p-0 border-none bg-transparent text-inherit" to="/">
        Inicio
      </NavLink>
    </nav>
  );
}

export default HomeButton;
