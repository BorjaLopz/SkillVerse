import React from "react";
import AddService from "./AddService.jsx";
import PageTitle from "../components/PageTitle/index.jsx";
import Header from "../components/Header/index.jsx";
import SearchBar from "../components/SearchBar.jsx";
import ServicesList from "../components/ServicesList.jsx";
import Footer from "../components/Footer/index.jsx";

function Services() {
  return (
    <>
      <Header />
      <PageTitle />
      {/* Índice de todos los servicios y por tipo o */}
      <SearchBar />
      <ServicesList />
      <AddService />
      {/* si está logueado, sino te manda a loguearte / sign up */}
      <Footer />
    </>
  );
}

export default Services;
