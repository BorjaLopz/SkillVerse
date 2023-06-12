const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");
const {
  createUser,
  getUserByEmail,
  getAllFieldsExceptPassword,
  editUser,
  deleteUser,
} = require("../db/users");
const { getConnection } = require("../db/db");

const { DB_DATABASE } = process.env;

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
      throw generateError(
        "Debes introducir un email, contraseña y nickname",
        401
      );
    }
    const defaultAvatar = "../Frontend/public/images/default_avatar.png";
    const avatar = userPhoto || defaultAvatar;

    const id = await createUser(
      email,
      password,
      nickname,
      name,
      surname,
      biography,
      avatar
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
      throw generateError("Debes introducir email y contraseña", 400);
    }

    //recojo los datos de la base de datos del usuario con ese mail
    const user = await getUserByEmail(email);
    //compruebo que las contraseñas coinciden
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError("Usuario o contraseña incorrecta", 401);
    }
    //creo el payload del token
    const payload = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      userPhoto: user.userPhoto,
    };
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
    await deleteUser(req.userId);

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

const getAllFieldsExceptPasswordController = async (req, res, next) => {
  const { id } = req.params;
  try {
    connection = await getConnection();
    await connection.query(`USE ${DB_DATABASE}`);

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
    await connection.query(`USE ${DB_DATABASE}`);

    const [result] = await connection.query(
      `
      SELECT id, email FROM users WHERE id = ?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError("No hay ningún usuario con ese ID", 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const editUserController = async (req, res, next) => {
  const id_params = +req.params.id;
  const id = req.userId;

  let tmp_user = {}; //Objeto que le vamos a pasar a editUser();

  try {
    //Comprobacion para evitar que puedas editar otro usuario
    if (id !== id_params) {
      throw generateError("No puedes editar otro usuario", 403);
    }

    const [user] = await getAllFieldsExceptPassword(id);
    let { email, userPhoto, nickname, name, surname, password, biography } =
      req.body;

    email = email || user.email;
    userPhoto = userPhoto || user.userPhoto;
    nickname = nickname || user.nickname;
    name = name || user.name;
    surname = surname || user.surname;
    password = password || user.password;
    biography = biography || user.biography;

    if (email != user.email) {
      user.email = email;
    }
    if (userPhoto != user.userPhoto) {
      user.userPhoto = userPhoto;
    }
    if (nickname != user.nickname) {
      user.nickname = nickname;
    }
    if (name != user.name) {
      user.name = name;
    }
    if (surname != user.surname) {
      user.surname = surname;
    }
    if (password != user.password) {
      //Aquí tendremos que hacer un check para comprobar que la contraseña que introduce es igual a la antigua
      user.password = password;
    }
    if (biography != user.biography) {
      user.biography = biography;
    }

    //Añadimos campos al objeto
    tmp_user.id = req.userId;
    tmp_user.email = user.email;
    tmp_user.nickname = user.nickname;
    tmp_user.name = user.name;
    tmp_user.surname = user.surname;
    tmp_user.password = user.password;
    tmp_user.biography = user.biography;
    tmp_user.userPhoto = user.userPhoto;

    const updatedUser = await editUser(tmp_user);

    if (updatedUser.changedRows === 0) {
      res.send({
        status: "ok",
        data: "Ningún campo ha sido actualizado",
      });
    } else {
      res.send({
        status: "ok",
        data: "Perfil actualizado",
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
  getAllFieldsExceptPasswordController,
};
