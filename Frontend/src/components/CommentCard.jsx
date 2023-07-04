import React from "react";

const CommentCard = ({ comment }) => {
  const { comment: commentText, creation_date, serviceFile } = comment;

  return (
    <div className="comment-card">
      <p>{commentText}</p>
      {serviceFile && (
        <p>
          Archivo adjunto: <a href={serviceFile}>{serviceFile}</a>
        </p>
      )}
      <p>Fecha de creación: {creation_date}</p>
    </div>
  );
};

export default CommentCard;
