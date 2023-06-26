import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar";
import useServer from "../hooks/useServer";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [servicesAvailables, setServicesAvailables] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);
  const { get } = useServer();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const resp = await fetch(`http://localhost:3000/service`);
        const { message: data } = await resp.json();

        if (typeof data === "object") {
          const service = data.map((s) => ({
            id: s.id,
            title: s.title,
            request_body: s.request_body,
            service_type: s.service_type,
            user_id: s.user_id,
          }));
          setServices(service);
          setFilteredServices(service);
          setServicesAvailables(true);
        }
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

  // console.log(services);

  // useEffect(() => {
  //   const fetchUser = async (service) => {
  //     try {
  //       const { data } = await axios.get(`/user/${service.user_id}`);
  //       const user = data.user;

  //       const updatedServices = services.map((s) => {
  //         if (s.id === service.id) {
  //           return {
  //             ...s,
  //             createdBy: user.user.user.nickname,
  //           };
  //         }
  //         return s;
  //       });

  //       console.log(updatedServices);

  //       setServices(updatedServices);
  //       setFilteredServices(updatedServices);
  //     } catch (error) {
  //       console.error(`Error fetching user with id ${service.user_id}:`, error);
  //     }
  //   };

  //   services.forEach((service) => {
  //     if (!service.createdBy) {
  //       fetchUser(service);
  //     }
  //   });
  // }, [services]);

  const handleFilterChange = (selectedService) => {
    if (selectedService === "Todos los servicios") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(
        (service) => service.service_type === selectedService
      );
      setFilteredServices(filtered);
    }
  };

  return (
    // <>
    //   <div>
    //     <h2>Lista de servicios</h2>
    //     <SearchBar services={services} onFilterChange={handleFilterChange} />
    //     {/* {filteredServices.map((service) => (
    //       <div key={service.id}>
    //         <h2>{service.title}</h2>
    //         <p>{service.request_body}</p>
    //         <p>{service.service_type}</p>
    //       </div>
    //     ))} */}
    //     {!services.length && <p>No hay ningún servicio aún</p>}
    //     {services.map((service) => (
    //       <div key={service.id}>
    //         <h2>{service.title}</h2>
    //         <p>{service.request_body}</p>
    //         <p>{service.service_type}</p>
    //       </div>
    //     ))}
    //   </div>
    // </>
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 bg-gray">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 text-center">
          SERVICIOS
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {!servicesAvailables && <p>No hay ningún servicio aún</p>}
          {services.map((service) => (
            <div key={service.id} className="group relative">
              <Link to={`/service/${service.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full rounded-md mt-4 flex justify-between bg-slate-400 p-8">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <p>{service.title}</p>
                      <p>{service.request_body}</p>
                      <p>{service.service_type}</p>
                      <p>Creado por: {service.nickname}</p>
                      <p>Creado por: {service.user_id}</p>
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
