const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");

//Autenticación y autorización de users
const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw generateError("Missing Authorization header", 401);
    } else {
      let token;

      //comprobamos que el token sea correcto
      try {
        token = jwt.verify(authorization, process.env.JWT_SECRET);
      } catch (error) {
        throw generateError("Wrong token", 401);
      }

      // metemos la informacion del token en la request para usarla en el controlador
      req.userId = token.id;

      next();
    }
  } catch (error) {
    next(error);
  }
};

//Comprobamos si exite la cabecera de Authorization, si existe pasamos a authUser, si no next();
const checkHeaders = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      next();
    } else {
      authUser(req, res, next);
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  authUser,
  checkHeaders,
};
