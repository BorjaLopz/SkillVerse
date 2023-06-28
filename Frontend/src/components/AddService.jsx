import React, { useState } from "react";
import useServer from "../hooks/useServer";
import toast from "react-hot-toast";

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

      console.log(data);

      if (data) {
        toast.success(`Servicio ${title} creado con éxito`);
        setTitle("");
        setDescription("");
        setRequiredType("");
        setFile(null);
      } else {
        toast.error(`No se ha podido crear el servicio. Inténtalo de nuevo.`);
      }
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
    "Otros",
  ];

  return (
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
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>
        <button className="publish-service" type="submit">
          Crear servicio
        </button>
      </form>
    </div>
  );
};

export default AddService;
