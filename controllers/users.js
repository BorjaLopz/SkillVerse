const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");
const {
  createUser,
  getUserByEmail,
  getAllFieldsExceptPassword,
} = require("../db/users");
const { getConnection } = require("../db/db");
const chalk = require("chalk");

const newUserController = async (req, res, next) => {
  try {
    const { email, nickname, name, surname, password, biography, userPhoto } =
      req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      nickname: Joi.string().required(),
    });

    if (!email || !password || !nickname) {
      throw generateError("Email, password and nickname are required", 401);
    }

    const id = await createUser(
      email,
      password,
      nickname,
      name,
      surname,
      biography,
      userPhoto
    );

    res.send({
      status: "ok",
      message: `User created with id ${id}`,
    });
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  try {
    //utilizamos validador de JOI
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw generateError(error.details.message, 400);
    }

    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError("Email and password are required", 400);
    }

    //recojo los datos de la base de datos del usuario con ese mail
    const user = await getUserByEmail(email);
    //compruebo que las contraseñas coinciden
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError("Password does not match", 401);
    }
    //creo el payload del token
    const payload = { id: user.id };
    //firmo el token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    //envio el token
    //el token es publico, garantiza que las contraseñas son las correctas
    res.send({
      status: "ok",
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const { verifyNickname } = req.body;

    if (!verifyNickname) {
      throw generateError("Nickname is required", 400);
    }

    await deleteUserController(req.user.id, verifyNickname);

    res.send({
      status: "ok",
      message: "User deleted",
    });
  } catch (error) {
    next(error);
  }
};

const getUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await getUserByIdController(id);

    res.send({
      status: "ok",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

async function prueba(id) {}

const getAllFieldsExceptPasswordController = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    connection = await getConnection();

    const userId = await getAllFieldsExceptPassword(id);

    res.send({
      status: "ok",
      data: userId,
    });
  } catch (e) {
    next(e);
  }
};

const getUserByIdController = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT id, email FROM users WHERE id = ?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError("There is no user with that ID", 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const editUserController = async (req, res, next) => {
  const { id } = req.params;
  console.log(chalk.red(id));

  //@TODO HACER BIEN

  let { email, userPhoto, nickname, name, surname, password, biography } =
    req.body;

  // let email;
  // let userPhoto;
  // let nickname;
  // let name;
  // let surname;
  // let password;
  // let biography;

  try {
    // let { email } = req.body;

    // if (!email) {
    //   throw generateError("Email is required", 400);
    // }
    const user = await getAllFieldsExceptPassword(id);

    console.log(user);
    // const user = await getUserByEmail(email);
    email = email || user.email;
    userPhoto = userPhoto || user.userPhoto;
    nickname = nickname || user.nickname;
    name = name || user.name;
    surname = surname || user.surname;
    password = password || user.password;
    biography = biography || user.biography;

    await editUser(
      email,
      userPhoto,
      nickname,
      name,
      surname,
      password,
      biography,
      id
    );

    let message = "";

    if (email != user.email) {
      res.send({
        status: "ok",
        message: "Email updated",
      });
    } else if (userPhoto != user.userPhoto) {
      res.send({
        status: "ok",
        message: "Photo updated",
      });
    } else if (nickname != user.nickname) {
      console.log("Estamos aqui");
      res.send({
        status: "ok",
        message: "Nickname updated",
      });
    } else if (name != user.name) {
      res.send({
        status: "ok",
        message: "Name updated",
      });
    } else if (surname != user.surname) {
      res.send({
        status: "ok",
        message: "Surname updated",
      });
    } else if (password != user.surname) {
      res.send({
        status: "ok",
        message: "Password updated",
      });
    } else if (biography != user.biography) {
      res.send({
        status: "ok",
        message: "Biography updated",
      });
    } else {
      res.send({
        status: "ok",
        message: "No fields updated",
      });
    }

    console.log(chalk.blue(nickname));

    // actualizarUsuario(user.email, user.nickname);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newUserController,
  loginController,
  deleteUserController,
  getUserController,
  getUserByIdController,
  editUserController,
  getAllFieldsExceptPasswordController,
};
