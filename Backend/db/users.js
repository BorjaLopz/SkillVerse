const { getConnection } = require("./db");
const { generateError } = require("../helpers");
const bcrypt = require("bcrypt");

const { DB_DATABASE } = process.env;

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
    await connection.query(`USE ${DB_DATABASE}`);

    const [user] = await connection.query(
      `
    SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (user.length > 0) {
      throw generateError("Email ya en uso", 409);
    }

    const [userNickname] = await connection.query(
      `
    SELECT id FROM users WHERE nickname = ?`,
      [nickname]
    );

    if (userNickname.length > 0) {
      throw generateError("Nickname ya en uso", 409);
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw generateError(
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y tener al menos 8 caracteres",
        400
      );
    }

    // //Encriptar la contraseña
    // const passwordHash = await bcrypt.hash(password, 10);

    //Crear usuario en la BBDD
    const [newUser] = await connection.query(
      `
    INSERT INTO users(email, nickname, name, surname, password, biography, userPhoto) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [email, nickname, name, surname, password, biography, userPhoto]
    );

    console.log("newUser");
    console.log(newUser);

    //Devolver el ID
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

//Devolver la información del usuario por su email
const getUserByEmail = async (email) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`USE ${DB_DATABASE}`);
    const [result] = await connection.query(
      `
    SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (result.length === 0) {
      throw generateError("Usuario o contraseña incorrecta", 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const getAllFieldsExceptPassword = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`USE ${DB_DATABASE}`);

    // const table_tmp = await connection.query(`
    // DROP VIEW IF EXISTS user_tmp`);
    // const table_tmp_2 = await connection.query(
    //   `CREATE VIEW user_tmp AS
    // SELECT id, email, nickname, name, surname, biography, userPhoto
    // FROM users`
    // );
    // const [table_tmp_3] = await connection.query(
    //   `SELECT * FROM user_tmp WHERE id = ? `,
    //   id
    // );

    const [table_tmp_3] = await connection.query(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );

    if (table_tmp_3.length === 0) {
      throw generateError("No hay usuarios con ese ID", 404);
    }

    return table_tmp_3;
  } finally {
    if (connection) connection.release();
  }
};

const editUser = async (tmp_user) => {
  let connection;

  try {
    let { id, email, nickname, name, surname, password, biography, userPhoto } =
      tmp_user;
    connection = await getConnection();
    await connection.query(`USE ${DB_DATABASE}`);

    const [result] = await connection.query(
      `UPDATE users SET email = ?, nickname = ?, name = ?, surname = ?, password = ?, biography = ?, userPhoto = ? WHERE id = ?;`,
      [email, nickname, name, surname, password, biography, userPhoto, id]
    );

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const deleteUser = async (idUser) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`USE ${DB_DATABASE}`);

    const [user] = await connection.query(
      `SELECT id, nickname, active, admin FROM users WHERE id = ? AND active = ?`,
      [idUser, 1]
    );

    if (user.length === 0) {
      throw generateError("User already deleted", 404);
    }

    if (user[0].admin) {
      throw generateError("You can not delete an admin", 401);
    }

    await connection.query(`UPDATE users SET active = 0 WHERE id = ?`, [
      idUser,
    ]);

    return user[0].nickname;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllFieldsExceptPassword,
  editUser,
  deleteUser,
};
