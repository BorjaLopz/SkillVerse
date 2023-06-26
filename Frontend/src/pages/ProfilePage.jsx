import React from "react";
import Profile from "../components/Profile";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";

function ProfilePage() {
  const location = useLocation();
  const { state } = location;
  const user = state.from;

  return (
    <main>
      <Profile user={user} />
    </main>
  );
}

export default ProfilePage;
