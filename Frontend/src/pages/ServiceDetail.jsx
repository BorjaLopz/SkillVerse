import { useParams } from "react-router-dom";
import useServer from "../hooks/useServer";
import { useEffect, useState } from "react";
import useGetTokenValues from "../hooks/useGetTokenValues";
import Avatar from "../components/Avatar";
import useAvatar from "../hooks/useAvatar";

function ServiceDetail() {
  const [service, setService] = useState([]);
  const [userServiceOwner, setUserServiceOwner] = useState();

  const avatar = useAvatar(service.user_id);

  const { id } = useParams();
  const { get } = useServer();

  const token = useGetTokenValues();

  // const getUserServiceOwner = async (param) => {
  //   try {
  //     const id = parseInt(param);
  //     const { data } = await get({ url: `/user/${id}` });
  //     console.log(data);
  //     setUserServiceOwner(data);
  //   } catch (e) {
  //     console.log("error: ", e.message);
  //   }
  // };

  const getService = async () => {
    try {
      const { data } = await get({ url: `/service/${id}` });
      setUserServiceOwner(data.message.user_id);
      // useAvatar(data.message.user_id);
      // await getUserServiceOwner(data.message.user_id);
      setService(data.message);
    } catch (e) {
      console.log("error: ", e.message);
    }
  };

  useEffect(() => {
    getService();
  }, []);

  // console.log(service);

  return (
    <div className="p-8">
      <div className="shadow-xl rounded-lg">
        <div className="h-64 bg-gray-200 bg-cover bg-center rounded-t-lg flex items-center justify-center">
          <p className="text-black font-bold text-4xl">
            {service.service_type}
          </p>
        </div>
        <div className="bg-white rounded-b-lg px-8">
          <div className="relative">
            <img
              className="right-0 w-16 h-16 rounded-full mr-4 shadow-lg absolute -mt-8 bg-gray-100"
              src=""
              alt="Imagen usuario"
            />
          </div>
          <div className="pt-8 pb-8">
            <h1 className="text-2xl font-bold text-gray-700">
              {service.title}
            </h1>
            <p className="text-sm text-gray-600">Nombre de usuario</p>

            <p className="mt-6 text-gray-700">{service.request_body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;
