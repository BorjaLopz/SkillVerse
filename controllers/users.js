const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { generateError, createPathIfNotExists } = require("../helpers");
const { createUser, getUserByEmail } = require("../db/users");
const { createService } = require("../db/services");
const { getConnection } = require("../db/db");
const chalk = require("chalk");

/* Necesario para express-uploadfile */
const path = require("path"); //Obtenemos el path del directorio __dirname
const { nanoid } = require("nanoid"); //Generaremos un nombre aleatorio de N caracteres nanoid(24);

const newUserController = async (req, res, next) => {
  try {
    const { email, nickname, name, surname, password, biography, userPhoto } =
      req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    if (!email || !password || !nickname) {
      throw generateError(
        chalk.red("Email, password and a nickname are required", 401)
      );
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
      throw generateError(chalk.red(error.details.message, 400));
    }

    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError(chalk.red("Email and password are required", 400));
    }

    //recojo los datos de la base de datos del usuario con ese mail
    const user = await getUserByEmail(email);
    //compruebo que las contraseñas coinciden
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError(chalk.red("Password does not match", 401));
    }
    //creo el payload del token
    const payload = { id: user.id };
    //firmo el token
    const token = jwt.sign(payload, process.env.JWT_SECTRET, {
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
    let { verifyNickname } = req.body;

    if (!verifyNickname) {
      throw generateError > chalk.red("Covering all fields is required", 400);
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
      throw generateError(chalk.red("There is no user with that ID", 404));
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const editUserController = async (req, res, next) => {
  try {
    let { email } = req.body;

    if (!email) {
      throw generateError(chalk.red("Email is required", 400));
    }
    // const user = await getUserByIdController(req.user.id);
    const user = await getUserByEmail(email);
    // email = email || user.email;
    avatar = avatar || user.avatar;
    role = role || user.role;

    const editUser = await (email,
    userPhoto,
    nickname,
    name,
    surname,
    password,
    biography,
    req.user.id);

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
    }
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
};
