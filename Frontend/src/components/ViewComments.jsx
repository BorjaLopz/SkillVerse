import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import useServer from "../hooks/useServer";
import useAuth from "../hooks/useAuth";

function ViewComments() {
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState({});
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const { get } = useServer();

  const getComments = async () => {
    try {
      const { data } = await get({ url: `/comments/${id}` });
      setComments(data.message);

      if (data.message.length > 0) {
        getUserOwner(data.message[0]?.user_id);
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
    const intervalId = setInterval(() => {
      if (isAuthenticated) {
        getComments();
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      getComments();
    }
  }, [id, isAuthenticated]);

  return (
    <>
      {!isAuthenticated && (
        <p>
          <NavLink
            to="/signup"
            style={{ textDecoration: "underline", color: "blue" }}
          >
            Regístrate
          </NavLink>{" "}
          o{" "}
          <NavLink
            to="/login"
            style={{ textDecoration: "underline", color: "blue" }}
          >
            inicia sesión
          </NavLink>{" "}
          para ver y hacer comentarios.
        </p>
      )}
      {isAuthenticated && comments && comments.length > 0 && (
        <div className="p-8">
          {comments.map((comment) => (
            <div key={comment.id} className="shadow-xl rounded-lg">
              <div className="bg-white rounded-b-lg px-8">
                <Link to={`/user/${comment?.user?.nickname}`} />

                <div className="relative">
                  <Link to={`/user/${comment?.user?.nickname}`}>
                    <img
                      className="right-0 w-16 h-16 rounded-full mr-4 shadow-lg absolute -mt-8 bg-gray-100"
                      src={comment?.user?.userPhoto}
                      alt={`Foto de perfil de ${comment?.user?.nickname}`}
                    />
                  </Link>
                </div>
                <div className="pt-8 pb-8">
                  <Link to={`/user/${comment?.user?.nickname}`}>
                    <p className="text-sm text-gray-600">{`${comment?.user?.nickname}`}</p>
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
