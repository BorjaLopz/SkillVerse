import React from "react";
import AddService from "./AddService.jsx";
import ServicesList from "../components/ServicesList.jsx";
import useAuth from "../hooks/useAuth";

function AllServicesPage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <main>
        {/* Índice de todos los servicios y por tipo o */}
        <ServicesList />
        {isAuthenticated && <AddService />}
        {/* <AddService /> */}
        {/* si está logueado, sino te manda a loguearte / sign up */}
      </main>
    </>
  );
}

export default AllServicesPage;
