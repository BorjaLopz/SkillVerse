"use strict";

const getDB = require("./db");

async function createDB() {
  let connection;
  try {
    connection = await getDB();
    console.log("Conexión establecida");

    //Crear BBDD

    await connection.query("CREATE DATABASE IF NOT EXISTS users");
    await connection.query("USE users");

    console.log("Base de datos creada");

    //Borrar tablas
    console.log("Borrando tablas...");

    //Crear tablas

    console.log("Creando tablas...");

    await connection.query("DROP TABLE IF EXIST users;");

    await connection.query("DROP TABLE IF EXISTS required_services;");

    await connection.query(`
    CREATE TABLE users(
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(100) NOT NULL UNIQUE,
      nickname VARCHAR(30) NOT NULL UNIQUE,
      name VARCHAR(30),
      surname VARCHAR(60),
      password VARCHAR(20) NOT NULL,
      biography VARCHAR(600),
      userPhoto VARCHAR(1000),
      RSS VARCHAR(1000),
      active BOOLEAN DEFAULT FALSE
    );
    `);
    /*RSSS Será actualizado de cara al 3º proyecto para poder guardar por separado las diferentes redes sociales 
    del usuario que nosotros decidamos que este pueda aportar de manera que luego se muestren en su pagina de perfil de usuario*/
    

    await connection.query(`
    CREATE TABLE requiredS(
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(50) NOT NULL,
      request_body VARCHAR(500) NOT NULL CHECK (LENGTH(request_body) >= 15),
      user_id INT NOT NULL,
      file_name VARCHAR(90) UNIQUE,
      creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      required_type VARCHAR(20) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );
    `);

    await connection.query(`
    CREATE TABLE comments(
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      requiredS_id INT NOT NULL,
      creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (requiredS_id) REFERENCES photos (id) ON DELETE CASCADE
    );
    `);

    console.log("tablas creadas");
  } catch (e) {
    console.error("Hubo un error: " + e.message);
  } finally {
    if (connection) {
      console.log("liberando conexión");
      connection.release();

      process.exit();
    }
  }
}

createDB();
