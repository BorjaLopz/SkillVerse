import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  return (
    <footer>
      <div className="linkedin">
        <p>
          <Link
            to="https://www.linkedin.com/in/anabelenbernardez/"
            target="_blank"
            style={{ textDecoration: "underline", color: "#523D80" }}
          >
            Ana Belén Bernárdez Martínez
          </Link>
          ,{" "}
          <Link
            to="https://www.linkedin.com/in/monica-irimia/"
            target="_blank"
            style={{ textDecoration: "underline", color: "#523D80" }}
          >
            Mónica Irimia Villarmea
          </Link>
          ,{" "}
          <Link
            to="https://www.linkedin.com/in/borjalopezdiaz/"
            target="_blank"
            style={{ textDecoration: "underline", color: "#523D80" }}
          >
            Borja López Díaz
          </Link>{" "}
          y{" "}
          <Link
            to="https://www.linkedin.com/in/fesparal/"
            target="_blank"
            style={{ textDecoration: "underline", color: "#523D80" }}
          >
            Francisco Espárraga Álvarez
          </Link>{" "}
          para
          <Link
            to="https://www.hackaboss.com/"
            target="_blank"
            style={{ textDecoration: "underline", color: "#523D80" }}
          >
            {" "}
            HACK A BOSS
          </Link>{" "}
          en 2023
        </p>
      </div>
    </footer>
  );
};

export default Footer;
