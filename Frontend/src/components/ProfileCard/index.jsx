import React from "react";
import koFiIcon from "/icons/ko-fi-icon.svg";
import "./style.css";
const ProfileCard = ({ formData }) => {
  return (
    <>
      <div className="profile-card">
        <img
          src={`${formData.userPhoto}`}
          alt={`Imagen de ${formData.userPhoto}`}
          className="field-icon"
        />
        <h3 className="title">Datos personales:</h3>
        <div className="field">
          <span className="field-name">Nickname:</span>
          <span className="field-value">{formData.nickname}</span>
        </div>
        <div className="field">
          <span className="field-name">Email:</span>
          <span className="field-value">{formData.email}</span>
        </div>
        <div className="field">
          <span className="field-name">Nombre:</span>
          <span className="field-value">{formData.name}</span>
        </div>
        <div className="field">
          <span className="field-name">Apellido:</span>
          <span className="field-value">{formData.surname}</span>
        </div>
        <div className="field">
          <span className="field-name">Biografía:</span>
          <span className="field-value">{formData.biography}</span>
        </div>
        {/* <a href={formData.ko_fi} target="_blank" rel="noopener noreferrer">
          <img src={koFiIcon} alt="Ko-fi" className="ko-fi-icon" />
        </a> */}
        {formData.ko_fi !== "" && (
          <a href={formData.ko_fi} target="_blank" rel="noopener noreferrer">
            <img src={koFiIcon} alt="Ko-fi" className="ko-fi-icon" />
          </a>
        )}
      </div>
    </>
  );
};

export default ProfileCard;
