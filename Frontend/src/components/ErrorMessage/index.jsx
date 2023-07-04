import { Link } from "react-router-dom";

export const ErrorMessage = ({ message }) => {
  return (
    <>
      <p className="error_message">{message}</p>
      <button>
        <Link to="/">Volver a la página de inicio</Link>
      </button>
    </>
  );
};
