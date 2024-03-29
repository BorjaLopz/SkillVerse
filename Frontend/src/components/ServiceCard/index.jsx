import { useParams, Link } from "react-router-dom";

import useServer from "../../hooks/useServer";
import React, { useEffect, useState } from "react";
import AddComment from "../AddComment";
import useAuth from "../../hooks/useAuth";
import DoneCheck from "../DoneCheck";
import ViewComments from "../ViewComments";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DeleteService from "../DeleteService";
import "./style.css";

const ServiceCard = () => {
  const [service, setService] = useState([]);
  const [userOwner, setUserOwner] = useState();
  const [userData, setUserData] = useState({});
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams();
  const { get, patch } = useServer();
  const navigate = useNavigate();

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
      <div className="service-card-page">
        <div className="service-card">
          <div className="service-card-type">
            <p>{service.service_type}</p>
          </div>
          <div className="service-card-all-info">
            <Link to={`/user/${userData.nickname}`} />
            <div className="service-card-photo">
              <Link to={`/user/${userData.nickname}`}>
                <img
                  className="service-user-photo"
                  src={userData.userPhoto}
                  alt={`Foto de perfil de ${userData.nickname}`}
                />
              </Link>
            </div>
            <div className="service-card-info">
              <Link to={`/user/${userData.nickname}`}>
                <p
                  id="service-nickname"
                  className={`nickname ${
                    userData.nickname === service.title ? "underline" : ""
                  }`}
                >
                  {`${userData.nickname}`}
                </p>
              </Link>
              <h1>{service.title}</h1>

              <p className="delete-service">{service.request_body}</p>
              {service.file_name !== "" && (
                <a id="service-doc" href={`${service.file_name}`} download>
                  {" "}
                  Archivo adjunto
                  <img src="/icons/download.png" /> {/* /icons/paperclip.png*/}
                </a>
              )}
              <div
                className={`service-card-buttons ${
                  isDone ? "null-padding" : ""
                }`}
              >
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
                <DeleteService serviceId={service.id} />
              </div>
            </div>
          </div>
        </div>
        {isAuthenticated && !isDone && <AddComment />}
        <ViewComments />
        <div
          className={`service-card-view-comments ${
            !isAuthenticated ? "null-padding" : ""
          }`}
        ></div>
      </div>
    </>
  );
};

export default ServiceCard;
