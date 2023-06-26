import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main>
      <div className="not_found">
        <img
          alt="not_found_image"
          className="not-found-image"
          src="../public/icons/frown.png"
        />
        <h2>404 - Página no encontrada</h2>
        <p>La página que está buscando no existe</p>
        <Link to={"/"}>
          <button className="home-button">Volver al Inicio</button>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
