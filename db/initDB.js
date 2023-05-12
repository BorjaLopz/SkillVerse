"use strict";

require("dotenv").config();
const { getConnection } = require("./db");
const chalk = require("chalk");
const { faker } = require("@faker-js/faker/locale/es");
const bcrypt = require("bcrypt");

const addData = process.argv[2] === "--data";

async function main() {
  let connection;
  try {
    connection = await getConnection();
    console.log(chalk.green("Connection established"));

    //Crear BBDD
    await connection.query("CREATE DATABASE IF NOT EXISTS portalDigital");
    await connection.query("USE portalDigital");
    console.log(chalk.green("Database created"));

    //Borrar tablas
    console.log(chalk.yellow("Deleting old tables..."));
    await connection.query("DROP TABLE IF EXISTS comments;");
    await connection.query("DROP TABLE IF EXISTS requiredS;");
    await connection.query("DROP TABLE IF EXISTS users;");

    //Crear tablas
    console.log(chalk.yellow("Creating new tables..."));

    await connection.query(`
    CREATE TABLE users(
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(100) NOT NULL UNIQUE,
      nickname VARCHAR(100) NOT NULL UNIQUE CHECK (LENGTH(nickname) >= 4),
      name VARCHAR(30),
      surname VARCHAR(60),
      password VARCHAR(100) NOT NULL CHECK (LENGTH(password) >= 8 AND password REGEXP '[A-Z]' AND password REGEXP '[a-z]' AND password REGEXP '[0-9]'),
      biography VARCHAR(600),
      userPhoto VARCHAR(1000),
      linkedin VARCHAR(100) NULL CHECK (linkedin IS NULL OR linkedin REGEXP 'linkedin'),
      instagram VARCHAR(100) NULL CHECK (instagram IS NULL OR instagram REGEXP 'instagram'),
      active BOOLEAN DEFAULT TRUE
    );
    `);

    await connection.query(`
    CREATE TABLE requiredS(
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(50) NOT NULL CHECK (LENGTH(title) >= 15),
      request_body VARCHAR(500) NOT NULL CHECK (LENGTH(request_body) >= 15),
      user_id INT NOT NULL,
      file_name VARCHAR(30),
      creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      required_type VARCHAR(20) NOT NULL,
      done BOOLEAN DEFAULT FALSE,
      hide BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
    `);

    await connection.query(`
    CREATE TABLE comments(
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      requiredS_id INT NOT NULL,
      creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      comment VARCHAR(500) NOT NULL,
      serviceFile VARCHAR(30),
      hide BOOLEAN DEFAULT FALSE,
      solution BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (requiredS_id) REFERENCES requiredS (id)
      
    );
    `);

    if (addData) {
      const hashedDefaultPassword = await bcrypt.hash("password", 10);
      await connection.query(`
  INSERT INTO users(email, nickname, name, surname, password, biography, userPhoto) VALUES ('${faker.internet.email()}', '${faker.internet.userName()}', '${faker.person.firstName()}', '${faker.person.lastName()}', '${hashedDefaultPassword}', '${faker.lorem.sentences()}','${faker.internet.avatar()}' )
          `);

      const users = 20;

      for (let i = 0; i < users; i++) {
        const password = await bcrypt.hash(faker.internet.password(), 10);

        await connection.query(
          `
  INSERT INTO users(email, nickname, name, surname, password, biography, userPhoto) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            faker.internet.email(),
            faker.internet.userName(),
            faker.person.firstName(),
            faker.person.lastName(),
            password,
            faker.lorem.sentences(),
            faker.image.avatar(),
          ]
        );
        console.log(chalk.green(`Inserted user ${i + 1}`));
      }
    }

    console.log(chalk.green("Tables created"));
  } catch (error) {
    console.error(chalk.red("An error has occurred " + error.message));
  } finally {
    let connection;
    try {
      connection = await getConnection();
      console.log(chalk.yellow("Releasing connection..."));
      connection.release();
      console.log(chalk.green("Connection released"));
    } catch (error) {
      console.error(
        chalk.red(
          "An error has occurred while releasing the connection " +
            error.message
        )
      );
    }
    process.exit();
  }
}

main();
