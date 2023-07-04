import React from "react";
import koFiIcon from "/icons/ko-fi-icon.svg";

const ProfileCard = ({ formData }) => {
  return (
    <div className="profile-card">
      <h3>Datos Personales:</h3>
      <p>Nickname: {formData.nickname}</p>
      <p>Email: {formData.email}</p>
      <p>Nombre: {formData.name}</p>
      <p>Apellido: {formData.surname}</p>
      <p>Biografía: {formData.biography}</p>

      <a href={formData.ko_fi} target="_blank" rel="noopener noreferrer">
        <img
          src={koFiIcon}
          alt="Ko-fi"
          style={{ width: "40px", height: "40px" }}
        />
      </a>
    </div>
  );
};

export default ProfileCard;
