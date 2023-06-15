import { Link, useNavigate } from "react-router-dom";

import useServer from "../hooks/useServer.js";

function Login() {
  const navigate = useNavigate();
  const { post } = useServer();

  const submitHandler = async (e) => {
    e.preventDefault();

    const form = e.target;
    const credentials = Object.fromEntries(new FormData(form));
    const { data } = await post({ url: "/user/login", body: credentials });
    if (data) return navigate("/");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Inicia sesión con tu usuario
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="login-form" onSubmit={submitHandler}>
            <div>
              <label htmlFor="email" className="label">
                Dirección Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="label">
                  Contraseña
                </label>
                <div className="text-sm">
                  <Link
                    to="/passreset"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    ¿Olvidó su contraseña?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input"
                />
              </div>
            </div>

            <div>
              <button type="submit" className="button">
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
