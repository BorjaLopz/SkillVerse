import "./style.css";
import Avatar from "../Avatar";
import { NavLink } from "react-router-dom";

const HeaderAvatar = ({ user }) => {
  return (
    <div className="header-avatar">
      <Avatar avatar={user.picture} username={user.name} />
      {/* <NavLink to="/profile">Perfil</NavLink> {" | "} */}
    </div>
  );
};

export default HeaderAvatar;
