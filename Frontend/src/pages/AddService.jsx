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

      const { data } = await post({ url: "/service/add", body: currentService });

      if(data) {
        toast.success(`Servicio ${title} creado con exito`);
        setTitle("");
        setDescription("");
        setRequiredType("");
        setFile(null);
      }
      else
      {
        toast.error(`No se ha podido crear el servicio. Intentalo de nuevo`)
      }

      // let object = localStorage.getItem("portalDigital");
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

  return (
    <>
      <div>
        <h2>Add Service</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div>
            <label>Required Type:</label>
            <input
              type="text"
              value={requiredType}
              onChange={(event) => setRequiredType(event.target.value)}
            />
          </div>
          <div>
            <label>File:</label>
            <input
              type="file"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default AddService;
