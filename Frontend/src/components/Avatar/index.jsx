import "./avatar.css";
// import { getTokenFromLocalStorage } from "../../../../Backend/helpers";
import useGetTokenValues from "../../hooks/useGetTokenValues";
import useAuth from "../../hooks/useAuth";

//getUserPhoto desde backend
const Avatar = ({ avatar, username }) => {
  const { user } = useAuth();

  // console.log(user); //Token
  // console.log(user.user.nickname);  //Nickname
  // console.log(user.user.admin); //Si es admin

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
