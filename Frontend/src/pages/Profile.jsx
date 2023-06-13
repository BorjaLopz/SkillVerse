import React from "react";
import Avatar from "../components/Avatar/index";
import DeleteButton from "../components/DeleteButton";

function Profile() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">User profile</h1>
      <section className="user_info">
        <h2>My profile info</h2>
        <Avatar />
      </section>
      <section className="delete_user">
        <h2>Delete account</h2>
        <DeleteButton />
      </section>
    </>
  );
}

export default Profile;
