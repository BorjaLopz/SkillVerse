const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
require("dotenv").config();
const multer = require("multer"); //Nos servira para almacenar ficheros, y leer form-data desde postman

let upload = multer();
let connection;

const app = new express();
app.use(bodyParser.json()); //Parseamos appliacion/json
app.use(bodyParser.urlencoded({ extended: true })); //Parseamos application xwww-form-urlencoded

/* Parseamos multipar/form-data */
app.use(upload.array());
app.use(express.static("public"));


//ENDPOINT para obtener todo de la base de datos 

app.get('/requiredS', async (req, res) => {
  try {
    
    const [rows, fields] = await connection.query('SELECT id, title, request_body FROM requiredS');
    console.log('Servicios obtenidos exitosamente');
    res.status(200).send(rows);
  } catch (error) {
    console.error('Error al obtener los servicios: ' + error.stack);
    res.status(500).send('Error al obtener los servicios');
  }
});
  



///////////////////
const {
  loginController,
} = require('./controllers/users');
const { authUser } = require('./middlewares/auth')


app.post('/login', loginController);// login del usuario(devulve token)


/////////////////////////


//crear usuario

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    res.status(200).send({ name, email, password });
  } catch (e) {
    res.status(500).send(e);
  }
});






//ENDPOINT para añadir servicios a la base de datos
app.post("/add", async (req, res) => {
  try {
    const { title, explanation } = req.body; //Hacemos destructuring del body para obtener el titulo de la solicitud y una explicacion
    const file = req.file;  //TODO en proceso
    
    res.status(200).send({title, explanation}); //Mandamos a postman lo que hemos obtenido de la peticion en JSON
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(process.env.APP_PORT, async () => {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
    });
    console.log(
      `App listening on port ${process.env.APP_PORT}\nDB: ${process.env.DB_DATABASE}`
    );
  } catch (e) {
    console.log(e);
  }
});
