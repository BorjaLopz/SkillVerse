import React from "react";
import Avatar from "./Avatar";
import EditProfile from "./EditProfile";
import ProfileCard from "./ProfileCard";
import { useParams } from "react-router";

function Profile({ user }) {
  console.log("PROFILE");
  console.log(user);
  return (
    <>
      <section className="user_info">
        <h2>Mi información de usuario</h2>
        {/* <Avatar /> */}
        <ProfileCard />
      </section>
      <section className="user_edit">
        <EditProfile />
      </section>
      <section className="delete_user">
        <button className="deleteaccount_button">Borrar cuenta</button>
      </section>
    </>
  );
}

export default Profile;
