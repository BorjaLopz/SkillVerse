import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const validateKoFiURL = (value) => {
  if (value.trim() === "") {
    return true; // No se valida si está vacío
  }
  const koFiURLRegex = /^https?:\/\/(?:www\.)?ko-fi\.com\/[a-zA-Z0-9]+$/;
  return koFiURLRegex.test(value);
};

const EditProfile = ({ id }) => {
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
    setFormData((prevFormData) => ({
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
      const response = await axios.put(
        `http://localhost:3000/user/${user.user.id}/edit`,
        formData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `${user.token}`,
          },
        }
      );

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
      <h2
        className="text-4xl font-bold tracking-tight text-center"
        style={{ color: "#523d80" }}
      >
        Editar perfil
      </h2>
      <form onSubmit={handleSubmit} className="mt-6">
        <label className="block">
          <span className="text-gray-700">Correo electrónico:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Avatar:</span>
          <input
            type="text"
            name="userPhoto"
            value={formData.userPhoto}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Nickname:</span>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Nombre:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Apellido:</span>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Contraseña:</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Biografía:</span>
          <textarea
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Ko-Fi:</span>
          <input
            type="URL"
            name="ko_fi"
            value={formData.ko_fi}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <label className="block">
          <br />

          <div>
            <a
              href="https://ko-fi.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/icons/ko-fi-icon.svg"
                alt="Ko-fi"
                style={{ width: "40px", height: "40px" }}
              />
            </a>
          </div>
        </label>
        <br />

        <button
          className="publish-comment text-white font-bold py-2 px-4 rounded content-center bg-indigo-500 hover:bg-indigo-700"
          type="submit"
        >
          Guardar cambios
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
      {/* {renderAdminContent()} */}
    </div>
  );
};

export default EditProfile;
