import React from "react";
import Avatar from "../Avatar";
import EditProfile from "../EditProfile";
import ProfileCard from "../ProfileCard";
import DeleteAccount from "../DeleteAccount";
import ServicesByUser from "../ServicesByUser";

function Profile({ user }) {

    
  return (
    <>
      <section className="user-info">
        <h2 className="text-center text-4xl">{`Perfil de ${user}`}</h2>
        <Avatar user={user} />
        <ProfileCard />
      </section>
      <section className="user-edit">
        <EditProfile />
      </section>
      <section className="delete-user">
        <DeleteAccount />
      </section>

      <section>
        <p className="text-center text-4xl">Servicios de {`${user}`}</p>
        <ServicesByUser nickname={user} />
      </section>
    </>
  );
}

export default Profile;
