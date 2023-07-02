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
      <h2 className="text-2xl font-bold mb-4">Añadir Comentario</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg px-8">
        <div className="comment mb-4">
          <label className="block mb-2 text-gray-800 font-bold">
            Comentario:
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Escriba aquí su comentario..."
            required
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <div className="file mb-4">
          <label className="block mb-2 text-gray-800 font-bold">Archivo:</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            type="comment-file"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>
        <button
          className="publish-comment bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default AddComment;
