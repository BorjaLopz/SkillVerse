const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
require("dotenv").config();
const multer = require("multer"); //Nos servira para almacenar ficheros, y leer form-data desde postman
const fs = require("fs/promises");
const fileUpload = require("express-fileupload");

let connection;

const app = new express();
app.use(bodyParser.json()); //Parseamos appliacion/json
app.use(bodyParser.urlencoded({ extended: true })); //Parseamos application xwww-form-urlencoded
app.use(fileUpload()); //Le pasamos el middleware para que pueda leer archivos binarios
app.use("/uploads", express.static("./uploads"));

const {
  loginController,
  newUserController,
  deleteUserController,
  editUserController,
} = require("./controllers/users");

const {
  newServiceController,
  getServiceByIDController,
} = require("./controllers/services");

const { authUser } = require("./middlewares/auth");
const { createPathIfNotExists } = require("./helpers");
const { generalError, error404 } = require("./middlewares/handleErrors");

/* Parseamos multipar/form-data */
// app.use(upload.array());
app.use(express.static("public"));

//ENDPOINT para obtener todo de la base de datos
app.get("/requiredS", async (req, res) => {
  try {
    const [rows, fields] = await connection.query(
      "SELECT id, title, request_body FROM requiredS"
    );
    console.log("Servicios obtenidos exitosamente");
    res.status(200).send(rows);
  } catch (error) {
    console.error("Error al obtener los servicios: " + error.stack);
    res.status(500).send("Error al obtener los servicios");
  }
});

// login del usuario (devulve token)
app.post("/login", loginController);

//Creamos un usuario
app.post("/user/add", newUserController);

//Creamos un servicio
app.post("/service/add", authUser, newServiceController);

//borramos un servicio
app.delete("/service/delete", authUser, deleteUserController);

//Obtenemos un servicio por ID
app.get("/service/:id", getServiceByIDController);

//modificamos un servicio
// app.put("/service/edit", authUser, editUserController);  //Lo comentamos de momento

/*MIDDLEWARES COPIADOS DE BERTO*/
//GESTIONAMOS LOS 404. Cuando accedemos a rutas que no estan definidas
app.use(error404);

//Gestion de errores
app.use(generalError);

/* SERVER */
app.listen(process.env.APP_PORT, async () => {
  console.log(
    `App listening on port ${process.env.APP_PORT}\nDB: ${process.env.DB_DATABASE}`
  );
});
