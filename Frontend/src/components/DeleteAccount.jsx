import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useServer from "../hooks/useServer";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./deletewhatever.css";

function DeleteAccount({ user }) {
  const { delete: deleteAccount, get } = useServer();
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const { user: userLogged } = useAuth();

  const fetchUser = async () => {
    try {
      const { data } = await get({ url: `/useravatar/${user}` });
      setCurrentUser(data.userAvatar);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount({ url: `/user/${currentUser.id}/delete/` });
      toast.success("Usuario borrado exitosamente");
      if (userLogged.user.id === currentUser.id) {
        navigate("/logout");
      }
      navigate("/users");
    } catch (error) {
      toast.error("Error al borrar el usuario");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex justify-center">
      <button
        className="publish-comment text-white font-bold py-1 px-4 rounded bg-purple-500 hover:bg-purple-600 hover:border-purple-950 hover:border-opacity-100 hover:border-2"
        style={{
          fontSize: "1rem",
        }}
        onClick={handleDelete}
      >
        Borrar cuenta
      </button>
    </div>
  );
}

export default DeleteAccount;
