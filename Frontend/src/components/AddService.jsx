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

      console.log(typeof formData.get("required_type"));
      console.log(formData.get("required_type"));

      //#endregion //formData

      const currentService = {
        title,
        request_body: description,
        service_type: requiredType,
        file: file,
      };

      // await axios({
      //   method: "post",
      //   url: "/service/add",
      //   data: formData,
      //   headers: { "Content-Type": "multipart/form-data" },
      // })
      //   .then(function (response) {
      //     //handle success
      //     console.log(response);
      //   })
      //   .catch(function (response) {
      //     //handle error
      //     console.log(response);
      //   });

      // const { data } = await post({
      //   url: "/service/add",
      //   body: formData,
      //   headers: { "content-type": "multipart/form-data" },
      // });

      /* Config para el axios (le pasamos token, y multipart para los archivos) */
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "multipart/form-data",
          Authorization: `${user.token}`,
        },
      };

      const data = axios
        .post("http://localhost:3000/service/add", formData, config)
        .then((resp) => {
          console.log(resp.data);
        });

      console.log(data);

      if (data) {
        toast.success(`Servicio ${title} creado con éxito`);
        // setTitle("");
        // setDescription("");
        // setRequiredType("");
        // setFile("");
      } else {
        toast.error(`No se ha podido crear el servicio. Inténtalo de nuevo.`);
      }
    } catch (error) {
      console.error("Error sending the new service:", error);
    }
  };

  /* PRUEBAS */
  const handleFileChange = (e) => {
    //define file change
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(e.target);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("request_body", description);
    formData.append("service_type", "requiredType");
    formData.append("file", file);

    const { message: data } = await post({
      url: "/service/add",
      body: formData,
    });

    // const data = new FormData();
    // data.append("file", file)
  };
  /* FIN PRUEBAS */

  return (
    <>
      <div className="add-service">
        <h2>Añadir servicio</h2>
        <form onSubmit={handleSubmit}>
          <div className="title">
            <label>Título:</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="description">
            <label>Descripción:</label>
            <textarea
              placeholder="Escriba aquí la descripción de su servicio..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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
            <label>Archivo:</label>
            <input
              type="file"
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
