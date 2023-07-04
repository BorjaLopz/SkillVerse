import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  return (
    <footer>
      <div className="linkedin">
        <p>
          {" "}
          Hecho con 💜 para
          <Link className="hab" to="https://www.hackaboss.com/" target="_blank">
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
