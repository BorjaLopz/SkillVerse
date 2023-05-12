const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");
const {
  createUser,
  getUserByEmail,
  getAllFieldsExceptPassword,
  editUser,
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
  //Obtenemos el id por parametro
  const id_params = +req.params.id;

  //Obtenemos el id por token
  const id = req.userId;

  let tmp_user = {}; //Objeto que le vamos a pasar a editUser();
  
  try {

    console.log(id);
    console.log(id_params);
    //Comprobacion para evitar que puedas editar otro usuario
    if(id !== id_params){
      throw generateError("You can't edit another user", 403);
    }

    //Obtenemos la informacion del usuario por id
    const [user] = await getAllFieldsExceptPassword(id);
    
    //Obtenemos todos los campos del body
    let { email, userPhoto, nickname, name, surname, password, biography } = req.body;

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
      //Aqui tendremos que hacer un check para comprobar que la contraseña que introduce es igual a la antigua
      user.password = password;
    }
    if (biography != user.biography) {
      user.biography = biography;
    }

    /* Añadimos campos al objeto */
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
        data: "Ningun campo ha sido actualizado",
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
