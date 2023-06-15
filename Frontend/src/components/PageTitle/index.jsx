import React from "react";

const PageTitle = () => {
  // Obtiene el nombre de la página a partir de la ruta actual
  const getPageName = () => {
    const path = window.location.pathname;
    const page = path.substring(1); // Elimina el primer "/" de la ruta
    // return page || "Inicio"; // Si la página está vacía, muestra "Inicio"
  };

  const pageTitle = getPageName();

  return <h1 className="text-3xl font-bold underline">{pageTitle}</h1>;
};

export default PageTitle;
