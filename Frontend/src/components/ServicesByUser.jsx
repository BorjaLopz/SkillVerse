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
      {serviceUser.map((service) => (
        <div key={service.id} className="group relative">
          <Link to={`/service/${service.id}`}>
            <div className="aspect-h-1 aspect-w-1 w-full rounded-md mt-4 flex justify-between bg-slate-400 p-8">
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
