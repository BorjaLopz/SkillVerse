import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import EditProfile from "../EditProfile";
import DeleteAccount from "../DeleteAccount";
import ServicesByUser from "../ServicesByUser";
import useServer from "../../hooks/useServer";
import ProfileCard from "../ProfileCard";

function Profile({ user }) {
  const [currentUser, setCurrentUser] = useState({});
  const { get } = useServer();

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
        <h2
          className="text-4xl font-bold tracking-tight text-center"
          style={{ color: "#523d80" }}
        >{`Perfil de ${user}`}</h2>
        <Avatar user={user} />
      </section>
      <section>
        <ProfileCard formData={currentUser} />
      </section>
      <section className="user-edit">
        <EditProfile nickname={user} />
      </section>
      <section className="delete-user">
        <DeleteAccount />
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
