import { NavLink } from "react-router-dom";

function HomeButton() {
  return (
    <nav className="inline-block">
      <NavLink className="p-0 border-none bg-transparent text-inherit" to="/">
        <img src="/Icono.png" width={80} />
      </NavLink>
    </nav>
  );
}

export default HomeButton;
