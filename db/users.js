const { getConnection } = require("./db");
const { generateError } = require("../helpers");
const bcrypt = require("bcrypt");
const chalk = require("chalk");

const createUser = async (
  email,
  password,
  nickname,
  name = "",
  surname = "",
  biography = "",
  userPhoto = ""
) => {
  let connection;

  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `
    SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (user.length > 0) {
      throw generateError(chalk.red("Email already in use", 409));
    }

    const [userNickname] = await connection.query(
      `
    SELECT id FROM users WHERE nickname = ?`,
      [nickname]
    );

    if (userNickname.length > 0) {
      throw generateError(chalk.red("Nickname already in use", 409));
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw generateError(
        chalk.red(
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long",
          400
        )
      );
    }

    //Encriptamos la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    //Creamos usuario en la base de datos
    const [newUser] = await connection.query(
      `
    INSERT INTO users(email, nickname, name, surname, password, biography, userPhoto) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [email, nickname, name, surname, passwordHash, biography, userPhoto]
    );

    //Devolvemos el id
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

//Devuelve la informacion del usuario por email
const getUserByEmail = async (email) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
    SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (result.length === 0) {
      throw generateError(chalk.red("There is no user with that email", 404));
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
