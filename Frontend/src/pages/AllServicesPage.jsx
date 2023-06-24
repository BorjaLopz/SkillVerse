import React from "react";
import AddService from "./AddService.jsx";
import ServicesList from "../components/ServicesList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";

function AllServicesPage() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <main>
        <SearchBar />
        <ServicesList />
        {isAuthenticated && <AddService />}{" "}
        {/* Muestra AddService solo si el usuario está autenticado */}
        {!isAuthenticated && (
          <p>
            <NavLink
              to="/signup"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              Regístrate
            </NavLink>{" "}
            o{" "}
            <NavLink
              to="/login"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              inicia sesión
            </NavLink>{" "}
            para agregar servicios.
          </p>
        )}
      </main>
    </>
  );
}

export default AllServicesPage;
