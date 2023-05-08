const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
require("dotenv").config();
const multer = require("multer"); //Nos servira para almacenar ficheros, y leer form-data desde postman

let connection;

const app = new express();
app.use(bodyParser.json()); //Parseamos appliacion/json
app.use(bodyParser.urlencoded({ extended: true })); //Parseamos application xwww-form-urlencoded

const {
  loginController,
  newUserController,
  newServiceController,
} = require("./controllers/users");
const { authUser } = require("./middlewares/auth");
const { createPathIfNotExists } = require("./helpers");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* Parseamos multipar/form-data */
app.use(upload.array());
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

app.post("/login", loginController); // login del usuario(devulve token)

//crear usuario
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    res.status(200).send({ name, email, password });
  } catch (e) {
    res.status(500).send(e);
  }
});

//Creamos un usuario
app.post("/user/add", newUserController);

//Creamos un servicio
app.post("/service/add", newServiceController);

/*MIDDLEWARES COPIADOS DE BERTO*/
//GESTIONAMOS LOS 404. Cuando accedemos a rutas que no estan definidas
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "not found",
  });
});

//Gestion de errores
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

//ENDPOINT para añadir servicios a la base de datos
app.post("/add", async (req, res) => {
  try {
    const { title, explanation } = req.body; //Hacemos destructuring del body para obtener el titulo de la solicitud y una explicacion
    const file = req.file; //TODO en proceso
    res.status(200).send({ title, explanation }); //Mandamos a postman lo que hemos obtenido de la peticion en JSON
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(process.env.APP_PORT, async () => {
  console.log(
    `App listening on port ${process.env.APP_PORT}\nDB: ${process.env.DB_DATABASE}`
  );
});
