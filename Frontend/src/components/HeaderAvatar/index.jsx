import "./style.css";
import Avatar from "../Avatar";

const HeaderAvatar = ({ user }) => {
  return <Avatar avatar={user.picture} username={user.name} />;
};

export default HeaderAvatar;
