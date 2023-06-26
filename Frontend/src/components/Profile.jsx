import React from "react";
import Avatar from "./Avatar";
import EditProfile from "./EditProfile";
import ProfileCard from "./ProfileCard";

function Profile() {
  return (
    <>
      <section className="user_info">
        <h2>Mi información de usuario</h2>
        <Avatar />
        <ProfileCard />
      </section>
      <section className="user_edit">
        <EditProfile />
      </section>
      <section className="delete_user">
        <button className="delete_account_button">Borrar cuenta</button>
      </section>
    </>
  );
}

export default Profile;
