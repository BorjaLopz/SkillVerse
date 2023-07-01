import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import useServer from "../../hooks/useServer.js";
import { useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { post } = useServer();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const form = e.target;
    const credentials = Object.fromEntries(new FormData(form));
    const { data } = await post({ url: "/user/login", body: credentials });
    if (data) {
      navigate("/");
    }
  };

  const togglePassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2
            className="text-4xl font-bold tracking-tight text-center"
            style={{ color: "#523d80" }}
          >
            Iniciar sesión
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="login-form" onSubmit={submitHandler}>
            <div>
              <label htmlFor="email" className="block">
                <span className="text-gray-700">Correo electrónico:</span>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </label>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block">
                  <span className="text-gray-700">Contraseña:</span>
                </label>
                {/* <div className="text-sm">
                <Link
                  to="/passreset"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  ¿Olvidó su contraseña?
                </Link>
              </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type={passwordVisibility ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <input
                  type="checkbox"
                  id="ojoPassword"
                  className="hidden"
                  onChange={togglePassword}
                />
                <label htmlFor="ojoPassword" className="cursor-pointer">
                  <FontAwesomeIcon
                    icon={passwordVisibility ? faEye : faEyeSlash}
                    className="text-gray-700"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="publish-comment text-white font-bold py-2 px-4 rounded content-center bg-indigo-500 hover:bg-indigo-700"
              >
                Inicia Sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <Link
              to="/signup"
              className="leading-6 font-semibold text-indigo-600 hover:text-indigo-500"
            >
              <button>Regístrate</button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
