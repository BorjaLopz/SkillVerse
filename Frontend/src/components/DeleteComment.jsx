import React from "react";
import toast from "react-hot-toast";
import useServer from "../hooks/useServer";

function DeleteComment({ commentId, onDelete }) {
  const { delete: deleteComment } = useServer();

  const handleDelete = async () => {
    try {
      await deleteComment({ url: `/comments/${commentId}` });
      toast.success("Comentario borrado exitosamente");
      onDelete();
    } catch (error) {
      toast.error("Error al borrar el comentario");
    }
  };

  return (
    <button
      className="publish-comment text-white font-bold py-2 px-4 rounded content-center bg-indigo-500 hover:bg-red-900"
      onClick={handleDelete}
    >
      Borrar comentario
    </button>
  );
}

export default DeleteComment;
