import React, { useState } from "react";

const Search = ({ onSearch, services }) => {
  const [selectedService, setSelectedService] = useState("");

  const handleSelectChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleSearch = () => {
    onSearch(selectedService);
  };

  return (
    <div className="search_bar">
      <select value={selectedService} onChange={handleSelectChange}>
        {services.map((service, index) => (
          <option key={index} value={service}>
            {service}
          </option>
        ))}
      </select>
      <button onClick={handleSearch} className="search_button">
        Buscar
      </button>
    </div>
  );
};

const SearchBar = () => {
  const categories = [
    "Todos los servicios",
    "Diseño Gráfico",
    "Traducción",
    "Copywriting",
    "Programación",
    "Fotografía",
    "Audio",
    "Vídeo",
  ];

  const handleSearch = (selectedService) => {
    console.log("Selected service:", selectedService);
  };

  return (
    <div>
      <Search services={categories} onSearch={handleSearch} />
    </div>
  );
};

export default SearchBar;
