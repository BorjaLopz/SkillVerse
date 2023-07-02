import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="not-found p-8 rounded-md text-center">
        <img
          alt="not_found_image"
          className="w-16 h-16 mx-auto mb-4"
          src="../../icons/frown.png"
        />
        <h2 className="text-3xl font-bold">404 - Página no encontrada</h2>
        <p className="text-gray-600">La página que está buscando no existe</p>
        <Link to="/">
          <button className="publish-comment text-white font-bold py-2 px-4 rounded content-center bg-indigo-500 hover:bg-indigo-700">
            Volver al Inicio
          </button>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
