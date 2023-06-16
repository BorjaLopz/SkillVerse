import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="not_found">
      <h1>404 - Página no encontrada</h1>
      <p>La página que está buscando no existe. Disculpe las molestias.</p>
      <Link to={"/"}>
        <button>Volver al Inicio</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
