import React from "react";
import { Link } from "react-router-dom";
// import "./style.css";

const Footer = () => {
  return (
    <footer>
      <div className="linkedin">
        <p>
          <Link
            to="https://www.linkedin.com/in/anabelenbernardez/"
            target="_blank"
            style={{ textDecoration: "underline", color: "blue" }}
          >
            Ana Belén Bernárdez Martínez
          </Link>
          ,{" "}
          <Link
            to="https://www.linkedin.com/in/monica-irimia/"
            target="_blank"
            style={{ textDecoration: "underline", color: "blue" }}
          >
            Mónica Irimia Villarmea
          </Link>
          ,{" "}
          <Link
            to="https://www.linkedin.com/in/borjalopezdiaz/"
            target="_blank"
            style={{ textDecoration: "underline", color: "blue" }}
          >
            Borja López Díaz
          </Link>{" "}
          y{" "}
          <Link
            to="https://www.linkedin.com/in/fesparal/"
            target="_blank"
            style={{ textDecoration: "underline", color: "blue" }}
          >
            Francisco Espárraga Álvarez
          </Link>{" "}
          para
          <Link
            to="https://www.hackaboss.com/"
            target="_blank"
            style={{ textDecoration: "underline", color: "blue" }}
          >
            {" "}
            HACK A BOSS
          </Link>{" "}
          en 2023
        </p>
      </div>
      <div className="footer-contact">
        <a
          href="mailto:portaldigital@help.es"
          style={{ textDecoration: "underline", color: "blue" }}
        >
          Contáctanos
        </a>
      </div>
    </footer>
  );
};

export default Footer;
