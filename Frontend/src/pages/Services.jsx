import React from "react";
import Search from "../components/SearchBar.jsx";
import AddService from "./AddService.jsx";

function Services() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Services</h1>
      <Search />
      <AddService />
    </>
  );
}

export default Services;
