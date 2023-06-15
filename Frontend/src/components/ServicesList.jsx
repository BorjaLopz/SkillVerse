import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';


const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/service', {
          headers: { Authorization: 'Bearer ' + getToken() }
        });

        const { data } = response;
        const { services } = data;

        setServices(services);
        setFilteredServices(services);
      } catch (error) {
        console.error('Error getting services:', error);
      }
    };

    fetchServices();
  }, []);

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const handleFilterChange = (selectedService) => {
    if (selectedService === 'All services') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) => service.service_type === selectedService);
      setFilteredServices(filtered);
    }
  };

    return (
      <>
    <div>
      <h1>Services List</h1>
      <SearchBar services={services} onFilterChange={handleFilterChange} />
      {filteredServices.map((service) => (
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
