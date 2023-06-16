import "./style.css";
import Avatar from "../Avatar";
import { NavLink } from "react-router-dom";

const HeaderAvatar = ({ user }) => {
  return (
    <div className="headerAvatar">
      <Avatar avatar={user.picture} username={user.name} />
      <NavLink to="/profile">Profile</NavLink> {" | "}
    </div>
  );
};

export default HeaderAvatar;
