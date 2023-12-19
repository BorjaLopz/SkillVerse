import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useServer from "../../hooks/useServer";
import "./style.css";
import AddService from "../AddService";
import useAuth from "../../hooks/useAuth.js";
import SelectCategoryComponent from "../SelectCategoryComponent/SelectCategoryComponent.jsx";
import { categories } from "../../config.js";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [servicesAvailables, setServicesAvailables] = useState(false);
  const [categorySelected, setCategorySelected] = useState(categories[0]);

  const [newServiceAdded, setNewServiceAdded] = useState(false);

  const { get } = useServer();
  const { isAuthenticated } = useAuth();

  const handleChangeSelect = (e) => {
    setCategorySelected(e);
  };

  const handleAddNewService = () => {
    setNewServiceAdded(!newServiceAdded);
  };

  const fetchAllServices = async () => {
    try {
      const resp = await fetch(`http://localhost:3000/service`);
      const { serviceData: data } = await resp.json();

      if (typeof data === "object") {
        const service = data.map((s) => ({
          id: s.id,
          title: s.title,
          request_body: s.request_body,
          service_type: s.service_type,
          user_id: s.user_id,
          done: s.done,
          creation_date: s.creation_date.split("T")[0],
        }));

        setServices(service);
        setServicesAvailables(true);
      }
    } catch (e) {
      console.log("Error getting services: ", e);
    }
  };

  const fetchFilterServices = async () => {
    try {
      const resp = await fetch(`http://localhost:3000/service`);
      const { serviceData: data } = await resp.json();

      if (typeof data === "object") {
        const service = data.map((s) => ({
          id: s.id,
          title: s.title,
          request_body: s.request_body,
          service_type: s.service_type,
          user_id: s.user_id,
          done: s.done,
          creation_date: s.creation_date.split("T")[0],
        }));

        setServices(service.filter((s) => s.service_type === categorySelected));

        setServicesAvailables(
          service.filter((s) => s.service_type === categorySelected).length > 0
            ? true
            : false
        );
      }
    } catch (e) {
      console.log("Error getting services: ", e);
    }
  };

  // useEffect(() => {
  //   // Esta función obtiene los servicios nuevos o actualizados
  //   const fetchNewServices = async () => {
  //     try {
  //       const resp = await fetch(`http://localhost:3000/service`);
  //       const { serviceData: data } = await resp.json();

  //       if (typeof data === "object") {
  //         const newServices = data.map((s) => ({
  //           id: s.id,
  //           title: s.title,
  //           request_body: s.request_body,
  //           service_type: s.service_type,
  //           user_id: s.user_id,
  //           done: s.done,
  //           creation_date: s.creation_date.split("T")[0],
  //         }));

  //         setServices((prevServices) => {
  //           const updatedServices = newServices.filter((newService) =>
  //             prevServices.some((oldService) => oldService.id === newService.id)
  //           );

  //           const filteredServices = prevServices
  //             .filter((prevService) =>
  //               updatedServices.every(
  //                 (updatedService) => updatedService.id !== prevService.id
  //               )
  //             )
  //             .concat(newServices);

  //           return filteredServices;
  //         });

  //         setServicesAvailables(true);
  //       }
  //     } catch (e) {
  //       console.log("Error getting services: ", e);
  //     }
  //   };

  //   const intervalId = setInterval(() => {
  //     fetchNewServices();
  //   }, 500);

  //   return () => clearInterval(intervalId);
  // }, [categorySelected]);

  useEffect(() => {
    if (categorySelected !== categories[0]) {
      fetchFilterServices();
    } else {
      fetchAllServices();
    }
  }, [categorySelected]);

  useEffect(() => {
    fetchAllServices();
  }, [newServiceAdded]);

  return (
    <>
      <div className="servicios">
        <div className="container">
          {isAuthenticated && <AddService handleAddNewService={handleAddNewService} />}
          {isAuthenticated && (
            <SelectCategoryComponent handleChangeSelect={handleChangeSelect} />
          )}

          <div className="grid-available">
            {!servicesAvailables && (
              <p className="services-none">No hay ningún servicio aún</p>
            )}
            {services.map((service) => (
              <div
                key={service.id}
                className={`card ${service.done ? "done" : ""}`}
              >
                <Link to={`/service/${service.id}`}>
                  {service.done ? (
                    <img
                      className="check-icon-services"
                      src={"/icons/check-circle.png"}
                      alt="check"
                    />
                  ) : (
                    ""
                  )}
                  <div className="card-content">
                    <p
                      className={`date ${service.done ? "card-done-text" : ""}`}
                    >
                      {service.creation_date.split("-")[2]}-
                      {service.creation_date.split("-")[1]}-
                      {service.creation_date.split("-")[0]}
                    </p>
                    <h3 className="card-title-list">{service.title}</h3>
                    <p className="description">{service.request_body}</p>
                    <p className="service-type">{service.service_type}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesList;
