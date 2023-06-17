import React, { useState } from 'react';

const CommentForm = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('comment', comment);
    if (file) {
      formData.append('serviceFile', file);
    }
    onCommentSubmit(formData);
    setComment('');
    setFile(null);
  };

    return (
      <>
    <form onSubmit={handleSubmit}>
      <textarea value={comment} onChange={handleCommentChange} placeholder="Escribe tu comentario" required />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Enviar comentario</button>
            </form>
            </>
  );
};

export default CommentForm;

