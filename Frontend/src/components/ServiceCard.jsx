import { useParams, Link } from "react-router-dom";

import useServer from "../hooks/useServer";
import React, { useEffect, useState } from "react";
import AddComment from "./AddComment";
import useAuth from "../hooks/useAuth";
import DoneCheck from "./DoneCheck";
import ViewComments from "./ViewComments";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProfileCard from "./ProfileCard";
import ScrollToTop from "./ScrollToTop";

const ServiceCard = () => {
  const [service, setService] = useState([]);
  const [userOwner, setUserOwner] = useState();
  const [userServiceOwner, setUserServiceOwner] = useState();
  const [userData, setUserData] = useState({});
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams();
  const { get, patch } = useServer();
  const navigate = useNavigate();
  const [reloadCard, setReloadCard] = useState(false);

  const getService = async () => {
    try {
      const { data } = await get({ url: `/service/${id}` });

      if (!data) {
        navigate("/404");
      }
      setIsDone(data.message.done);
      setService(data.message);
      getUserOwner(data.message.user_id);
      setUserOwner(data.message.user_id);
    } catch (e) {
      console.log("error: ", e.message);
    }
  };

  const getUserOwner = async (userId) => {
    try {
      const { data } = await get({ url: `/userdata/${userId}` });
      setUserData(data.userData);
    } catch (e) {
      console.log("error: ", e.message);
    }
  };

  const handleMarkAsDone = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await patch({
        url: `/service/${id}/done`,
        body: { done: 1 },
      });

      if (!error) {
        setService((prevService) => ({
          ...prevService,
          done: true,
        }));

        setIsDone(true);
        toast.success("Servicio marcado como hecho");
      } else {
        toast.error(
          "No se ha podido marcar como hecho el servicio. Inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error completing the service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getService();
  }, []);

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
              {service.file_name !== "" && (
                <Link to={`${service.file_name}`} target="_blank">
                  <img src="/icons/download.png" />
                </Link>
              )}
            </div>
          </div>
        </div>
        <ScrollToTop />
        <ViewComments />
        <div
          className={`aspect-h-1 aspect-w-1 w-full rounded-md mt-4 flex justify-between p-8`}
        >
          {isAuthenticated && !isDone && <AddComment />}
          {isAuthenticated &&
          !isDone &&
          (userOwner === user.user.id || user.user.admin) ? (
            <DoneCheck
              id={service.id}
              complete={service.complete}
              setService={setService}
              isLoading={isLoading}
              handleMarkAsDone={handleMarkAsDone}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
