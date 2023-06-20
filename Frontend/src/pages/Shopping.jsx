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
  ];

  return (
    <>
      <div>
        <h1>Página de compra</h1>
        <div className="content">
          <ShoppingCart services={categories} />
        </div>
      </div>
    </>
  );
};

export default Shopping;
