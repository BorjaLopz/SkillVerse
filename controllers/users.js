const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { generateError, createPathIfNotExists } = require("../helpers");
const { createUser, getUserByEmail } = require("../db/users");
const { createService } = require("../db/services");

/* Necesario para express-uploadfile */
const path = require("path"); //Obtenemos el path del directorio __dirname
const sharp = require("sharp"); //Modificamos el tamaño del fichero .resize()
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
    const { title, request_body, required_type } = req.body;

    //Comprobamos el titulo
    if (!title || title.length > 50) {
      throw generateError(
        "El titulo debe existir y ser menor de 50 caracateres",
        400
      );
    }

    //Comprobamos la descripcion
    if (!request_body || request_body.length > 500) {
      throw generateError(
        "La descripcion debe existir y ser menor de 500 caracateres",
        400
      );
    }

    //Comprobamos el servicio
    if (!required_type || required_type.length > 20) {
      throw generateError(
        "La peticion debe existir y ser menor de 20 caracateres",
        400
      );
    }

    let fileName;
    let requestFile;

    if (req.files && req.files.file) {
      //Procesamos el fichero
      const uploadsDir = path.join(__dirname, "../uploads");

      //Creamos el directorio si no existe
      await createPathIfNotExists(uploadsDir);

      requestFile = req.files.file; //Obtenemos el fichero en binario

      fileName = `${nanoid(24)}.${requestFile.name.split(".").slice(-1)}`; //Obtenemos la extension original del archivo y lo guardamos como tal generando un nombre aleatorio de 24 caracteres {nanoid}

      // console.log(uploadsDir + "\\" + fileName);  //dev

      //Usamos el metodo mv() para colocar el fichero en algún lugar de nuestro server
      requestFile.mv(uploadsDir + "\\" + fileName, function (err) {
        if (err) {
          throw generateError("No se ha podido subir el archivo.", 500);
        }
        // console.log("File uploaded!");  //dev
      });
    }

    // Creamos servicio
    const id = await createService(
      title,
      request_body,
      req.userId,
      required_type,
      fileName
    );

    res.send({
      status: "ok",
      message: `${title} creado con exito con id ${id}`,
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
