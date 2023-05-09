const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");
const { createUser } = require("../db/users");

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

module.exports = { newUserController };
