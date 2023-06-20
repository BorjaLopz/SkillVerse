import React, { useState } from "react";
import axios from "axios";
import useServer from "../hooks/useServer";
import { toast } from "sonner";

const AddService = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredType, setRequiredType] = useState("");
  const [file, setFile] = useState(null);

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

      const currentService = {
        title,
        request_body: description,
        service_type: requiredType,
        file,
      };

      const { data } = await post({
        url: "/service/add",
        body: currentService,
      });

      if (data) {
        toast.success(`Servicio ${title} creado con éxito`);
        setTitle("");
        setDescription("");
        setRequiredType("");
        setFile(null);
      } else {
        toast.error(`No se ha podido crear el servicio. Inténtalo de nuevo.`);
      }

      // let object = localStorage.getItem("portaldigital");
      // const objectParsed = JSON.parse(object);
      // console.log(`${objectParsed.token}`);

      // const response = await fetch("http://localhost:3000/service/add", {
      //   method: "POST",
      //   headers: {
      //     Authorization: `${objectParsed.token}`,
      //   },
      //   body: "prueba que estamos haciendo ahora mismo",
      // });

      // console.log(response);

      // if (response.ok) {
      //   const data = await response.json();
      //   console.log(data);
      // } else {
      //   throw new Error("Error adding the service");
      // }
    } catch (error) {
      console.error("Error sending the new service:", error);
    }
  };

  const categories = [
    "Diseño Gráfico",
    "Traducción",
    "Copywriting",
    "Programación",
    "Fotografía",
    "Audio",
    "Vídeo",
  ];

  return (
    <>
      <div>
        <h2>Añadir servicio</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div>
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
          <div>
            <label>Archivo:</label>
            <input
              type="file"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </>
  );
};

export default AddService;
