import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useServer from "../hooks/useServer";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./deletewhatever.css";
import "./confirmdialog.css";

function DeleteAccount({ user }) {
  const { delete: deleteAccount, get } = useServer();
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const { user: userLogged } = useAuth();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);

  const [inputProfile, setInputProfile] = useState("");

  const fetchUser = async () => {
    try {
      const { data } = await get({ url: `/useravatar/${user}` });
      setCurrentUser(data.userAvatar);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount({ url: `/user/${currentUser.id}/delete/` });
      toast.success("Usuario borrado exitosamente");
      closeConfirmDialog();
      if (userLogged.user.id === currentUser.id) {
        navigate("/logout");
      } else {
        navigate("/users");
      }
    } catch (error) {
      toast.error("Error al borrar el usuario");
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setInputProfile(e.target.value);
  };

  const switchButtonDisabled = () => {
    const modifiedUser = user.replaceAll(" ", "-") || " ";

    if (inputProfile === modifiedUser) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const openConfirmDialog = () => {
    setShowConfirmDialog(true);
    document.body.classList.add("no-scroll");
  };

  const closeConfirmDialog = () => {
    setShowConfirmDialog(false);
    document.body.classList.remove("no-scroll");
  };

  useEffect(() => {
    switchButtonDisabled();
  }, [inputProfile]);

  return (
    <div className="flex justify-center">
      <button
        className="delete-whatever"
        id="delete-account"
        onClick={openConfirmDialog}
      >
        Borrar cuenta
      </button>
      {showConfirmDialog && (
        <div className="modal-overlay">
          <div className="confirm-dialog">
            <p>
              Introduce <span>{user.replaceAll(" ", "-")}</span> para confirmar
              borrar la cuenta
            </p>
            <input
              type="text"
              placeholder="Introduce el nombre de tu perfil"
              required
              value={inputProfile}
              onChange={handleInputChange}
            />
            <div id="buttonSectionDeleteAccount">
              <button
                className="confirm-delete"
                onClick={handleDelete}
                disabled={!buttonDisable}
              >
                Borrar
              </button>
              <button className="confirm-cancel" onClick={closeConfirmDialog}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;
