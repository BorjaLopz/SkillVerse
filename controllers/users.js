const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { generateError, createPathIfNotExists } = require("../helpers");
const { createUser, getUserByEmail } = require("../db/users");
const { createService } = require("../db/services");
const { getConnection } = require("../db/db");

/* Necesario para express-uploadfile */
const path = require("path"); //Obtenemos el path del directorio __dirname
const sharp = require("sharp"); //Modificamos el tamaño del fichero .resize()
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
        "Debes enviar un email, un password y un nickname",
        401
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
      throw generateError(error.details.message, 400);
    }

    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError("Debes enviar un mail y una password", 400);
    }

    //recojo los datos de la base de datos del usuario con ese mail
    const user = await getUserByEmail(email);
    //compruebo que las contraseñas coinciden
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError("La contraseña no coincide", 401);
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
      throw generateError("No has cubierto todos los campos", 400);
    }
    await deleteUserController(req.user.id, verifyNickname);

    res.send({
      status: "ok",
      message: "Usuario eliminado correctamente",
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
      throw generateError("No hay ningún usuario con esa id", 404);
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
      throw generateError("Introduzca su email", 400);
    }
    const user = await getUserByIdController(req.user.id);
    email = email || user.email;
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
        message: "Email actualizado",
      });
    } else if (userPhoto != user.userPhoto) {
      res.send({
        status: "ok",
        message: "Fotografía actualizada",
      });
    } else if (nickname != user.nickname) {
      res.send({
        status: "ok",
        message: "Nickname actualizado",
      });
    } else if (name != user.name) {
      res.send({
        status: "ok",
        message: "Nombre actualizado",
      });
    } else if (surname != user.surname) {
      res.send({
        status: "ok",
        message: "Apellido actualizado",
      });
    } else if (password != user.surname) {
      res.send({
        status: "ok",
        message: "Contraseña actualizada",
      });
    } else if (biography != user.biography) {
      res.send({
        status: "ok",
        message: "Biografía actualizada",
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
