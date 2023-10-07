import React from "react";
import "./style.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="lds-heart">
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
