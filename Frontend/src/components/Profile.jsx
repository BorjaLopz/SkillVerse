import React from "react";
import Avatar from "./Avatar";
import DeleteButton from "./DeleteButton";
import PageTitle from "./PageTitle";
import EditProfile from "./EditProfile";
import ProfileCard from "./ProfileCard";

function Profile() {
  return (
    <>
      <PageTitle />
      <section className="user_info">
        <h2>My profile info</h2>
        {/* <Avatar /> */}
        <ProfileCard />
      </section>
      <EditProfile />
      <section className="user_edit">
        <h2>Edit User</h2>
      </section>
      <section className="delete_user">
        <h2>Delete account</h2>
        <DeleteButton />
      </section>
    </>
  );
}

export default Profile;
