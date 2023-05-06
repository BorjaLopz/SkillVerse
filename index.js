"use strict";

const getDB = require("./db");
const chalk = require("chalk");

async function createDB() {
  let connection;
  try {
    connection = await getDB();
    console.log(chalk.green("Conexión establecida"));

    //Crear BBDD

    await connection.query("CREATE DATABASE IF NOT EXISTS portalDigital");
    await connection.query("USE portalDigital");

    console.log(chalk.green("Base de datos creada"));

    //Borrar tablas
    console.log(chalk.yellow("Borrando tablas antiguas..."));

    //Crear tablas
    console.log(chalk.yellow("Creando tablas nuevas..."));

    await connection.query("DROP TABLE IF EXISTS comments;");

    await connection.query("DROP TABLE IF EXISTS requiredS;");

    await connection.query("DROP TABLE IF EXISTS users;");

    await connection.query(`
    CREATE TABLE users(
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(100) NOT NULL UNIQUE,
      name VARCHAR(255),
      password VARCHAR(20),
      active BOOLEAN DEFAULT FALSE
    );
    `);

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
      FOREIGN KEY (requiredS_id) REFERENCES requiredS (id) ON DELETE CASCADE
    );
    `);

    console.log(chalk.green("Tablas creadas con éxito"));
  } catch (e) {
    console.error(chalk.red("Hubo un error: " + e.message));
  } finally {
    if (connection) {
      console.log(chalk.yellow("Liberando conexión..."));
      connection.release();
      console.log(chalk.green("Conexión liberada"));

      process.exit();
    }
  }
}

createDB();
