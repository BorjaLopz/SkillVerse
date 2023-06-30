import React, { useState } from "react";
import useServer from "../hooks/useServer";
import toast from "react-hot-toast";

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
      };

      const { data } = await post({
        url: `/comments/${serviceId}`,
        body: currentComment,
      });

      console.log(data);

      if (data) {
        toast.success(`Comentario enviado con éxito`);
        setComment("");
        setFile(null);
      } else {
        toast.error(`No se ha podido crear el comentario. Inténtalo de nuevo.`);
      }
    } catch (error) {
      console.error("Error sending the new service:", error);
    }
  };

  return (
    <div className="add-comment p-8">
      <h2
        className="text-4xl font-bold tracking-tight text-center"
        style={{ color: "#523d80" }}
      >
        Añadir comentarios
      </h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg px-8">
        <div className="comment mb-4">
          <label className="block">
            <span className="text-gray-700">Comentario:</span>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Escriba aquí su comentario..."
              required
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
        </div>
        <label className="block">
          <span className="text-gray-700">Subir archivo:</span>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            aria-describedby="file_help"
            id="file"
            type="file"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </label>
        <button
          className="publish-comment text-white font-bold py-2 px-4 rounded content-center bg-indigo-500 hover:bg-indigo-700"
          type="submit"
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default AddComment;
