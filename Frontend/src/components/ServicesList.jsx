import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

        console.log(data);
        if (typeof data === "object") {
          const service = data.map((s) => ({
            id: s.id,
            title: s.title,
            request_body: s.request_body,
            service_type: s.service_type,
            user_id: s.user_id,
            done: s.done,
          }));
          setServices(service);
          setFilteredServices(service);
          setServicesAvailables(true);
        }
      } catch (e) {
        console.log("Error getting services: ", e);
      }
    };

    fetchServices();

    const intervalId = setInterval(() => {
      fetchServices();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

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
                <div
                  className={`aspect-h-1 aspect-w-1 w-full rounded-md mt-4 flex justify-between p-8 ${
                    service.done ? "bg-slate-400" : "bg-slate-200"
                  }`}
                >
                  {" "}
                  {/* bg-slate-400*/}
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <p>{service.title}</p>
                      <p>{service.request_body}</p>
                      <p>{service.service_type}</p>
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
