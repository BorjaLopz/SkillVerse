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
        <h2>Añadir servicio</h2>
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

          <label for="title" class="block mb-2 font-medium text-gray-900 ">
            Your title
          </label>
          <input
            id="title"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Escriba aquí la descripción de su servicio..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            minLength={15}
          ></input>
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

          <label
            for="description"
            class="block mb-2 font-medium text-gray-900 "
          >
            Your description
          </label>
          <textarea
            id="description"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Escriba aquí la descripción de su servicio..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          ></textarea>

          <label for="categories" class="block mb-2 font-medium text-gray-900">
            Select an option
          </label>
          <select
            id="categories"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_help"
            id="file"
            type="file"
            onChange={(event) => setFile(event.target.files[0])}
          />

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
              className="publish-comment bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded content-center"
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
