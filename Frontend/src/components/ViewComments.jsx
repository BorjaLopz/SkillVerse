import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import useServer from "../hooks/useServer";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import DeleteComment from "./DeleteComment";

function ViewComments() {
  const [comments, setComments] = useState([]);
  const [commentOwners, setCommentOwners] = useState({});
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams();
  const { get } = useServer();

  const getComments = async () => {
    try {
      const { data } = await get({ url: `/comments/${id}` });
      setComments(data.message);

      if (data.message.length > 0) {
        const userIds = data.message.map((comment) => comment.user_id);
        getUserCommentOwners(userIds);
      }
    } catch (e) {
      console.log("Error al obtener los comentarios:", e.message);
    }
  };

  const getUserCommentOwners = async (userIds) => {
    try {
      const promises = userIds.map((userId) => getUserOwner(userId));
      const owners = await Promise.all(promises);
      const ownersMap = owners.reduce((map, owner) => {
        map[owner.id] = owner;
        return map;
      }, {});
      setCommentOwners(ownersMap);
    } catch (e) {
      console.log(
        "Error al obtener los datos de los usuarios propietarios de los comentarios:",
        e.message
      );
    }
  };

  const getUserOwner = async (userId) => {
    try {
      const { data } = await get({ url: `/userdata/${userId}` });
      return data.userData;
    } catch (e) {
      console.log(
        "Error al obtener los datos del usuario propietario del comentario:",
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
            style={{ textDecoration: "underline", color: "#523D80" }}
          >
            Regístrate
          </NavLink>{" "}
          o{" "}
          <NavLink
            to="/login"
            style={{ textDecoration: "underline", color: "#523D80" }}
          >
            inicia sesión
          </NavLink>{" "}
          para ver y hacer comentarios.
        </p>
      )}
      {isAuthenticated && comments && comments.length > 0 && (
        <div className="p-8">
          {comments.map((comment) => {
            const commentOwner = commentOwners[comment.user_id];
            return (
              <div key={comment.id} className="shadow-xl rounded-lg">
                <div className="bg-white rounded-b-lg px-8">
                  <Link to={`/user/${commentOwner?.nickname}`} />

                  <div className="relative">
                    <Link to={`/user/${commentOwner?.nickname}`}>
                      <img
                        className="right-0 w-16 h-16 rounded-full mr-4 shadow-lg absolute -mt-8 bg-gray-100"
                        src={commentOwner?.userPhoto}
                        alt={`Foto de perfil de ${commentOwner?.nickname}`}
                      />
                    </Link>
                  </div>
                  <div className="pt-8 pb-8">
                    <Link to={`/user/${commentOwner?.nickname}`}>
                      <p className="text-sm text-gray-600">
                        {`${commentOwner?.nickname}`}
                      </p>
                    </Link>
                    <p className="mt-6 text-gray-700">{comment.comment}</p>
<<<<<<< HEAD
                    {comment.serviceFile !== "" && (
                      <Link to={`${comment.serviceFile}`} target="_blank">
                        <img src="/icons/download.png" />
                      </Link>
                    )}
=======
                    <DeleteComment
                      commentId={comment.id}
                      onDelete={getComments}
                    />
>>>>>>> 21003cdd636a630414afad62386c5de49fcac3f7
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default ViewComments;
