import React from "react";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import Header from "../components/Header";

function ServicePage() {
  return (
    <>
      <PageTitle />
      <div className="service_page">
        <h2>Nombre del servicio seleccionado (component serviceCard.title)</h2>
        <button className="done_button">Resuelto (done)</button>
        <button className="delete_service">Delete</button>
        <h3>Descripción del servicio (component serviceCard.description)</h3>
        <div>Archivo del servicio (component)</div>
        <div>Comentarios del servicio (component commentCard)</div>
      </div>
    </>
  );
}

export default ServicePage;
