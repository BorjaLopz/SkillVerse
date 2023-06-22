import React from "react";
import AddService from "./AddService.jsx";
import ServicesList from "../components/ServicesList.jsx";

function AllServicesPage() {
  return (
    <>
      <main>
        {/* Índice de todos los servicios y por tipo o */}
        <ServicesList />
        <AddService />
        {/* si está logueado, sino te manda a loguearte / sign up */}
      </main>
    </>
  );
}

export default AllServicesPage;
