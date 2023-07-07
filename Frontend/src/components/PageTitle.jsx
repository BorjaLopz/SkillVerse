import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const updatePageTitle = () => {
      const currentPath = window.location.pathname;
      let pageTitle = "SkillVerse";

      if (currentPath === "/") {
        pageTitle = "Inicio";
      } else if (currentPath === "/about") {
        pageTitle = "Conócenos";
      } else if (currentPath === "/services") {
        pageTitle = "Servicios";
      } else if (currentPath === "/login") {
        pageTitle = "Iniciar sesión";
      } else if (currentPath === "/signup") {
        pageTitle = "Registrarse";
      } else if (currentPath === "/users") {
        pageTitle = "Usuari@s";
      } else if (currentPath === "*") {
        pageTitle = "404 - Not Found";
      } else if (currentPath.startsWith("/profile/")) {
        pageTitle = "Perfil";
      } else if (currentPath.startsWith("/service/")) {
        pageTitle = "Servicio";
      } else if (currentPath.startsWith("/user/")) {
        pageTitle = "Usuario";
      }

      document.title = "SkillVerse | " + pageTitle;
    };
    setTimeout(updatePageTitle, 0);
  }, [location]);

  return null;
}

export default PageTitle;
