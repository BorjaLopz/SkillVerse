const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      // throw generateError("Falta la cabecera de Authorization", 401); //Comentamos para reutilizar el metodo
      next();
    } else {
      //comprobamos que el token sea correcto
      let token;

      try {
        token = jwt.verify(authorization, process.env.JWT_SECTRET);
      } catch (error) {
        throw generateError("Token incorrecto", 401);
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
