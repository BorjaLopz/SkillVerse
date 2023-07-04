import React, { useState } from "react";
import "./style.css";

const ShoppingCart = ({ services }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const addToCart = (service) => {
    setSelectedServices([...selectedServices, service]);
  };

  const removeFromCart = (service) => {
    setSelectedServices(selectedServices.filter((s) => s !== service));
  };

  return (
    <div className="container">
      <h2>Carrito de compra</h2>

      <h3>Servicios disponibles:</h3>
      <ul>
        {services.map((service) => (
          <li key={service} className="service-item">
            <span className="service-name">{service}</span>
            <button className="button" onClick={() => addToCart(service)}>
              Añadir al carrito
            </button>
          </li>
        ))}
      </ul>

      <h2 className="selected-services">Servicios seleccionados:</h2>
      {selectedServices.length === 0 ? (
        <p>No hay servicios seleccionados</p>
      ) : (
        <ul>
          {selectedServices.map((service) => (
            <li key={service}>
              {service}
              <button
                className="remove-button"
                onClick={() => removeFromCart(service)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
