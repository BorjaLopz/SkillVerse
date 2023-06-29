import { useParams } from "react-router-dom";
import useServer from "../hooks/useServer";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

function ViewComments() {
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState({});
  const { isAuthenticated } = useAuth();

  const { id } = useParams();
  const { get } = useServer();

  const getServiceIdFromURL = () => {
    const url = window.location.href;
    const parts = url.split("/");
    const serviceIdIndex = parts.findIndex((part) => part === "service");
    if (serviceIdIndex !== -1 && serviceIdIndex + 1 < parts.length) {
      return parts[serviceIdIndex + 1];
    }
    return null;
  };

  const serviceId = getServiceIdFromURL();

  const getComments = async () => {
    try {
      const { data } = await get({ url: `/comments/${serviceId}` });
      setComments(data.message);

      if (data.message.length > 0) {
        getUserOwner(data.message[0].user_id);
      }
    } catch (e) {
      console.log("Error al obtener los comentarios:", e.message);
    }
  };

  const getUserOwner = async (userId) => {
    try {
      const { data } = await get({ url: `/userdata/${userId}` });
      setUserData(data.userData);
    } catch (e) {
      console.log(
        "Error al obtener los datos del usuario propietario:",
        e.message
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getComments();
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated && (
        <div className="p-8">
          {comments.map((comment) => (
            <div key={comment.id} className="shadow-xl rounded-lg">
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
                  <Link to={`/user/${userData.nickname}`}>
                    <p className="text-sm text-gray-600">{`${userData.nickname}`}</p>
                  </Link>
                  <p className="mt-6 text-gray-700">{comment.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ViewComments;
