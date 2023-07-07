import React from "react";
import TheTeam from "../TheTeam";
import "./style.css";

function About() {
  return (
    <div className="about">
      <h2 className="welcome">¡Bienvenid💜s!</h2>
      <p>
        ¿Necesitas ayuda con un proyecto digital? ¡Estás en el lugar correcto!
        Somos una plataforma que conecta a personas que necesitan servicios
        digitales con profesionales talentosos de todo el mundo. Nuestra misión
        es brindarte acceso a una amplia gama de habilidades y conocimientos
        para que puedas obtener resultados excepcionales.
      </p>
      <h3>Cómo funciona</h3>
      <p>
        Explora nuestros servicios: Descubre una amplia variedad de servicios
        digitales disponibles en nuestra web. Ya sea que necesites u ofrezcas
        diseño gráfico, traducción, programación, fotografía o cualquier otra
        habilidad, ¡seguro encontrarás lo que estás buscando!
      </p>
      <h3>Únete a nuestra comunidad</h3>
      <p>
        Puedes mostrar tus habilidades, ganar experiencia trabajando en
        proyectos interesantes y establecer relaciones con clientes y
        profesionales satisfechos de todo el mundo. No importa si estás buscando
        ayuda o deseas ofrecer tus servicios, somos el lugar perfecto para
        conectar y lograr tus metas digitales. ¡Regístrate hoy mismo y descubre
        todo lo que nuestra plataforma tiene para ofrecerte!
      </p>
      <div className="contact">
        <a href="mailto:skillverse@help.es">Contáctanos</a>
      </div>
      <TheTeam />
    </div>
  );
}

export default About;
