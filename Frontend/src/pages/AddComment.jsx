import React, { useState } from "react";
import axios from "axios";
import useServer from "../hooks/useServer";
import { toast } from "sonner";

const AddComment = () => {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const { post } = useServer();

  const getServiceIdFromURL = () => {
    const url = window.location.href;
    const parts = url.split("/");
    const serviceIdIndex = parts.findIndex((part) => part === "service");
    if (serviceIdIndex !== -1 && serviceIdIndex + 1 < parts.length) {
      return parts[serviceIdIndex + 1];
    }
    return null;
  };

  const serviceId = getServiceIdFromURL(); // Obtener el identificador del servicio de la URL

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const currentComment = {
        comment,
        file,
        serviceId,
      };

      const { data } = await post({
        url: `/comments/${serviceId}`, // Utilizar el identificador del servicio en la URL
        body: currentComment,
      });

      if (data) {
        toast.success(`Comentario creado con éxito`);
        setComment("");
        setFile(null);
      } else {
        toast.error(`No se ha podido crear el comentario. Inténtalo de nuevo.`);
      }
    } catch (error) {
      console.error("Error sending the new comment:", error);
    }
  };

  return (
    <div>
      <h2>Añadir Comentario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Comentario:</label>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <div>
          <label>Archivo:</label>
          <input
            type="file"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default AddComment;
