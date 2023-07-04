import React from "react";
import toast from "react-hot-toast";
import useServer from "../hooks/useServer";

function DeleteAccount({ accountId, onDelete }) {
  const { delete: deleteAccount } = useServer();

  const handleDelete = async () => {
    try {
      await deleteAccount({ url: `/profile/${accountId}` });
      toast.success("Usuario borrado exitosamente");
      onDelete();
    } catch (error) {
      toast.error("Error al borrar el usuario");
    }
  };

  return (
    <button
      className="publish-comment text-white font-bold py-2 px-4 rounded content-center bg-indigo-500 hover:bg-red-900"
      onClick={handleDelete}
    >
      Borrar cuenta
    </button>
  );
}

export default DeleteAccount;
