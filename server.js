const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const chalk = require("chalk");

let connection;

const app = new express();
app.use(bodyParser.json()); //Parseamos appliacion/json
app.use(bodyParser.urlencoded({ extended: true })); //Parseamos application xwww-form-urlencoded
app.use(fileUpload()); //Le pasamos el middleware para que pueda leer archivos binarios
app.use("/uploads", express.static("./uploads"));
app.use("/requestfiles", express.static("./requestfiles"));

const {
  loginController,
  newUserController,
  deleteUserController,
  editUserController,
  getAllFieldsExceptPasswordController,
} = require("./controllers/users");

const {
  newServiceController,
  getServiceByIDController,
  getAllServicesController,
  updateServiceStatusByIDController,
  commentsFileController,
} = require("./controllers/services");

const { authUser } = require("./middlewares/auth");
const { generalError, error404 } = require("./middlewares/handleErrors");

app.use(express.static("public"));

//#region USER

// login del usuario (devulve token)
app.post("/user/login", loginController);

//Creamos un usuario
app.post("/user/add", newUserController);

//#endregion USER

//#region Servicio

//Creamos un servicio
app.post("/service/add", authUser, newServiceController);

//borramos un servicio
app.delete("/service/delete", authUser, deleteUserController);

//modificamos un user
app.get("/user/:id", authUser, getAllFieldsExceptPasswordController);

//modificamos un user
app.put("/user/:id/edit", authUser, editUserController);

//Obtenemos un servicio por ID
app.get("/service/:id", getServiceByIDController);

//Obtenemos todos los servicios
app.get("/service", authUser, getAllServicesController);

//Modificamos el estado de determinado servicio
app.patch("/service/:id/:status", updateServiceStatusByIDController);

//añadimos comentario fichero
app.post("/comments/:id", authUser, commentsFileController);

//GESTIONAMOS LOS 404. Cuando accedemos a rutas que no estan definidas
app.use(error404);

//Gestion de errores
app.use(generalError);

//#endregion Middlewares

//#region SERVER

app.listen(process.env.APP_PORT, async () => {
  console.log(
    chalk.green(
      `App listening on port ${process.env.APP_PORT}\nDB: ${process.env.DB_DATABASE}`
    )
  );
});

//#endregion SERVER
