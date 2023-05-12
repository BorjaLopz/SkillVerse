const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const chalk = require("chalk");
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
  getServiceByTypeController,
  deleteCommentsController,
} = require("./controllers/services");
const { authUser, checkHeaders } = require("./middlewares/auth");
const { generalError, error404 } = require("./middlewares/handleErrors");

const app = new express();

app.use(bodyParser.json()); //Parseamos appliacion/json
app.use(bodyParser.urlencoded({ extended: true })); //Parseamos application xwww-form-urlencoded
app.use(fileUpload()); //Le pasamos el middleware para que pueda leer archivos binarios
app.use("/uploads", express.static("./uploads"));
app.use("/requestfiles", express.static("./requestfiles"));

app.use(express.static("public"));

//#region USER

// login del usuario (devulve token)
app.post("/user/login", loginController);

//Creamos un usuario
app.post("/user/register", newUserController);

//Obtenemos todos los campos de un user excepto su id
app.get("/user/:id", authUser, getAllFieldsExceptPasswordController);

//modificamos un user
app.put("/user/:id/edit", authUser, editUserController);

//borramos un usuario
app.delete("/user/delete", authUser, deleteUserController);

//#endregion USER


//#region SERVICIO

//Creamos un servicio
app.post("/service/add", authUser, newServiceController);


//Obtenemos un servicio por ID
app.get("/service/:id", getServiceByIDController);

//Obtenemos todos los servicios
app.get("/service", checkHeaders, getAllServicesController);

//Modificamos el estado de determinado servicio
app.patch("/service/:id/:status", updateServiceStatusByIDController);

//Obtenemos servicios en funcion de su tipo
app.get("/service/type/(:type)?", authUser, getServiceByTypeController);

//añadimos comentario fichero
app.post("/service/:id/comments", authUser, commentsFileController);

//Eliminamos comentario TODO
app.delete("/service/:id/comments/delete", authUser, deleteCommentsController)

//#endregion SERVICIO


//#region MIDDLEWARES

//GESTIONAMOS LOS 404. Cuando accedemos a rutas que no estan definidas
app.use(error404);

//Gestion de errores
app.use(generalError);

//#endregion MIDDLEWARES


//#region SERVER

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, async () => {
  console.log(
    chalk.green(`App listening on port ${PORT}\nDB: ${process.env.DB_DATABASE}`)
  );
});

//#endregion SERVER
