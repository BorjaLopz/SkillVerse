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
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Regístrate
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="login-form" onSubmit={submitHandler}>
          <div>
            <label htmlFor="email" className="label">
              Correo electrónico
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
            <label htmlFor="nickname" className="label">
              Nickname
            </label>
            <div className="mt-2">
              <input
                id="nickname"
                name="nickname"
                type="text"
                autoComplete="nickname"
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
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type={passwordVisibility ? "text" : "password"}
                autoComplete="current-password"
                required
                className="input"
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
                Repetir contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                id="repeat-password"
                name="repeat-password"
                type={passwordVisibility ? "text" : "password"}
                autoComplete="current-password"
                required
                className="input"
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
            <button type="submit" className="button">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
