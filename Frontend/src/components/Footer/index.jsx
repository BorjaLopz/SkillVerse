import React from "react";
import { Link } from "react-router-dom";
// import "./style.css";

const Footer = () => {
  return (
    <footer>
      <div className="linkedin">
        <p>
          <Link to="https://www.linkedin.com/in/anabelenbernardez/">
            Ana Belén Bernárdez Martínez
          </Link>
          ,{" "}
          <Link to="https://www.linkedin.com/in/fesparal/">
            Francisco Espárraga Álvarez
          </Link>
          ,{" "}
          <Link to="https://www.linkedin.com/in/monica-irimia/">
            Mónica Irimia Villarmea
          </Link>
          , y{" "}
          <Link to="https://www.linkedin.com/in/borjalopezdiaz/">
            Borja López Díaz
          </Link>{" "}
          para
          <Link to="https://www.hackaboss.com/"> Hack A Boss</Link> en 2023
        </p>
      </div>
      <div>
        <a href="mailto:portaldigital@help.es">Contáctanos</a>
      </div>
    </footer>
  );
};

export default Footer;
