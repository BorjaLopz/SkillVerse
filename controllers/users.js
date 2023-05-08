const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");
const { createUser } = require("../db/users");
const { createService } = require("../db/services");

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
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "5min",
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
      userPhoto,
      RRSS,
    } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const response = req.body;
    const keys = Object.keys(response);
    console.log(keys);

    if (!email || !password) {
      throw generateError("Debes enviar un email y un password", 401);
    }

    const id = await createUser(
      email,
      password,
      nickname,
      name,
      surname,
      biography,
      userPhoto,
      RRSS
    );

    res.send({
      status: "ok",
      message: `User created with id ${id}`,
    });
  } catch (e) {
    next(e);
  }
};

const newServiceController = async (req, res, next) => {
  try {
    const { title, request_body, user_id, required_type } = req.body;
    const file_name = req.file;

    const id_services = await createService(
      title,
      request_body,
      user_id,
      required_type
    );

    console.log("Ya hemos creado el servicio!");

    res.send({
      status: "ok",
      message: `Services created with id ${id_services}`,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  loginController,
  newUserController,
  newServiceController,
};
