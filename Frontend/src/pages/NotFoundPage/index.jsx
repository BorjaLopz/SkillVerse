import { Link } from "react-router-dom";
import "./style.css";

const NotFoundPage = () => {
  return (
    <main className="not-found-main">
      <div className="not-found">
        <img
          alt="not_found_image"
          className="not-found-image"
          src="../../icons/404.svg"
        />
        <h2>404 - Página no encontrada</h2>
        <p>¿Te has perdido? ¿O necesitas un descanso?</p>
        <Link to="/">
          <button>Volver al Inicio</button>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
