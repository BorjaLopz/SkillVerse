import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useServer from "../hooks/useServer";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function DeleteService({ serviceId, onDelete }) {
  const { delete: deleteService, get } = useServer();
  const { user } = useAuth();
  const { id: idService } = useParams();
  const navigate = useNavigate();
  const [serviceOwner, setServiceOwner] = useState({});

  const handleDelete = async () => {
    try {
      await deleteService({ url: `/service/${serviceId}/delete` });
      toast.success("Servicio borrado exitosamente");
      navigate("/services");
      // onDelete();
    } catch (error) {
      toast.error("Error al borrar el servicio");
    }
  };

  const fetchServiceOwner = async () => {
    try {
      const { data } = await get({ url: `/service/${idService}` });
      setServiceOwner(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchServiceOwner();
  }, []);

  return (
    <>
      {/* {(userOwner === user.user.id || user.user.admin)} */}
      {user.user.admin || serviceOwner.user_id === user.user.id ? (
        <button
          className="publish-comment text-white font-bold py-2 px-4 rounded content-center bg-indigo-500 hover:bg-red-900"
          onClick={handleDelete}
        >
          Borrar servicio
        </button>
      ) : (
        ""
      )}
    </>
  );
}

export default DeleteService;
