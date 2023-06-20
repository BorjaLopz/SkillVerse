import "./avatar.css";
// import { getTokenFromLocalStorage } from "../../../../Backend/helpers";
import useGetTokenValues from "../../hooks/useGetTokenValues";
import useAuth from "../../hooks/useAuth";

//getUserPhoto desde backend
const Avatar = ({ avatar, username }) => {
  // if (!avatar) avatar = "default_avatar.png";
  const { isAuthenticated, user } = useAuth();

  console.log(user.user.nickname);
  console.log(user);
  console.log(user.user.admin);

  return (
    <>
      <img
        className="avatar"
        src={user.user.userPhoto}
        alt={user.user.nickname}
      />
      <h1>AVATAR de {user.user.nickname}</h1>
    </>
  );
};

export default Avatar;
