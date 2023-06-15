import React from "react";
import AddService from "./AddService.jsx";
import PageTitle from "../components/PageTitle/index.jsx";
import SearchBar from "../components/SearchBar.jsx";
import ServicesList from "../components/ServicesList.jsx";

function AllServicesPage() {
  return (
    <>
      <PageTitle />
      {/* Índice de todos los servicios y por tipo o */}
      <SearchBar />
      <ServicesList />
      <AddService />
      {/* si está logueado, sino te manda a loguearte / sign up */}
    </>
  );
}

export default AllServicesPage;
