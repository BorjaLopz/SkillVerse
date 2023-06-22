import { toast } from "sonner";
import jwt_decode from "jwt-decode";

import Http from "../services/Http.js";
import useAuth from "./useAuth.js";

function useServer() {
  const { token, setUser } = useAuth();

  const handleResponse = ({ data, loading, error }) => {
    // console.log(data.user)
    if (data?.data) {
      const user = jwt_decode(data.data);
      setUser({ user, token: data.data });
      toast.success(`Bienvenid@ ${user.nickname}`);
    }

    if (error) {
      toast.error(error.message);
    }

    return { data, loading, error };
  };

  return {
    get: ({ url }) => Http({ method: "GET", url, token }).then(handleResponse),
    post: ({ url, body }) =>
      Http({ method: "POST", url, body, token }).then(handleResponse),
    put: ({ url, body }) =>
      Http({ method: "PUT", url, body, token }).then(handleResponse),
    patch: ({ url, body }) =>
      Http({ method: "PATCH", url, body, token }).then(handleResponse),
    delete: ({ url }) =>
      Http({ method: "DELETE", url, token }).then(handleResponse),
  };
}

export default useServer;
