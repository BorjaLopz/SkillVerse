import { NavLink } from "react-router-dom";
import MainIcon from "./MainIcon";

function HomeButton() {
  return (
    <nav className="inline-block">
      <NavLink className="p-0 border-none bg-transparent text-inherit" to="/">
        <img src="/Icono.png" width={100} />
      </NavLink>
    </nav>
  );
}

export default HomeButton;
