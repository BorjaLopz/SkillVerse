import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useServer from "../hooks/useServer";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./deletewhatever.css";
import "./confirmdialog.css";

function DeleteService({ serviceId, onDelete }) {
  const { delete: deleteService, get } = useServer();
  const { user, isAuthenticated } = useAuth();
  const { id: idService } = useParams();
  const navigate = useNavigate();
  const [serviceOwner, setServiceOwner] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [inputService, setInputService] = useState("");
  const [currentService, setCurrentService] = useState();

  const handleDelete = async () => {
    try {
      await deleteService({ url: `/service/${serviceId}/delete` });
      toast.success("Servicio borrado exitosamente");
      navigate("/services");
      closeConfirmDialog();
      // onDelete();
    } catch (error) {
      toast.error("Error al borrar el servicio");
    }
  };

  const switchButtonDisabled = () => {
    console.log("inputService");
    console.log(inputService);
    console.log("serviceOwner.title");
    console.log(serviceOwner.title);

    console.log(typeof serviceOwner.title);

    const modifiedTitle = serviceOwner?.title?.replaceAll(" ", "-") || " ";

    if (inputService === modifiedTitle) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setInputService(e.target.value);
  };

  const fetchServiceOwner = async () => {
    try {
      const { data } = await get({ url: `/service/${idService}` });
      setServiceOwner(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchServiceOwner();
  }, []);

  const openConfirmDialog = () => {
    setShowConfirmDialog(true);
    document.body.classList.add("no-scroll");
  };

  const closeConfirmDialog = () => {
    setShowConfirmDialog(false);
    document.body.classList.remove("no-scroll");
  };

  /* @TODO refrescar cada vez que modifiquemos el input para comprobar si podemos o no tenerlo deshabilitado*/
  useEffect(() => {
    switchButtonDisabled();
  }, [inputService]);

  return (
    <>
      {isAuthenticated &&
      !serviceOwner.done &&
      (user.user.admin || serviceOwner.user_id === user.user.id) ? (
        <>
          <button className="delete-whatever" onClick={openConfirmDialog}>
            <img
              className="trash-icon-button"
              src={"/icons/trash.svg"}
              alt="trash"
            />
          </button>
          {showConfirmDialog && (
            <div className="modal-overlay">
              <div className="confirm-dialog">
                <p>
                  Introduce{" "}
                  <span>{serviceOwner.title.replaceAll(" ", "-")} </span>
                  para confirmar borrar el servicio
                </p>
                <input
                  type="text"
                  placeholder="Introduce el nombre del servicio"
                  required
                  value={inputService}
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
                  <button
                    className="confirm-cancel"
                    onClick={closeConfirmDialog}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default DeleteService;
