import React from "react";
import ShoppingCart from "../components/ShoppingCart";

const Shopping = () => {
  const categories = [
    "Diseño Gráfico",
    "Traducción",
    "Copywriting",
    "Programación",
    "Fotografía",
    "Audio",
    "Vídeo",
    "Otros",
  ];

  return (
    <div className="content">
      <ShoppingCart services={categories} />
    </div>
  );
};

export default Shopping;
