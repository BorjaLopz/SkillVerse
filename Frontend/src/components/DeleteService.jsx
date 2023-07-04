import React from "react";
import toast from "react-hot-toast";
import useServer from "../hooks/useServer";

function DeleteService({ serviceId, onDelete }) {
  const { delete: deleteService } = useServer();

  const handleDelete = async () => {
    try {
      await deleteService({ url: `/service/${serviceId}/delete` });
      toast.success("Servicio borrado exitosamente");
      onDelete();
    } catch (error) {
      toast.error("Error al borrar el servicio");
    }
  };

  return (
    <button
      className="publish-comment text-white font-bold py-2 px-4 rounded content-center bg-indigo-500 hover:bg-red-900"
      onClick={handleDelete}
    >
      Borrar servicio
    </button>
  );
}

export default DeleteService;
