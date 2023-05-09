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
  linkedin = "",
  instagram = "",
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
    INSERT INTO users(email, nickname, name, surname, password, biography, userPhoto, linkedin, instagram) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [email, nickname, name, surname, passwordHash, biography, userPhoto, linkedin, instagram]
    );

    //Devolvemos el id
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createUser,
};
