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

    await connection.query("DROP TABLE IF EXISTS names;");

    await connection.query("DROP TABLE IF EXISTS email;");

    await connection.query("DROP TABLE IF EXISTS password;");

    await connection.query(`
    CREATE TABLE users(
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(100) NOT NULL UNIQUE,
      name VARCHAR(255),
      registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      active BOOLEAN DEFAULT FALSE
    );
    `);

    await connection.query(`
    CREATE TABLE photos(
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      photo_file_name VARCHAR(90) NOT NULL UNIQUE,
      creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );
    `);

    await connection.query(`
    CREATE TABLE likes(
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      photo_id INT NOT NULL,
      creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (photo_id) REFERENCES photos (id) ON DELETE CASCADE
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
