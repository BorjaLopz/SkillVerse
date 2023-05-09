const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { generateError, createPathIfNotExists } = require("../helpers");
const { createUser, getUserByEmail } = require("../db/users");

/* Necesario para express-uploadfile */
const path = require("path"); //Obtenemos el path del directorio __dirname
const { nanoid } = require("nanoid"); //Generaremos un nombre aleatorio de N caracteres nanoid(24);

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

const newUserController = async (req, res, next) => {
  try {
    const {
      email,
      nickname,
      name,
      surname,
      password,
      biography,
      userPhoto
    } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    if (!email || !password || !nickname) {
      throw generateError("Debes enviar un email, un password y un nickname", 401);
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

/*const editUserController = async (req, res, next) => {
  try {
    let { email } = req.body;
  }
}
}*/

module.exports = {
  loginController,
  newUserController,
  deleteUserController,
};
