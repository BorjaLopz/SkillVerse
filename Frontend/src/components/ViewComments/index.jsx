import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import useServer from "../../hooks/useServer";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import DeleteComment from "../DeleteComment";
import "./style.css"

function ViewComments() {
  const [comments, setComments] = useState([]);
  const [commentOwners, setCommentOwners] = useState({});
  const [serviceOwner, setServiceOwner] = useState({});
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams();
  const { get } = useServer();

  const getComments = async () => {
    try {
      const { data } = await get({ url: `/comments/${id}` });
      setComments(data.commentData);

      if (data.commentData.length > 0) {
        const userIds = data.commentData.map((comment) => comment.user_id);
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

  const fetchServiceOwner = async () => {
    try {
      const { data } = await get({ url: `/service/${id}` });
      setServiceOwner(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchServiceOwner();
  }, []);

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
        <p className="view-comments-text">
          <NavLink
            to="/signup"
            className="view-comments-link"
          >
            Regístrate
          </NavLink>{" "}
          o{" "}
          <NavLink
            to="/login"
            className="view-comments-link"
          >
            inicia sesión
          </NavLink>{" "}
          para ver y hacer comentarios.
        </p>
      )}
      {isAuthenticated && comments && comments.length > 0 && (
        <div className="view-comments-container">
          {comments.map((comment) => {
            const commentOwner = commentOwners[comment.user_id];
            return (
              <div key={comment.id} className="comment-container">
                <div className="comment-profile">
                  <Link
                    to={`/user/${commentOwner?.nickname}`}
                    className="comment-profile-link"
                  >
                    <img
                      className="comment-profile-image"
                      src={commentOwner?.userPhoto}
                      alt={`Foto de perfil de ${commentOwner?.nickname}`}
                    />
                  </Link>
                </div>
                <div className="comment-details">
                  <Link
                    to={`/user/${commentOwner?.nickname}`}
                    className="comment-owner-link"
                  >
                    <p className="comment-owner">{commentOwner?.nickname}</p>
                  </Link>
                  {comment.serviceFile !== "" && (
                    <a href={`${comment.serviceFile}`} download className="comment-download-link">
                      <img src="/icons/download.png" className="comment-download-icon" alt="Descargar archivo" />
                    </a>
                  )}
                  <p className="comment-text">{comment.comment}</p>
                  {(user.user.admin || comment.user_id === user.user.id || serviceOwner.user_id === user.user.id) && (
                    <DeleteComment commentId={comment.id} />
                  )}
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
