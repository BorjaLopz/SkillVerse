import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { localStorageKey } from "../config";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";

function LogOut() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    toast.message("Cerrando sesión", {
      description: `Hasta pronto ${user.user.nickname}`,
    });

    const timer = setTimeout(() => {
      localStorage.removeItem(localStorageKey);
      navigate("/");
      window.location.reload();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
}

export default LogOut;
