import { NavLink } from "react-router-dom";

function HomeButton() {
  return (
    <nav className="inline-block">
      <h1>
        <NavLink className="p-0 border-none bg-transparent text-inherit" to="/">
          Inicio
        </NavLink>
      </h1>
    </nav>
  );
}

export default HomeButton;
