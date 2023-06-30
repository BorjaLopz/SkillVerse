import {  useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const validateKoFiURL = (value) => {
  if (value.trim() === "") {
    return true; // No se valida si está vacío
  }
  const koFiURLRegex = /^https?:\/\/(?:www\.)?ko-fi\.com\/[a-zA-Z0-9]+$/;
  return koFiURLRegex.test(value);
};

const EditProfile = ({id}) => {
   const [formData, setFormData] = useState({
    email: "",
    userPhoto: "",
    nickname: "",
    name: "",
    surname: "",
    password: "",
    biography: "",
    ko_fi: "",
  });
 
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

 

  const { user } = useAuth();

  const handleChange = (event) => {   
  const { name, value } = event.target;
  setFormData((prevFormData) =>({
    ...prevFormData,
    [name]: value,
  }));

   if (name === "ko_fi") {
    if (!validateKoFiURL(value)) {
      setError("Por favor, introduce una URL válida de Ko-fi.");
    } else {
      setError("");
      
    }
  }
};

    const handleSubmit = async (event) => {

    event.preventDefault();

    if (!validateKoFiURL(formData.ko_fi)) {
      setError("Por favor, introduce una URL válida de Ko-fi.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/user/${user.user.id}/edit`, formData, {
        headers: {
           "Access-Control-Allow-Origin": "*",
          Authorization: `${user.token}`,
        },
      });

      setFormData(response.data);
      setSuccessMessage("¡Perfil actualizado exitosamente!");
    } catch (error) {
      //console.error(error);
      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      }
    }
  };



  return (
    <div className="edit-profile">
      <h2>Editar perfil</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Avatar:
          <input
            type="text"
            name="userPhoto"
            value={formData.userPhoto}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Nickname:
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Apellido:
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Biografía:
          <textarea
            name="biography"
            value={formData.biography}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Ko-fi:
          <input
            type="URL"
            name="ko_fi"
            value={formData.ko_fi}
            onChange={handleChange}
          />
        </label>

        <label>
          <br />

          <div>

            < a href= "https://ko-fi.com" target="_blank" rel="noopener noreferrer">
          <img
              src="/icons/ko-fi-icon.svg"
              alt="Ko-fi"
              style={{ width: "40px", height: "40px" }}
            />
             </a>

          </div>
        </label>
        <br />

        <button type="submit">Guardar cambios</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      {/* {renderAdminContent()} */}
    </div>
  );
};

export default EditProfile;
