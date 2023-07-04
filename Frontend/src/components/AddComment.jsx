import React, { useState } from "react";
import useServer from "../hooks/useServer";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const AddComment = () => {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const { post } = useServer();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

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

    if (comment.length < 10) {
      toast.error("La descripción debe tener al menos 10 caracteres");
      return;
    }

    try {
      setIsLoading(true);
      setShowForm(false);
      const formData = new FormData();
      formData.append("comment", comment);
      formData.append("serviceFile", file);

      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
          Authorization: `${user.token}`,
        },
      };

      const response = await axios.post(
        `http://localhost:3000/comments/${serviceId}`,
        formData,
        config
      );

      if (response.data) {
        toast.success("Comentario publicado con éxito");
        setComment("");
        setFile(null);
        setTimeout(() => {
          setIsLoading(false);
          setShowForm(true);
        }, 1000);
      }
    } catch (error) {
      toast.error("No se pudo publicar el comentario");
    }
  };

  return (
    <div className="add-comment p-8">
<<<<<<< HEAD
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            type="file"
            accept="image/*, .pdf, .doc, .docx"
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
=======
      {showForm && (
        <>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                type="file"
                accept="image/*, .pdf, .doc, .docx"
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
        </>
      )}
      {isLoading && <Loading />}
>>>>>>> 21003cdd636a630414afad62386c5de49fcac3f7
    </div>
  );
};

export default AddComment;
