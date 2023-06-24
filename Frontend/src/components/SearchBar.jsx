import React, { useState, useEffect } from "react";

const Search = ({ onSearch, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearch = () => {
    onSearch(selectedCategory);
  };

  return (
    <div className="search_bar">
      <select value={selectedCategory} onChange={handleSelectChange}>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
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
    "Otros",
  ];

  const [services, setServices] = useState([]);

  useEffect(() => {
    // Realizar la solicitud POST para obtener los servicios y sus categorías
    fetch("URL_DE_TU_API", {
      method: "POST",
      // Agregar cualquier encabezado o cuerpo de solicitud necesario
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualizar la lista de servicios en el estado
        setServices(data.services);
      })
      .catch((error) => {
        console.error("Error al obtener los servicios:", error);
      });
  }, []);

  const [filteredServices, setFilteredServices] = useState([]);

  const handleSearch = (selectedCategory) => {
    if (selectedCategory === "Todos los servicios") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(
        (service) => service.categoria === selectedCategory
      );
      setFilteredServices(filtered);
    }
  };

  return (
    <div>
      <Search categories={categories} onSearch={handleSearch} />
      <ul>
        {filteredServices.map((service, index) => (
          <li key={index}>{service.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
