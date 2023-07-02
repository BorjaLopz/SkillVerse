import React, { useState, useEffect } from "react";
import "./style.css";
import useServer from "../../hooks/useServer";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

function DoneCheck({ complete, setComplete, handleMarkAsDone }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await handleMarkAsDone();
    setIsLoading(false);
  };

  return (
    <div className="button-done">
      <button
        className="publish-comment text-white font-bold py-2 px-4 rounded content-center bg-indigo-500 hover:bg-indigo-700"
        onClick={handleClick}
      >
        Marcar como hecho
      </button>
    </div>
  );
}

export default DoneCheck;
