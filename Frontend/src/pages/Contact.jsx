import React, { useState } from "react";
import axios from "axios";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/contact", {
        name,
        email,
        message,
      });

      console.log("Respuesta del servidor:", response.data);

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <h1>Contacto</h1>
      <p>Utiliza el siguiente formulario para contactarnos:</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Mensaje:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          Enviar
        </button>
      </form>
      <h2>O envíanos un e-mail a la siguiente dirección:</h2>
      <a href="mailto:portaldigital@help.es">portaldigital@help.es</a>
    </div>
  );
};

export default ContactPage;
