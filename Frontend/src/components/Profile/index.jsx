import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import EditProfile from "../EditProfile";
import DeleteAccount from "../DeleteAccount";
import ServicesByUser from "../ServicesByUser";
import useServer from "../../hooks/useServer";
import { useNavigate } from "react-router-dom";

function Profile({ user }) {
  const [currentUser, setCurrentUser] = useState({});
  const { get } = useServer();
  const navigate = useNavigate();

  const fetchUser = async (user) => {
    try {
      const { data } = await get({ url: `/useravatar/${user}` });
      console.log("data");
      console.log(data.status);
      console.log(typeof data);
      setCurrentUser(data.userAvatar);
      if (!data) {
        console.log("No hay data");
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
      <section className="user-edit">
        <EditProfile />
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
