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
    <div className="servicios" style={{ backgroundColor: "transparent" }}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 bg-gray">
        <h2
          className="text-4xl font-bold tracking-tight text-center"
          style={{ color: "#523d80" }}
        >
          SERVICIOS
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {!servicesAvailables && <p>No hay ningún servicio aún</p>}
          {services.map((service) => (
            <div key={service.id} className="group relative">
              <Link to={`/service/${service.id}`}>
                <div
                  className={`aspect-h-1 aspect-w-1 w-full rounded-md mt-4 flex justify-between p-8`}
                  style={{
                    backgroundColor: service.done ? "#999668" : "#e6e4ca",
                  }}
                >
                  {service.done ? (
                    <img
                      id="check_image"
                      src={"/icons/check-circle.png"}
                      alt="check"
                    />
                  ) : (
                    ""
                  )}
                  {/* {console.log(service.creation_date)} */}
                  <div>
                    <p className="text-l tracking-tight text-gray-900 dark:text-white text-right">
                      {service.creation_date.split("-")[2]}
                      {"-"}
                      {service.creation_date.split("-")[1]}
                      {"-"}
                      {service.creation_date.split("-")[0]}
                    </p>
                    <h3 className="text-sm text-gray-700">
                      <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {service.title}
                      </p>
                      <p className="font-normal text-gray-700 dark:text-gray-200">
                        {service.request_body}
                      </p>
                      <p className="text-xl text-center">
                        {service.service_type}
                      </p>
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
