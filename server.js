const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
require("dotenv").config();
const multer = require("multer"); //Nos servira para almacenar ficheros, y leer form-data desde postman
const fs = require("fs/promises");
const fileUpload = require("express-fileupload");
const chalk = require("chalk");

let connection;

const app = new express();
app.use(bodyParser.json()); //Parseamos appliacion/json
app.use(bodyParser.urlencoded({ extended: true })); //Parseamos application xwww-form-urlencoded
app.use(fileUpload()); //Le pasamos el middleware para que pueda leer archivos binarios

const {
  loginController,
  newUserController,
  deleteUserController,
  editUserController,
} = require("./controllers/users");

const { newServiceController } = require("./controllers/services");

const { authUser } = require("./middlewares/auth");
const { createPathIfNotExists } = require("./helpers");
const { generalError, error404 } = require("./middlewares/handleErrors");

/* MULTER */ //TODO BORRAR
const path = "uploads/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  res.send("File downloaded");
});

/* Parseamos multipar/form-data */
// app.use(upload.array());
app.use(express.static("public"));

//ENDPOINT para obtener todo de la base de datos
app.get("/requiredS", async (req, res) => {
  try {
    const [rows, fields] = await connection.query(
      "SELECT id, title, request_body FROM requiredS"
    );
    console.log(chalk.green("Services obtained"));
    res.status(200).send(rows);
  } catch (error) {
    console.error(chalk.red("Error getting services: " + error.stack));
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

//modificamos un servicio
// app.put("/service/edit", authUser, editUserController);  //Lo comentamos de momento

/*MIDDLEWARES COPIADOS DE BERTO*/
//GESTIONAMOS LOS 404. Cuando accedemos a rutas que no estan definidas
app.use(error404);

//Gestion de errores
app.use(generalError);

app.listen(process.env.APP_PORT, async () => {
  console.log(
    chalk.green(
      `App listening on port ${process.env.APP_PORT}\nDB: ${process.env.DB_DATABASE}`
    )
  );
});
