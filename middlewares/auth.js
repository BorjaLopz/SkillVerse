const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");
const chalk = require("chalk");

//Autenticación y autorización de users
const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw generateError(chalk.red("Missing Authorization header", 401));
      next();
    } else {
    //comprobamos que el token sea correcto
    let token;

    try {
      token = jwt.verify(authorization, process.env.JWT_SECTRET);
    } catch (error) {
      throw generateError(chalk.red("Wrong token", 401));
    }

      console.log(token); //dev

      // metemos la informacion del token en la request para usarla en el controlador

      req.userId = token.id;
      //saltamos al controlador

      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
