import { useState } from "react";
import axios from "axios";

const EditProfile = ({ id, admin }) => {
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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateKoFiURL = (value) => {
    const koFiURLRegex = /^https?:\/\/(?:www\.)?ko-fi\.com\/[a-zA-Z0-9]+$/;
    return koFiURLRegex.test(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateKoFiURL(formData.ko_fi)) {
      setError("Por favor, introduce una URL válida de Ko-fi.");
      return;
    }

    try {
      const response = await axios.put(`/user/${id}/edit`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFormData(response.data);
      setSuccessMessage("¡Perfil actualizado exitosamente!");
    } catch (error) {
      console.error(error);
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
         Ko-Fi:
          <div>
            < a href={"https://ko-fi.com/monica77156"} target="_blank" rel="noopener noreferrer">
          <img
              src="/fotosUsuario/ko-fi-icon.svg"
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

export default EditProfile

