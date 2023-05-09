const { getConnection } = require("./db");
const { generateError } = require("../helpers");
const bcrypt = require("bcrypt");

const createUser = async (
  email,
  password,
  nickname,
  name = "",
  surname = "",
  biography = "",
  userPhoto = "",
  RRSS = ""
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
      throw generateError("Email already in use", 409);
    }

    const [userNickname] = await connection.query(
      `
    SELECT id FROM users WHERE nickname = ?`,
      [nickname]
    );

    if (userNickname.length > 0) {
      throw generateError("Nickname already in use", 409);
    }

    //Encriptamos la contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash); //Comprobamos la contraseña encriptada

    //Creamos usuario en la base de datos
    const [newUser] = await connection.query(
      `
    INSERT INTO users(email, nickname, name, surname, password, biography, userPhoto, RRSS) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [email, nickname, name, surname, passwordHash, biography, userPhoto, RRSS]
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
      throw generateError("No hay ningun usuario con ese email.", 404);
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
