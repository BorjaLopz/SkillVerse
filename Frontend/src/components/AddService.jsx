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
  // console.log(user);

  const { post } = useServer();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //#region //formData por implementar bien
      const formData = new FormData();

      formData.append("title", title);
      formData.append("request_body", description);
      formData.append("required_type", requiredType);
      formData.append("file", file);

      //#endregion //formData

      /* Config para el axios (le pasamos token, y multipart para los archivos) */
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "multipart/form-data",
          Authorization: `${user.token}`,
        },
      };

      // await axios
      //   .post("http://localhost:3000/service/add", formData, config)
      //   .then((resp) => {
      //     toast.success(`Servicio ${title} creado con éxito`);
      //     setTitle("");
      //     setDescription("");
      //     setRequiredType("");
      //     setFile(null);
      //   });

      await axios
        .post("http://localhost:3000/service/add", formData, config)
        .catch(function (e) {
          if (e.response) {
            console.log(e.response.data);
            toast.error(e.response.data.message);
          }
        });
    } catch (error) {
      toast.error(`No se ha podido generaro el servicio. ${error}`);
    }
  };

  return (
    <>
      <div className="add-service">
        <h2
          className="text-4xl font-bold tracking-tight text-center"
          style={{ color: "#523d80" }}
        >
          Añadir servicio
        </h2>
        <form onSubmit={handleSubmit}>
          {/* <div className="title">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              minLength={15}
            />
          </div> */}

          <label className="block">
            <span className="text-gray-700">Título:</span>
            <input
              id="title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Escriba aquí el título del servicio.."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              minLength={15}
            />
          </label>
          {/* ANTIGUO TEXT AREA */}
          {/* <div className="description">
            <label htmlFor="description">Descripción:</label>
            <textarea
              minLength={20}
              placeholder="Escriba aquí la descripción de su servicio..."
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div> */}

          <label for="description" className="block">
            <span className="text-gray-700">Descripción:</span>
            <textarea
              id="description"
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Escriba aquí la descripción del servicio..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </label>
          <select
            id="categories"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={requiredType}
            onChange={(event) => setRequiredType(event.target.value)}
          >
            <option value="">Selecciona una categoría</option>{" "}
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* ANTIGUO SELECCION DE CATEGORIA */}
          {/* <div className="service-category">
            <label>Categoría del servicio:</label>
            <select
              value={requiredType}
              onChange={(event) => setRequiredType(event.target.value)}
            >
              <option value="">Selecciona una categoría</option>{" "}
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div> */}

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

          {/* ANTIGUO SELECCION DE ARCHIVOS */}
          {/* <div className="service-file">
            <label htmlFor="file">Archivo:</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </div> */}

          {/* <button className="publish-service" type="submit">
            Crear servicio
          </button> */}
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
    </>
  );
};

export default AddService;
