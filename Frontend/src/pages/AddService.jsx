
import React, { useState } from 'react';

const AddService = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requiredType, setRequiredType] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('request_body', description);
      formData.append('required_type', requiredType);
      formData.append('file', file);

      const response = await fetch('/service/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
          console.log(data);
          
      } else {
        throw new Error('Error adding the service');
      }

      setTitle('');
      setDescription('');
      setRequiredType('');
      setFile(null);
    } catch (error) {
      console.error('Error sending the new service:', error);
    }
  };

  return (
    <>
    <div>
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <label>Required Type:</label>
          <input
            type="text"
            value={requiredType}
            onChange={(event) => setRequiredType(event.target.value)}
          />
        </div>
        <div>
          <label>File:</label>
          <input type="file" onChange={(event) => setFile(event.target.files[0])} />
        </div>
        <button type="submit">Save</button>
      </form>
      </div>
      </>
  );
};

export default AddService;

