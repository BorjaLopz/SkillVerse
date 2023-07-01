import React, { useState } from "react";
import useServer from "../hooks/useServer";
import toast from "react-hot-toast";
import { categories } from "../config";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const AddService = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredType, setRequiredType] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useAuth();

  const { post } = useServer();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("request_body", description);
      formData.append("required_type", requiredType);
      formData.append("file", file);

      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "multipart/form-data",
          Authorization: `${user.token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:3000/service/add",
        formData,
        config
      );

      if (response.status === 200) {
        toast.success(`Servicio ${title} creado con éxito`);
        setTitle("");
        setDescription("");
        setRequiredType("");
        setFile(null);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        toast.error(error.response.data.message);
      } else {
        toast.error(`No se ha podido generar el servicio. ${error}`);
      }
    }
  };

  return (
    <div className="add-service">
      <h2
        className="text-4xl font-bold tracking-tight text-center"
        style={{ color: "#523d80" }}
      >
        Añadir servicio
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="block mb-2 font-medium text-gray-900">
          Título:
        </label>
        <input
          id="title"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Escriba aquí el título del servicio.."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          minLength={15}
        />

        <label
          htmlFor="description"
          className="block mb-2 font-medium text-gray-900"
        >
          Descripción:
        </label>
        <textarea
          id="description"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Escriba aquí la descripción del servicio..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />

        <select
          id="categories"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={requiredType}
          onChange={(event) => setRequiredType(event.target.value)}
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file"
        >
          Subir archivo:
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_help"
          id="file"
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
        />

        <div>
          <button
            className="publish-comment text-white font-bold py-2 px-4 rounded content-center bg-indigo-500 hover:bg-indigo-700"
            type="submit"
          >
            Crear servicio
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
