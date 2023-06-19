import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import useServer from "../hooks/useServer";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const { get } = useServer();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // const { data } = await get({ url: "/service" });
        // console.log(data);
        const resp = await fetch(`http://localhost:3000/service`);
        const { message: data } = await resp.json();

        const services = data.map((s) => ({
          id: s.id,
          title: s.title,
          request_body: s.request_body,
          service_type: s.service_type,
          user_id: s.user_id,
        }));
        setServices(services);
      } catch (e) {
        console.log("Error getting services: ", e);
      }
      // try {
      //   const response = await axios.get("/service", {
      //     headers: { Authorization: "Bearer " + getToken() },
      //   });

      //   const { data } = response;
      //   const { services } = data;

      //   setServices(services);
      //   setFilteredServices(services);
      // } catch (error) {
      //   console.error("Error getting services:", error);
      // }
    };

    fetchServices();
  }, []);

  const getToken = () => {
    console.log("token: ", localStorage.getItem("token"));
    return localStorage.getItem("token");
  };

  const handleFilterChange = (selectedService) => {
    if (selectedService === "All services") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(
        (service) => service.service_type === selectedService
      );
      setFilteredServices(filtered);
    }
  };

  return (
    <>
      <div>
        <h1>Services List</h1>
        <SearchBar services={services} onFilterChange={handleFilterChange} />
        {/* {filteredServices.map((service) => (
          <div key={service.id}>
            <h2>{service.title}</h2>
            <p>{service.request_body}</p>
            <p>{service.service_type}</p>
          </div>
        ))} */}
        {services.map((service) => (
          <div key={service.id}>
            <h2>{service.title}</h2>
            <p>{service.request_body}</p>
            <p>{service.service_type}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServicesList;
