import React, { useState } from "react";
import "./style.css";
import useServer from "../../hooks/useServer";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

function DoneCheck({ id, complete, setService, currentUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const server = useServer();
  const { isAuthenticated, user } = useAuth();

  const handleMarkAsDone = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await server.patch({
        url: `/service/${id}/done`,
        body: { done: 1 },
      });

      if (!error) {
        setService((prevService) => ({
          ...prevService,
          complete: true,
        }));

        toast.success(`Servicio marcado como completado`);
        console.log(`Servicio ${id} completado`);
      } else {
        toast.error(
          `No se ha podido completar el servicio. Inténtalo de nuevo.`
        );
      }
    } catch (error) {
      console.error("Error completing the service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated || currentUser !== user.id) {
    return null;
  }

  return (
    <div className="button-done">
      <button
        className="completado"
        onClick={handleMarkAsDone}
        style={{ backgroundColor: "red" }}
      >
        Marcar como hecho
      </button>
    </div>
  );
}

export default DoneCheck;
