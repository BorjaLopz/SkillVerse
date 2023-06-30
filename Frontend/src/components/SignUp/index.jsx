import { Link, useNavigate } from "react-router-dom";

import useServer from "../../hooks/useServer.js";
import { useState } from "react";
import toast from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();
  const { post } = useServer();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [mainPassword, setMainPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const form = e.target;
    const credentials = Object.fromEntries(new FormData(form));
    const { data } = await post({ url: "/user/register", body: credentials });
    if (data) return navigate("/login");
  };

  const togglePassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  console.log("mainPassword");
  console.log(mainPassword);
  console.log("repeatPassword");
  console.log(repeatPassword);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          className="text-4xl font-bold tracking-tight text-center"
          style={{ color: "#523d80" }}
        >
          Regístrate
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
            <label htmlFor="nickname" className="block">
              <span className="text-gray-700">Nickname:</span>
              <div className="mt-2">
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  autoComplete="nickname"
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
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type={passwordVisibility ? "text" : "password"}
                autoComplete="current-password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(event) => setMainPassword(event.target.value)}
                minLength={8}
              />
              <input
                type="checkbox"
                id="ojoPassword"
                onChange={togglePassword}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="label">
                <span className="text-gray-700">Repetir contraseña:</span>
              </label>
            </div>
            <div className="mt-2">
              <input
                id="repeat-password"
                name="repeat-password"
                type={passwordVisibility ? "text" : "password"}
                autoComplete="current-password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(event) => setRepeatPassword(event.target.value)}
                minLength={8}
              />
              <input
                type="checkbox"
                id="ojoPassword"
                onChange={togglePassword}
              />
            </div>
          </div>

          {repeatPassword === mainPassword ? (
            ""
          ) : (
            <p className="bg-red-400">Las contraseñas no coinciden</p>
          )}

          <div>
            <button
              type="submit"
              className="publish-comment text-white font-bold py-2 px-4 rounded content-center bg-indigo-500 hover:bg-indigo-700"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
