import{ useState } from 'react';
import axios from 'axios';

//el error que da id y admin pone que es porque no tenemos instalado el paquete prop-types para definir la validacion de las props
//veo que tambien pasa en otros componentes asi que esto hay que mirarlo
const EditProfile = ({ id, admin }) => {
  const [formData, setFormData] = useState({
    email: '',
    userPhoto: '',
    nickname: '',
    name: '',
    surname: '',
    password: '',
    biography: ''
  });

  const [successMessage, setSuccessMessage] = useState(''); 

  const handleChange =  (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`/user/${id}/edit`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log(response.data);
      // Establecer un mensaje de éxito en el estado del componente
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      //  manejar el error 
      if (error.response && error.response.status === 401) {
        // Redireccionar al usuario a la página de inicio de sesión
        window.location.href = '/login';
      }
    }
  };

    const renderAdminContent = () => {
    if (admin) {
      return <div>Additional content for administrators</div>;
    }
    return null;
  };

  
  
  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          User Photo:
          <input
            type="text"
            name="userPhoto"
            value={formData.userPhoto}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Nickname:
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Surname:
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Biography:
          <textarea
            name="biography"
            value={formData.biography}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>   
      </form>
       {successMessage && <p>{successMessage}</p>}
      {renderAdminContent()}
    </div>
  );
};

export default EditProfile;