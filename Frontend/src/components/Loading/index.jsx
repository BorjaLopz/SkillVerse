import React from "react";
import "./style.css";

const Loading = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;

// Optional code to simulate delay
// setTimeout(() => {
//   setUsers(respose.data);
//   setIsLoading(false);
// }, 1000);
