// import React, { useState } from "react";

// const ContactPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [description, setDescription] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setIsSubmitting(true);

//     try {
//       const correoDestino = "ana.b.95@hotmail.com";
//       const asunto = "Mensaje desde formulario de contacto";
//       const cuerpoMensaje =
//         "Nombre: " +
//         name +
//         "\n\nEmail: " +
//         email +
//         "\n\nMensaje: " +
//         description;

//       const link =
//         "mailto:" +
//         correoDestino +
//         "?subject=" +
//         encodeURIComponent(asunto) +
//         "&body=" +
//         encodeURIComponent(cuerpoMensaje);

//       window.location.href = link;

//       setName("");
//       setEmail("");
//       setDescription("");
//       console.log("Formulario enviado correctamente");
//     } catch (error) {
//       console.error("Error al enviar el formulario:", error);
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div>
//       <h2>Utiliza el siguiente formulario para contactarnos</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Nombre:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Correo electrónico:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description">Mensaje:</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <button type="submit" disabled={isSubmitting}>
//           Enviar
//         </button>
//       </form>
//       <h2>O envíanos un e-mail a la siguiente dirección:</h2>
//       <a href="mailto:portaldigital@help.es">portaldigital@help.es</a>
//     </div>
//   );
// };

// export default ContactPage;
