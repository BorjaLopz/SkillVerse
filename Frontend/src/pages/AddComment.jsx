import React, { useState } from "react";
import axios from "axios";
import useServer from "../hooks/useServer";
import { toast } from "sonner";

const AddComment = () => {
  const [comment, setComment] = useState("");


  const { post } = useServer();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const currentComment = {
        comment,
        file,
      };

      const { data } = await post({
        url: "/comments/:id",
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
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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

export default AddComent;
