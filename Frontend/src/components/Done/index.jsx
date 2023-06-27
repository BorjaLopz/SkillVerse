import React, { useState } from "react";
import "./style.css";
import useServer from "../hooks/useServer";
import toast from "react-hot-toast";

function DoneCheck({ id, markDone }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const server = useServer();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await server.patch({
        url: `service/${id}/done`,
        body: { id },
      });

      if (!error) {
        markDone({ serviceId: id, complete: true });
        toast.success(`Servicio ${id} completado con éxito`);
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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={`container ${isChecked ? "checked" : ""}`}>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          Marcar como completado
        </label>
        <button className="accept" type="submit" disabled={isLoading}>
          {isLoading ? "Completando..." : "Aceptar"}
        </button>
      </form>
    </div>
  );
}

export default DoneCheck;
