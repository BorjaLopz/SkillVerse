import React from "react";
import SearchBar from "../components/SearchBar.jsx";
import AddService from "./AddService.jsx";

function Services() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Services</h1>
      <SearchBar />
      <AddService />
    </>
  );
}

export default Services;
 