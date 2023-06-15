import React from "react";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import Header from "../components/Header";

function ServicePage() {
  return (
    <>
      <Header />
      <PageTitle />
      <h2>Nombre del servicio seleccionado (component serviceCard.title)</h2>
      <button>Resuelto (done)</button>
      <button>Delete</button>
      <h3>Descripción del servicio (component serviceCard.description)</h3>
      <div>Archivo del servicio (component)</div>
      <div>Comentarios del servicio (component commentCard)</div>
      <Footer />
    </>
  );
}

export default ServicePage;
