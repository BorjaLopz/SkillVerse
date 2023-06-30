import { useEffect, useState } from "react";
import useServer from "../hooks/useServer";
import { Link } from "react-router-dom";

function ServicesByUser({ nickname }) {
  const { get } = useServer();
  const [serviceUser, setServiceUser] = useState([]);

  const fetchServicesByNickname = async (nickname) => {
    try {
      const { data } = await get({ url: `/service/nickname/${nickname}` });
      setServiceUser(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchServicesByNickname(nickname);
  }, []);
  return (
    <>
      {serviceUser.length !== 0 ? (
        <p className="text-center text-4xl">Servicios de {`${nickname}`}</p>
      ) : (
        <p className="text-center text-4xl">
          {`${nickname}`} aún no ha subido ningún servicio
        </p>
      )}
      {serviceUser.map((service) => (
        <div key={service.id} className="group relative">
          <Link to={`/service/${service.id}`}>
            <div
              className={`aspect-h-1 aspect-w-1 w-full rounded-md mt-4 flex justify-between p-8 ${
                service.done ? "bg-slate-400" : "bg-slate-200"
              }`}
            >
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
    </>
  );
}

export default ServicesByUser;
