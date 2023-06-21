import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { localStorageKey } from "../config";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";

function LogOut() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    toast.message("Cerrando sesión", {
      description: `Adios ${user.user.nickname}`,
    });

    // clearTimeout(timerToast);
    const timer = setTimeout(() => {
      localStorage.removeItem(localStorageKey);
      navigate("/");
      window.location.reload();
    }, 1500);
    return () => clearTimeout(timer);
    // window.location.reload();
  }, []);
}

export default LogOut;
