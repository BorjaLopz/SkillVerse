import { useParams } from "react-router-dom";
import useServer from "../hooks/useServer";
import { useEffect, useState } from "react";
import AddComent from "./AddComment";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
// import DoneCheck from "./Done";

function ServiceCard() {
  const [service, setService] = useState({});
  const [userData, setUserData] = useState({});
  const { isAuthenticated } = useAuth();

  const { id } = useParams();
  const { get } = useServer();

  const getService = async () => {
    try {
      const { data } = await get({ url: `/service/${id}` });
      console.log(data);
      setService(data.message);

      getUserOwner(data.message.user_id);
    } catch (e) {
      console.log("error: ", e.message);
    }
  };

  const getUserOwner = async (userId) => {
    try {
      const { data } = await get({ url: `/userdata/${userId}` }); //Tarda en
      console.log(data);
      setUserData(data.userData);
    } catch (e) {
      console.log("error: ", e.message);
    }
  };

  useEffect(() => {
    // getUserOwner();
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
            <Link to={`/user/${userData.nickname}`}>
              <div className="relative">
                <img
                  className="right-0 w-16 h-16 rounded-full mr-4 shadow-lg absolute -mt-8 bg-gray-100"
                  src={`${userData.userPhoto}`}
                  alt="Imagen usuario"
                />
              </div>
            </Link>
            <div className="pt-8 pb-8">
              <h1 className="text-2xl font-bold text-gray-700">
                {service.title}
              </h1>
              <p className="text-sm text-gray-600">{userData.nickname}</p>

              <p className="mt-6 text-gray-700">{service.request_body}</p>
            </div>
          </div>
        </div>
        {/* <DoneCheck /> */}
      </div>

      {isAuthenticated && <AddComent />}
    </>
  );
}

export default ServiceCard;
