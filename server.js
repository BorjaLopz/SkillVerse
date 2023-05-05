const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = new express();
app.use(bodyParser.json());

let connection;


//ENDPOINT para obtener todos los ordenadores de la base de datos

app.get('/all', async (req, res) => {
    try {
        //destructuring posicional, solamente necesitamos el primer elemento 
        const prueba = 'GET';
        console.log(prueba);
        res.status(200).send(prueba)
    } catch (e) {
        res.status(500).send(e);
    }
});

//ENDPOINT  para obtener

app.post("/add", async (req, res) => {
    try {
        const prueba = 'POST';
        console.log(prueba);
        res.status(200).send(prueba);

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



