import React from "react";
import Avatar from "../Avatar";
import EditProfile from "../EditProfile";
import DeleteAccount from "../DeleteAccount";
import ServicesByUser from "../ServicesByUser";

function Profile({ user }) {
  return (
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
  );
}

export default Profile;
