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
          <div className="title">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              minLength={15}
            />
          </div>
          <div className="description">
            <label htmlFor="description">Descripción:</label>
            <textarea
              placeholder="Escriba aquí la descripción de su servicio..."
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              minLength={15}
            />
          </div>
          <div className="service-category">
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
          </div>
          <div className="service-file">
            <label htmlFor="file">Archivo:</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </div>

          {/* <div className="service-file">
            <label>Archivo:</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={(event) => handleFileChange(event)}
            />
          </div> */}
          <button className="publish-service" type="submit">
            Crear servicio
          </button>
        </form>
      </div>
    </>
  );
};

export default AddService;
