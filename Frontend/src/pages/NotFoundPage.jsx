import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <main>
      <div className="not_found">
        <h2>404 - Página no encontrada</h2>
        <p>La página que está buscando no existe. Disculpe las molestias.</p>
        <Link to={"/"}>
          <button>Volver al Inicio</button>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
