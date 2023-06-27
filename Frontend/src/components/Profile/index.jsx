import React from "react";
import Avatar from "../Avatar";
import EditProfile from "../EditProfile";
import ProfileCard from "../ProfileCard";
import DeleteAccount from "../DeleteAccount";

function Profile() {
  return (
    <>
      <section className="user-info">
        <h2>Mi información de usuario</h2>
        <Avatar />
        <ProfileCard />
      </section>
      <section className="user-edit">
        <EditProfile />
      </section>
      <section className="delete-user">
        <DeleteAccount />
      </section>
    </>
  );
}

export default Profile;
