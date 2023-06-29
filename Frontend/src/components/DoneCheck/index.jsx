import React, { useState } from "react";
import "./style.css";
import useServer from "../../hooks/useServer";
import toast from "react-hot-toast";

function DoneCheck({ id, complete, setService }) {
  const [isLoading, setIsLoading] = useState(false);
  const server = useServer();

  const handleMarkAsDone = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await server.patch({
        url: `/service/${id}/done`,
        body: { done: 1 }, // Actualiza el valor de 'done' a 1
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
