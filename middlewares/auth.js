const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");

//Autenticación y autorización de users
const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw generateError("Missing Authorization header", 401);
    } else {
      //comprobamos que el token sea correcto
      let token;

      try {
        token = jwt.verify(authorization, process.env.JWT_SECRET);
      } catch (error) {
        throw generateError("Wrong token", 401);
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
