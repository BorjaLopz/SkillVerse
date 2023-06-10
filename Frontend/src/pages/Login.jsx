//import { Link, useNavigate } from "react-router-dom";

//import useServer from "../hooks/useServer.js";

function Login() {
/*  const navigate = useNavigate();
  const { post } = useServer();

  const submitHandler = async (e) => {
    e.preventDefault();

    const form = e.target;
    const credentials = Object.fromEntries(new FormData(form));
    const { data } = await post({ url: "/auth/login", body: credentials });
    if (data) return navigate("/");
  }; */

  return (
    <>
    <h1>Login</h1>
    </>
  );
}

export default Login;
