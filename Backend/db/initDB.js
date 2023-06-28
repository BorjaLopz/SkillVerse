"use strict";

require("dotenv").config();
const { getConnection } = require("./db");
const chalk = require("chalk");
const { faker } = require("@faker-js/faker/locale/es");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs"); //Con promesa no funciona el borrar ficheros

const { removeFile, getRandomCategory } = require("../helpers");

const addData = process.argv[2] === "--data";

const addAdmin = async (connection) => {
  const hashedDefaultPassword = await bcrypt.hash("admin", 10);
  await connection.query(
    `
      INSERT INTO users(email, nickname, name, surname, password, biography, userPhoto, admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "admin@admin.com",
      "admin",
      "admin",
      "admin_surname",
      hashedDefaultPassword,
      "soy admin",
      "../images/default_admin_avatar.png",
      true,
    ]
  );
};

const deleteFilesFromDirectory = async (pathFile) => {
  const directoryPath = path.join(__dirname, pathFile);
  fs.readdir(directoryPath, (e, files) => {
    if (e) {
      console.log("No se puede leer el directorio");
    }
    files.forEach(async (file) => {
      const filePath = path.join(directoryPath, `/${file}`);
      await removeFile(filePath);
    });
  });
};

async function main() {
  let connection;
  try {
    connection = await getConnection();
    console.log(chalk.green("Connection established"));

    //Crear BBDD
    await connection.query("CREATE DATABASE IF NOT EXISTS portaldigital");
    await connection.query("USE portaldigital");
    console.log(chalk.green("Database created"));

    //Borrar tablas
    console.log(chalk.yellow("Deleting old tables..."));
    await connection.query("DROP TABLE IF EXISTS comments;");
    await connection.query("DROP TABLE IF EXISTS services;");
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
      userPhoto VARCHAR(200),
      admin BOOLEAN DEFAULT FALSE,
      active BOOLEAN DEFAULT TRUE,
      linkedin VARCHAR(100) NULL CHECK (linkedin IS NULL OR linkedin REGEXP 'linkedin'),
      instagram VARCHAR(100) NULL CHECK (instagram IS NULL OR instagram REGEXP 'instagram')
    );
    `);

    await connection.query(`
    CREATE TABLE services(
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL CHECK (LENGTH(title) >= 15),
      request_body VARCHAR(500) NOT NULL CHECK (LENGTH(request_body) >= 15),
      user_id INT NOT NULL,
      file_name VARCHAR(200),
      creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      service_type VARCHAR(200) NOT NULL,
      done BOOLEAN DEFAULT FALSE,
      hide BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
    `);

    await connection.query(`
    CREATE TABLE comments(
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      services_id INT NOT NULL,
      creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      comment VARCHAR(500) NOT NULL,
      serviceFile VARCHAR(50),
      hide BOOLEAN DEFAULT FALSE,
      solution BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (services_id) REFERENCES services (id)
      
    );
    `);

    //Añadimos admin
    await addAdmin(connection);

    //Borramos fotos de usuarios y archivos de los servicios
    // deleteFilesFromDirectory("../uploads");
    // deleteFilesFromDirectory("../../Frontend/public/fotosUsuario");

    if (addData) {
      const users = 20;
      const services = 2;
      const commentsPerService = 2;

      for (let i = 0; i < users; i++) {
        const password = await bcrypt.hash("Password123", 10);

        const [userResult] = await connection.query(
          `
      INSERT INTO users(email, nickname, name, surname, password, biography, userPhoto) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
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

        const userId = userResult.insertId;
        console.log(chalk.green(`Inserted user with ID ${userId}`));

        for (let j = 0; j < services; j++) {
          // Generar un servicio aleatorio
          await connection.query(
            `
        INSERT INTO services(title, request_body, file_name, user_id, service_type, done, hide)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
            [
              faker.lorem.words(6),
              faker.lorem.paragraph(),
              faker.system.fileName(),
              userId,
              getRandomCategory(),
              faker.datatype.boolean(),
              faker.datatype.boolean(),
            ]
          );

          console.log(
            chalk.green(`Inserted service ${j + 1} for user ${userId}`)
          );

          for (let k = 0; k < commentsPerService; k++) {
            // Generar un comentario aleatorio
            await connection.query(
              `
          INSERT INTO comments(user_id, services_id, comment, serviceFile, hide, solution)
          VALUES (?, ?, ?, ?, ?, ?)
          `,
              [
                userId,
                j + 1,
                faker.lorem.sentences(),
                faker.system.fileName(),
                faker.datatype.boolean(),
                faker.datatype.boolean(),
              ]
            );

            console.log(
              chalk.green(`Inserted comment ${k + 1} for service ${j + 1}`)
            );
          }
        }
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
