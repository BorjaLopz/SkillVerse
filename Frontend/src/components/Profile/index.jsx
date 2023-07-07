import React, { useEffect, useState } from "react";
import EditProfile from "../EditProfile";
import DeleteAccount from "../DeleteAccount";
import ServicesByUser from "../ServicesByUser";
import useServer from "../../hooks/useServer";
import ProfileCard from "../ProfileCard";
import "./style.css";
import useAuth from "../../hooks/useAuth";
import Avatar from "../Avatar";

function Profile({ user }) {
  const [currentUser, setCurrentUser] = useState({});
  const { get } = useServer();
  const { user: currentToken } = useAuth();

  const fetchUser = async (user) => {
    try {
      const { data } = await get({ url: `/useravatar/${user}` });
      if (data.status) {
        setCurrentUser(data.userAvatar);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser(user);
  }, []);

  return currentUser?.id ? (
    <>
      <section className="user-info">
        <h2 className="profile-title">{`Perfil de ${user}`}</h2>
        <Avatar user={user} id="profile-avatar" />
      </section>
      <section>
        <ProfileCard formData={currentUser} />
      </section>
      <section className="user-edit">
        {currentToken &&
          currentToken.user &&
          user === currentToken.user.nickname && (
            <EditProfile nickname={user} />
          )}
        {currentToken &&
          currentToken.user &&
          !currentUser.admin && //No se pueden borrar las cuentas de l@s admins
          (currentToken.user.admin || user === currentToken.user.nickname) && (
            <DeleteAccount user={user} />
          )}
      </section>
      <section>
        <ServicesByUser nickname={user} />
      </section>
    </>
  ) : (
    ""
  );
}

export default Profile;
