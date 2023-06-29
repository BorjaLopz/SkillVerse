import { useParams } from "react-router-dom";
import useServer from "../hooks/useServer";
import React, { useEffect, useState } from "react";
import AddComment from "./AddComment";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import DoneCheck from "./DoneCheck";
import ViewComments from "./ViewComments";

function ServiceCard() {
  const [service, setService] = useState([]);
  const [userServiceOwner, setUserServiceOwner] = useState();
  const [userData, setUserData] = useState({});
  const [isDone, setIsDone] = useState(false);
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const { get, patch } = useServer();

  const getService = async () => {
    try {
      const { data } = await get({ url: `/service/${id}` });

      setService(data.message);
      getUserOwner(data.message.user_id);
    } catch (e) {
      console.log("error: ", e.message);
    }
  };

  const getUserOwner = async (userId) => {
    try {
      const { data } = await get({ url: `/userdata/${userId}` }); //Tarda en
      setUserData(data.userData);
    } catch (e) {
      console.log("error: ", e.message);
    }
  };

  useEffect(() => {
    getService();
  }, []);

  const handleMarkAsDone = async () => {
    try {
      const { data, error } = await patch({
        url: `/service/${id}/done`,
        body: { done: 1 },
      });
      console.log(`desde handleMarkAsDone`);
      if (!error) {
        setService((prevService) => ({
          ...prevService,
          complete: true,
        }));

        toast.success(`Servicio ${id} completado con éxito`);
        console.log(`success desde handleMarkAsDone`);

        setIsDone(true);
      } else {
        toast.error(
          `No se ha podido completar el servicio. Inténtalo de nuevo.`
        );
        console.log(`error desde handleMarkAsDone`);
      }
    } catch (error) {
      console.error("Error completing the service:", error);
    } finally {
      setIsLoading(false);
    }
    console.log("Componente handleMarkAsDone renderizado");
  };

  return (
    <>
      <div className="p-8">
        <div className="shadow-xl rounded-lg">
          <div className="h-64 bg-gray-200 bg-cover bg-center rounded-t-lg flex items-center justify-center">
            <p className="text-black font-bold text-4xl">
              {service.service_type}
            </p>
          </div>
          <div className="bg-white rounded-b-lg px-8">
            <Link to={`/user/${userData.nickname}`} />

            <div className="relative">
              <Link to={`/user/${userData.nickname}`}>
                <img
                  className="right-0 w-16 h-16 rounded-full mr-4 shadow-lg absolute -mt-8 bg-gray-100"
                  src={userData.userPhoto}
                  alt={`Foto de perfil de ${userData.nickname}`}
                />
              </Link>
            </div>
            <div className="pt-8 pb-8">
              <h1 className="text-2xl font-bold text-gray-700">
                {service.title}
              </h1>
              <Link to={`/user/${userData.nickname}`}>
                <p className="text-sm text-gray-600">{`${userData.nickname}`}</p>
              </Link>
              <p className="mt-6 text-gray-700">{service.request_body}</p>
            </div>
          </div>
        </div>
        <ViewComments />

        {isDone ||
          (isAuthenticated && !isDone && (
            <DoneCheck
              id={service.id}
              complete={service.complete}
              setService={setService}
            />
          ))}
        {isDone || (isAuthenticated && !isDone && <AddComment />)}
      </div>
    </>
  );
}

export default ServiceCard;
