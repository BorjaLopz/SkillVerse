import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { localStorageKey } from "../config";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";

function LogOut() {
  const { user } = useAuth();
  const navigate = useNavigate();
  // localStorage.removeItem(localStorageKey);
  toast.error(`Adios ${user.user.nickname}`);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem(localStorageKey);
      navigate("/");
      console.log("VAMOS AQUI 5000");
      window.location.reload();
    }, 2000);
    return () => clearTimeout(timer);
    // window.location.reload();
  }, []);
}

export default LogOut;
