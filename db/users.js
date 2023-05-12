const { getConnection } = require("./db");
const { generateError } = require("../helpers");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const faker  = require('@faker-js/faker');

const createUser = async () => {
  let connection;
 try {
  email = faker.internet.email();
  nickname = faker.internet.userName();
  name = faker.internet.firstName();
  surname = faker.interner.lastName();
  password = faker.internet.password();
  biography = faker.lorem.sentences();
  userPhoto = faker.image.avatar();
  

 
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

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw generateError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long",
        400
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

const getAllFieldsExceptPassword = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const table_tmp = await connection.query(`
    DROP VIEW IF EXISTS user_tmp`);
    const table_tmp_2 = await connection.query(
      `CREATE VIEW user_tmp AS
    SELECT id, email, nickname, name, surname, biography, userPhoto
    FROM users`
    );
    const [table_tmp_3] = await connection.query(
      `SELECT * FROM user_tmp WHERE id = ? `,
      id
    );

    // console.log(table_tmp_3);

    if (table_tmp_3.length === 0) {
      throw generateError("No hay usuarios", 404);
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

    const [result] = await connection.query(
      `UPDATE users SET email = ?, nickname = ?, name = ?, surname = ?, biography = ?, userPhoto = ? WHERE id = ?;`,
      [email, nickname, name, surname, biography, userPhoto, id]
    );

    console.log(result);

    return result;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllFieldsExceptPassword,
  editUser,
};
