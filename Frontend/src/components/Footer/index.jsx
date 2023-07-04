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
