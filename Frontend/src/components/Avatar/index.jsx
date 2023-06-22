import "./avatar.css";
// import { getTokenFromLocalStorage } from "../../../../Backend/helpers";
import useGetTokenValues from "../../hooks/useGetTokenValues";
import useAuth from "../../hooks/useAuth";

//getUserPhoto desde backend
const Avatar = ({ id = "" }) => {
  let user = {};
  if (!id) {
    user = useAuth();
  } else {
    // console.log(newProfile);
    user = "";
  }

  // console.log(user); //Token
  // console.log(user.user.nickname);  //Nickname
  // console.log(user.user.admin); //Si es admin

  return (
    <>
      {!id && (
        <img
          className="avatar"
          src={user.user.user.userPhoto}
          alt={user.user.user.nickname}
        />
      )}
      {!id && <h1>AVATAR de {user.user.user.nickname}</h1>}

      {id && <p>Imagen del usuario{`${id}`}</p>}
    </>
  );
};

export default Avatar;
